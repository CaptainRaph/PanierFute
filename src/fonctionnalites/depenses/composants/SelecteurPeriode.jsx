// SelecteurPeriode.jsx - choix de la période du bilan (semaine,
// mois).
import Bouton from '../../../composants/Bouton.jsx';

function SelecteurPeriode({ periode, onChanger }) {
  return (
    <div className="groupe-boutons" role="group" aria-label="Période du bilan">
      <Bouton
        variante={periode === 'semaine' ? 'principal' : 'secondaire'}
        aria-pressed={periode === 'semaine'}
        onClick={() => onChanger('semaine')}
      >
        Cette semaine
      </Bouton>
      <Bouton
        variante={periode === 'mois' ? 'principal' : 'secondaire'}
        aria-pressed={periode === 'mois'}
        onClick={() => onChanger('mois')}
      >
        Ce mois-ci
      </Bouton>
    </div>
  );
}

export default SelecteurPeriode;
