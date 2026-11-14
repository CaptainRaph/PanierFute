// MiseEnPage.jsx - gabarit commun des pages connectées : en-tête,
// navigation et zone de contenu.
import { Outlet } from 'react-router';

import BarreNavigation from './BarreNavigation.jsx';
import './MiseEnPage.css';

function MiseEnPage() {
  return (
    <div className="mise-en-page">
      <header>
        <BarreNavigation />
      </header>
      <main className="mise-en-page__contenu">
        <Outlet />
      </main>
    </div>
  );
}

export default MiseEnPage;
