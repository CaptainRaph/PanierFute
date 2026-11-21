// ListeInventaire.jsx - liste des aliments en stock.
import LigneAliment from './LigneAliment.jsx';

function ListeInventaire({ aliments, onModifierQuantite, onSupprimer }) {
  if (aliments.length === 0) {
    return (
      <p className="texte-discret">
        Ton inventaire est vide. Enregistre un ticket ou ajoute un aliment ci-dessus.
      </p>
    );
  }

  return (
    <ul className="liste-simple">
      {aliments.map((aliment) => (
        <li key={aliment.id}>
          <LigneAliment
            aliment={aliment}
            onModifierQuantite={onModifierQuantite}
            onSupprimer={onSupprimer}
          />
        </li>
      ))}
    </ul>
  );
}

export default ListeInventaire;
