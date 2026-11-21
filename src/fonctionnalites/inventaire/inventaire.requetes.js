// inventaire.requetes.js - lecture, ajout, modification et suppression
// des aliments de l'inventaire dans Supabase.
import { client } from '../../services/supabase.js';
import { verifierReponse } from '../../services/erreur-requete.js';

export async function listerInventaire() {
  return verifierReponse(await client.from('inventaire').select('id, nom, quantite').order('nom'));
}

export async function ajouterAliment({ nom, quantite }) {
  return verifierReponse(
    await client.from('inventaire').insert({ nom, quantite }).select('id, nom, quantite').single(),
  );
}

export async function modifierQuantiteAliment(idAliment, quantite) {
  return verifierReponse(
    await client
      .from('inventaire')
      .update({ quantite })
      .eq('id', idAliment)
      .select('id, nom, quantite')
      .single(),
  );
}

export async function supprimerAliment(idAliment) {
  verifierReponse(await client.from('inventaire').delete().eq('id', idAliment));
}
