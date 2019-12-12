// Node.js + Express server backend for petsapp
// v2 - use SQLite (https://www.sqlite.org/index.html) as a database
//
// COGS121 by Philip Guo
// https://github.com/pgbovine/COGS121

// run this once to create the initial database as the pets.db file
//   node create_database.js

// to clear the database, simply delete the pets.db file:
//   rm pets.db

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/flowers2019.db', (err) => {
  if(err) { console.log(err.message); }
  else { console.log('Connected to the database!'); }
});

//<-----          Returns list of all Flowers Name
/*
db.each("SELECT COMNAME FROM Flowers", (err, row) => {
  console.log(row.COMNAME);
});
*/

//<-----          Get the most 10 recent sighting of the flower
/*
var selectedFlowerComname = '\'California flannelbush\'';
const orderStatement = ' ORDER BY SIGHTED';
var counter = 0;
db.each(
    ("SELECT * FROM SIGHTINGS WHERE name == "+selectedFlowerComname + orderStatement), (err, row) => {
  //console.log(row.SIGHTED);
  if(counter <= 9) { 
    console.log(row.SIGHTED+' - '+ row.LOCATION +' - ' + row.PERSON);
    counter++;
  }
});
*/

//<-----          UPDATE FLOWER 
/*
var selectedFlower = { COMNAME:'Lovage', GENUS: 'TEST', SPECIES:'TEST2' }
db.run(('UPDATE FLOWERS SET GENUS=\''+selectedFlower.GENUS+'\', SPECIES=\''+
        selectedFlower.SPECIES+'\' WHERE COMNAME==\''+selectedFlower.COMNAME+'\';'));
*/

//<-----          INSERT SIGHTING, CHECK WHEN NO COMNAME IS IN THE FLOWERS TABLE
/*
var newSighting = { NAME:'Lovage', PERSON: 'X', LOCATION:'LOC', SIGHTED:'2019-01-01'}
db.run(('INSERT INTO SIGHTINGS (NAME, PERSON, LOCATION, SIGHTED) VALUES(\''
        +newSighting.NAME+'\',\''+newSighting.PERSON+'\',\''+newSighting.LOCATION+'\',\''+newSighting.SIGHTED+'\');'));
*/

/*
// run each database statement *serially* one after another
// (if you don't do this, then all statements will run in parallel,
//  which we don't want)
db.serialize(() => {
  // create a new database table:
  db.run("CREATE TABLE users_to_pets (name TEXT, job TEXT, pet TEXT)");

  // insert 3 rows of data:
  db.run("INSERT INTO users_to_pets VALUES ('Philip', 'professor', 'cat.jpg')");
  db.run("INSERT INTO users_to_pets VALUES ('John', 'student', 'dog.jpg')");
  db.run("INSERT INTO users_to_pets VALUES ('Carol', 'engineer', 'bear.jpg')");

  console.log('successfully created the users_to_pets table in pets.db');

  // print them out to confirm their contents:
  db.each("SELECT name, job, pet FROM users_to_pets", (err, row) => {
      console.log(row.name + ": " + row.job + ' - ' + row.pet);
  });
});
*/
db.close();
