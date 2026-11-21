// useCategories.js - charge la liste des catégories depuis Supabase.
import { useEffect, useState } from 'react';

import { listerCategories } from '../categories.requetes.js';

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    let actif = true;

    async function charger() {
      try {
        const donnees = await listerCategories();
        if (actif) {
          setCategories(donnees);
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
  }, []);

  return { categories, chargement, erreur };
}
