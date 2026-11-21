// ResumePeriode.jsx - chiffres clés de la période : total dépensé
// et budget restant.
import { formaterDate } from '../../../utilitaires/format-date.js';
import { formaterMontant } from '../../../utilitaires/format-montant.js';
import './ResumePeriode.css';

function ResumePeriode({ debut, fin, totalCents, nombreTickets, budgetMensuelCents, periode }) {
  // Le budget est défini par mois : on l'affiche sur la vue mensuelle.
  const afficherBudget = periode === 'mois' && budgetMensuelCents > 0;
  const restantCents = budgetMensuelCents - totalCents;
  const pourcentage = afficherBudget
    ? Math.min(100, Math.round((totalCents / budgetMensuelCents) * 100))
    : 0;

  return (
    <section className="carte">
      <p className="texte-discret">
        Du {formaterDate(debut)} au {formaterDate(fin)} ({nombreTickets}{' '}
        {nombreTickets > 1 ? 'tickets' : 'ticket'})
      </p>
      <p className="resume-periode__total">{formaterMontant(totalCents)}</p>

      {afficherBudget && (
        <div className="resume-periode__budget">
          <div className="resume-periode__barre" aria-hidden="true">
            <div
              className={
                restantCents < 0
                  ? 'resume-periode__progression resume-periode__progression--depasse'
                  : 'resume-periode__progression'
              }
              style={{ width: `${pourcentage}%` }}
            />
          </div>
          <p className="texte-discret">
            Budget mensuel : {formaterMontant(budgetMensuelCents)} —{' '}
            {restantCents >= 0
              ? `il reste ${formaterMontant(restantCents)}`
              : `dépassé de ${formaterMontant(-restantCents)}`}
          </p>
        </div>
      )}
    </section>
  );
}

export default ResumePeriode;
