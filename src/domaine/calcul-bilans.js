// calcul-bilans.js - agrège des articles en totaux par catégorie et par
// période. Fonctions pures.

import { ajouterJours, texteVersDate, dateVersTexte } from './dates.js';
import { additionner } from './montants.js';

// Les tickets reçus ont la forme renvoyée par Supabase :
// { date_achat: '2026-11-20', total_cents: 1250,
//   articles: [{ prix_cents: 499, categories: { nom: 'Épicerie' } }] }

// Renvoie le premier et le dernier jour de la semaine (du lundi au dimanche)
// ou du mois qui contient « jour ».
export function bornesPeriode(periode, jour) {
  const date = texteVersDate(jour);

  if (periode === 'semaine') {
    // getDay() vaut 0 le dimanche, 1 le lundi... : on recule jusqu'au lundi.
    const joursDepuisLundi = (date.getDay() + 6) % 7;
    const debut = ajouterJours(jour, -joursDepuisLundi);
    return { debut, fin: ajouterJours(debut, 6) };
  }

  const debut = new Date(date.getFullYear(), date.getMonth(), 1);
  // Le jour 0 du mois suivant est le dernier jour du mois courant.
  const fin = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return { debut: dateVersTexte(debut), fin: dateVersTexte(fin) };
}

// Total payé (taxes comprises) pour une liste de tickets.
export function totalDesTickets(tickets) {
  return additionner(tickets.map((ticket) => ticket.total_cents));
}

// Total des articles par catégorie, du plus gros au plus petit (hors taxes).
export function totauxParCategorie(tickets) {
  const totaux = {};
  for (const ticket of tickets) {
    for (const article of ticket.articles) {
      const categorie = article.categories.nom;
      totaux[categorie] = (totaux[categorie] ?? 0) + article.prix_cents;
    }
  }
  return Object.entries(totaux)
    .map(([categorie, totalCents]) => ({ categorie, totalCents }))
    .sort((a, b) => b.totalCents - a.totalCents);
}

// Total dépensé chaque jour de la période ; un jour sans achat vaut 0.
export function totauxParJour(tickets, debut, fin) {
  const jours = [];
  for (let jour = debut; jour <= fin; jour = ajouterJours(jour, 1)) {
    const ticketsDuJour = tickets.filter((ticket) => ticket.date_achat === jour);
    jours.push({ jour, totalCents: totalDesTickets(ticketsDuJour) });
  }
  return jours;
}
