// useSuggestionsRepas.js - associe les recettes de référence à l'inventaire
// de l'utilisateur.
import { suggererRepas } from '../../../domaine/suggestions-repas.js';
import { RECETTES } from '../../../donnees/recettes.js';
import { useInventaire } from '../../inventaire/hooks/useInventaire.js';

export function useSuggestionsRepas() {
  const { aliments, chargement, erreur } = useInventaire();
  const suggestions = suggererRepas(RECETTES, aliments);

  return { suggestions, chargement, erreur };
}
