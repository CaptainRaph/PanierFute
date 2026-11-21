// authentification.requetes.js - inscription, connexion, déconnexion et
// suivi de la session avec Supabase Auth.
import { client } from '../../services/supabase.js';
import { verifierReponse } from '../../services/erreur-requete.js';

export async function connecter(courriel, motDePasse) {
  return verifierReponse(
    await client.auth.signInWithPassword({ email: courriel, password: motDePasse }),
  );
}

// Le prénom est envoyé dans « data » : le déclencheur SQL
// creer_profil_nouveau_compte le recopie dans la table profils.
export async function inscrire(prenom, courriel, motDePasse) {
  return verifierReponse(
    await client.auth.signUp({
      email: courriel,
      password: motDePasse,
      options: { data: { prenom } },
    }),
  );
}

export async function deconnecter() {
  verifierReponse(await client.auth.signOut());
}

// Appelle « surChangement » avec la session actuelle, puis à chaque connexion
// ou déconnexion. Renvoie la fonction qui arrête l'écoute.
export function ecouterSession(surChangement) {
  const { data } = client.auth.onAuthStateChange((_evenement, session) => {
    surChangement(session);
  });
  return () => data.subscription.unsubscribe();
}
