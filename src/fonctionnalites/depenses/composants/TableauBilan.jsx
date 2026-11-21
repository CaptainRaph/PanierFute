// TableauBilan.jsx - tableau des mêmes données que les graphiques
// (alternative accessible).
import { formaterMontant } from '../../../utilitaires/format-montant.js';

function TableauBilan({ parCategorie }) {
  if (parCategorie.length === 0) {
    return null;
  }

  return (
    <section className="carte">
      <h2>Détail par catégorie</h2>
      <table className="tableau">
        <thead>
          <tr>
            <th>Catégorie</th>
            <th className="nombre">Total</th>
          </tr>
        </thead>
        <tbody>
          {parCategorie.map((ligne) => (
            <tr key={ligne.categorie}>
              <td>{ligne.categorie}</td>
              <td className="nombre">{formaterMontant(ligne.totalCents)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default TableauBilan;
