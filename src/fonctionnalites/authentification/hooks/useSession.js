// useSession.js - hook d'accès à la session courante (utilisateur connecté
// ou non), fournie par FournisseurSession.
import { createContext, useContext } from 'react';

// Valeur partagée : { session, utilisateur, chargement }.
export const ContexteSession = createContext(null);

export function useSession() {
  const contexte = useContext(ContexteSession);
  // Sans fournisseur au-dessus, useContext renverrait null et l'erreur
  // apparaîtrait plus loin, sans dire pourquoi : on la signale ici.
  if (contexte === null) {
    throw new Error('useSession doit être appelé dans un composant entouré de FournisseurSession.');
  }
  return contexte;
}
