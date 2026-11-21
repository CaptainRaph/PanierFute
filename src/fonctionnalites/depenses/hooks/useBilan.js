// useBilan.js - charge les tickets de la période choisie (semaine ou mois)
// et calcule les totaux.
import { useEffect, useState } from 'react';

import {
  bornesPeriode,
  totauxParCategorie,
  totauxParJour,
  totalDesTickets,
} from '../../../domaine/calcul-bilans.js';
import { dateDuJour } from '../../../utilitaires/format-date.js';
import { listerTicketsPeriode } from '../depenses.requetes.js';

export function useBilan(periode) {
  const [tickets, setTickets] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');

  const { debut, fin } = bornesPeriode(periode, dateDuJour());

  useEffect(() => {
    let actif = true;

    async function charger() {
      try {
        const donnees = await listerTicketsPeriode(debut, fin);
        if (actif) {
          setTickets(donnees);
          setErreur('');
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
  }, [debut, fin]);

  return {
    debut,
    fin,
    totalCents: totalDesTickets(tickets),
    parCategorie: totauxParCategorie(tickets),
    parJour: totauxParJour(tickets, debut, fin),
    nombreTickets: tickets.length,
    chargement,
    erreur,
  };
}
