// categories.requetes.js - lecture des catégories de référence dans Supabase.
import { client } from '../../services/supabase.js';
import { verifierReponseSupabase } from '../../services/erreur-requete.js';

export async function listerCategories() {
  return verifierReponseSupabase(
    await client.from('categories').select('id, cle, nom, est_alimentaire').order('id'),
  );
}
