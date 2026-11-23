// erreur-requete.js - transforme la réponse d'une requête Supabase : renvoie
// les données, ou lance une erreur avec un message clair en français.

// Messages de Supabase (en anglais) que l'on sait traduire.
const TRADUCTIONS = {
  'Invalid login credentials': 'Courriel ou mot de passe incorrect.',
  'User already registered': 'Un compte existe déjà avec ce courriel.',
  'Email not confirmed': "Ton courriel n'est pas encore confirmé : vérifie ta boîte de réception.",
};

// S'utilise ainsi : const tickets = verifierReponse(await client.from(...)...);
export function verifierReponseSupabase({ data, error }) {
  if (error) {
    // Le message d'origine de Supabase n'est affiché qu'en développement, pour
    // déboguer : en production, la console reste vide.
    if (import.meta.env.DEV) {
      console.error(error);
    }
    throw new Error(TRADUCTIONS[error.message] ?? 'Une erreur est survenue. Réessaie plus tard.');
  }
  return data;
}
