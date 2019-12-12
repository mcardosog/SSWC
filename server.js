const express = require('express');
const app = express();
const sqliteJson = require('sqlite-json');

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/flowers2019.db', (err) => {
  if(err) { console.log(err.message); }
  else { console.log('Connected to the database!'); }
});
const exporter = sqliteJson(db);
app.use(express.static('static_files'));

//GET ALL FLOWERS
app.get('/loadAllFlowers', (req, res) => {
  const query = 'SELECT COMNAME FROM Flowers';
  exporter.json(query,function(err, json){
    if(err) { console.log(err); }
    else {
      res.send(json);
    }
  });
});

//GET FLOWER
app.get('/loadFlower/:comname', (req, res) => {
  const comname = '\''+req.params.comname+'\'';
  const query = 'SELECT * FROM Flowers' +
                ' WHERE comname =='+comname;
  exporter.json(query,function(err, json){
    if(err) { console.log(err); }
    else {
      res.send(json);
    }
  });
});

//GET TOP 10 FLOWERS 
app.get('/topTenFlowers/:comname', (req, res) => {
  const id = '\''+req.params.comname+'\'';
  const query = 'SELECT sighted, location, person FROM SIGHTINGS '+
                'WHERE name == '+id+
                'ORDER BY SIGHTED LIMIT 10';
  exporter.json(query,function(err, json){
    if(err) { console.log(err); }
    else {
      res.send(json);
    }
  });
});

//UPDATE FLOWER
app.get('/update/:comname/:genus/:species', (req, res) => {
  const comname = '\''+req.params.comname+'\'';
  const genus = '\''+req.params.genus+'\'';
  const species = '\''+req.params.species+'\'';
  const query = 'UPDATE FLOWERS SET GENUS='+genus+", SPECIES="+species+
                ' WHERE COMNAME=='+comname+';';
  console.log(query);
  db.run(query);
  res.send();
});

//INSERT SIGHT
app.get('/insert/:name/:person/:location/:sighted', (req, res) => {
  const name = '\''+req.params.name+'\'';
  const person = '\''+req.params.person+'\'';
  const location = '\''+req.params.location+'\'';
  const sighted = '\''+req.params.sighted+'\'';
  const query = 'INSERT INTO SIGHTINGS (NAME, PERSON, LOCATION, SIGHTED)'+ 
                ' VALUES('+name+','+person+','+location+','+sighted+');';
  console.log(query);
  db.run(query);
  res.send();
});

// start the server at URL: http://localhost:3000/
app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});
