// PageIntrouvable.jsx - page affichée pour une URL inconnue (404).
import { Link } from 'react-router';

import { CHEMINS } from '../constantes/chemins.js';

function PageIntrouvable() {
  return (
    <main className="page-accueil">
      <h1>Page introuvable</h1>
      <p>Cette adresse ne correspond à aucune page de PanierFûté.</p>
      <Link to={CHEMINS.TABLEAU_DE_BORD} className="bouton bouton--principal">
        Retour à l'accueil
      </Link>
    </main>
  );
}

export default PageIntrouvable;
