// PageTableauDeBord.jsx - page d'accueil connectée : bilans et
// graphiques des dépenses.
import { useState } from 'react';
import { Link } from 'react-router';

import Chargement from '../composants/Chargement.jsx';
import MessageErreur from '../composants/MessageErreur.jsx';
import { CHEMINS } from '../constantes/chemins.js';
import GraphiqueCategories from '../fonctionnalites/depenses/composants/GraphiqueCategories.jsx';
import GraphiqueEvolution from '../fonctionnalites/depenses/composants/GraphiqueEvolution.jsx';
import ResumePeriode from '../fonctionnalites/depenses/composants/ResumePeriode.jsx';
import SelecteurPeriode from '../fonctionnalites/depenses/composants/SelecteurPeriode.jsx';
import TableauBilan from '../fonctionnalites/depenses/composants/TableauBilan.jsx';
import { useBilan } from '../fonctionnalites/depenses/hooks/useBilan.js';
import { useProfil } from '../fonctionnalites/profil/hooks/useProfil.js';
import './PageTableauDeBord.css';

function PageTableauDeBord() {
  const [periode, setPeriode] = useState('mois');
  const { profil } = useProfil();
  const bilan = useBilan(periode);

  return (
    <div className="page">
      <div className="entete-page">
        <h1>{profil ? `Bonjour ${profil.prenom}` : 'Tableau de bord'}</h1>
        <Link to={CHEMINS.NOUVEAU_TICKET} className="bouton bouton--principal">
          + Nouveau ticket
        </Link>
      </div>

      <SelecteurPeriode periode={periode} onChanger={setPeriode} />

      {bilan.chargement && <Chargement />}
      <MessageErreur message={bilan.erreur} />

      {!bilan.chargement && !bilan.erreur && (
        <>
          <ResumePeriode
            debut={bilan.debut}
            fin={bilan.fin}
            totalCents={bilan.totalCents}
            nombreTickets={bilan.nombreTickets}
            budgetMensuelCents={profil?.budget_mensuel_cents ?? 0}
            periode={periode}
          />

          {bilan.nombreTickets === 0 ? (
            <p className="texte-discret">
              Aucune dépense sur cette période. Ajoute un premier ticket pour voir tes graphiques.
            </p>
          ) : (
            <>
              <div className="grille-graphiques">
                <GraphiqueCategories parCategorie={bilan.parCategorie} />
                <GraphiqueEvolution parJour={bilan.parJour} />
              </div>
              <TableauBilan parCategorie={bilan.parCategorie} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default PageTableauDeBord;
