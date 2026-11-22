// validation.js - règles de validation d'un ticket, d'un aliment et d'un
// profil avant enregistrement. Fonctions pures.

import { dateVersTexte, texteVersDate } from './dates.js';
import { texteVersCents } from './montants.js';

// Chaque fonction reçoit les valeurs des champs du formulaire (du texte) et
// renvoie la liste des erreurs trouvées : une liste vide veut dire que tout
// est bon.

// Limites reprises des contraintes de la base (base-de-donnees/01-schema.sql) :
// une valeur refusée ici n'aurait de toute façon pas pu être enregistrée, mais
// l'utilisateur aurait vu un message d'erreur générique.
const LONGUEUR_MAX_NOM = 100;
const LONGUEUR_MAX_PRENOM = 50;
// Colonne numeric(8, 3) : 5 chiffres avant la virgule, 3 après.
const QUANTITE_MAX = 99999.999;

const MESSAGE_QUANTITE = 'veuillez indiquer une quantité valide (ex. : 2 ou 0,5).';

// Quantité tapée dans un champ (« 2 », « 0,5 ») -> nombre, ou NaN si ce n'est
// pas une quantité. Au plus 3 décimales, comme en base : « 0,0001 » serait
// arrondi à 0. L'expression refuse aussi « 1e3 » ou « Infinity », que Number()
// accepterait.
export function lireQuantite(texte) {
  const nettoye = String(texte).replace(',', '.').replace(/\s/g, '');
  if (!/^\d+(\.\d{1,3})?$/.test(nettoye)) {
    return NaN;
  }
  return Number(nettoye);
}

// Vrai si la quantité est strictement positive et tient dans la colonne.
function estQuantiteValide(texte) {
  const quantite = lireQuantite(texte);
  return quantite > 0 && quantite <= QUANTITE_MAX;
}

// Vrai si le texte est une date « AAAA-MM-JJ » qui existe. JavaScript corrige
// une date impossible en une autre (le 31 novembre devient le 1er décembre) :
// si l'aller-retour ne redonne pas le même texte, la date n'existait pas.
function estDateValide(texte) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(texte)) {
    return false;
  }
  return dateVersTexte(texteVersDate(texte)) === texte;
}

export function validerTicket(ticket) {
  const erreurs = [];

  if (ticket.enseigne.trim() === '') {
    erreurs.push('Veuillez indiquer le nom du magasin.');
  }
  if (ticket.dateAchat === '') {
    erreurs.push("Veuillez indiquer la date d'achat.");
  } else if (!estDateValide(ticket.dateAchat)) {
    erreurs.push("Veuillez indiquer une date d'achat valide.");
  }
  if (texteVersCents(ticket.taxes) === null) {
    erreurs.push('Veuillez indiquer un montant de taxes valide (ex. : 1,50).');
  }
  if (ticket.articles.length === 0) {
    erreurs.push('Veuillez ajouter au moins un article.');
  }

  ticket.articles.forEach((article, index) => {
    const debut = `Article ${index + 1} :`;
    const nom = article.nom.trim();
    if (nom === '') {
      erreurs.push(`${debut} veuillez indiquer un nom.`);
    } else if (nom.length > LONGUEUR_MAX_NOM) {
      erreurs.push(
        `${debut} veuillez raccourcir le nom (${LONGUEUR_MAX_NOM} caractères au maximum).`,
      );
    }
    if (texteVersCents(article.prix) === null) {
      erreurs.push(`${debut} veuillez indiquer un prix valide (ex. : 3,99).`);
    }
    if (!estQuantiteValide(article.quantite)) {
      erreurs.push(`${debut} ${MESSAGE_QUANTITE}`);
    }
  });

  return erreurs;
}

export function validerAliment(aliment) {
  const erreurs = [];
  const nom = aliment.nom.trim();
  if (nom === '') {
    erreurs.push("Veuillez indiquer le nom de l'aliment.");
  } else if (nom.length > LONGUEUR_MAX_NOM) {
    erreurs.push(`Veuillez raccourcir le nom (${LONGUEUR_MAX_NOM} caractères au maximum).`);
  }
  if (!estQuantiteValide(aliment.quantite)) {
    // Première lettre en majuscule : le message commence la phrase.
    erreurs.push(MESSAGE_QUANTITE.charAt(0).toUpperCase() + MESSAGE_QUANTITE.slice(1));
  }
  return erreurs;
}

export function validerProfil(profil) {
  const erreurs = [];
  const prenom = profil.prenom.trim();
  if (prenom === '' || prenom.length > LONGUEUR_MAX_PRENOM) {
    erreurs.push(`Veuillez indiquer un prénom (${LONGUEUR_MAX_PRENOM} caractères au maximum).`);
  }
  if (texteVersCents(profil.budget) === null) {
    erreurs.push('Veuillez indiquer un budget valide (ex. : 300 ou 250,50).');
  }
  return erreurs;
}
