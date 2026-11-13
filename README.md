# PanierFûté

PanierFûté est un site web destiné aux étudiants au Canada qui veulent mieux
contrôler leur budget. L'utilisateur prend en photo ses tickets de caisse et
l'application en extrait automatiquement les articles et les montants grâce à la
reconnaissance de texte. Les dépenses sont classées par catégorie et présentées
sous forme de graphiques et de bilans (par semaine, par mois, par catégorie).
Les articles achetés alimentent un inventaire de la cuisine, à partir duquel
l'application suggère des idées de repas.

Projet libre du cours **8WEB101 - Conception et programmation de sites Web**
(UQAC, automne 2026).

**Site en ligne :** https://captainraph.github.io/PanierFute/ (version bêta
prévue le 10 décembre)

## Équipe

| Membre         | Rôle                   |
| -------------- | ---------------------- |
| Maëlan Jahier  | Développeur full-stack |
| Raphaël Seyrat | Développeur full-stack |

## État d'avancement

Le projet est en phase de mise en place : les outils sont installés et
l'arborescence est posée, les fonctionnalités restent à développer.

| Fonctionnalité                                      | État    |
| --------------------------------------------------- | ------- |
| Inscription, connexion et profil                    | À faire |
| Saisie manuelle d'un ticket                         | À faire |
| Lecture d'un ticket par photo (OCR) avec correction | À faire |
| Classement des articles par catégorie               | À faire |
| Bilans et graphiques (semaine, mois, catégorie)     | À faire |
| Inventaire de la cuisine                            | À faire |
| Idées de repas                                      | À faire |

## Technologies

| Rôle                | Technologie                                                         |
| ------------------- | ------------------------------------------------------------------- |
| Interface           | [React](https://react.dev) - technologie explorée dans ce projet    |
| Outil de build      | [Vite](https://vite.dev), exécuté par [Node.js](https://nodejs.org) |
| Navigation          | [React Router](https://reactrouter.com)                             |
| Lecture des tickets | [Tesseract.js](https://tesseract.projectnaptha.com)                 |
| Graphiques          | [Chart.js](https://www.chartjs.org)                                 |
| Données et comptes  | [Supabase](https://supabase.com)                                    |
| Qualité du code     | [ESLint](https://eslint.org) et [Prettier](https://prettier.io)     |

## Architecture

L'application s'exécute entièrement dans le navigateur et dialogue directement
avec Supabase ; il n'y a pas de serveur applicatif à héberger.

```
┌──────────────────────── Navigateur ────────────────────────┐
│  Interface React  ──▶  hooks  ──▶  *.requetes.js  ─────────┼──▶  Supabase
│                          │                                 │     (base de données
│                          └──▶  domaine/ (logique pure)     │      et comptes)
└────────────────────────────────────────────────────────────┘
```

- La **reconnaissance de texte** se fait dans le navigateur : la photo du ticket
  ne quitte jamais l'appareil de l'utilisateur et n'est jamais conservée.
- La **logique métier** (analyse du texte lu, classement des articles, calcul
  des bilans, idées de repas) est écrite en fonctions pures dans `src/domaine/`,
  indépendantes de React et couvertes par des tests.
- **Supabase** conserve les données et gère les comptes. Des règles de sécurité
  (Row Level Security) garantissent qu'un utilisateur n'accède qu'à ses propres
  données.

### Organisation du dépôt

```
.github/workflows/    Déploiement automatique sur GitHub Pages
index.html            Page unique du site
src/
  pages/              Un composant par page du site
  fonctionnalites/    Un dossier par domaine : authentification, tickets,
                      depenses, inventaire, repas, profil. Chacun contient ses
                      composants, ses hooks et ses requêtes Supabase
  composants/         Composants d'interface réutilisables
  domaine/            Logique pure : analyse des tickets, classement, bilans, repas
  donnees/            Dictionnaire des enseignes et recettes
  services/           Connexion à Supabase
  styles/             Styles globaux et variables CSS
  utilitaires/        Fonctions d'affichage partagées (montants, dates)
tests/                Tests de la logique du domaine
base-de-donnees/      Scripts SQL de création de la base
doc/                  Énoncé du projet et proposition validée
```

Chaque fichier commence par un commentaire qui décrit son rôle.

## Installation

Prérequis : [Node.js](https://nodejs.org) 22 ou plus récent, et un projet
[Supabase](https://supabase.com) (gratuit).

1. Cloner le dépôt et installer les dépendances :

   ```bash
   git clone https://github.com/CaptainRaph/PanierFute.git
   cd PanierFute
   npm install
   ```

2. Créer la base de données : dans l'éditeur SQL de Supabase, exécuter dans
   l'ordre les scripts du dossier `base-de-donnees/`.

3. Renseigner les variables d'environnement : copier `.env.exemple` en `.env`,
   puis y placer l'URL et la clé publique `anon` du projet Supabase
   (_Project Settings > API_).

4. Lancer le site :

   ```bash
   npm run dev
   ```

   Il est disponible sur http://localhost:5173/PanierFute/.

## Mise en ligne

Le site est hébergé sur [GitHub Pages](https://pages.github.com). À chaque push
sur la branche `main`, le fichier `.github/workflows/deploiement.yml` vérifie le
code (ESLint et tests), construit le site et le publie. Le site construit
n'est jamais ajouté au dépôt : seul le code source y figure.

## Commandes

| Commande          | Effet                                                           |
| ----------------- | --------------------------------------------------------------- |
| `npm run dev`     | Lance le site en mode développement                             |
| `npm run lint`    | Vérifie le code avec ESLint                                     |
| `npm run format`  | Reformate le code avec Prettier                                 |
| `npm test`        | Lance les tests                                                 |
| `npm run build`   | Construit le site pour la mise en ligne                         |
| `npm run preview` | Sert le site construit, pour le vérifier avant la mise en ligne |

## Documentation

- Ce fichier : présentation, installation et organisation du projet.
- [Wiki du dépôt](https://github.com/CaptainRaph/PanierFute/wiki) : décisions
  techniques et journal de bord.
- `doc/` : énoncé du projet et proposition validée par le professeur.
