// classification.js - associe un libellé d'article à une catégorie et à un
// nom lisible, à l'aide du dictionnaire des enseignes. Fonctions pures.

import { MOTS_CLES } from '../donnees/dictionnaire-enseignes.js';
import { contientMot } from './texte.js';

// Catégorie d'un article qu'aucun mot-clé ne reconnaît.
export const CATEGORIE_PAR_DEFAUT = 'autre';

// Renvoie la clé de la catégorie d'un article (« fruits-legumes »...).
// Ex. : trouverCategorie('POMMES GALA') -> 'fruits-legumes'.
export function trouverCategorie(libelle) {
  for (const [cle, mots] of Object.entries(MOTS_CLES)) {
    if (mots.some((mot) => contientMot(libelle, mot))) {
      return cle;
    }
  }
  return CATEGORIE_PAR_DEFAUT;
}

// Rend lisible un libellé de ticket, souvent écrit en majuscules :
// « LAIT 2%  4L » -> « Lait 2% 4l ».
export function nettoyerLibelle(libelle) {
  const texte = libelle.replace(/\s+/g, ' ').trim().toLowerCase();
  return texte.charAt(0).toUpperCase() + texte.slice(1);
}
