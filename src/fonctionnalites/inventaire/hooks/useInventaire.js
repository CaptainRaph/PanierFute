// useInventaire.js - charge les aliments de la cuisine et fournit les
// actions d'ajout, de modification et de suppression.
import { useEffect, useState } from 'react';

import {
  ajouterAliment,
  listerInventaire,
  modifierQuantiteAliment,
  supprimerAliment,
} from '../inventaire.requetes.js';

export function useInventaire() {
  const [aliments, setAliments] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    let actif = true;

    async function charger() {
      try {
        const donnees = await listerInventaire();
        if (actif) {
          setAliments(donnees);
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

  async function ajouter(nouvelAliment) {
    const cree = await ajouterAliment(nouvelAliment);
    setAliments((liste) => [...liste, cree].sort((a, b) => a.nom.localeCompare(b.nom, 'fr')));
  }

  async function modifierQuantite(idAliment, quantite) {
    const misAJour = await modifierQuantiteAliment(idAliment, quantite);
    setAliments((liste) => liste.map((aliment) => (aliment.id === idAliment ? misAJour : aliment)));
  }

  async function supprimer(idAliment) {
    await supprimerAliment(idAliment);
    setAliments((liste) => liste.filter((aliment) => aliment.id !== idAliment));
  }

  return { aliments, chargement, erreur, ajouter, modifierQuantite, supprimer };
}
