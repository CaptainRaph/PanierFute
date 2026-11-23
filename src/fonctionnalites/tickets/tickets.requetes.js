// tickets.requetes.js - lecture, création et suppression des tickets
// dans Supabase.
import { client } from '../../services/supabase.js';
import { verifierReponseSupabase } from '../../services/erreur-requete.js';

export async function listerTickets() {
  return verifierReponseSupabase(
    await client
      .from('tickets')
      .select('id, enseigne, date_achat, taxes_cents, total_cents')
      .order('date_achat', { ascending: false })
      .order('id', { ascending: false }),
  );
}

export async function lireTicket(idTicket) {
  return verifierReponseSupabase(
    await client
      .from('tickets')
      .select(
        'id, enseigne, date_achat, taxes_cents, total_cents, articles(id, libelle_brut, nom, quantite, prix_cents, categorie_id, categories(nom))',
      )
      .eq('id', idTicket)
      .single(),
  );
}

// Appelle la fonction SQL enregistrer_ticket (voir base-de-donnees/04-fonctions.sql)
// qui enregistre le ticket, ses articles et ajoute les aliments à l'inventaire.
export async function enregistrerTicket({ enseigne, dateAchat, taxesCents, totalCents, articles }) {
  return verifierReponseSupabase(
    await client.rpc('enregistrer_ticket', {
      p_enseigne: enseigne,
      p_date_achat: dateAchat,
      p_taxes_cents: taxesCents,
      p_total_cents: totalCents,
      p_articles: articles,
    }),
  );
}

export async function supprimerTicket(idTicket) {
  verifierReponseSupabase(await client.from('tickets').delete().eq('id', idTicket));
}
