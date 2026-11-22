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

// Valeurs acceptées par l'ancienne validation mais refusées par la base : l'utilisateur
// voyait alors un message générique au lieu d'une erreur précise.
const TICKET_VALIDE = {
  enseigne: 'Maxi',
  dateAchat: '2026-11-20',
  taxes: '0',
  articles: [{ nom: 'Lait', quantite: '1', prix: '4,99' }],
};

function erreursAvecArticle(article) {
  return validerTicket({
    ...TICKET_VALIDE,
    articles: [{ ...TICKET_VALIDE.articles[0], ...article }],
  });
}

test("validerTicket refuse une date qui n'existe pas", () => {
  assert.equal(validerTicket({ ...TICKET_VALIDE, dateAchat: '2026-25-13' }).length, 1);
  assert.equal(validerTicket({ ...TICKET_VALIDE, dateAchat: '2026-11-31' }).length, 1);
  assert.equal(validerTicket({ ...TICKET_VALIDE, dateAchat: '20/11/2026' }).length, 1);
  assert.deepEqual(validerTicket({ ...TICKET_VALIDE, dateAchat: '2028-02-29' }), []);
});

test('validerTicket refuse une quantité que la base ne peut pas enregistrer', () => {
  for (const quantite of ['0', '0,0001', '100000', 'Infinity', '1e3', '-2', '']) {
    assert.equal(erreursAvecArticle({ quantite }).length, 1, `quantité « ${quantite} »`);
  }
  for (const quantite of ['2', '0,5', '1,250', '99999,999']) {
    assert.deepEqual(erreursAvecArticle({ quantite }), [], `quantité « ${quantite} »`);
  }
});

test("validerTicket refuse un nom d'article de plus de 100 caractères", () => {
  assert.equal(erreursAvecArticle({ nom: 'x'.repeat(101) }).length, 1);
  assert.deepEqual(erreursAvecArticle({ nom: 'x'.repeat(100) }), []);
});
