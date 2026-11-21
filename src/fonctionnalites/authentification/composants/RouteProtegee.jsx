// RouteProtegee.jsx - garde de route : redirige vers la connexion
// si aucun utilisateur n'est connecté.
import { Navigate } from 'react-router';

import Chargement from '../../../composants/Chargement.jsx';
import { CHEMINS } from '../../../constantes/chemins.js';
import { useSession } from '../hooks/useSession.js';

function RouteProtegee({ children }) {
  const { session, chargement } = useSession();

  if (chargement) {
    return <Chargement />;
  }
  if (!session) {
    return <Navigate to={CHEMINS.CONNEXION} replace />;
  }
  return children;
}

export default RouteProtegee;
