// suggestions-repas.test.js - tests des idées de repas selon l'inventaire.
import assert from 'node:assert/strict';
import test from 'node:test';

import { suggererRepas } from '../../src/domaine/suggestions-repas.js';
import { RECETTES } from '../../src/donnees/recettes.js';

test('suggererRepas classe en premier les recettes avec le moins de manquants', () => {
  const inventaire = [{ nom: 'Œufs' }, { nom: 'Lait 2%' }, { nom: 'Fromage cheddar' }];
  const suggestions = suggererRepas(RECETTES, inventaire);

  assert.equal(suggestions[0].id, 'omelette');
  assert.deepEqual(suggestions[0].manquants, []);
  assert.equal(suggestions[0].disponibles.length, 3);
});

test('suggererRepas ne renvoie rien si aucun ingrédient ne correspond', () => {
  assert.deepEqual(suggererRepas(RECETTES, [{ nom: 'Savon' }]), []);
});
