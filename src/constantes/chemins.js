// chemins.js - chemins des pages (URL) regroupés en constantes, pour
// ne jamais écrire une URL en dur dans un composant.
export const CHEMINS = {
  TABLEAU_DE_BORD: '/',
  CONNEXION: '/connexion',
  INSCRIPTION: '/inscription',
  TICKETS: '/tickets',
  NOUVEAU_TICKET: '/tickets/nouveau',
  DETAIL_TICKET: '/tickets/:id',
  INVENTAIRE: '/inventaire',
  REPAS: '/repas',
  PROFIL: '/profil',
};

// Renvoie le chemin de la page de détail d'un ticket donné.
export function construireCheminDetailTicket(idTicket) {
  return `/tickets/${idTicket}`;
}
