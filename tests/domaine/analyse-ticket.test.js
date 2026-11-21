// analyse-ticket.test.js - tests de l'analyse du texte brut d'un ticket.
import assert from 'node:assert/strict';
import test from 'node:test';

import { analyserTexteTicket, trouverDate } from '../../src/domaine/analyse-ticket.js';

test('trouverDate reconnaît les formats courants', () => {
  assert.equal(trouverDate('Date : 2026-11-20'), '2026-11-20');
  assert.equal(trouverDate('20/11/2026 14:30'), '2026-11-20');
  assert.equal(trouverDate('sans date'), '');
});

test('analyserTexteTicket extrait enseigne, date, articles, taxes et total', () => {
  const texte = `
    MAXI CHICOUTIMI
    2026-11-20
    LAIT 2% 4L        5,49
    POMMES GALA       3.99 F
    SOUS-TOTAL        9,48
    TPS               0,47
    TVQ               0,95
    TOTAL            10,90
    VISA             10,90
  `;

  const ticket = analyserTexteTicket(texte);

  assert.equal(ticket.enseigne, 'Maxi');
  assert.equal(ticket.dateAchat, '2026-11-20');
  assert.equal(ticket.taxesCents, 142);
  assert.equal(ticket.totalCents, 1090);
  assert.equal(ticket.articles.length, 2);
  assert.equal(ticket.articles[0].nom, 'Lait 2% 4l');
  assert.equal(ticket.articles[0].prixCents, 549);
  assert.equal(ticket.articles[1].prixCents, 399);
});
