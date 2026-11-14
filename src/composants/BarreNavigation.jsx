// BarreNavigation.jsx - navigation principale entre les pages.

import { NavLink } from 'react-router';

import { CHEMINS } from '../constantes/chemins.js';
import './BarreNavigation.css';

// Entrées du menu, dans l'ordre d'affichage.
const LIENS = [
  { chemin: CHEMINS.TABLEAU_DE_BORD, libelle: 'Accueil' },
  { chemin: CHEMINS.TICKETS, libelle: 'Tickets' },
  { chemin: CHEMINS.INVENTAIRE, libelle: 'Inventaire' },
  { chemin: CHEMINS.REPAS, libelle: 'Repas' },
  { chemin: CHEMINS.PROFIL, libelle: 'Profil' },
];

// Affiche le menu principal. NavLink pose lui-même aria-current="page" sur le
// lien de la page courante : c'est cet attribut que le CSS cible pour le
// mettre en évidence.
function BarreNavigation() {
  return (
    <nav className="barre-navigation" aria-label="Navigation principale">
      <ul className="barre-navigation__liste">
        {LIENS.map((lien) => (
          <li key={lien.chemin} className="barre-navigation__element">
            <NavLink to={lien.chemin} className="barre-navigation__lien">
              {lien.libelle}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default BarreNavigation;
