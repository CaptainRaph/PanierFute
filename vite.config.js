// vite.config.js - configuration du serveur de développement et du build.

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const PORT_DEVELOPPEMENT = 5173;

export default defineConfig({
  plugins: [react()],
  server: {
    port: PORT_DEVELOPPEMENT,
  },
});
