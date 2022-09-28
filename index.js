const db = require('./db/connection');
const mainMenu = require('./lib/prompt');

db.connect(err => {
  if (err) throw err;
});

mainMenu();