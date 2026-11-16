-- 02-politiques.sql - activation du Row Level Security et politiques : un
-- utilisateur ne lit et n'écrit que ses propres lignes.

-- L'application n'a pas de serveur : ces règles sont la seule protection des
-- données. Deux niveaux se cumulent :
--   - les droits (grant) disent quelles opérations un rôle peut tenter ;
--   - les politiques (policy) disent sur quelles lignes elles s'appliquent.
-- Le rôle « authenticated » est celui d'un utilisateur connecté, « anon »
-- celui d'un visiteur non connecté, qui n'a accès à rien.

-- ---- Activation du RLS ------------------------------------------------------

-- Une fois le RLS activé, une table sans politique ne renvoie aucune ligne.
alter table public.profils enable row level security;
alter table public.categories enable row level security;
alter table public.tickets enable row level security;
alter table public.articles enable row level security;
alter table public.inventaire enable row level security;

-- ---- Droits -----------------------------------------------------------------

revoke all on public.profils, public.categories, public.tickets, public.articles, public.inventaire
from anon, authenticated;

-- Le profil est créé par un déclencheur et supprimé avec le compte :
-- l'utilisateur peut seulement le lire et le modifier.
grant select, update on public.profils to authenticated;
-- Les catégories sont en lecture seule.
grant select on public.categories to authenticated;
grant select, insert, update, delete on public.tickets to authenticated;
grant select, insert, update, delete on public.articles to authenticated;
grant select, insert, update, delete on public.inventaire to authenticated;

-- ---- Politiques -------------------------------------------------------------

-- « using » filtre les lignes visibles ou modifiables ; « with check » vérifie
-- la ligne après écriture. auth.uid() est l'identifiant du compte connecté ;
-- l'écrire dans un « select » permet à PostgreSQL de ne le calculer qu'une fois
-- par requête au lieu d'une fois par ligne.

create policy "Lire son profil" on public.profils
for select to authenticated
using (id = (select auth.uid()));

create policy "Modifier son profil" on public.profils
for update to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));

create policy "Lire les catégories" on public.categories
for select to authenticated
using (true);

create policy "Gérer ses tickets" on public.tickets
for all to authenticated
using (utilisateur_id = (select auth.uid()))
with check (utilisateur_id = (select auth.uid()));

-- Un article doit en plus être rattaché à un ticket de l'utilisateur : sans
-- cette vérification, on pourrait ajouter un article au ticket d'un autre.
create policy "Gérer ses articles" on public.articles
for all to authenticated
using (utilisateur_id = (select auth.uid()))
with check (
  utilisateur_id = (select auth.uid())
  and exists (
    select 1
    from public.tickets
    where tickets.id = articles.ticket_id
      and tickets.utilisateur_id = (select auth.uid())
  )
);

-- Même principe : l'article d'origine d'un aliment, s'il y en a un, doit
-- appartenir à l'utilisateur.
create policy "Gérer son inventaire" on public.inventaire
for all to authenticated
using (utilisateur_id = (select auth.uid()))
with check (
  utilisateur_id = (select auth.uid())
  and (
    article_id is null
    or exists (
      select 1
      from public.articles
      where articles.id = inventaire.article_id
        and articles.utilisateur_id = (select auth.uid())
    )
  )
);
