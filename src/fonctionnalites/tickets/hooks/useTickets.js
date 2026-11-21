// useTickets.js - charge l'historique des tickets et permet d'en supprimer.
import { useEffect, useState } from 'react';

import { listerTickets, supprimerTicket } from '../tickets.requetes.js';

export function useTickets() {
  const [tickets, setTickets] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    let actif = true;

    async function charger() {
      try {
        const donnees = await listerTickets();
        if (actif) {
          setTickets(donnees);
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

  async function supprimer(idTicket) {
    await supprimerTicket(idTicket);
    setTickets((liste) => liste.filter((ticket) => ticket.id !== idTicket));
  }

  return { tickets, chargement, erreur, supprimer };
}
