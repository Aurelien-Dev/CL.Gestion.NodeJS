# CL.Gestion.NodeJS

### installation

Cloner le repo
```bash
git clone https://github.com/Aurelien-Dev/CL.Gestion.NodeJS.git
```

installer les packages nécéssaires

```bash
npm install
```
Executer les scriptes de création de la base de donnée et remplacer les credentials de PostgreSql afin de ce connecter à vôtre BD.

Créer ces variables d'environement dans un fichier .env a côté du app.js

```bash
PG_USER=
PG_HOST=
PG_DATABASE=
PG_PASSWD=
PG_PORT=
PASSWD_WEB=
```

### Librairies utilisés

- NodeJS
- ExpressJS
- Handlebars
- Bootstrap
- PostgresSQL

### Schéma de la base de donnée

Execution du script de création de la base de données.

```bash
db.sql
```