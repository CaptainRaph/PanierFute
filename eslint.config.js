// eslint.config.js - règles ESLint du projet. Le formatage est délégué à
// Prettier (.prettierrc.json).

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-config-prettier';

// Règles appliquées partout, en plus des règles recommandées : elles rendent
// automatiques plusieurs conventions de l'équipe (pas de var, pas de
// console.log ni d'alert oubliés, égalités strictes).
const REGLES_COMMUNES = {
  'no-var': 'error',
  'prefer-const': 'error',
  eqeqeq: 'error',
  'no-console': ['error', { allow: ['warn', 'error'] }],
  'no-alert': 'error',
};

export default [
  { ignores: ['node_modules/', 'dist/'] },

  js.configs.recommended,

  // Application : code exécuté dans le navigateur, avec JSX.
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...REGLES_COMMUNES,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  // Tests et fichiers de configuration : code exécuté par Node.js.
  {
    files: ['tests/**/*.js', '*.js'],
    languageOptions: { globals: globals.node },
    rules: REGLES_COMMUNES,
  },

  // Désactive les règles ESLint qui entreraient en conflit avec Prettier.
  prettier,
];
