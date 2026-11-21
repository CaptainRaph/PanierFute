// analyse-ticket.js - transforme le texte brut lu par l'OCR en ticket
// structuré (enseigne, date, articles, taxes, total). Fonctions pures.

import { ENSEIGNES } from '../donnees/dictionnaire-enseignes.js';
import { nettoyerLibelle } from './classification.js';
import { texteVersCents } from './montants.js';
import { normaliserTexte } from './texte.js';

// Une ligne d'article se termine par un prix, parfois suivi d'une lettre de
// taxe : « LAIT 2% 4L     5,49 F ». On garde le texte avant le prix et le prix.
const LIGNE_AVEC_PRIX = /^(.*[a-zA-Z].*?)\s+(\d+[.,]\d{2})\s*[A-Z*]{0,2}$/;

// Lignes qui ont un prix mais ne sont pas des articles.
const MOTS_A_IGNORER = [
  'sous-total',
  'sous total',
  'subtotal',
  'visa',
  'mastercard',
  'debit',
  'credit',
  'comptant',
  'monnaie',
  'change',
  'solde',
  'rabais',
  'economie',
];

const MOTS_TAXES = ['tps', 'tvq', 'tvh', 'taxe', 'taxes', 'gst', 'qst', 'hst'];

// Cherche une date « 2026-11-20 » (ou 2026/11/20) ou « 20/11/2026 » (ou
// 20-11-26) dans le texte. Renvoie « AAAA-MM-JJ » ou une chaîne vide.
export function trouverDate(texte) {
  const anneeDabord = texte.match(/(\d{4})[-/.](\d{2})[-/.](\d{2})/);
  if (anneeDabord) {
    return `${anneeDabord[1]}-${anneeDabord[2]}-${anneeDabord[3]}`;
  }
  const jourDabord = texte.match(/(\d{2})[-/.](\d{2})[-/.](\d{2,4})/);
  if (jourDabord) {
    const annee = jourDabord[3].length === 2 ? `20${jourDabord[3]}` : jourDabord[3];
    return `${annee}-${jourDabord[2]}-${jourDabord[1]}`;
  }
  return '';
}

// Cherche une enseigne connue dans les premières lignes ; sinon, prend la
// première ligne (souvent le nom du magasin).
export function trouverEnseigne(lignes) {
  const debut = lignes.slice(0, 5).map(normaliserTexte);
  for (const enseigne of ENSEIGNES) {
    if (debut.some((ligne) => ligne.includes(normaliserTexte(enseigne)))) {
      return enseigne;
    }
  }
  return lignes.length > 0 ? nettoyerLibelle(lignes[0]) : '';
}

export function analyserTexteTicket(texte) {
  const lignes = texte
    .split('\n')
    .map((ligne) => ligne.trim())
    .filter((ligne) => ligne !== '');

  const ticket = {
    enseigne: trouverEnseigne(lignes),
    dateAchat: trouverDate(texte),
    taxesCents: 0,
    totalCents: null,
    articles: [],
  };

  for (const ligne of lignes) {
    const correspondance = ligne.match(LIGNE_AVEC_PRIX);
    if (!correspondance) {
      continue;
    }
    const libelle = correspondance[1].trim();
    const prixCents = texteVersCents(correspondance[2]);
    const libelleNormalise = normaliserTexte(libelle);
    const mots = libelleNormalise.split(/[^a-z]+/);

    if (MOTS_A_IGNORER.some((mot) => libelleNormalise.includes(mot))) {
      continue;
    }
    if (mots.includes('total')) {
      ticket.totalCents = prixCents;
    } else if (MOTS_TAXES.some((mot) => mots.includes(mot))) {
      ticket.taxesCents += prixCents;
    } else {
      ticket.articles.push({ libelleBrut: libelle, nom: nettoyerLibelle(libelle), prixCents });
    }
  }

  return ticket;
}
