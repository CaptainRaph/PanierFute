// PageInventaire.jsx - page de l'inventaire de la cuisine.
import { useState } from 'react';

import Chargement from '../composants/Chargement.jsx';
import MessageErreur from '../composants/MessageErreur.jsx';
import FormulaireAliment from '../fonctionnalites/inventaire/composants/FormulaireAliment.jsx';
import ListeInventaire from '../fonctionnalites/inventaire/composants/ListeInventaire.jsx';
import { useInventaire } from '../fonctionnalites/inventaire/hooks/useInventaire.js';

function PageInventaire() {
  const { aliments, chargement, erreur, ajouter, modifierQuantite, supprimer } = useInventaire();
  const [erreurAction, setErreurAction] = useState('');

  async function gererAction(action) {
    setErreurAction('');
    try {
      await action();
    } catch (err) {
      setErreurAction(err.message);
    }
  }

  return (
    <div className="page">
      <h1>Mon inventaire</h1>

      <FormulaireAliment onAjouter={ajouter} />

      {chargement && <Chargement />}
      <MessageErreur message={erreur || erreurAction} />

      {!chargement && !erreur && (
        <ListeInventaire
          aliments={aliments}
          onModifierQuantite={(id, quantite) => gererAction(() => modifierQuantite(id, quantite))}
          onSupprimer={(id) => gererAction(() => supprimer(id))}
        />
      )}
    </div>
  );
}

export default PageInventaire;
