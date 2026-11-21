// profil.requetes.js - lecture et modification du profil utilisateur
// dans Supabase.
import { client } from '../../services/supabase.js';
import { verifierReponse } from '../../services/erreur-requete.js';

export async function lireProfil(idUtilisateur) {
  return verifierReponse(
    await client
      .from('profils')
      .select('id, prenom, budget_mensuel_cents')
      .eq('id', idUtilisateur)
      .single(),
  );
}

export async function modifierProfil(idUtilisateur, { prenom, budgetMensuelCents }) {
  return verifierReponse(
    await client
      .from('profils')
      .update({ prenom, budget_mensuel_cents: budgetMensuelCents })
      .eq('id', idUtilisateur)
      .select('id, prenom, budget_mensuel_cents')
      .single(),
  );
}
