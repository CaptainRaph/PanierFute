// FormulaireAliment.jsx - ajout manuel d'un aliment à l'inventaire.
import { useState } from 'react';

import Bouton from '../../../composants/Bouton.jsx';
import Champ from '../../../composants/Champ.jsx';
import MessageErreur from '../../../composants/MessageErreur.jsx';
import { lireQuantite, validerAliment } from '../../../domaine/validation.js';

function FormulaireAliment({ onAjouter }) {
  const [nom, setNom] = useState('');
  const [quantite, setQuantite] = useState('1');
  const [erreurs, setErreurs] = useState([]);
  const [enCours, setEnCours] = useState(false);

  async function gererEnvoi(evenement) {
    evenement.preventDefault();
    const listeErreurs = validerAliment({ nom, quantite });
    if (listeErreurs.length > 0) {
      setErreurs(listeErreurs);
      return;
    }

    setErreurs([]);
    setEnCours(true);
    try {
      await onAjouter({ nom: nom.trim(), quantite: lireQuantite(quantite) });
      setNom('');
      setQuantite('1');
    } catch (err) {
      setErreurs([err.message]);
    } finally {
      setEnCours(false);
    }
  }

  return (
    <form className="carte formulaire" onSubmit={gererEnvoi}>
      <h2>Ajouter un aliment</h2>
      <Champ
        libelle="Nom"
        placeholder="Ex. : Œufs, Lait, Pâtes"
        maxLength={100}
        value={nom}
        onChange={(evenement) => setNom(evenement.target.value)}
      />
      <Champ
        libelle="Quantité"
        inputMode="decimal"
        value={quantite}
        onChange={(evenement) => setQuantite(evenement.target.value)}
      />
      <MessageErreur message={erreurs} />
      <div>
        <Bouton type="submit" disabled={enCours}>
          {enCours ? 'Ajout…' : 'Ajouter'}
        </Bouton>
      </div>
    </form>
  );
}

export default FormulaireAliment;
