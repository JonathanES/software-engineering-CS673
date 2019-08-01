var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'swellodeskdatabase-restore.cccrockehrmp.eu-west-3.rds.amazonaws.com',
  user     : 'swello',
  password : 'H!zqxWm789$0',
  database : 'swellodeskDatabase'
});

connection.connect((error) => {
    if(error) throw error;
    console.log("Connected!");
});

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});


module.exports = connection;
