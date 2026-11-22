// recettes.js - liste de recettes simples écrites par l'équipe, utilisée pour
// les idées de repas.

// Ingrédients réutilisés dans plusieurs recettes. « mots » contient les
// mots-clés (sans accents, en minuscules) qui permettent de les reconnaître
// dans l'inventaire.
const PATES = { nom: 'Pâtes', mots: ['pates', 'spaghetti', 'macaroni', 'penne', 'nouille'] };
const RIZ = { nom: 'Riz', mots: ['riz'] };
const OEUFS = { nom: 'Œufs', mots: ['oeuf'] };
const LAIT = { nom: 'Lait', mots: ['lait'] };
const FROMAGE = { nom: 'Fromage', mots: ['fromage', 'cheddar', 'mozzarella', 'parmesan'] };
const PAIN = { nom: 'Pain', mots: ['pain', 'baguette'] };
const POULET = { nom: 'Poulet', mots: ['poulet'] };
const TOMATE = { nom: 'Tomates', mots: ['tomate'] };
const OIGNON = { nom: 'Oignon', mots: ['oignon'] };
const PATATES = { nom: 'Pommes de terre', mots: ['patate'] };
const LAITUE = { nom: 'Laitue', mots: ['laitue', 'salade'] };
const LEGUMES = {
  nom: 'Légumes',
  mots: ['carotte', 'poivron', 'brocoli', 'courgette', 'champignon', 'legume'],
};

export const RECETTES = [
  {
    id: 'pates-tomate',
    nom: 'Pâtes sauce tomate',
    ingredients: [PATES, { nom: 'Sauce tomate', mots: ['sauce'] }, FROMAGE],
    etapes: 'Cuire les pâtes, chauffer la sauce, mélanger et ajouter le fromage râpé.',
  },
  {
    id: 'omelette',
    nom: 'Omelette au fromage',
    ingredients: [OEUFS, LAIT, FROMAGE],
    etapes: 'Battre les œufs avec un peu de lait, cuire à la poêle, ajouter le fromage.',
  },
  {
    id: 'riz-saute',
    nom: 'Riz sauté aux légumes',
    ingredients: [RIZ, OEUFS, LEGUMES],
    etapes: 'Faire revenir les légumes, ajouter le riz cuit puis les œufs battus.',
  },
  {
    id: 'croque-monsieur',
    nom: 'Croque-monsieur',
    ingredients: [PAIN, { nom: 'Jambon', mots: ['jambon'] }, FROMAGE],
    etapes: 'Garnir le pain de jambon et de fromage, puis dorer à la poêle ou au four.',
  },
  {
    id: 'crepes',
    nom: 'Crêpes',
    ingredients: [{ nom: 'Farine', mots: ['farine'] }, OEUFS, LAIT],
    etapes: 'Mélanger farine, œufs et lait, laisser reposer, cuire à la poêle.',
  },
  {
    id: 'salade',
    nom: 'Salade composée',
    ingredients: [LAITUE, TOMATE, { nom: 'Concombre', mots: ['concombre'] }],
    etapes: 'Couper les légumes, mélanger et assaisonner avec huile et vinaigre.',
  },
  {
    id: 'poulet-riz',
    nom: 'Poulet, riz et légumes',
    ingredients: [POULET, RIZ, LEGUMES],
    etapes: 'Cuire le riz, faire dorer le poulet en morceaux avec les légumes.',
  },
  {
    id: 'tacos',
    nom: 'Tacos au bœuf',
    ingredients: [
      { nom: 'Tortillas', mots: ['tortilla'] },
      { nom: 'Bœuf haché', mots: ['boeuf', 'hache'] },
      FROMAGE,
      TOMATE,
    ],
    etapes: 'Cuire la viande avec des épices, garnir les tortillas avec fromage et tomates.',
  },
  {
    id: 'pates-thon',
    nom: 'Pâtes au thon',
    ingredients: [PATES, { nom: 'Thon', mots: ['thon'] }, OIGNON],
    etapes: "Cuire les pâtes, faire revenir l'oignon, ajouter le thon et mélanger.",
  },
  {
    id: 'soupe-legumes',
    nom: 'Soupe de légumes',
    ingredients: [PATATES, OIGNON, LEGUMES],
    etapes: "Couper les légumes, les cuire 25 minutes dans de l'eau salée, puis mixer.",
  },
  {
    id: 'gruau',
    nom: 'Gruau aux fruits',
    ingredients: [
      { nom: 'Gruau', mots: ['gruau', 'avoine'] },
      LAIT,
      { nom: 'Fruits', mots: ['banane', 'pomme', 'bleuet', 'fraise', 'fruit'] },
    ],
    etapes: 'Cuire le gruau dans le lait 3 minutes, ajouter les fruits coupés.',
  },
  {
    id: 'sandwich-poulet',
    nom: 'Sandwich au poulet',
    ingredients: [PAIN, POULET, LAITUE],
    etapes: 'Garnir le pain de poulet cuit et de laitue, avec un peu de mayonnaise.',
  },
  {
    id: 'patates-sautees',
    nom: 'Pommes de terre sautées',
    ingredients: [PATATES, OIGNON, OEUFS],
    etapes: "Couper les pommes de terre en dés, les faire dorer avec l'oignon, servir avec un œuf.",
  },
];
