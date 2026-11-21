// FormulaireInscription.jsx - formulaire de création de compte.
import { useState } from 'react';
import { useNavigate } from 'react-router';

import Bouton from '../../../composants/Bouton.jsx';
import Champ from '../../../composants/Champ.jsx';
import MessageErreur from '../../../composants/MessageErreur.jsx';
import { CHEMINS } from '../../../constantes/chemins.js';
import { inscrire } from '../authentification.requetes.js';

// Longueur minimale imposée par défaut par Supabase.
const LONGUEUR_MIN_MOT_DE_PASSE = 6;

function FormulaireInscription() {
  const naviguer = useNavigate();
  const [prenom, setPrenom] = useState('');
  const [courriel, setCourriel] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const [message, setMessage] = useState('');
  const [enCours, setEnCours] = useState(false);

  async function gererEnvoi(evenement) {
    evenement.preventDefault();
    setErreur('');
    if (motDePasse.length < LONGUEUR_MIN_MOT_DE_PASSE) {
      setErreur(`Le mot de passe doit contenir au moins ${LONGUEUR_MIN_MOT_DE_PASSE} caractères.`);
      return;
    }

    setEnCours(true);
    try {
      const resultat = await inscrire(prenom.trim(), courriel, motDePasse);
      // Si la confirmation par courriel est activée dans Supabase, aucune
      // session n'est ouverte tant que le lien reçu n'a pas été cliqué.
      if (resultat.session) {
        naviguer(CHEMINS.TABLEAU_DE_BORD);
      } else {
        setMessage('Compte créé ! Clique sur le lien reçu par courriel, puis connecte-toi.');
        setEnCours(false);
      }
    } catch (erreurInscription) {
      setErreur(erreurInscription.message);
      setEnCours(false);
    }
  }

  if (message) {
    return <p className="message-succes">{message}</p>;
  }

  return (
    <form className="formulaire" onSubmit={gererEnvoi}>
      <Champ
        libelle="Prénom"
        autoComplete="given-name"
        required
        maxLength={50}
        value={prenom}
        onChange={(evenement) => setPrenom(evenement.target.value)}
      />
      <Champ
        libelle="Courriel"
        type="email"
        autoComplete="email"
        required
        value={courriel}
        onChange={(evenement) => setCourriel(evenement.target.value)}
      />
      <Champ
        libelle={`Mot de passe (${LONGUEUR_MIN_MOT_DE_PASSE} caractères minimum)`}
        type="password"
        autoComplete="new-password"
        required
        value={motDePasse}
        onChange={(evenement) => setMotDePasse(evenement.target.value)}
      />
      <MessageErreur message={erreur} />
      <Bouton type="submit" disabled={enCours}>
        {enCours ? 'Création…' : 'Créer mon compte'}
      </Bouton>
    </form>
  );
}

export default FormulaireInscription;
