// PageNouveauTicket.jsx - page d'ajout d'un ticket : photo, lecture OCR,
// correction puis enregistrement (ou saisie manuelle).
import { useState } from 'react';
import { useNavigate } from 'react-router';

import Chargement from '../composants/Chargement.jsx';
import MessageErreur from '../composants/MessageErreur.jsx';
import { construireCheminDetailTicket } from '../constantes/chemins.js';
import ImportPhoto from '../fonctionnalites/tickets/composants/ImportPhoto.jsx';
import ProgressionLecture from '../fonctionnalites/tickets/composants/ProgressionLecture.jsx';
import RevisionTicket from '../fonctionnalites/tickets/composants/RevisionTicket.jsx';
import { useCategories } from '../fonctionnalites/tickets/hooks/useCategories.js';
import { useLectureTicket } from '../fonctionnalites/tickets/hooks/useLectureTicket.js';
import { enregistrerTicket } from '../fonctionnalites/tickets/tickets.requetes.js';

function PageNouveauTicket() {
  const naviguer = useNavigate();
  const { categories, chargement, erreur: erreurCategories } = useCategories();
  const { lirePhoto, enCours, progression, erreur: erreurOcr } = useLectureTicket();
  const [ticketLu, setTicketLu] = useState(null);
  // Incrémenté après chaque lecture OCR pour réinitialiser RevisionTicket.
  const [versionFormulaire, setVersionFormulaire] = useState(0);

  async function gererPhoto(fichier) {
    const resultat = await lirePhoto(fichier);
    if (resultat) {
      setTicketLu(resultat);
      setVersionFormulaire((version) => version + 1);
    }
  }

  async function gererEnregistrement(donnees) {
    const idTicket = await enregistrerTicket(donnees);
    naviguer(construireCheminDetailTicket(idTicket));
  }

  return (
    <div className="page">
      <h1>Nouveau ticket</h1>

      <ImportPhoto onFichier={gererPhoto} disabled={enCours} />
      {enCours && <ProgressionLecture progression={progression} />}
      <MessageErreur message={erreurOcr} />

      {chargement && <Chargement />}
      <MessageErreur message={erreurCategories} />

      {!chargement && categories.length > 0 && (
        <RevisionTicket
          key={versionFormulaire}
          ticketInitial={ticketLu}
          categories={categories}
          onEnregistrer={gererEnregistrement}
        />
      )}
    </div>
  );
}

export default PageNouveauTicket;
