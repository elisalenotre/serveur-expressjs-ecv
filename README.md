# Serveur Express.js ECV

Un serveur basique construit avec Express.js dans le cadre d'un projet à l'école ECV.

## Installation

1. Cloner ce dépôt :

   ```bash
   git clone https://github.com/ton-utilisateur/serveur-expressjs-ecv.git
   ```

2. Accèder au dossier du projet :

   ```bash
   cd serveur-expressjs-ecv
   ```

3. Installer les dépendances :

   ```bash
   npm install
   ```

4. Lancer le serveur :

   ```bash
   npm start
   ```

## Tests

Ce projet utilise [Jest](https://jestjs.io/) pour les tests unitaires.

Pour exécuter les tests :

```bash
npx jest
```

### Exemple de tests actuels

Actuellement, le projet contient des tests pour vérifier le bon fonctionnement des routes API de gestion des tâches (`POST`, `GET`, `PUT`, et `DELETE`).

## Structure du projet

Voici un aperçu de la structure du projet :

```plaintext
serveur-expressjs-ecv/
├── dist/
├── node_modules/
├── src/
│   ├── app.ts
│   ├─── app.test.ts          
│   └── jest.config.js 
├── package.json
├── package.lock.json
└── README.md
```
