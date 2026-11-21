// LigneAliment.jsx - ligne d'un aliment (quantité modifiable,
// suppression).
import Bouton from '../../../composants/Bouton.jsx';
import './LigneAliment.css';

function LigneAliment({ aliment, onModifierQuantite, onSupprimer }) {
  function diminuer() {
    const nouvelleQuantite = aliment.quantite - 1;
    if (nouvelleQuantite <= 0) {
      onSupprimer(aliment.id);
    } else {
      onModifierQuantite(aliment.id, nouvelleQuantite);
    }
  }

  return (
    <div className="carte ligne-aliment">
      <div>
        <strong>{aliment.nom}</strong>
        <p className="texte-discret">Quantité : {aliment.quantite}</p>
      </div>
      <div className="groupe-boutons">
        <Bouton variante="secondaire" aria-label={`Retirer 1 ${aliment.nom}`} onClick={diminuer}>
          -
        </Bouton>
        <Bouton
          variante="secondaire"
          aria-label={`Ajouter 1 ${aliment.nom}`}
          onClick={() => onModifierQuantite(aliment.id, aliment.quantite + 1)}
        >
          +
        </Bouton>
        <Bouton variante="danger" onClick={() => onSupprimer(aliment.id)}>
          Retirer
        </Bouton>
      </div>
    </div>
  );
}

export default LigneAliment;
