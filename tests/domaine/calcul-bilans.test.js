// calcul-bilans.test.js - tests des calculs de bilans et de périodes.
import assert from 'node:assert/strict';
import test from 'node:test';

import {
  bornesPeriode,
  totauxParCategorie,
  totauxParJour,
  totalDesTickets,
} from '../../src/domaine/calcul-bilans.js';

const TICKETS = [
  {
    date_achat: '2026-11-16',
    total_cents: 1200,
    articles: [
      { prix_cents: 500, categories: { nom: 'Épicerie' } },
      { prix_cents: 700, categories: { nom: 'Fruits et légumes' } },
    ],
  },
  {
    date_achat: '2026-11-18',
    total_cents: 800,
    articles: [{ prix_cents: 800, categories: { nom: 'Épicerie' } }],
  },
];

test('bornesPeriode calcule le début et la fin de la semaine et du mois', () => {
  // 2026-11-20 est un vendredi : la semaine va du lundi 16 au dimanche 22.
  assert.deepEqual(bornesPeriode('semaine', '2026-11-20'), {
    debut: '2026-11-16',
    fin: '2026-11-22',
  });
  assert.deepEqual(bornesPeriode('mois', '2026-11-20'), {
    debut: '2026-11-01',
    fin: '2026-11-30',
  });
});

test('totalDesTickets et totauxParCategorie agrègent les montants', () => {
  assert.equal(totalDesTickets(TICKETS), 2000);
  assert.deepEqual(totauxParCategorie(TICKETS), [
    { categorie: 'Épicerie', totalCents: 1300 },
    { categorie: 'Fruits et légumes', totalCents: 700 },
  ]);
});

test('totauxParJour renvoie un total par jour de la période', () => {
  assert.deepEqual(totauxParJour(TICKETS, '2026-11-16', '2026-11-18'), [
    { jour: '2026-11-16', totalCents: 1200 },
    { jour: '2026-11-17', totalCents: 0 },
    { jour: '2026-11-18', totalCents: 800 },
  ]);
});
