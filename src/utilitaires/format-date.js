// format-date.js - affichage des dates et date du jour.

import { dateVersTexte, versTexteDate } from '../domaine/dates.js';

// « 2026-11-20 » -> « 20 nov. 2026 ».
export function formaterDate(texte) {
  return dateVersTexte(texte).toLocaleDateString('fr-CA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// « 2026-11-20 » -> « 20 nov. » (étiquettes des graphiques).
export function formaterJourCourt(texte) {
  return dateVersTexte(texte).toLocaleDateString('fr-CA', { day: 'numeric', month: 'short' });
}

// Date du jour au format « AAAA-MM-JJ ».
export function dateDuJour() {
  return versTexteDate(new Date());
}
