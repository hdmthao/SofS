# ECommerce webiste using Node.js and React
## Backend Document
### Prerequisites
* Node.js (version: 12.9.0)
* Postgres

#### Install Node.js
[TODO]
#### Setup Postgres
**This guide using docker only**
* Install Postgres and create database

**Change `username` and `password` to your username and password. Change `$PATH_TO_LOCAL_VOLUME` to any folder on your local machine to keep your database data.** 
```
docker pull postgres
docker run --name sofs-database -p 5432:5432 -e POSTGRES_PASSWORD=18apcs --hostname="postgres" -v $PATH_TO_LOCAL_VOLUME:/var/lib/postgresql/data -d postgres
docker exec -it sofs-database bash
```
```
root@postgres:/# psql postgres --u postgres
postgres=# CREATE ROLE username WITH LOGIN PASSWORD 'password';
postgres=# ALTER ROLE username CREATEDB;
postgres=# \q
root@postgres:/# psql postgres -U username
postgres=> CREATE DATABASE sofs_db
postgres=> GRANT ALL PRIVILEGES ON DATABASE sofs_db TO username;
postgres=> \q
root@postgres:/# exit
```
* Create a `.env` file base on `.env.example` file.
  * Change `DB_USER` to your username.
  * Change `DB_PASS` to your password.
* In `config\env` folder create a `config.development.json` file base on `.config.example.json`
  * Change `username` to your username.
  * Change `password` to your password.

#### Install Node.js package
**This guide using yarn package manager, please install it. Or you can using npm instead yarn**
* Install nodemon package (Globaly)
```
yarn install -g nodemon
```
* Install project pacakge dependence
```
yarn install
```
#### Setup database
```
sequelize db:migrate
```
#### Run
```
yarn dev
```
