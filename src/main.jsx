// main.jsx - point d'entrée du client : charge les styles globaux et monte
// l'application React dans index.html.

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import './styles/variables.css';
import './styles/base.css';

createRoot(document.getElementById('racine')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
