// dates.js - conversions entre le texte « AAAA-MM-JJ » (format de la base et
// des champs de type date) et les objets Date de JavaScript. Fonctions pures.

// « 2026-11-20 » -> objet Date (à minuit, heure locale).
export function texteVersDate(texte) {
  const [annee, mois, jour] = texte.split('-').map(Number);
  return new Date(annee, mois - 1, jour);
}

// Objet Date -> « 2026-11-20 ».
export function dateVersTexte(date) {
  const annee = date.getFullYear();
  const mois = String(date.getMonth() + 1).padStart(2, '0');
  const jour = String(date.getDate()).padStart(2, '0');
  return `${annee}-${mois}-${jour}`;
}

// Ajoute (ou retire, si nombre est négatif) des jours à une date « AAAA-MM-JJ ».
export function ajouterJours(texte, nombre) {
  const date = texteVersDate(texte);
  date.setDate(date.getDate() + nombre);
  return dateVersTexte(date);
}
