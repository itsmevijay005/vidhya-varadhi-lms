const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

/* Serve uploaded videos */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* Serve certificates */
app.use("/certificates", express.static(path.join(__dirname, "certificates")));

/* Serve frontend files */
app.use(express.static(path.join(__dirname, "../frontend")));

/* Homepage route */
app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/index.html"));
});

/* Multer storage configuration */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g,"-"));
  }
});

const upload = multer({ storage: storage });

// Test route
app.get('/', (req, res) => {
    res.send("Backend is working successfully");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

// Get courses API
app.get('/courses', (req, res) => {

    const query = "SELECT * FROM courses";

    db.query(query, (err, result) => {

        if(err){
            console.log(err);
            res.send("Error fetching courses");
        }
        else{
            res.json(result);
        }

    });

});
// Student Registration API
app.post('/register', (req, res) => {

    const { name, email, password } = req.body;

    const role = "student";

    const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

    db.query(query, [name, email, password, role], (err, result) => {

        if(err){
            console.log(err);
            res.send("Registration failed");
        }
        else{
            res.send("Student registered successfully");
        }

    });

});
// Login API (Student + Admin)
app.post('/login', (req, res) => {

    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ? AND password = ?";

    db.query(query, [email, password], (err, result) => {

        if(err){
            console.log(err);
            res.send("Login failed");
        }
        else if(result.length > 0){

            const user = result[0];

            res.json({
                message: "Login successful",
                role: user.role,
                name: user.name
            });

        }
        else{
            res.send("Invalid email or password");
        }

    });

});
// Add Course API (Admin)
app.post('/add-course', (req, res) => {

    const { title, instructor } = req.body;

    const query = "INSERT INTO courses (title, instructor) VALUES (?, ?)";

    db.query(query, [title, instructor], (err, result) => {

        if(err){
            console.log(err);
            res.send("Failed to add course");
        }
        else{
            res.send("Course added successfully");
        }

    });

});
// Enrollment API
app.post('/enroll', (req, res) => {

    const { email, course_id } = req.body;

    // Check if already enrolled
    const checkQuery = "SELECT * FROM enrollments WHERE user_email = ? AND course_id = ?";
    db.query(checkQuery, [email, course_id], (err, result) => {
        if(err){
            console.log(err);
            res.send("Enrollment check failed");
            return;
        }

        if(result.length > 0){
            res.send("Already enrolled in this course");
            return;
        }

        // Proceed with enrollment
        const insertQuery = "INSERT INTO enrollments (user_email, course_id) VALUES (?, ?)";
        db.query(insertQuery, [email, course_id], (err, result) => {
            if(err){
                console.log(err);
                res.send("Enrollment failed");
            }
            else{
                res.send("Enrollment successful");
            }
        });
    });
});
// API to get enrolled courses of a student
app.post('/my-courses', (req, res) => {

    const { email } = req.body;

    const query = `
        SELECT courses.id, courses.title, courses.instructor
        FROM courses
        JOIN enrollments ON courses.id = enrollments.course_id
        WHERE enrollments.user_email = ?
    `;

    db.query(query, [email], (err, result) => {

        if(err){
            console.log(err);
            res.send("Error fetching enrolled courses");
        }
        else{
            res.json(result);
        }

    });

});
// Upload video API
app.post('/upload-video', upload.single('video'), (req, res) => {

    const { course_id, title } = req.body;

    const video_url = req.file.filename;

    const query = "INSERT INTO videos (course_id, title, video_url) VALUES (?, ?, ?)";

    db.query(query, [course_id, title, video_url], (err, result) => {

        if(err){
            console.log(err);
            res.send("Video upload failed");
        }
        else{
            res.send("Video uploaded successfully");
        }

    });

});

// Get videos for a course
app.get('/videos/:course_id', (req, res) => {

    const course_id = req.params.course_id;

    const query = "SELECT * FROM videos WHERE course_id = ?";

    db.query(query, [course_id], (err, result) => {

        if(err){
            console.log(err);
            res.send("Error fetching videos");
        }
        else{
            res.json(result);
        }

    });

});

app.post("/save-attempt",(req,res)=>{

    const {email, course_id, quiz_number, score} = req.body;

    db.query(
        "INSERT INTO quiz_attempts (email, course_id, quiz_number, score) VALUES (?, ?, ?, ?)",
        [email, course_id, quiz_number, score],
        (err)=>{
            if(err){
                res.send("Error saving attempt");
            }else{
                res.send("Attempt saved");
            }
        }
    );
});



app.post("/add-quiz", (req,res)=>{

    const {course_id, question, option1, option2, option3, option4, answer} = req.body;

    const sql = `
    INSERT INTO quizzes (course_id, question, option1, option2, option3, option4, answer)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql,
        [course_id, question, option1, option2, option3, option4, answer],
        (err,result)=>{
            if(err){
                console.log(err);
                res.send("Error adding quiz");
            }else{
                res.send("Quiz Added Successfully");
            }
        }
    );
});

app.post("/save-attempt",(req,res)=>{

    const {email, course_id, quiz_number, score} = req.body;

    db.query(
        "INSERT INTO quiz_attempts (email, course_id, quiz_number, score) VALUES (?, ?, ?, ?)",
        [email, course_id, quiz_number, score],
        (err)=>{
            if(err){
                res.send("Error saving attempt");
            }else{
                res.send("Attempt saved");
            }
        }
    );
});

app.post("/add-multiple-quiz", (req,res)=>{

    const {course_id, quiz_number, questions} = req.body;

    if(!questions || questions.length === 0){
        return res.send("No questions provided");
    }

    // Delete only this specific quiz
    const deleteSql = `
        DELETE FROM quizzes
        WHERE course_id = ? AND quiz_number = ?
    `;

    db.query(deleteSql, [course_id, quiz_number], (err)=>{
        if(err) return res.send("Error deleting old quiz");

        const values = questions.map(q=>[
            course_id,
            quiz_number,
            q.question,
            q.option1,
            q.option2,
            q.option3,
            q.option4,
            q.answer
        ]);

        const insertSql = `
            INSERT INTO quizzes
            (course_id, quiz_number, question, option1, option2, option3, option4, answer)
            VALUES ?
        `;

        db.query(insertSql, [values], (err2)=>{
            if(err2){
                res.send("Error saving quiz");
            } else {
                res.send("Quiz Saved Successfully");
            }
        });

    });

});
app.get("/admin-quiz/:courseId/:quizNumber", (req,res)=>{

    const courseId = req.params.courseId;
    const quizNumber = req.params.quizNumber;

    const sql = `
        SELECT * FROM quizzes
        WHERE course_id = ? AND quiz_number = ?
        ORDER BY id ASC
    `;

    db.query(sql, [courseId, quizNumber], (err,result)=>{
        if(err){
            res.status(500).json(err);
        } else {
            res.json(result);
        }
    });

});


app.get("/get-quiz/:courseId/:quizNumber/:email", (req,res)=>{

    const courseId = req.params.courseId;
    const quizNumber = req.params.quizNumber;
    const email = req.params.email;

    // 🔒 Check if previous quiz completed
    if(quizNumber > 1){
        const checkSql = `
            SELECT * FROM quiz_attempts
            WHERE email = ? AND course_id = ? AND quiz_number = ?
        `;

        db.query(checkSql, [email, courseId, quizNumber - 1], (err,result)=>{
            if(result.length === 0){
                return res.json({ locked: true });
            }

            loadQuiz();
        });
    } else {
        loadQuiz();
    }

    function loadQuiz(){
        const sql = `
            SELECT * FROM quizzes
            WHERE course_id = ? AND quiz_number = ?
            ORDER BY id ASC
        `;

        db.query(sql, [courseId, quizNumber], (err,result)=>{
            res.json({ locked:false, data:result });
        });
    }

});
app.delete("/delete-quiz/:id", (req,res)=>{

    const id = req.params.id;

    db.query(
        "DELETE FROM quizzes WHERE id=?",
        [id],
        (err,result)=>{
            if(err){
                res.send("Error deleting question");
            } else {
                res.send("Question removed successfully");
            }
        }
    );
});

app.post("/add-assignment", (req,res)=>{

    const { course_id, title, description, instructions, due_date, total_marks } = req.body;

    const sql = `
        INSERT INTO assignments 
        (course_id, title, description, instructions, due_date, total_marks)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, 
        [course_id, title, description, instructions, due_date, total_marks],
        (err,result)=>{
            if(err) return res.send("Error adding assignment");
            res.send("Assignment Added Successfully!");
        }
    );
});

app.get("/get-assignment/:courseId", (req,res)=>{

    const courseId = req.params.courseId;

    const sql = `
        SELECT * FROM assignments
        WHERE course_id = ?
        ORDER BY id DESC
        LIMIT 1
    `;

    db.query(sql,[courseId],(err,result)=>{
        if(err) return res.json([]);
        res.json(result);
    });

});

app.post("/add-assignment-questions",(req,res)=>{

    const { course_id, questions } = req.body;

    const sql = `
        INSERT INTO assignment_questions
        (course_id, question, option1, option2, option3, option4, answer)
        VALUES ?
    `;

    const values = questions.map(q => [
        course_id,
        q.question,
        q.option1,
        q.option2,
        q.option3,
        q.option4,
        q.answer
    ]);

    db.query(sql,[values],(err,result)=>{
        if(err) return res.send("Error saving assignment");
        res.send("Assignment MCQs Saved Successfully!");
    });
});

app.get("/get-assignment-questions/:courseId", (req,res)=>{

    const courseId = req.params.courseId;

    const sql = `
        SELECT * FROM assignment_questions
        WHERE course_id = ?
        ORDER BY id ASC
    `;

    db.query(sql,[courseId],(err,result)=>{
        if(err) return res.json([]);
        res.json(result);
    });

});

app.get("/admin-assignment/:courseId", (req,res)=>{

    const courseId = req.params.courseId;

    db.query(
        "SELECT * FROM assignment_questions WHERE course_id = ? ORDER BY id ASC",
        [courseId],
        (err,result)=>{
            if(err){
                console.log(err);
                return res.json([]);
            }
            res.json(result);
        }
    );
});

app.delete("/delete-assignment-question/:id", (req,res)=>{

    const id = req.params.id;

    db.query(
        "DELETE FROM assignment_questions WHERE id = ?",
        [id],
        (err)=>{
            if(err){
                console.log(err);
                return res.send("Error deleting question");
            }
            res.send("Question Deleted Successfully");
        }
    );
});

const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");
const fs = require("fs");

app.post("/generate-certificate", async (req,res)=>{

    const { email, course_id, final_percentage } = req.body;

    // Get student name
    db.query("SELECT name FROM users WHERE email=?",
    [email], async (err,studentResult)=>{

        if(err || studentResult.length === 0)
            return res.json({ error:"Student not found" });

        const studentName = studentResult[0].name;

        // Get course title
        db.query("SELECT title FROM courses WHERE id=?",
        [course_id], async (err,courseResult)=>{

            if(err || courseResult.length === 0)
                return res.json({ error:"Course not found" });

            const courseTitle = courseResult[0].title;

            const fileName =
            `${email}_${course_id}.pdf`;

            const filePath =
            path.join(__dirname,"certificates",fileName);

            // Prevent duplicate generation
            db.query(
                "SELECT * FROM certificates WHERE student_email=? AND course_id=?",
                [email,course_id],
                async (err,existing)=>{

                    if(existing.length > 0){
                        return res.json({
                            url: `/certificates/${fileName}`
                        });
                    }

                    // CREATE PDF
                    const doc = new PDFDocument({
                        size:"A4",
                        layout:"landscape"
                    });

                    doc.pipe(fs.createWriteStream(filePath));

                    // Background
                    doc.rect(0,0,842,595)
                       .fill("#fdfdfd");

                    doc.fillColor("#002147")
                       .fontSize(30)
                       .text("VIDHYA VARADHI LMS",
                       { align:"center" });

                    doc.moveDown(1);

                    doc.fillColor("#000")
                       .fontSize(24)
                       .text("Certificate of Completion",
                       { align:"center" });

                    doc.moveDown(2);

                    doc.fontSize(20)
                       .text("This is to certify that",
                       { align:"center" });

                    doc.moveDown(1);

                    doc.fontSize(28)
                       .fillColor("#1f4aa8")
                       .text(studentName,
                       { align:"center" });

                    doc.moveDown(1);

                    doc.fillColor("#000")
                       .fontSize(20)
                       .text("has successfully completed the course",
                       { align:"center" });

                    doc.moveDown(1);

                    doc.fontSize(24)
                       .fillColor("#28a745")
                       .text(courseTitle,
                       { align:"center" });

                    doc.moveDown(2);

                    doc.fillColor("#000")
                       .fontSize(18)
                       .text(`Final Score: ${final_percentage}%`,
                       { align:"center" });

                    // Generate QR code
                    const verificationUrl =
                    `http://localhost:3000/verify/${email}/${course_id}`;

                    const qrImage =
                    await QRCode.toDataURL(verificationUrl);

                    const base64Data =
                    qrImage.replace(/^data:image\/png;base64,/,"");

                    const qrBuffer =
                    Buffer.from(base64Data,"base64");

                    doc.image(qrBuffer,650,420,
                    { width:120 });

                    doc.end();

                    // Save DB
                    db.query(
                        "INSERT INTO certificates (student_email, student_name, course_id, course_title, final_percentage, certificate_file) VALUES (?,?,?,?,?,?)",
                        [email,studentName,course_id,courseTitle,final_percentage,fileName],
                        ()=>{
                            res.json({
                                url:`/certificates/${fileName}`
                            });
                        }
                    );
                });
        });
    });
});

// Route to fetch student's certificates
app.post("/my-certificates", (req, res) => {
    const { email } = req.body;
    db.query(
        "SELECT * FROM certificates WHERE student_email = ?",
        [email],
        (err, result) => {
            if (err) {
                return res.status(500).json([]);
            }
            res.json(result);
        }
    );
});

// Check if student has certificate for a specific course
app.post("/check-certificate", (req, res) => {
    const { email, course_id } = req.body;
    db.query(
        "SELECT * FROM certificates WHERE student_email = ? AND course_id = ?",
        [email, course_id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ hasCertificate: false });
            }
            res.json({ hasCertificate: result.length > 0 });
        }
    );
});

// Clear quiz attempts on logout (session-based reset)
app.post("/logout-reset", (req, res) => {
    const { email } = req.body;
    db.query(
        "DELETE FROM quiz_attempts WHERE email = ?",
        [email],
        (err, result) => {
            if (err) {
                console.log("Error clearing quiz attempts:", err);
                res.send("Reset failed");
            } else {
                res.send("Progress reset successfully");
            }
        }
    );
});

function generateCertificate(finalPercentage){

    const email = localStorage.getItem("email");
    const courseId = localStorage.getItem("quiz_course_id");

    fetch("http://localhost:3000/generate-certificate",{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({
            email: email,
            course_id: courseId,
            final_percentage: finalPercentage
        })
    })
    .then(res=>res.json())
    .then(data=>{

        document.getElementById("displayArea").innerHTML = `
            <div class="alert alert-success p-4 text-center">
                <h4>🎉 Congratulations!</h4>
                <p>Course Completed Successfully</p>
                <a href="${data.url}"
                   target="_blank"
                   class="btn btn-primary">
                   Download Certificate
                </a>
            </div>
        `;
    });
}

app.use("/certificates",
    express.static("certificates"));

// client-side helper (copied to front-end scripts if needed)
function myCertificates(){
    fetch("http://localhost:3000/my-certificates",{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({
            email: localStorage.getItem("email")
        })
    })
    .then(res=>res.json())
    .then(data=>{
        let output = "<h4>My Certificates</h4>";
        data.forEach(cert=>{
            output += `
            <div class=\"card p-3 mb-3 shadow\">\n                <h5>${cert.course_title}</h5>\n                <p>Score: ${cert.final_percentage}%</p>\n                <a href=\"/certificates/${cert.certificate_file}\"\n                   target=\"_blank\"\n                   class=\"btn btn-primary\">\n                   Download Certificate\n                </a>\n            </div>\n            `;
        });
        document.getElementById("courses").innerHTML = output;
    });
}