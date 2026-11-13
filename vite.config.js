// vite.config.js - configuration du serveur de développement et du build.

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const PORT_DEVELOPPEMENT = 5173;

// GitHub Pages publie le site dans un sous-dossier au nom du dépôt
// (https://captainraph.github.io/PanierFute/). Le même chemin de base sert en
// développement, pour que les deux environnements se comportent pareil.
const CHEMIN_DE_BASE = '/PanierFute/';

export default defineConfig({
  base: CHEMIN_DE_BASE,
  plugins: [react()],
  server: {
    port: PORT_DEVELOPPEMENT,
  },
});
