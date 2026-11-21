// validation.test.js - tests des règles de validation.
import assert from 'node:assert/strict';
import test from 'node:test';

import { validerAliment, validerProfil, validerTicket } from '../../src/domaine/validation.js';

test('validerTicket accepte un ticket complet', () => {
  const erreurs = validerTicket({
    enseigne: 'Maxi',
    dateAchat: '2026-11-20',
    taxes: '1,25',
    articles: [{ nom: 'Lait', quantite: '1', prix: '4,99' }],
  });
  assert.deepEqual(erreurs, []);
});

test('validerTicket signale les champs manquants ou invalides', () => {
  const erreurs = validerTicket({
    enseigne: '',
    dateAchat: '',
    taxes: 'abc',
    articles: [],
  });
  assert.equal(erreurs.length, 4);
});

test('validerAliment vérifie le nom et la quantité', () => {
  assert.deepEqual(validerAliment({ nom: 'Riz', quantite: '2' }), []);
  assert.equal(validerAliment({ nom: '', quantite: '0' }).length, 2);
});

test('validerProfil vérifie le prénom et le budget', () => {
  assert.deepEqual(validerProfil({ prenom: 'Maëlan', budget: '300' }), []);
  assert.equal(validerProfil({ prenom: '', budget: '-50' }).length, 2);
});
