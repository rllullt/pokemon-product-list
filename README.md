# pokemon-product-list
Simple app that displays a list of either Pokémon or Products, from an REST API built with data from Pokemon API or Fake Store API.

## Running the app

### Installation

#### 1. Clone the repository

```bash
git clone git@github.com:rllullt/pokemon-product-list.git
cd pokemon-product-list/
```

#### 2.a Run with docker

```bash
# docker compose up
```

#### 2.b Run for development

It is recommended to create a special environment for running the apps.
This can be done with python.

##### a. Create a database with Postgres

Create a Postgres database and run the initialization files.
For example, if you created a database with the name “product_explorer_db”, connect to that database and execute the configuration file.

```bash
CREATE DATABASE product_explorer_db
```

```bash
psql -U user -h host -p port -d product_explorer_db -f db_config/init.sql
```

Make sure to set DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, AND DB_NAME as environment variables in order to correctly run the script `populate_db.js`, located in `/backend/scripts`.

##### b. Run frontend

1. Create an environment
```bash
cd product-explorer/
python3 -m venv env
source env/bin/activate
python3 -m pip install nodeenv
nodeenv --python-virtualenv --node=22.18
```

2. Install Angular, install node packages and run the application frontend
```bash
npm install -g @angular/cli
npm install
npm start
```

##### b. Run backend

1. Create environment
```bash
cd backend/
python3 -m venv env
source env/bin/activate
python3 -m pip install nodeenv
nodeenv --python-virtualenv --node=22.18
```

2. Install node packages
```bash
npm install
```

3. Populate the database and run the application backend
```bash
node scripts/populate_db.js
npm run dev
```
