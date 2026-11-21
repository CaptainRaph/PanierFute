// useSession.js - hook d'accès à la session courante (utilisateur connecté
// ou non), fournie par ContexteSession.
import { createContext, useContext } from 'react';

// Valeur partagée : { session, utilisateur, chargement }.
export const ContexteSession = createContext(null);

export function useSession() {
  return useContext(ContexteSession);
}
