# Projet BUT 3
## Membres de l'équipe :
- ELUECQUE Anthony 
- LE FUR Lucie
- CUMZAIN Houssam
- BERNARD Laëtitia

## Fonctionnalités importantes : 
### Partie Fonctionnalitées

- Système d'avatar commun à l'application (Voir en haut à gauche du site)

    #### Partie User
    - Ajouter un service à un professeur automatiquement après la création de son premier item
    - Editer ses composantes (appelés ici Item), pouvoir les supprimer, ajouter
    - Système de notifications ( /services/ ) lors de chaque évènement associé
    - Possibilité d'éditer les professeurs
    - Prévisualiser le service d'un professeur en particulier
    - Système de génération de PDF permettant l'impression ou le partage d'un service
    - Système de paramètre avec un changement de thème, avec un changement de mot de passe et une supression de compte si l'utilisateur le souhaite
    - Répertoire permettant de lister les professeurs renseignés dans l'application, ainsi que les leçons et leur totales d'heures
    - Possibilité d'assignation d'un type de cours à un professeur (TP, CM, TD, ...)


    #### Partie Admin

    - Possibilité de créer des utilisateurs pour l'administrateur du site avec un mot de passe par défault
    - Modifier, supprimer les comptes User


### Partie Formulaire
- Système de login , logout, changement de mot de passe, mot de passe oubliée
- Vérification avec des rules sur la presque totalité des inputs + hints
- Contrôle de l'identité de la personne

### Partie Navigation

- Guards de contrôle (Router + Permissions)
- Router (Avec des beforeAuth) + segmentation du site (User || Admin)

### Partie Ajoutée par notre groupe qui n'était pas demandé

- Projet entièrement en Typescript (utilisation du typage fort)
- Création de script dans le package.json
- Création de docker-compose pour la mise en production
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
