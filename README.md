# Blog API — Express.js

API REST d'un blog développée avec Express.js et MySQL, servant de fil rouge au cours sur le développement backend.

## Stack technique

- **Node.js** / **Express.js**
- **MySQL** avec `mysql2`
- **JWT** pour l'authentification
- **bcrypt** pour le hashage des mots de passe

## Prérequis

- Node.js v18+
- MySQL

## Installation

1. Cloner le repo
2. Installer les dépendances :
```bash
   npm install
```
3. Importer la base de données :
```bash
   mysql -u ton_utilisateur -p < blog.sql
```
4. Créer un fichier `.env` à la racine du projet :
```
   DB_HOST=localhost
   DB_USER=ton_utilisateur
   DB_PASSWORD=ton_mot_de_passe
   DB_NAME=nom_de_ta_base
   JWT_SECRET=ton_secret
```
5. Lancer le serveur :
```bash
   node server.js
```

Le serveur tourne sur `http://localhost:3000`.

## Structure du projet
```
├── config/
│   └── database.js
├── controllers/
│   ├── article.controller.js
│   ├── auth.controller.js
│   ├── category.controller.js
│   ├── like.controller.js
│   └── user.controller.js
├── middlewares/
├── models/
│   ├── article.model.js
│   ├── category.model.js
│   ├── like.model.js
│   └── user.model.js
├── routes/
│   ├── article.routes.js
│   ├── auth.routes.js
│   ├── category.routes.js
│   ├── like.routes.js
│   └── user.routes.js
└── server.js
```

## Endpoints

### Articles
| Méthode | Route | Description |
|---|---|---|
| GET | `/articles` | Récupérer tous les articles |
| GET | `/articles/:id` | Récupérer un article |
| POST | `/articles` | Créer un article |
| PUT | `/articles/:id` | Modifier un article |
| DELETE | `/articles/:id` | Supprimer un article |

### Catégories
| Méthode | Route | Description |
|---|---|---|
| GET | `/categories` | Récupérer toutes les catégories |
| GET | `/categories/:id` | Récupérer une catégorie |
| POST | `/categories` | Créer une catégorie |
| PUT | `/categories/:id` | Modifier une catégorie |
| DELETE | `/categories/:id` | Supprimer une catégorie |

### Utilisateurs
| Méthode | Route | Description |
|---|---|---|
| GET | `/users` | Récupérer tous les utilisateurs |
| GET | `/users/:id` | Récupérer un utilisateur |
| PUT | `/users/:id` | Modifier un utilisateur |
| DELETE | `/users/:id` | Supprimer un utilisateur |

### Authentification
| Méthode | Route | Description |
|---|---|---|
| POST | `/auth/register` | Créer un compte |
| POST | `/auth/login` | Se connecter |

### Likes
| Méthode | Route | Description |
|---|---|---|
| POST | `/likes` | Ajouter un like |
| DELETE | `/likes` | Supprimer un like |