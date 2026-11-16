-- 04-fonctions.sql - fonctions SQL appelées par l'application,
-- dont l'enregistrement d'un ticket et de ses articles en une seule transaction.

-- Dans les deux fonctions, « set search_path = '' » oblige à écrire le schéma
-- devant chaque table (public.tickets) : la fonction ne peut pas être
-- détournée vers une table du même nom placée dans un autre schéma.

-- ---- Création du profil à l'inscription --------------------------------------

-- Crée la ligne de profil d'un nouveau compte. Le prénom vient des
-- informations transmises à l'inscription (options.data.prenom côté client).
-- « security definer » : la fonction s'exécute avec les droits de son
-- propriétaire, car l'utilisateur qui s'inscrit n'a pas le droit d'insérer
-- dans profils.
create or replace function public.creer_profil_nouveau_compte()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profils (id, prenom)
  values (
    new.id,
    -- Prénom absent ou vide : valeur par défaut, pour ne jamais bloquer
    -- l'inscription. left() respecte la longueur maximale de la colonne.
    coalesce(nullif(left(trim(new.raw_user_meta_data ->> 'prenom'), 50), ''), 'Utilisateur')
  );
  return new;
end;
$$;

-- Appelle la fonction après chaque création de compte par Supabase Auth.
create or replace trigger apres_creation_compte
after insert on auth.users
for each row
execute function public.creer_profil_nouveau_compte();

-- ---- Enregistrement d'un ticket ----------------------------------------------

-- Enregistre un ticket, ses articles, puis ajoute les articles alimentaires à
-- l'inventaire. Une fonction s'exécute dans une seule transaction : si une
-- étape échoue, rien n'est enregistré.
--
-- p_articles est un tableau JSON d'objets :
--   { "libelle_brut": texte ou null, "nom": texte, "quantite": nombre,
--     "prix_cents": entier, "categorie_id": entier }
-- Renvoie l'identifiant du ticket créé.
--
-- « security invoker » : la fonction s'exécute avec les droits de l'utilisateur
-- connecté, donc les politiques RLS s'appliquent à chaque insertion.
create or replace function public.enregistrer_ticket(
  p_enseigne text,
  p_date_achat date,
  p_taxes_cents integer,
  p_total_cents integer,
  p_articles jsonb
)
returns bigint
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_ticket_id bigint;
begin
  if p_articles is null
    or jsonb_typeof(p_articles) <> 'array'
    or jsonb_array_length(p_articles) = 0 then
    raise exception 'Un ticket doit contenir au moins un article.';
  end if;

  insert into public.tickets (enseigne, date_achat, taxes_cents, total_cents)
  values (p_enseigne, p_date_achat, p_taxes_cents, p_total_cents)
  returning id into v_ticket_id;

  -- jsonb_to_recordset transforme le tableau JSON en lignes, une par article.
  insert into public.articles (ticket_id, libelle_brut, nom, quantite, prix_cents, categorie_id)
  select
    v_ticket_id,
    article.libelle_brut,
    article.nom,
    coalesce(article.quantite, 1),
    article.prix_cents,
    article.categorie_id
  from jsonb_to_recordset(p_articles) as article (
    libelle_brut text,
    nom text,
    quantite numeric,
    prix_cents integer,
    categorie_id smallint
  );

  -- Instruction séparée de la précédente : la politique de l'inventaire
  -- vérifie que l'article existe, ce qui n'est vrai qu'une fois l'insertion
  -- des articles terminée.
  insert into public.inventaire (nom, quantite, article_id)
  select articles.nom, articles.quantite, articles.id
  from public.articles
  join public.categories on categories.id = articles.categorie_id
  where articles.ticket_id = v_ticket_id
    and categories.est_alimentaire;

  return v_ticket_id;
end;
$$;

-- Seul un utilisateur connecté peut appeler la fonction.
revoke execute on function public.enregistrer_ticket (text, date, integer, integer, jsonb)
from public, anon;
grant execute on function public.enregistrer_ticket (text, date, integer, integer, jsonb)
to authenticated;
