// MiseEnPage.jsx - gabarit commun des pages connectées : en-tête,
// navigation et zone de contenu.
import { Outlet } from 'react-router';

import BarreNavigation from './BarreNavigation.jsx';
import './MiseEnPage.css';

// La barre de navigation est un enfant direct de .mise-en-page (et pas de
// l'en-tête) : c'est nécessaire pour que son « order » et son « sticky »
// la placent en bas de l'écran sur téléphone (voir BarreNavigation.css).
function MiseEnPage() {
  return (
    <div className="mise-en-page">
      <header className="mise-en-page__entete">PanierFûté</header>
      <BarreNavigation />
      <main className="mise-en-page__contenu">
        <Outlet />
      </main>
    </div>
  );
}

export default MiseEnPage;
