const db = require('./backend/db');

const name = 'Admin';
const email = 'adminvv@gmail.com';
const password = 'admin123';
const role = 'admin';

const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

db.query(query, [name, email, password, role], (err, result) => {
    if(err){
        console.log("Error inserting admin:", err);
    }
    else{
        console.log("Admin user created successfully!");
        console.log("Email: adminvv@gmail.com");
        console.log("Password: admin123");
    }
    process.exit();
});
