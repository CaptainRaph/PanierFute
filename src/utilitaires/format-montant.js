// format-montant.js - affichage d'un montant en dollars canadiens.

const FORMAT_DOLLARS = new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD' });

// 1250 -> « 12,50 $ ».
export function formaterMontant(cents) {
  return FORMAT_DOLLARS.format(cents / 100);
}
