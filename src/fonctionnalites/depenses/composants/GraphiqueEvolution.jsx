// GraphiqueEvolution.jsx - graphique d'évolution des dépenses dans
// le temps.
import { Bar } from 'react-chartjs-2';

import { formaterJourCourt } from '../../../utilitaires/format-date.js';
import '../configuration-graphiques.js';

function GraphiqueEvolution({ parJour }) {
  const donnees = {
    labels: parJour.map((ligne) => formaterJourCourt(ligne.jour)),
    datasets: [
      {
        label: 'Dépenses ($)',
        data: parJour.map((ligne) => ligne.totalCents / 100),
        backgroundColor: '#5c7314',
      },
    ],
  };

  const options = {
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <section className="carte">
      <h2>Dépenses par jour</h2>
      <Bar data={donnees} options={options} />
    </section>
  );
}

export default GraphiqueEvolution;
