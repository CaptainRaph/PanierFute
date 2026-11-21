// PageRepas.jsx - page des idées de repas suggérées à partir de
// l'inventaire.
import Chargement from '../composants/Chargement.jsx';
import MessageErreur from '../composants/MessageErreur.jsx';
import ListeSuggestions from '../fonctionnalites/repas/composants/ListeSuggestions.jsx';
import { useSuggestionsRepas } from '../fonctionnalites/repas/hooks/useSuggestionsRepas.js';

function PageRepas() {
  const { suggestions, chargement, erreur } = useSuggestionsRepas();

  return (
    <div className="page">
      <h1>Idées de repas</h1>
      <p className="texte-discret">
        Recettes classées selon ce que tu as déjà dans ton inventaire.
      </p>

      {chargement && <Chargement />}
      <MessageErreur message={erreur} />
      {!chargement && !erreur && <ListeSuggestions suggestions={suggestions} />}
    </div>
  );
}

export default PageRepas;
