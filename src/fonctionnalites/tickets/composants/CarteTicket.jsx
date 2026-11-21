// CarteTicket.jsx - résumé d'un ticket dans la liste.
import { Link } from 'react-router';

import { construireCheminDetailTicket } from '../../../constantes/chemins.js';
import { formaterDate } from '../../../utilitaires/format-date.js';
import { formaterMontant } from '../../../utilitaires/format-montant.js';
import './CarteTicket.css';

function CarteTicket({ ticket }) {
  return (
    <Link to={construireCheminDetailTicket(ticket.id)} className="carte carte-ticket">
      <div>
        <strong className="carte-ticket__enseigne">{ticket.enseigne}</strong>
        <p className="texte-discret">{formaterDate(ticket.date_achat)}</p>
      </div>
      <strong className="carte-ticket__total">{formaterMontant(ticket.total_cents)}</strong>
    </Link>
  );
}

export default CarteTicket;
