// categories.requetes.js - lecture des catégories de référence dans Supabase.
import { client } from '../../services/supabase.js';
import { verifierReponse } from '../../services/erreur-requete.js';

export async function listerCategories() {
  return verifierReponse(
    await client.from('categories').select('id, cle, nom, est_alimentaire').order('id'),
  );
}
