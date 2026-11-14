// App.jsx - composant racine. À terme : fournisseur de session
// (ContexteSession) autour du routeur défini dans routes.jsx.
import { RouterProvider } from 'react-router';

import { routeur } from './routes.jsx';

function App() {
  return <RouterProvider router={routeur} />;
}

export default App;
