// GraphiqueCategories.jsx - graphique de répartition des dépenses
// par catégorie.
import { Doughnut } from 'react-chartjs-2';

import { COULEURS_CATEGORIES } from '../configuration-graphiques.js';

function GraphiqueCategories({ parCategorie }) {
  if (parCategorie.length === 0) {
    return null;
  }

  const donnees = {
    labels: parCategorie.map((ligne) => ligne.categorie),
    datasets: [
      {
        data: parCategorie.map((ligne) => ligne.totalCents / 100),
        backgroundColor: parCategorie.map(
          (_, index) => COULEURS_CATEGORIES[index % COULEURS_CATEGORIES.length],
        ),
      },
    ],
  };

  return (
    <section className="carte">
      <h2>Par catégorie</h2>
      <Doughnut data={donnees} />
    </section>
  );
}

export default GraphiqueCategories;
