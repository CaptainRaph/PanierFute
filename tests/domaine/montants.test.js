// montants.test.js - tests des opérations sur les montants.
import assert from 'node:assert/strict';
import test from 'node:test';

import { additionner, centsVersTexte, lirePrix } from '../../src/domaine/montants.js';

test('lirePrix lit les formats courants', () => {
  assert.equal(lirePrix('3,99'), 399);
  assert.equal(lirePrix('3.99 $'), 399);
  assert.equal(lirePrix('12'), 1200);
  assert.equal(lirePrix('0,5'), 50);
});

test('lirePrix renvoie null si le texte est invalide', () => {
  assert.equal(lirePrix(''), null);
  assert.equal(lirePrix('-2,00'), null);
  assert.equal(lirePrix('abc'), null);
  assert.equal(lirePrix('1,234'), null);
});

test('additionner additionne des montants en cents', () => {
  assert.equal(additionner([10, 20, 399]), 429);
  assert.equal(additionner([]), 0);
});

test('centsVersTexte formate un montant pour un champ de saisie', () => {
  assert.equal(centsVersTexte(399), '3,99');
  assert.equal(centsVersTexte(0), '0,00');
});
