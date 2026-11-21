// validation.js - règles de validation d'un ticket, d'un aliment et d'un
// profil avant enregistrement. Fonctions pures.

import { texteVersCents } from './montants.js';

// Chaque fonction reçoit les valeurs des champs du formulaire (du texte) et
// renvoie la liste des erreurs trouvées : une liste vide veut dire que tout
// est bon.

// Quantité tapée dans un champ (« 2 », « 0,5 ») -> nombre, ou NaN.
export function lireQuantite(texte) {
  return Number(String(texte).replace(',', '.'));
}

export function validerTicket(ticket) {
  const erreurs = [];

  if (ticket.enseigne.trim() === '') {
    erreurs.push('Indique le nom du magasin.');
  }
  if (ticket.dateAchat === '') {
    erreurs.push("Indique la date d'achat.");
  }
  if (texteVersCents(ticket.taxes) === null) {
    erreurs.push('Les taxes doivent être un montant (ex. : 1,50).');
  }
  if (ticket.articles.length === 0) {
    erreurs.push('Ajoute au moins un article.');
  }

  ticket.articles.forEach((article, index) => {
    const numero = index + 1;
    if (article.nom.trim() === '') {
      erreurs.push(`Article ${numero} : indique un nom.`);
    }
    if (texteVersCents(article.prix) === null) {
      erreurs.push(`Article ${numero} : le prix n'est pas valide.`);
    }
    if (!(lireQuantite(article.quantite) > 0)) {
      erreurs.push(`Article ${numero} : la quantité doit être plus grande que 0.`);
    }
  });

  return erreurs;
}

export function validerAliment(aliment) {
  const erreurs = [];
  if (aliment.nom.trim() === '') {
    erreurs.push("Indique le nom de l'aliment.");
  }
  if (!(lireQuantite(aliment.quantite) > 0)) {
    erreurs.push('La quantité doit être plus grande que 0.');
  }
  return erreurs;
}

export function validerProfil(profil) {
  const erreurs = [];
  const prenom = profil.prenom.trim();
  if (prenom === '' || prenom.length > 50) {
    erreurs.push('Le prénom doit contenir entre 1 et 50 caractères.');
  }
  if (texteVersCents(profil.budget) === null) {
    erreurs.push('Le budget doit être un montant (ex. : 300 ou 250,50).');
  }
  return erreurs;
}
