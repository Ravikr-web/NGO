document.addEventListener("DOMContentLoaded", function () {
    // Toggle between Login & Register forms
    window.showRegister = function () {
      document.getElementById("loginForm").style.display = "none";
      document.getElementById("registerForm").style.display = "block";
    };
  
    window.showLogin = function () {
      document.getElementById("registerForm").style.display = "none";
      document.getElementById("loginForm").style.display = "block";
    };
  
    // ====================
    // 1. Registration
    // ====================
    document.querySelector("#registerForm .btn").addEventListener("click", function (event) {
      event.preventDefault();
  
      let fullName = document.querySelector("#registerForm input[placeholder='Full Name']").value.trim();
      let email = document.querySelector("#registerForm input[placeholder='Email']").value.trim();
      let username = document.querySelector("#registerForm input[placeholder='Username']").value.trim();
      let password = document.querySelector("#registerForm input[placeholder='Password']").value.trim();
      let confirmPassword = document.querySelector("#registerForm input[placeholder='Confirm Password']").value.trim();
  
      if (!fullName || !email || !username || !password || !confirmPassword) {
        alert("⚠️ All fields are required.");
        return;
      }
  
      if (password !== confirmPassword) {
        alert("⚠️ Passwords do not match!");
        return;
      }
  
      // Build the user object to send
      const newUser = {
        name: fullName,
        email: email,
        username: username,
        password: password
      };
  
      // Attempt to register via POST
fetch("http://localhost:5500/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser)
  })
    .then(async response => {
      const text = await response.text(); // Raw response
  
      if (!response.ok) {
        console.error("❌ Server responded with error during registration:", text);
        throw new Error("Server error during registration");
      }
  
      try {
        return JSON.parse(text); // Try to parse JSON
      } catch (err) {
        console.error("❌ Server responded with non-JSON during registration:", text);
        throw new Error("Invalid server response");
      }
    })
    .then(data => {
      alert("✅ Registration successful! Please log in.");
  
      // Optionally clear form inputs
      document.querySelector("#registerForm input[placeholder='Full Name']").value = "";
      document.querySelector("#registerForm input[placeholder='Email']").value = "";
      document.querySelector("#registerForm input[placeholder='Username']").value = "";
      document.querySelector("#registerForm input[placeholder='Password']").value = "";
      document.querySelector("#registerForm input[placeholder='Confirm Password']").value = "";
  
      showLogin(); // Go to login screen
    })
    .catch(error => {
      console.error("❌ Registration failed:", error);
      alert("❌ " + error.message);
    });
  
    });
  
    // ====================
    // 2. Login
    // ====================
    document.querySelector("#loginForm .btn").addEventListener("click", function (event) {
      event.preventDefault();
  
      let username = document.querySelector("#loginForm input[placeholder='Username']").value.trim();
      let password = document.querySelector("#loginForm input[placeholder='Password']").value.trim();
  
      if (!username || !password) {
        alert("Please enter both Username and Password.");
        return;
      }
  
     // Fetch all users from the server
fetch("http://localhost:5500/users")
.then(async response => {
  const text = await response.text(); // Get raw response

  if (!response.ok) {
    console.error("❌ Server responded with error:", text); // Log raw error message
    throw new Error("Network response was not ok");
  }

  try {
    return JSON.parse(text); // Try to parse JSON
  } catch (err) {
    console.error("❌ Server responded with non-JSON:", text);
    throw new Error("Server error or not JSON format");
  }
})
.then(users => {
  // Compare the user input to the data from MySQL
  let userFound = users.find(u => u.username === username && u.password === password);
  if (userFound) {
    alert("✅ Login successful!");
    window.location.href = "index.html";
  } else {
    alert("❌ Invalid username or password.");
  }
})
.catch(error => {
  console.error("❌ Error during login:", error);
  alert("❌ Login failed due to a network or server error.");
});
    });
  
    // ====================
    // 3. Payment Form Utils (Optional)
    // ====================
    window.openForm = function (cause) {
      document.getElementById("paymentForm").style.display = "block";
      if (cause) {
        document.getElementById("donationCause").innerText = cause;
      }
    };
  
    window.closeForm = function () {
      document.getElementById("paymentForm").style.display = "none";
    };
  
    window.showDetails = function () {
      const method = document.getElementById("paymentMethod").value;
      document.getElementById("cardDetails").style.display = "none";
      document.getElementById("upiDetails").style.display = "none";
      document.getElementById("netbankingDetails").style.display = "none";
  
      if (method === "card") {
        document.getElementById("cardDetails").style.display = "block";
      } else if (method === "upi") {
        document.getElementById("upiDetails").style.display = "block";
      } else if (method === "netbanking") {
        document.getElementById("netbankingDetails").style.display = "block";
      }
    };
  });
  