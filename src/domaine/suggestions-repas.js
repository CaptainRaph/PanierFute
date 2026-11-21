// suggestions-repas.js - classe les recettes selon les ingrédients présents
// dans l'inventaire. Fonctions pures.

import { contientMot } from './texte.js';

// Un ingrédient est disponible si un aliment de l'inventaire contient un de
// ses mots-clés. Ex. : l'ingrédient « Pâtes » (mots : pate, spaghetti...) est
// trouvé grâce à l'aliment « Spaghetti n°5 ».
function estDisponible(ingredient, inventaire) {
  return ingredient.mots.some((mot) => inventaire.some((aliment) => contientMot(aliment.nom, mot)));
}

// Pour chaque recette, sépare les ingrédients disponibles et manquants. Les
// recettes sans aucun ingrédient disponible sont écartées ; les autres sont
// triées : d'abord celles auxquelles il manque le moins d'ingrédients.
export function suggererRepas(recettes, inventaire) {
  return recettes
    .map((recette) => {
      const disponibles = [];
      const manquants = [];
      for (const ingredient of recette.ingredients) {
        if (estDisponible(ingredient, inventaire)) {
          disponibles.push(ingredient.nom);
        } else {
          manquants.push(ingredient.nom);
        }
      }
      return { ...recette, disponibles, manquants };
    })
    .filter((recette) => recette.disponibles.length > 0)
    .sort((a, b) => a.manquants.length - b.manquants.length);
}
