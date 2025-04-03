document.addEventListener("DOMContentLoaded", function () {
    // Show Register Form
    window.showRegister = function () {
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("registerForm").style.display = "block";
    };

    // Show Login Form
    window.showLogin = function () {
        document.getElementById("registerForm").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
    };

    // Login Authentication
    document.querySelector("#loginForm .btn").addEventListener("click", function (event) {
        event.preventDefault();

        let username = document.querySelector("#loginForm input[placeholder='Username']").value.trim();
        let password = document.querySelector("#loginForm input[placeholder='Password']").value.trim();

        if (username === "" || password === "") {
            alert("Please enter both Username and Password.");
            return;
        }

        // Dummy user data (Replace with API or database call)
        let validUser = "admin";
        let validPass = "12345";

        if (username === validUser && password === validPass) {
            alert("Login successful!");
            window.location.href = "dashboard.html"; // Redirect to dashboard
        } else {
            alert("Invalid username or password.");
        }
    });

    // Registration Validation
    document.querySelector("#registerForm .btn").addEventListener("click", function (event) {
        event.preventDefault();

        let fullName = document.querySelector("#registerForm input[placeholder='Full Name']").value.trim();
        let email = document.querySelector("#registerForm input[placeholder='Email']").value.trim();
        let username = document.querySelector("#registerForm input[placeholder='Username']").value.trim();
        let password = document.querySelector("#registerForm input[placeholder='Password']").value.trim();
        let confirmPassword = document.querySelector("#registerForm input[placeholder='Confirm Password']").value.trim();

        if (fullName === "" || email === "" || username === "" || password === "" || confirmPassword === "") {
            alert("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Simulating user registration (Replace with backend API)
        alert("Registration successful! Please log in.");
        showLogin(); // Redirect to login form
    });
});
