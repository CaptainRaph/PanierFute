// depenses.requetes.js - lecture des tickets et de leurs articles sur une
// période donnée pour calculer les bilans.
import { client } from '../../services/supabase.js';
import { verifierReponseSupabase } from '../../services/erreur-requete.js';

export async function listerTicketsPeriode(debut, fin) {
  return verifierReponseSupabase(
    await client
      .from('tickets')
      .select('id, date_achat, total_cents, articles(prix_cents, categories(nom))')
      .gte('date_achat', debut)
      .lte('date_achat', fin)
      .order('date_achat'),
  );
}
