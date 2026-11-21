// LigneArticle.jsx - ligne modifiable d'un article (libellé,
// quantité, prix, catégorie).
import Bouton from '../../../composants/Bouton.jsx';
import Champ from '../../../composants/Champ.jsx';
import './LigneArticle.css';

function LigneArticle({ article, categories, onModifier, onSupprimer }) {
  return (
    <div className="ligne-article">
      <Champ
        libelle="Article"
        placeholder="Ex. : Lait 2%"
        value={article.nom}
        onChange={(evenement) => onModifier('nom', evenement.target.value)}
      />
      <Champ
        libelle="Quantité"
        inputMode="decimal"
        value={article.quantite}
        onChange={(evenement) => onModifier('quantite', evenement.target.value)}
      />
      <Champ
        libelle="Prix ($)"
        inputMode="decimal"
        placeholder="0,00"
        value={article.prix}
        onChange={(evenement) => onModifier('prix', evenement.target.value)}
      />
      <div className="champ">
        <label className="champ__libelle">
          Catégorie
          <select
            className="champ__saisie"
            value={article.categorieId}
            onChange={(evenement) => onModifier('categorieId', Number(evenement.target.value))}
          >
            {categories.map((categorie) => (
              <option key={categorie.id} value={categorie.id}>
                {categorie.nom}
              </option>
            ))}
          </select>
        </label>
      </div>
      <Bouton variante="danger" onClick={onSupprimer}>
        Retirer
      </Bouton>
    </div>
  );
}

export default LigneArticle;
