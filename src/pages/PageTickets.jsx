// PageTickets.jsx - page de l'historique des tickets.
import { Link } from 'react-router';

import Chargement from '../composants/Chargement.jsx';
import MessageErreur from '../composants/MessageErreur.jsx';
import { CHEMINS } from '../constantes/chemins.js';
import ListeTickets from '../fonctionnalites/tickets/composants/ListeTickets.jsx';
import { useTickets } from '../fonctionnalites/tickets/hooks/useTickets.js';

function PageTickets() {
  const { tickets, chargement, erreur } = useTickets();

  return (
    <div className="page">
      <div className="entete-page">
        <h1>Mes tickets</h1>
        <Link to={CHEMINS.NOUVEAU_TICKET} className="bouton bouton--principal">
          + Nouveau ticket
        </Link>
      </div>

      {chargement && <Chargement />}
      <MessageErreur message={erreur} />
      {!chargement && !erreur && <ListeTickets tickets={tickets} />}
    </div>
  );
}

export default PageTickets;
