// start with ../petsapp-v1/server.js and work toward building ../petsapp-v2/server.js
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

const fakeDatabase = {
  'Philip': {job: 'professor', pet: 'cat.jpg'},
  'John': {job: 'student',   pet: 'dog.jpg'},
  'Carol': {job: 'engineer',  pet: 'bear.jpg'}
};


// GET a list of all usernames
//
// To test, open this URL in your browser:
//   http://localhost:3000/users
app.get('/users', (req, res) => {
  const allUsernames = Object.keys(fakeDatabase); // returns a list of object keys
  console.log('allUsernames is:', allUsernames);
  res.send(allUsernames);
});


// GET profile data for a user
//
// To test, open these URLs in your browser:
//   http://localhost:3000/users/Philip
//   http://localhost:3000/users/Carol
//   http://localhost:3000/users/invalidusername
app.get('/users/:userid', (req, res) => {
  const nameToLookup = req.params.userid; // matches ':userid' above
  const val = fakeDatabase[nameToLookup];
  console.log(nameToLookup, '->', val); // for debugging
  if (val) {
    res.send(val);
  } else {
    res.send({}); // failed, so return an empty object instead of undefined
  }
});

app.get('/test', (req, res) => {
  console.log("Hello MotherFucker");
  res.send(fakeDatabase);
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


app.get('/topTenFlowers/:comname', (req, res) => {
  const id = '\''+req.params.comname+'\'';
  const query = 'SELECT sighted, location, person FROM SIGHTINGS '+
                'WHERE name == '+id+
                'ORDER BY SIGHTED';
  exporter.json(query,function(err, json){
    if(err) { console.log(err); }
    else {
      res.send(json);
    }
  });
});

// start the server at URL: http://localhost:3000/
app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});
