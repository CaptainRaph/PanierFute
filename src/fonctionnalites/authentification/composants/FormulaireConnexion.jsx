// FormulaireConnexion.jsx - formulaire de connexion (courriel et
// mot de passe).
import { useState } from 'react';
import { useNavigate } from 'react-router';

import Bouton from '../../../composants/Bouton.jsx';
import Champ from '../../../composants/Champ.jsx';
import MessageErreur from '../../../composants/MessageErreur.jsx';
import { CHEMINS } from '../../../constantes/chemins.js';
import { connecter } from '../authentification.requetes.js';

function FormulaireConnexion() {
  const naviguer = useNavigate();
  const [courriel, setCourriel] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const [enCours, setEnCours] = useState(false);

  async function gererEnvoi(evenement) {
    evenement.preventDefault();
    setErreur('');
    setEnCours(true);
    try {
      await connecter(courriel, motDePasse);
      naviguer(CHEMINS.TABLEAU_DE_BORD);
    } catch (erreurConnexion) {
      setErreur(erreurConnexion.message);
      setEnCours(false);
    }
  }

  return (
    <form className="formulaire" onSubmit={gererEnvoi}>
      <Champ
        libelle="Courriel"
        type="email"
        autoComplete="email"
        required
        value={courriel}
        onChange={(evenement) => setCourriel(evenement.target.value)}
      />
      <Champ
        libelle="Mot de passe"
        type="password"
        autoComplete="current-password"
        required
        value={motDePasse}
        onChange={(evenement) => setMotDePasse(evenement.target.value)}
      />
      <MessageErreur message={erreur} />
      <Bouton type="submit" disabled={enCours}>
        {enCours ? 'Connexion…' : 'Se connecter'}
      </Bouton>
    </form>
  );
}

export default FormulaireConnexion;
