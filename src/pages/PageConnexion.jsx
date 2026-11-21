// PageConnexion.jsx - page de connexion.
import { Link, Navigate } from 'react-router';

import { CHEMINS } from '../constantes/chemins.js';
import FormulaireConnexion from '../fonctionnalites/authentification/composants/FormulaireConnexion.jsx';
import { useSession } from '../fonctionnalites/authentification/hooks/useSession.js';

function PageConnexion() {
  const { session } = useSession();

  // Déjà connecté : inutile de rester sur cette page.
  if (session) {
    return <Navigate to={CHEMINS.TABLEAU_DE_BORD} replace />;
  }

  return (
    <main className="page-accueil">
      <h1 className="page-accueil__titre">PanierFûté</h1>
      <section className="carte">
        <h2>Connexion</h2>
        <FormulaireConnexion />
      </section>
      <p>
        Pas encore de compte ? <Link to={CHEMINS.INSCRIPTION}>Créer un compte</Link>
      </p>
    </main>
  );
}

export default PageConnexion;
