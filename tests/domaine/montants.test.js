// montants.test.js - tests des opérations sur les montants.
import assert from 'node:assert/strict';
import test from 'node:test';

import { additionnerCents, centsVersTexte, texteVersCents } from '../../src/domaine/montants.js';

test('texteVersCents lit les formats courants', () => {
  assert.equal(texteVersCents('3,99'), 399);
  assert.equal(texteVersCents('3.99 $'), 399);
  assert.equal(texteVersCents('12'), 1200);
  assert.equal(texteVersCents('0,5'), 50);
});

test("texteVersCents accepte l'espace des milliers", () => {
  assert.equal(texteVersCents('1 234,50'), 123450);
  // Espace insécable, celle qu'affiche le format canadien des montants.
  assert.equal(texteVersCents('1 234,50 $'), 123450);
  assert.equal(texteVersCents('  12  '), 1200);
});

test('texteVersCents renvoie null si le texte est invalide', () => {
  assert.equal(texteVersCents(''), null);
  assert.equal(texteVersCents('-2,00'), null);
  assert.equal(texteVersCents('abc'), null);
  assert.equal(texteVersCents('1,234'), null);
});

test('additionnerCents additionne des montants en cents', () => {
  assert.equal(additionnerCents([10, 20, 399]), 429);
  assert.equal(additionnerCents([]), 0);
});

test('centsVersTexte formate un montant pour un champ de saisie', () => {
  assert.equal(centsVersTexte(399), '3,99');
  assert.equal(centsVersTexte(0), '0,00');
});
