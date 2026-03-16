const mysql = require('mysql2');

const db = mysql.createConnection({

  host: 'localhost',
  user: 'root',
  password: '@vijay005',
  database: 'nptel_project'

});

db.connect((err)=>{

  if(err){
    console.log("MySQL connection failed:", err);
  }
  else{
    console.log("MySQL Connected Successfully");
  }

});

module.exports = db;
