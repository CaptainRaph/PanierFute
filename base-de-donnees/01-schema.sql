-- 01-schema.sql - tables, clés et contraintes de la base PanierFûté.
-- À exécuter en premier dans l'éditeur SQL de Supabase.

-- Conventions communes à toutes les tables :
--   - les montants sont des entiers en cents, jamais des nombres à virgule ;
--   - utilisateur_id se remplit seul avec l'identifiant du compte connecté
--     (auth.uid()), l'application n'a donc jamais à l'envoyer ;
--   - supprimer un compte supprime toutes ses données (on delete cascade).

-- ---- Profils ----------------------------------------------------------------

-- Une ligne par compte, créée automatiquement à l'inscription (voir
-- 04-fonctions.sql). La clé primaire est l'identifiant du compte Supabase.
create table public.profils (
  id uuid primary key references auth.users (id) on delete cascade,
  prenom text not null check (char_length(prenom) between 1 and 50),
  budget_mensuel_cents integer not null default 0 check (budget_mensuel_cents >= 0),
  created_at timestamptz not null default now()
);

-- ---- Catégories -------------------------------------------------------------

-- Table de référence commune à tous les utilisateurs, remplie par
-- 03-donnees-initiales.sql. La clé (« fruits-legumes ») est l'identifiant
-- stable utilisé par le code ; le nom est le texte affiché.
create table public.categories (
  id smallint generated always as identity primary key,
  cle text not null unique,
  nom text not null,
  -- Les articles d'une catégorie alimentaire alimentent l'inventaire.
  est_alimentaire boolean not null default false
);

-- ---- Tickets ----------------------------------------------------------------

create table public.tickets (
  id bigint generated always as identity primary key,
  utilisateur_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  enseigne text not null check (char_length(enseigne) between 1 and 100),
  date_achat date not null,
  taxes_cents integer not null default 0 check (taxes_cents >= 0),
  total_cents integer not null check (total_cents >= 0),
  created_at timestamptz not null default now()
);

-- Les bilans lisent les tickets d'un utilisateur sur une période.
create index tickets_utilisateur_date_idx on public.tickets (utilisateur_id, date_achat);

-- ---- Articles ---------------------------------------------------------------

create table public.articles (
  id bigint generated always as identity primary key,
  -- Supprimer un ticket supprime ses articles.
  ticket_id bigint not null references public.tickets (id) on delete cascade,
  utilisateur_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  -- Texte lu sur le ticket par l'OCR ; vide pour un article saisi à la main.
  libelle_brut text check (char_length(libelle_brut) <= 200),
  nom text not null check (char_length(nom) between 1 and 100),
  -- Décimale pour accepter les articles au poids (0,750 kg).
  quantite numeric(8, 3) not null default 1 check (quantite > 0),
  -- Prix payé pour la ligne entière, quantité comprise.
  prix_cents integer not null check (prix_cents >= 0),
  categorie_id smallint not null references public.categories (id)
);

create index articles_ticket_idx on public.articles (ticket_id);
create index articles_utilisateur_idx on public.articles (utilisateur_id);

-- ---- Inventaire -------------------------------------------------------------

create table public.inventaire (
  id bigint generated always as identity primary key,
  utilisateur_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  nom text not null check (char_length(nom) between 1 and 100),
  quantite numeric(8, 3) not null default 1 check (quantite > 0),
  -- Article d'origine, vide pour un aliment ajouté à la main. Si le ticket est
  -- supprimé, l'aliment reste dans la cuisine : seul le lien est effacé.
  article_id bigint references public.articles (id) on delete set null,
  created_at timestamptz not null default now()
);

create index inventaire_utilisateur_idx on public.inventaire (utilisateur_id);
