// routes.jsx - table des routes : associe chaque URL à sa page et réserve
// les pages privées aux utilisateurs connectés (RouteProtegee).
import { createBrowserRouter } from 'react-router';

import { CHEMINS } from './constantes/chemins.js';
import PageTableauDeBord from './pages/PageTableauDeBord.jsx';
import PageConnexion from './pages/PageConnexion.jsx';
import PageInscription from './pages/PageInscription.jsx';
import PageTickets from './pages/PageTickets.jsx';
import PageNouveauTicket from './pages/PageNouveauTicket.jsx';
import PageDetailTicket from './pages/PageDetailTicket.jsx';
import PageInventaire from './pages/PageInventaire.jsx';
import PageRepas from './pages/PageRepas.jsx';
import PageProfil from './pages/PageProfil.jsx';
import PageIntrouvable from './pages/PageIntrouvable.jsx';
import MiseEnPage from './composants/MiseEnPage.jsx';

const routes = [
  { path: CHEMINS.CONNEXION, element: <PageConnexion /> },
  { path: CHEMINS.INSCRIPTION, element: <PageInscription /> },
  {
    element: <MiseEnPage />,
    children: [
      { path: CHEMINS.TABLEAU_DE_BORD, element: <PageTableauDeBord /> },
      { path: CHEMINS.TICKETS, element: <PageTickets /> },
      { path: CHEMINS.NOUVEAU_TICKET, element: <PageNouveauTicket /> },
      { path: CHEMINS.DETAIL_TICKET, element: <PageDetailTicket /> },
      { path: CHEMINS.INVENTAIRE, element: <PageInventaire /> },
      { path: CHEMINS.REPAS, element: <PageRepas /> },
      { path: CHEMINS.PROFIL, element: <PageProfil /> },
    ],
  },
  { path: '*', element: <PageIntrouvable /> },
];

export const routeur = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});
