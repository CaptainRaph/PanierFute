// useProfil.js - charge le profil de l'utilisateur connecté et permet
// de le mettre à jour.
import { useEffect, useState } from 'react';

import { useSession } from '../../authentification/hooks/useSession.js';
import { lireProfil, modifierProfil } from '../profil.requetes.js';

export function useProfil() {
  const { utilisateur } = useSession();
  const [profil, setProfil] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    if (!utilisateur) {
      return;
    }
    let actif = true;

    async function charger() {
      try {
        const donnees = await lireProfil(utilisateur.id);
        if (actif) {
          setProfil(donnees);
        }
      } catch (err) {
        if (actif) {
          setErreur(err.message);
        }
      } finally {
        if (actif) {
          setChargement(false);
        }
      }
    }

    charger();
    return () => {
      actif = false;
    };
  }, [utilisateur]);

  async function enregistrer(modifications) {
    const misAJour = await modifierProfil(utilisateur.id, modifications);
    setProfil(misAJour);
  }

  return { profil, chargement, erreur, enregistrer };
}
