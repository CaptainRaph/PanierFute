// ImportPhoto.jsx - sélection ou prise de photo du ticket.
import { useId } from 'react';

function ImportPhoto({ onFichier, disabled }) {
  const id = useId();

  function gererChoix(evenement) {
    const fichier = evenement.target.files?.[0];
    if (fichier) {
      onFichier(fichier);
      // Permet de re-sélectionner la même image si l'utilisateur réessaie.
      evenement.target.value = '';
    }
  }

  return (
    <div className="carte">
      <h2>Lire depuis une photo</h2>
      <p className="texte-discret">
        La photo est lue directement dans ton navigateur et n'est jamais envoyée sur un serveur.
      </p>
      <div className="champ">
        <label htmlFor={id} className="champ__libelle">
          Photo du ticket de caisse
        </label>
        <input id={id} type="file" accept="image/*" disabled={disabled} onChange={gererChoix} />
      </div>
    </div>
  );
}

export default ImportPhoto;
