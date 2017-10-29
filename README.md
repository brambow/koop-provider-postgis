# koop-provider-postgis

A PostGIS provider for Koop.js.  Serve ESRI GeoServices from a PostGIS database!

## Installation
~~~~ 
npm install brambow/koop-provider-postgis 
~~~~

## Configuration
After install you need to set the PostGIS connection string in ```config/default.json```, where you set username, password, server, port, and database values.

~~~~
{
  "db": {
    "postgis": "postgres://username:password@server:port/database"
  }
}
~~~~

Example:

~~~~
{
  "db": {
    "postgis": "postgres://postgres:postgres@localhost:5432/test-database"
  }
}
~~~~

## Usage
This provider comes with a built-in server for testing purposes.  Simply run ``` npm start ```

However, this is designed to be used as a provider within a Koop application.  See koopjs/koop-sample-app for examples.

## To Do
* implement tests
* remove squel dependency (maybe)
* add routes/controllers for expanded API (e.g. run a buffer or intersection query)
* refactor for better connection initialization (i.e. set at app runtime)
* refactor URLs (e.g. make schema=host & table=id, or similar)