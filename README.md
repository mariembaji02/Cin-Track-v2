# CinéTrack_v2

## Présentation du projet

CinéTrack est une application web qui permet de consulter, rechercher, filtrer et gérer des films et des séries.

L'application permet l'utilistuer rechrcher sur les film et enregister les film ou series préféres dans un liste.
L'application permet l'admin ajouter et modifier ou supprimer un movie/series
L'application aussi permet d'ajouter des commentaires et des vies sur film ou serie

## Fonctionnalités

### Catalogue

- Affichage des films et des séries.
- Recherche par titre.
- Filtrage par type de contenu(Film / Série).
- Tri des contenus par ordre alphabétique.
- Affichage des détails des films et des séries.
- Pagination des contenus.
- ajouter des commentaires et afficher sur la cartes modal de film/serie

### Favoris

- Ajout et suppression des favoris.
- Gestion des favoris avec `localStorage`.
- Comptage des films et des séries dans la liste des favoris.
- suppression et modification dynamique avec page admin

### Administration

- Ajout de nouveaux films et séries.
- Modification des contenus existants.
- Suppression des contenus.
- Validation des champs du formulaire.
- Affichage des messages d'erreur sous les champs concernés.

### Commentaires

- Affichage des commentaires dans la modal.
- Ajout de commentaires.
- Suppression de commentaires.
- Gestion des commentaires via l'API.

## Technologies utilisées

- HTML5
- JavaScript (ES6+)
- Tailwind CSS
- API REST (MockAPI)
- Fetch API
- LocalStorage
- Git & GitHub
- Jira
- Vercel

## Structure du projet

```text
CinéTrack/
│
├── index.html
├── admin.html
├── style.css
├── tailwind.config.js
├── README.md
├── js/
│   ├── api.js
│   ├── ui.js
│   ├── validation.js
│   ├── main.js
│   ├── admin.js
│   ├── modal.js
│   ├── pagination.js
│   ├── listFav.js
│   └── search.js
```

## API utilisées

L'application utilise deux sources de données :

- Une API JSON pour récupérer les données initiales des films et des séries.
- MockAPI pour gérer les contenus et les commentaires avec des requêtes HTTP.

### Endpoints MockAPI

**Base URL :**

`https://6afb516....mockapi.io/api/v1`

| Méthode HTTP | Endpoint                           | Description                 |
| ------------ | ---------------------------------- | --------------------------- |
| GET          | `/content`                         | Récupérer tous les contenus |
| GET          | `/content/:id`                     | Récupérer un contenu par ID |
| POST         | `/content`                         | Ajouter un contenu          |
| PUT          | `/content/:id`                     | Modifier un contenu         |
| DELETE       | `/content/:id`                     | Supprimer un contenu        |
| GET          | `/content/:id/comments`            | Récupérer les commentaires  |
| POST         | `/content/:id/comments`            | Ajouter un commentaire      |
| DELETE       | `/content/:id/comments/:commentId` | Supprimer un commentaire    |

### Exemple de données JSON

```json
{
  "id": "2",
  "title": "Breaking Bad",
  "type": "series",
  "releaseYear": 2008,
  "seasons": [1, 2, 3, 4, 5],
  "image": "https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
  "description": "A chemistry teacher turns to manufacturing drugs.",
  "genres": ["Drama", "Crime", "Thriller"],
  "directors": ["Vince Gilligan"],
  "productionCountries": ["USA"]
}
```

### Structure d'un commentaire

```json
{
  "id": "1",
  "name": "Hafssa",
  "text": "Très bonne série !"
}
```

## Auteur

**Bajbouji Mariem**
