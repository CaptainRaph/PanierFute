// ListeTickets.jsx - liste des tickets enregistrés.
import CarteTicket from './CarteTicket.jsx';

function ListeTickets({ tickets }) {
  if (tickets.length === 0) {
    return <p className="texte-discret">Aucun ticket enregistré pour le moment.</p>;
  }

  return (
    <ul className="liste-simple">
      {tickets.map((ticket) => (
        <li key={ticket.id}>
          <CarteTicket ticket={ticket} />
        </li>
      ))}
    </ul>
  );
}

export default ListeTickets;
