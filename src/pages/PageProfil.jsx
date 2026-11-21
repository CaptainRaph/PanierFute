// PageProfil.jsx - page du profil et des réglages de l'utilisateur.
import { useState } from 'react';
import { useNavigate } from 'react-router';

import Bouton from '../composants/Bouton.jsx';
import Chargement from '../composants/Chargement.jsx';
import MessageErreur from '../composants/MessageErreur.jsx';
import { CHEMINS } from '../constantes/chemins.js';
import { deconnecter } from '../fonctionnalites/authentification/authentification.requetes.js';
import { useSession } from '../fonctionnalites/authentification/hooks/useSession.js';
import FormulaireProfil from '../fonctionnalites/profil/composants/FormulaireProfil.jsx';
import { useProfil } from '../fonctionnalites/profil/hooks/useProfil.js';

function PageProfil() {
  const naviguer = useNavigate();
  const { utilisateur } = useSession();
  const { profil, chargement, erreur, enregistrer } = useProfil();
  const [erreurDeconnexion, setErreurDeconnexion] = useState('');

  async function gererDeconnexion() {
    try {
      await deconnecter();
      naviguer(CHEMINS.CONNEXION);
    } catch (err) {
      setErreurDeconnexion(err.message);
    }
  }

  return (
    <div className="page">
      <h1>Mon profil</h1>

      {chargement && <Chargement />}
      <MessageErreur message={erreur} />

      {profil && (
        <section className="carte">
          <p className="texte-discret">Connecté en tant que {utilisateur?.email}</p>
          <FormulaireProfil profil={profil} onEnregistrer={enregistrer} />
        </section>
      )}

      <section className="carte">
        <h2>Session</h2>
        <MessageErreur message={erreurDeconnexion} />
        <div>
          <Bouton variante="danger" onClick={gererDeconnexion}>
            Se déconnecter
          </Bouton>
        </div>
      </section>
    </div>
  );
}

export default PageProfil;
