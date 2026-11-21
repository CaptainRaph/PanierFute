// classification.test.js - tests du classement des articles.
import assert from 'node:assert/strict';
import test from 'node:test';

import {
  CATEGORIE_PAR_DEFAUT,
  nettoyerLibelle,
  trouverCategorie,
} from '../../src/domaine/classification.js';

test('trouverCategorie reconnaît les mots-clés courants', () => {
  assert.equal(trouverCategorie('POMMES GALA'), 'fruits-legumes');
  assert.equal(trouverCategorie('LAITUE ROMAINE'), 'fruits-legumes');
  assert.equal(trouverCategorie('LAIT 2% 4L'), 'produits-laitiers');
  assert.equal(trouverCategorie('POULET ENTIER'), 'viandes-poissons');
  assert.equal(trouverCategorie('Pâtes spaghetti'), 'epicerie');
});

test('trouverCategorie renvoie la catégorie par défaut si aucun mot ne correspond', () => {
  assert.equal(trouverCategorie('ARTICLE INCONNU'), CATEGORIE_PAR_DEFAUT);
});

test('nettoyerLibelle rend un libellé en majuscules plus lisible', () => {
  assert.equal(nettoyerLibelle('  LAIT  2%   4L '), 'Lait 2% 4l');
});
