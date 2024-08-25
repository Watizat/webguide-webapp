# Guide web Watizat

## Le projet

L'association [Watizat](https://watizat.org) édite un guide d'informations en plusieurs langues à destination des personnes exilées.

Cet espace correspond à l'interface de consultation et d'administration du guide web

## Contribuer

### Informations

Prendre connaissance du [guide de contribution](https://github.com/Watizat/web_app/blob/main/docs/CONTRIBUTING.md)

### Configurer le projet

Avant d'installer et lancer le projet, il faut le configurer.

Copier et renommer .env.exemple en .env à la racine du projet et définir les variables d'environnement nécessaire.

| Nom de variable    | Requise | Valeur pour dev       | description                                                                 |
| :----------------- | :-----: | :-------------------- | :-------------------------------------------------------------------------- |
| VITE_WEB_GUIDE_URL |   [x]   | http://localhost:5173 | Url public du site (sert de reference pour des lien hypertext dans l'appli) |
| VITE_BACKEND_URL   |   [x]   | http://localhost:8055 | Url d'accès à la base de données. Définit par le projet Watizat/directus    |

note: Les variables d'environnement sont passés au site via le package Vite. Consulter [la documentation de Vite](https://vitejs.dev/guide/env-and-mode) Pour plus d'informations.

note: Lors du rajout de variable d'environnement, penser a mettre à jour le fichier src/vite-env.d.ts pour ajouter les nouvelles variables à l'autocomplétion.

### Installer le projet

- Cloner le repo sur votre poste de travail

- Installer le projet et ses dépendances, avec une des commandes suivantes :

  ```bash
  npm install
  ```

  ```bash
  yarn
  ```

### Utiliser le projet

- Utiliser une des commandes suivantes :

  ```bash
  npm run dev
  ```

  ```bash
  yarn dev
  ```

- Rendez vous sur <http://localhost:5173>

## Documentations

- [Code de conduite](https://github.com/Watizat/web_app/blob/main/docs/CODE_OF_CONDUCT.md)
- [Documentation utilisateur·ice·s](https://docs.watizat.app) (en construction🛠️)

## Informations techniques

### Stack technique

#### Technologies

##### Frontend

- [Typescript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com)
- [React.JS](https://react.dev/)
- [Redux](https://redux.js.org/)
- [Vite.JS](https://vitejs.dev/)
- [Leaflet](https://leafletjs.com/)

##### Backend

- CMS Headless : [Directus](https://directus.io/)
- Base de données : [PostgreSQL](https://www.postgresql.org)

NB : Backend déployé au travers d'un container Docker : [lien vers la configuration](https://docs.directus.io/self-hosted/quickstart.html)

### Version initiale

Application développée (par une super équipe motivée et rigolote) durant le projet de fin de formation : "Développeur·se FullStack JS" de l'école O'Clock
Version 1.0.0 publiée le 03 août 2023

#### Contributeur·ice·s initiaux·ales

- [@LauraBrizard](https://github.com/LauraBrizard)
- [@KevinLeleux](https://github.com/KevinLeleux)
- [@josearmandodias](https://github.com/josearmandodias)
- [@JoelGenest](https://github.com/JoelGenest)
- [@aliceout](https://github.com/aliceout)

## Licence

- [Licence : Mozilla Public License 2.0](https://github.com/Watizat/webguide-webapp/blob/main/LICENSE)
