// App.jsx - composant racine : FournisseurSession (partage de la session)
// autour du routeur défini dans routes.jsx.
import { RouterProvider } from 'react-router';

import FournisseurSession from './fonctionnalites/authentification/FournisseurSession.jsx';
import { routeur } from './routes.jsx';
import { supabaseEstConfigure } from './services/supabase.js';

function App() {
  if (!supabaseEstConfigure) {
    return (
      <main className="page-accueil">
        <h1>Configuration manquante</h1>
        <p>
          Copie le fichier <code>.env.exemple</code> en <code>.env</code>, renseigne l'URL et la clé
          de ton projet Supabase, puis relance <code>npm run dev</code>.
        </p>
      </main>
    );
  }

  return (
    <FournisseurSession>
      <RouterProvider router={routeur} />
    </FournisseurSession>
  );
}

export default App;
