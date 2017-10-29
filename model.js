/*
  model.js

  This file is required. It must export a class with at least one public function called `getData`

  Documentation: http://koopjs.github.io/docs/specs/provider/
*/
const config = require('config');

//import libraries for connecting to/parsing postgis
const squel = require('squel').useFlavour('postgres');
const pgp = require('pg-promise')();
const dbgeo = require('dbgeo');


function Model (koop) {}

// Public function to return data from the
// Return: GeoJSON FeatureCollection
//
// Config parameters (config/default.json)
//
// URL path parameters:
// req.params.host (if index.js:hosts true)
// req.params.id  (if index.js:disableIdParam false)
// req.params.layer
// req.params.method

function formatSQL(req) {
  const sql = squel.select()
    .field(req.query.columns)
    // .field(`ST_Simplify(ST_Transform(${'geom'}, 4326), 0.000001) as geom`)
    .field(`ST_Transform(${'geom'}, 4326) as geom`)
    .from(req.query.table)
    // .where(req.query.filter)
    // .limit(req.query.limit)
    ;
  
  // if (req.query.join) {
  //   const joint = req.query.join.split(';');
  //   sql.join(join[0, null, join[1]]);
  // }
  // if (req.query.bounds) {
  //   var bounds = req.query.bounds.split(',');
  //   if (bounds.length === 4) {
  //       sql.where(`${req.query.geom_column} && ST_Transform(ST_MakeEnvelope(${bounds.join(',')} , 4326), find_srid('', '${req.params.table}', '${req.query.geom_column}'))`);
  //   } else if (bounds.length === 3) {
  //       var smBounds = sm.bbox(bounds[1], bounds[2], bounds[0]);
  //       sql.where(`${req.query.geom_column} && ST_Transform(ST_MakeEnvelope(${smBounds.join(',')} , 4326), find_srid('', '${req.params.table}', '${req.query.geom_column}'))`);
  //   }
  // }

  return sql.toString();
}

Model.prototype.getData = function (req, callback) {
  console.log('req:', req.query);
  let geojson = '';
  let db = pgp(config.db.postgis); //this is a specific config
  db
  .query(formatSQL(req))
  .then(function(data) {
    dbgeo.parse(data, {
      outputFormat: 'geojson',
      precision: 6
    }, function (error, result) {
      console.log(error, result);
      callback(error, result);
    })
  })
  .catch(function(err) {
    callback({
      'error': 'error running query',
      'error_details': err
    });
  });
}

module.exports = Model

