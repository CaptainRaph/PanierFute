// ListeSuggestions.jsx - liste des recettes suggérées.
import { Link } from 'react-router';

import { CHEMINS } from '../../../constantes/chemins.js';
import CarteRecette from './CarteRecette.jsx';

function ListeSuggestions({ suggestions }) {
  if (suggestions.length === 0) {
    return (
      <p className="texte-discret">
        Aucune recette ne correspond encore à ton inventaire. Ajoute des aliments dans{' '}
        <Link to={CHEMINS.INVENTAIRE}>ton inventaire</Link> ou enregistre un ticket.
      </p>
    );
  }

  return (
    <ul className="liste-simple">
      {suggestions.map((recette) => (
        <li key={recette.id}>
          <CarteRecette recette={recette} />
        </li>
      ))}
    </ul>
  );
}

export default ListeSuggestions;
