// ContexteSession.jsx - fournit la session Supabase à toute l'application :
// n'importe quel composant peut savoir qui est connecté avec useSession().
import { useEffect, useState } from 'react';

import { ecouterSession } from './authentification.requetes.js';
import { ContexteSession } from './hooks/useSession.js';

function FournisseurSession({ children }) {
  const [session, setSession] = useState(null);
  // Vrai tant que Supabase n'a pas dit si quelqu'un est connecté.
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    const arreterEcoute = ecouterSession((nouvelleSession) => {
      setSession(nouvelleSession);
      setChargement(false);
    });
    return arreterEcoute;
  }, []);

  const valeur = { session, utilisateur: session?.user ?? null, chargement };

  return <ContexteSession.Provider value={valeur}>{children}</ContexteSession.Provider>;
}

export default FournisseurSession;
