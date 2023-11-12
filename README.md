# Projet BUT 3

## Membres de l'équipe :
- ELUECQUE Anthony
- LE FUR Lucie
- CUMZAIN Houssam
- BERNARD Laëtitia

## Fonctionnalités importantes :

### Partie Fonctionnalités

- Système d'avatar commun à l'application (visible en haut à gauche du site)

    #### Partie Utilisateur

    - Ajout automatique d'un service à un professeur après la création de son premier item
    - Édition de ses composantes (appelées ici "Items"), possibilité de les supprimer et d'en ajouter de nouveaux
    - Système de notifications (/services/) pour chaque événement associé
    - Possibilité d'éditer les informations des professeurs
    - Prévisualisation du service d'un professeur en particulier
    - Système de génération de PDF permettant l'impression ou le partage d'un service
    - Système de paramètres incluant le changement de thème, le changement de mot de passe et la suppression du compte si l'utilisateur le souhaite
    - Répertoire listant les professeurs renseignés dans l'application, ainsi que les leçons et leurs totaux d'heures
    - Possibilité d'assigner un type de cours à un professeur (TP, CM, TD, ...)

    #### Partie Administrateur

    - Possibilité de créer des utilisateurs pour l'administrateur du site avec un mot de passe par défaut
    - Modification et suppression des comptes utilisateur

### Partie Formulaire

- Système de connexion, déconnexion, changement de mot de passe, mot de passe oublié
- Vérification avec des règles sur la quasi-totalité des champs + indications
- Contrôle de l'identité de la personne

### Partie Navigation

- Contrôles d'accès (Router + Permissions)
- Routage (avec des hooks "beforeAuth") + segmentation du site (Utilisateur || Administrateur)

### Partie Ajoutée par notre groupe qui n'était pas demandée

- Projet entièrement en TypeScript (utilisation du typage fort)
- Création de scripts dans le package.json
- Création de fichiers docker-compose pour la mise en production
- Système de vérification de la force d'un mot de passe

# Project setup

```
# yarn
yarn

# npm
npm install

# pnpm
pnpm install
```

### Compiles and hot-reloads for development

```
# yarn
yarn dev

# npm
npm run dev

# pnpm
pnpm dev
```

### Compiles and minifies for production

```
# yarn
yarn build

# npm
npm run build

# pnpm
pnpm build
```

### Lints and fixes files

```
# yarn
yarn lint

# npm
npm run lint

# pnpm
pnpm lint
```

### Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).
