// texte.js - petites fonctions sur le texte partagées par le domaine
// (classement des articles, idées de repas). Fonctions pures.

// Met en minuscules, remplace « œ » par « oe » et retire les accents :
// « Pâtes » -> « pates », « Œufs » -> « oeufs ».
export function normaliserTexte(texte) {
  return texte
    .toLowerCase()
    .replaceAll('œ', 'oe')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

// Indique si un des mots du texte commence par « mot ».
// Ex. : contientMot('pommes gala', 'pomme') -> true (le pluriel est accepté).
export function contientMot(texte, mot) {
  const mots = normaliserTexte(texte).split(/[^a-z0-9]+/);
  return mots.some((motDuTexte) => motDuTexte.startsWith(mot));
}
