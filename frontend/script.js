function loadCourses() {

    fetch("http://localhost:3000/courses")
    .then(response => response.json())
    .then(data => {

        let output = "";

        data.forEach(course => {

            output += `
                <h3>${course.title}</h3>
                <p>Instructor: ${course.instructor}</p>
                <hr>
            `;

        });

        document.getElementById("courses").innerHTML = output;

    });

}
