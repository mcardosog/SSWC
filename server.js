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

const userDB = {'marco':'123', 'gabriel':'321'};

//GET FLOWER IMAGE
app.get('/getImage/:comname', (req, res) => {
  const comname = '\''+req.params.comname+'\'';
  const query = 'SELECT SOURCE FROM PICTURES WHERE COMMON =='+comname;
  exporter.json(query,function(err, json){
    if(err) { console.log(err); }
    else {
      res.send(json);
    }
  });
});

//SET FLOWER IMAGE
app.get('/setImage/:comname', (req, res) => {
  const comname = '\''+req.params.comname+'\'';
  const query = 'SELECT SOURCE FROM PICTURES WHERE COMMON =='+comname;
  exporter.json(query,function(err, json){
    if(err) { console.log(err); }
    else {
      res.send(json);
    }
  });
});

//UPDATE FLOWER IMAGE
app.get('/updateImage/:comname', (req, res) => {
  const comname = '\''+req.params.comname+'\'';
  const query = 'SELECT SOURCE FROM PICTURES WHERE COMMON =='+comname;
  exporter.json(query,function(err, json){
    if(err) { console.log(err); }
    else {
      res.send(json);
    }
  });
});


//ADD USER
app.get('/addUser/:user/:password', (req, res) => {
  const user = '\''+req.params.user+'\'';
  const password = '\''+req.params.password+'\'';
  const query = 'INSERT INTO USERS (USER, PASSWORD)'+
      ' VALUES('+user+','+password+');';
  db.run(query);
  res.sendStatus(200);
});

//USERLOGIN
app.get('/login/:user/:password', (req, res) => {
  const user = '\''+req.params.user+'\'';
  const password = '\''+req.params.password+'\'';

  const query = 'SELECT * FROM USERS WHERE USER=='+user+' AND PASSWORD=='+password;
  exporter.json(query,function(err, json){
    if(err) { console.log(err); }
    else {
      if(Object.keys(json).length === 2) { res.send('false'); }
      else { res.send('true'); }
    }
  });
});

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
  db.run(query);
  res.send();
});

//INSERT FLOWER
app.get('/insert/:comname/:genus/:species', (req, res) => {
  const comname = '\''+req.params.comname+'\'';
  const genus = '\''+req.params.genus+'\'';
  const species = '\''+req.params.species+'\'';
  const query = 'INSERT INTO FLOWERS (COMNAME, GENUS, SPECIES)'+
      ' VALUES('+comname+','+genus+','+species+');';

  db.run(query);
  res.send();
});

//INSERT SIGHT
app.get('/insertSight/:name/:person/:location/:sighted', (req, res) => {
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

//UPDATE SIGHT
app.get('/updateSight/:name/:person/:location/:sighted/:_person/:_location/:_sighted', (req, res) => {
  const name = '\''+req.params.name+'\'';
  const person = '\''+req.params.person+'\'';
  const location = '\''+req.params.location+'\'';
  const sighted = '\''+req.params.sighted+'\'';

  const _person = '\''+req.params._person+'\'';
  const _location = '\''+req.params._location+'\'';
  const _sighted = '\''+req.params._sighted+'\'';
  const query = 'UPDATE SIGHTINGS SET NAME='+name+' ,PERSON='+person+', LOCATION='+location+' ,SIGHTED='+sighted+
                ' WHERE NAME=='+name+' AND PERSON=='+_person+' AND LOCATION=='+_location+' AND SIGHTED=='+_sighted+';';
  console.log(query);
  db.run(query);
  res.send();
});

//DELETE SIGHT
app.get('/deleteSight/:name/:person/:location/:sighted', (req, res) => {
  const name = '\''+req.params.name+'\'';
  const person = '\''+req.params.person+'\'';
  const location = '\''+req.params.location+'\'';
  const sighted = '\''+req.params.sighted+'\'';

  const query = 'DELETE FROM SIGHTINGS WHERE NAME=='+name+' AND PERSON=='+person+' AND LOCATION=='+location+' AND SIGHTED=='+sighted+';';
  console.log(query);
  db.run(query);
  res.send();
});

// start the server at URL: http://localhost:3000/
app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});
