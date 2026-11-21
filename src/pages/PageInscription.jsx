// PageInscription.jsx - page de création de compte.
import { Link, Navigate } from 'react-router';

import { CHEMINS } from '../constantes/chemins.js';
import FormulaireInscription from '../fonctionnalites/authentification/composants/FormulaireInscription.jsx';
import { useSession } from '../fonctionnalites/authentification/hooks/useSession.js';

function PageInscription() {
  const { session } = useSession();

  if (session) {
    return <Navigate to={CHEMINS.TABLEAU_DE_BORD} replace />;
  }

  return (
    <main className="page-accueil">
      <h1 className="page-accueil__titre">PanierFûté</h1>
      <section className="carte">
        <h2>Créer un compte</h2>
        <FormulaireInscription />
      </section>
      <p>
        Déjà un compte ? <Link to={CHEMINS.CONNEXION}>Se connecter</Link>
      </p>
    </main>
  );
}

export default PageInscription;
