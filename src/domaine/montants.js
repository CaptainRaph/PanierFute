// montants.js - opérations sur les montants en cents entiers (lecture d'un
// prix, sommes). Fonctions pures.

// On calcule toujours en cents entiers : 0.1 + 0.2 donne 0.30000000000000004
// en JavaScript, alors que 10 + 20 donne bien 30.

// Lit un prix tapé par l'utilisateur ou lu sur un ticket (« 3,99 », « 3.99 $ »,
// « 12 ») et le renvoie en cents (399). Renvoie null si ce n'est pas un prix.
export function lirePrix(texte) {
  const nettoye = String(texte).replace('$', '').replace(',', '.').trim();
  if (!/^\d+(\.\d{1,2})?$/.test(nettoye)) {
    return null;
  }
  return Math.round(Number(nettoye) * 100);
}

// Additionne une liste de montants en cents.
export function additionner(montants) {
  return montants.reduce((somme, montant) => somme + montant, 0);
}

// Écrit des cents comme on les tape dans un champ : 399 -> « 3,99 ».
export function centsVersTexte(cents) {
  return (cents / 100).toFixed(2).replace('.', ',');
}
