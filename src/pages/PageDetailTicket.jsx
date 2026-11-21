// PageDetailTicket.jsx - page de consultation et de suppression d'un
// ticket enregistré.
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';

import Bouton from '../composants/Bouton.jsx';
import Chargement from '../composants/Chargement.jsx';
import MessageErreur from '../composants/MessageErreur.jsx';
import { CHEMINS } from '../constantes/chemins.js';
import { lireTicket, supprimerTicket } from '../fonctionnalites/tickets/tickets.requetes.js';
import { formaterDate } from '../utilitaires/format-date.js';
import { formaterMontant } from '../utilitaires/format-montant.js';

function PageDetailTicket() {
  const { id } = useParams();
  const naviguer = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');
  const [confirmation, setConfirmation] = useState(false);

  useEffect(() => {
    let actif = true;

    async function charger() {
      try {
        const donnees = await lireTicket(id);
        if (actif) {
          setTicket(donnees);
        }
      } catch (err) {
        if (actif) {
          setErreur(err.message);
        }
      } finally {
        if (actif) {
          setChargement(false);
        }
      }
    }

    charger();
    return () => {
      actif = false;
    };
  }, [id]);

  async function gererSuppression() {
    try {
      await supprimerTicket(ticket.id);
      naviguer(CHEMINS.TICKETS);
    } catch (err) {
      setErreur(err.message);
    }
  }

  return (
    <div className="page">
      <div className="entete-page">
        <h1>{ticket ? ticket.enseigne : 'Détail du ticket'}</h1>
        <Link to={CHEMINS.TICKETS} className="bouton bouton--secondaire">
          Retour aux tickets
        </Link>
      </div>

      {chargement && <Chargement />}
      <MessageErreur message={erreur} />

      {ticket && (
        <section className="carte">
          <p className="texte-discret">Acheté le {formaterDate(ticket.date_achat)}</p>

          <table className="tableau">
            <thead>
              <tr>
                <th>Article</th>
                <th>Catégorie</th>
                <th className="nombre">Qté</th>
                <th className="nombre">Prix</th>
              </tr>
            </thead>
            <tbody>
              {ticket.articles.map((article) => (
                <tr key={article.id}>
                  <td>{article.nom}</td>
                  <td>{article.categories.nom}</td>
                  <td className="nombre">{article.quantite}</td>
                  <td className="nombre">{formaterMontant(article.prix_cents)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="texte-discret">Taxes : {formaterMontant(ticket.taxes_cents)}</p>
          <p>
            <strong>Total : {formaterMontant(ticket.total_cents)}</strong>
          </p>

          <div className="groupe-boutons">
            {!confirmation ? (
              <Bouton variante="danger" onClick={() => setConfirmation(true)}>
                Supprimer ce ticket
              </Bouton>
            ) : (
              <>
                <Bouton variante="danger" onClick={gererSuppression}>
                  Confirmer la suppression
                </Bouton>
                <Bouton variante="secondaire" onClick={() => setConfirmation(false)}>
                  Annuler
                </Bouton>
              </>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default PageDetailTicket;
