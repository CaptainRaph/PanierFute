-- 03-donnees-initiales.sql - données de référence (catégories).

-- Le script peut être relancé sans créer de doublon : une catégorie déjà
-- présente (même clé) est simplement mise à jour.
insert into public.categories (cle, nom, est_alimentaire)
values
  ('fruits-legumes', 'Fruits et légumes', true),
  ('viandes-poissons', 'Viandes et poissons', true),
  ('produits-laitiers', 'Produits laitiers et œufs', true),
  ('boulangerie', 'Pains et pâtisseries', true),
  ('epicerie', 'Épicerie', true),
  ('surgeles', 'Surgelés', true),
  ('boissons', 'Boissons', true),
  ('collations', 'Collations et sucreries', true),
  ('hygiene', 'Hygiène et santé', false),
  ('maison', 'Entretien et maison', false),
  -- Catégorie par défaut d'un article que le classement ne reconnaît pas.
  ('autre', 'Autre', false)
on conflict (cle) do update
set
  nom = excluded.nom,
  est_alimentaire = excluded.est_alimentaire;
