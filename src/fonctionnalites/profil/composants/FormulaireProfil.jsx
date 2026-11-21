// FormulaireProfil.jsx - modification du prénom et du budget
// mensuel.
import { useState } from 'react';

import Bouton from '../../../composants/Bouton.jsx';
import Champ from '../../../composants/Champ.jsx';
import MessageErreur from '../../../composants/MessageErreur.jsx';
import { centsVersTexte, lirePrix } from '../../../domaine/montants.js';
import { validerProfil } from '../../../domaine/validation.js';

function FormulaireProfil({ profil, onEnregistrer }) {
  const [prenom, setPrenom] = useState(profil.prenom);
  const [budget, setBudget] = useState(centsVersTexte(profil.budget_mensuel_cents));
  const [erreurs, setErreurs] = useState([]);
  const [enregistre, setEnregistre] = useState(false);
  const [enCours, setEnCours] = useState(false);

  async function gererEnvoi(evenement) {
    evenement.preventDefault();
    setEnregistre(false);

    const listeErreurs = validerProfil({ prenom, budget });
    if (listeErreurs.length > 0) {
      setErreurs(listeErreurs);
      return;
    }

    setErreurs([]);
    setEnCours(true);
    try {
      await onEnregistrer({
        prenom: prenom.trim(),
        budgetMensuelCents: lirePrix(budget),
      });
      setEnregistre(true);
    } catch (err) {
      setErreurs([err.message]);
    } finally {
      setEnCours(false);
    }
  }

  return (
    <form className="formulaire" onSubmit={gererEnvoi}>
      <Champ
        libelle="Prénom"
        required
        maxLength={50}
        value={prenom}
        onChange={(evenement) => setPrenom(evenement.target.value)}
      />
      <Champ
        libelle="Budget mensuel ($)"
        inputMode="decimal"
        placeholder="300,00"
        value={budget}
        onChange={(evenement) => setBudget(evenement.target.value)}
      />
      <MessageErreur message={erreurs} />
      {enregistre && <p className="message-succes">Profil enregistré.</p>}
      <Bouton type="submit" disabled={enCours}>
        {enCours ? 'Enregistrement…' : 'Enregistrer'}
      </Bouton>
    </form>
  );
}

export default FormulaireProfil;
