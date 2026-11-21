// Champ.jsx - champ de formulaire avec son libellé. Les autres propriétés
// (type, value, onChange, required...) sont passées telles quelles à l'input.
import { useId } from 'react';

import './Champ.css';

function Champ({ libelle, ...proprietes }) {
  // useId fournit un identifiant unique pour relier le libellé au champ.
  const id = useId();
  return (
    <div className="champ">
      <label htmlFor={id} className="champ__libelle">
        {libelle}
      </label>
      <input id={id} className="champ__saisie" {...proprietes} />
    </div>
  );
}

export default Champ;
