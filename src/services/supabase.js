// supabase.js - crée l'unique client Supabase de l'application à partir des
// variables d'environnement. Importé seulement par les fichiers *.requetes.js.
import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const cleAnon = import.meta.env.VITE_SUPABASE_CLE_ANON;

// Sans ces deux variables (fichier .env absent), createClient lance une erreur
// et la page resterait blanche : App affiche plutôt un message clair.
export const supabaseEstConfigure = Boolean(url && cleAnon);

export const client = supabaseEstConfigure ? createClient(url, cleAnon) : null;
