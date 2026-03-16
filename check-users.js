const db = require('./backend/db');

db.query("SELECT id, name, email, password, role FROM users", (err, result) => {
    if(err){
        console.log("Error:", err);
    }
    else{
        console.log("Users in database:");
        console.log(result);
    }
    process.exit();
});
