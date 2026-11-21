// RevisionTicket.jsx - formulaire de vérification du ticket lu :
// enseigne, date, articles et total corrigibles avant l'enregistrement. Sert
// aussi à la saisie manuelle.
import { useState } from 'react';

import Bouton from '../../../composants/Bouton.jsx';
import Champ from '../../../composants/Champ.jsx';
import MessageErreur from '../../../composants/MessageErreur.jsx';
import { CATEGORIE_PAR_DEFAUT, trouverCategorie } from '../../../domaine/classification.js';
import { additionner, centsVersTexte, lirePrix } from '../../../domaine/montants.js';
import { lireQuantite, validerTicket } from '../../../domaine/validation.js';
import { dateDuJour } from '../../../utilitaires/format-date.js';
import { formaterMontant } from '../../../utilitaires/format-montant.js';
import LigneArticle from './LigneArticle.jsx';

function trouverIdCategorie(categories, cle) {
  const trouvee = categories.find((categorie) => categorie.cle === cle);
  return trouvee ? trouvee.id : (categories[0]?.id ?? 1);
}

function creerArticleVide(idCategorieDefaut) {
  return {
    cleLocale: crypto.randomUUID(),
    libelleBrut: null,
    nom: '',
    quantite: '1',
    prix: '',
    categorieId: idCategorieDefaut,
    categorieChoisie: false,
  };
}

function preparerArticlesInitiaux(ticketInitial, categories, idCategorieDefaut) {
  if (!ticketInitial || ticketInitial.articles.length === 0) {
    return [creerArticleVide(idCategorieDefaut)];
  }
  return ticketInitial.articles.map((article) => ({
    cleLocale: crypto.randomUUID(),
    libelleBrut: article.libelleBrut ?? null,
    nom: article.nom,
    quantite: '1',
    prix: centsVersTexte(article.prixCents),
    categorieId: trouverIdCategorie(categories, trouverCategorie(article.nom)),
    categorieChoisie: false,
  }));
}

function RevisionTicket({ ticketInitial, categories, onEnregistrer }) {
  const idDefaut = trouverIdCategorie(categories, CATEGORIE_PAR_DEFAUT);

  const [enseigne, setEnseigne] = useState(ticketInitial?.enseigne ?? '');
  const [dateAchat, setDateAchat] = useState(ticketInitial?.dateAchat || dateDuJour());
  const [taxes, setTaxes] = useState(
    ticketInitial ? centsVersTexte(ticketInitial.taxesCents) : '0,00',
  );
  const [articles, setArticles] = useState(() =>
    preparerArticlesInitiaux(ticketInitial, categories, idDefaut),
  );
  const [erreurs, setErreurs] = useState([]);
  const [enCours, setEnCours] = useState(false);

  // Calcule le total en direct à partir des articles et des taxes.
  const totalArticlesCents = additionner(articles.map((article) => lirePrix(article.prix) ?? 0));
  const totalCents = totalArticlesCents + (lirePrix(taxes) ?? 0);

  function modifierArticle(cleLocale, champ, valeur) {
    setArticles((liste) =>
      liste.map((article) => {
        if (article.cleLocale !== cleLocale) {
          return article;
        }
        const misAJour = { ...article, [champ]: valeur };
        if (champ === 'categorieId') {
          misAJour.categorieChoisie = true;
        }
        // Si l'utilisateur n'a pas choisi la catégorie à la main, on la devine
        // à partir du nom de l'article.
        if (champ === 'nom' && !article.categorieChoisie) {
          misAJour.categorieId = trouverIdCategorie(categories, trouverCategorie(valeur));
        }
        return misAJour;
      }),
    );
  }

  function ajouterArticle() {
    setArticles((liste) => [...liste, creerArticleVide(idDefaut)]);
  }

  function supprimerArticle(cleLocale) {
    setArticles((liste) => liste.filter((article) => article.cleLocale !== cleLocale));
  }

  async function gererEnvoi(evenement) {
    evenement.preventDefault();
    const listeErreurs = validerTicket({ enseigne, dateAchat, taxes, articles });
    if (listeErreurs.length > 0) {
      setErreurs(listeErreurs);
      return;
    }

    setErreurs([]);
    setEnCours(true);
    try {
      await onEnregistrer({
        enseigne: enseigne.trim(),
        dateAchat,
        taxesCents: lirePrix(taxes),
        totalCents,
        articles: articles.map((article) => ({
          libelle_brut: article.libelleBrut,
          nom: article.nom.trim(),
          quantite: lireQuantite(article.quantite),
          prix_cents: lirePrix(article.prix),
          categorie_id: article.categorieId,
        })),
      });
    } catch (err) {
      setErreurs([err.message]);
      setEnCours(false);
    }
  }

  return (
    <form className="carte formulaire" onSubmit={gererEnvoi}>
      <h2>Détails du ticket</h2>

      <Champ
        libelle="Magasin"
        placeholder="Ex. : Maxi, IGA, Metro"
        required
        maxLength={100}
        value={enseigne}
        onChange={(evenement) => setEnseigne(evenement.target.value)}
      />

      <Champ
        libelle="Date d'achat"
        type="date"
        required
        value={dateAchat}
        onChange={(evenement) => setDateAchat(evenement.target.value)}
      />

      <h3>Articles</h3>
      <div className="liste-simple">
        {articles.map((article) => (
          <LigneArticle
            key={article.cleLocale}
            article={article}
            categories={categories}
            onModifier={(champ, valeur) => modifierArticle(article.cleLocale, champ, valeur)}
            onSupprimer={() => supprimerArticle(article.cleLocale)}
          />
        ))}
      </div>

      <div>
        <Bouton variante="secondaire" onClick={ajouterArticle}>
          + Ajouter un article
        </Bouton>
      </div>

      <Champ
        libelle="Taxes ($)"
        inputMode="decimal"
        value={taxes}
        onChange={(evenement) => setTaxes(evenement.target.value)}
      />

      <p>
        <strong>Total : {formaterMontant(totalCents)}</strong>
      </p>

      <MessageErreur message={erreurs} />

      <div>
        <Bouton type="submit" disabled={enCours}>
          {enCours ? 'Enregistrement…' : 'Enregistrer le ticket'}
        </Bouton>
      </div>
    </form>
  );
}

export default RevisionTicket;
