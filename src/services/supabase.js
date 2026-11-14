// supabase.js - crée l'unique client Supabase de l'application à partir des
// variables d'environnement. Importé seulement par les fichiers *.requetes.js.
import { createClient } from '@supabase/supabase-js';

export const client = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_CLE_ANON,
);
