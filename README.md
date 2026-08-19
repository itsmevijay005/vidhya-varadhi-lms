# 🎓 VIDHYA VARADHI – Smart Learning Management System

> A full-stack Learning Management System designed to simplify and digitize academic management for **students, staff, and administrators**.

![Smart LMS](https://img.shields.io/badge/Project-Smart%20LMS-blue)
![Frontend](https://img.shields.io/badge/Frontend-HTML%20%7C%20CSS%20%7C%20Bootstrap-orange)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-green)
![Database](https://img.shields.io/badge/Database-MySQL-blue)
![Status](https://img.shields.io/badge/Status-Completed-success)

---

## 📌 Overview

**VIDHYA VARADHI** is a full-stack Learning Management System (LMS) developed to provide a centralized platform for managing academic activities.

The system provides separate dashboards and functionalities for:

* 👨‍🎓 Students
* 👨‍🏫 Staff
* 👨‍💼 Administrators

It helps manage courses, learning videos, quizzes, assignments, attendance, results, fees, staff information, certificates, and other academic activities through a single web-based platform.

---

## 🎯 Objectives

The main objectives of VIDHYA VARADHI are:

* Digitize academic management processes.
* Provide a centralized learning platform.
* Simplify student and staff management.
* Allow students to access courses and learning materials.
* Enable staff to manage attendance and academic content.
* Provide administrators with centralized control.
* Reduce manual paperwork and improve accessibility.
* Generate completion certificates digitally.

---

## ✨ Key Features

### 👨‍🎓 Student Module

Students can:

* Register and log in securely.
* View available courses.
* Enroll in courses.
* Access course videos.
* Attempt quizzes.
* Complete assignments.
* View attendance.
* View academic results.
* Check fee details.
* View earned certificates.
* Download generated certificates.

### 👨‍🏫 Staff Module

Staff members can:

* Log in through the staff portal.
* Manage daily attendance.
* Upload course videos.
* Add quizzes.
* Add multiple-choice questions.
* Create assignments.
* Add assignment questions.
* Manage academic content.
* Maintain staff-related information.
* Manage salary deposit records.

### 👨‍💼 Admin Module

Administrators can:

* Manage students.
* Manage staff.
* Manage courses.
* Monitor quizzes.
* Manage assignments.
* Manage academic resources.
* Manage student and staff information.
* Control different LMS operations.
* Generate and manage certificates.

---

## 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │      Users           │
                    │ Student / Staff /    │
                    │ Admin                │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Frontend          │
                    │ HTML / CSS / JS      │
                    │ Bootstrap            │
                    └──────────┬───────────┘
                               │
                         HTTP Requests
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Backend           │
                    │ Node.js + Express    │
                    │ REST APIs            │
                    └──────────┬───────────┘
                               │
                  ┌────────────┴────────────┐
                  ▼                         ▼
        ┌──────────────────┐      ┌──────────────────┐
        │      MySQL       │      │ File Management  │
        │    Database      │      │ Videos / PDFs    │
        └──────────────────┘      └──────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Bootstrap

### Backend

* Node.js
* Express.js

### Database

* MySQL
* MySQL2

### Backend Libraries

* Express
* CORS
* Multer
* PDFKit
* QRCode
* MySQL2

### Development Tools

* Visual Studio Code
* Git
* GitHub
* MySQL

---

## 📂 Project Structure

```text
VIDHYA-VARADHI-LMS/
│
├── frontend/
│   ├── index.html
│   ├── student-login.html
│   ├── staff-login.html
│   ├── admin-login.html
│   ├── student-dashboard.html
│   ├── admin-dashboard.html
│   ├── staff-dashboard.html
│   ├── quiz.html
│   ├── add-quiz.html
│   ├── add-assignment.html
│   ├── select-branch.html
│   ├── css/
│   ├── js/
│   └── assets/
│
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── package.json
│   ├── uploads/
│   └── certificates/
│
├── database/
│   └── lms.sql
│
├── README.md
└── .gitignore
```

> Update the folder structure above if your actual GitHub repository uses different folder names.

---

## 🔐 Authentication

The system provides separate authentication interfaces for:

```text
Student Login
      │
      ▼
Student Dashboard

Staff Login
      │
      ▼
Staff Dashboard

Admin Login
      │
      ▼
Admin Dashboard
```

User credentials are validated against the MySQL database before access is granted to the corresponding dashboard.

---

## 📚 Course Management

The LMS allows staff and administrators to manage courses.

Students can:

1. View available courses.
2. Select a course.
3. Enroll in the course.
4. Access enrolled courses.
5. Watch uploaded learning videos.
6. Attempt associated quizzes and assignments.

---

## 🎥 Video Management

The system supports uploading and serving course videos using **Multer** and **Express**.

Uploaded videos are stored on the server and served through an Express static route.

Example:

```text
/uploads/course-video.mp4
```

This allows students to access learning videos directly through the LMS.

---

## 📝 Quiz Management

The quiz module allows staff and administrators to:

* Create quizzes.
* Add multiple-choice questions.
* Manage quiz questions.
* Retrieve questions dynamically.
* Record quiz attempts.
* Prevent repeated attempts where required.
* Delete unwanted quiz questions.

Students can attempt quizzes through the student dashboard.

---

## 📑 Assignment Management

The assignment module provides functionality to:

* Create assignments.
* Add assignment questions.
* Retrieve assignments.
* Retrieve assignment questions.
* Manage assignment content.
* Delete assignment questions.

This provides students with structured learning activities beyond video-based learning.

---

## 🎓 Certificate Generation

One of the major features of VIDHYA VARADHI is **automated certificate generation**.

The system uses:

* **PDFKit** – to generate PDF certificates.
* **QRCode** – to generate QR codes for certificates.

Certificate generation workflow:

```text
Course Completion
       │
       ▼
Certificate Generation
       │
       ├── Student Details
       ├── Course Details
       ├── Completion Information
       └── QR Code
       │
       ▼
Downloadable PDF Certificate
```

---

## 🗄️ Database

The application uses **MySQL** for storing application data.

Major database entities include:

```text
Users
Students
Staff
Courses
Enrollments
Videos
Quizzes
Quiz Attempts
Assignments
Assignment Questions
Certificates
```

The relational database allows different modules of the LMS to interact with each other efficiently.

---

## 🔌 REST API Modules

The backend provides APIs for major LMS operations, including:

| Method | Endpoint                      | Purpose                       |
| ------ | ----------------------------- | ----------------------------- |
| GET    | `/courses`                    | Retrieve available courses    |
| POST   | `/register`                   | Register a user               |
| POST   | `/login`                      | Authenticate user             |
| POST   | `/add-course`                 | Add a course                  |
| POST   | `/enroll`                     | Enroll a student              |
| POST   | `/my-courses`                 | Retrieve enrolled courses     |
| GET    | `/videos/:course_id`          | Retrieve course videos        |
| POST   | `/save-attempt`               | Save quiz attempt             |
| POST   | `/add-quiz`                   | Add quiz                      |
| POST   | `/add-multiple-quiz`          | Add multiple quiz questions   |
| GET    | `/get-quiz`                   | Retrieve quiz                 |
| DELETE | `/delete-quiz`                | Delete quiz                   |
| POST   | `/add-assignment`             | Add assignment                |
| GET    | `/get-assignment`             | Retrieve assignments          |
| POST   | `/add-assignment-questions`   | Add assignment questions      |
| GET    | `/get-assignment-questions`   | Retrieve assignment questions |
| DELETE | `/delete-assignment-question` | Delete assignment question    |

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

### 2. Navigate to the Backend

```bash
cd backend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure MySQL

Create a MySQL database:

```sql
CREATE DATABASE lms;
```

Import your database schema:

```text
database/lms.sql
```

### 5. Configure Database Connection

Update your database configuration with your MySQL credentials.

For better security, use environment variables:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=lms
PORT=3000
```

### 6. Start the Server

```bash
node server.js
```

or, if using nodemon:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:3000
```

### 7. Open the Application

Open the frontend in your browser or serve it through your preferred development server.

---

## 🔒 Environment Variables

Never upload sensitive credentials to GitHub.

Create a `.env` file:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=lms
PORT=3000
```

Add the following to `.gitignore`:

```text
.env
node_modules/
uploads/
certificates/
```

---

## 🚀 Future Enhancements

The project can be further improved by adding:

* 🔐 JWT-based authentication
* 🔑 Password hashing with bcrypt
* ☁️ Cloud-based video storage
* 📱 Fully responsive mobile UI
* 📊 Student performance analytics
* 🔔 Email notifications
* 💬 Student–staff communication
* 🤖 AI-based learning recommendations
* 📝 Online assignment submission
* 📈 Admin analytics dashboard
* ☁️ Cloud deployment
* 🔍 Certificate verification through QR code

---

## 🎓 Learning Outcomes

Through this project, I gained practical experience in:

* Full-stack web development
* REST API development
* Node.js and Express.js
* MySQL database design
* CRUD operations
* File uploads using Multer
* PDF generation
* QR code generation
* Frontend–backend integration
* Authentication workflows
* Git and GitHub
* Debugging and deployment concepts

---

## 👨‍💻 Developer

### Vijay Sai Guna Pagoti

**B.Tech – Computer Science & Engineering**

Interested in:

* Artificial Intelligence & Machine Learning
* Full-Stack Development
* Backend Development
* Data Structures & Algorithms
* Software Engineering

### Connect With Me

* **GitHub:** `https://github.com/itsmevijay005`
* **LinkedIn:** Add your LinkedIn profile URL
* **Portfolio:** Add your portfolio URL

---

## ⭐ Project Highlights

> **VIDHYA VARADHI** is not just a static LMS website. It is a full-stack academic management platform combining **frontend interfaces, REST APIs, relational database management, file handling, quizzes, assignments, and automated certificate generation** into a single application.

---

## 📜 License

This project was developed for educational and academic purposes.

---

### ⭐ If you find this project useful, consider giving the repository a star!
