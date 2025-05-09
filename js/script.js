document.addEventListener("DOMContentLoaded", () => {
    // ===== SIGN-UP LOGIC =====
    const signUpForm = document.getElementById("accountForm");
    if (signUpForm) {
      signUpForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const email = document.getElementById("email").value.trim().toLowerCase();
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
  
        localStorage.setItem(email, JSON.stringify({ firstName, lastName }));
        localStorage.setItem("currentUserEmail", email);
  
        window.location.href = "Index.html";
      });
    }
  
    // ===== LOGIN LOGIC =====
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const loginEmail = document.getElementById("loginEmail").value.trim().toLowerCase();
        const storedData = localStorage.getItem(loginEmail);
  
        if (storedData) {
          localStorage.setItem("currentUserEmail", loginEmail);
          window.location.href = "Index.html";
        } else {
          alert("No account found with that email.");
        }
      });
    }
  
    // ===== HOME PAGE LOGIC =====
    const fullNameDisplay = document.getElementById("userFullName");
    const logoutButton = document.getElementById("logoutButton");
    const logInBtn = document.getElementById("log_in");
    const signUpBtn = document.getElementById("sign_up");
  
    const currentUserEmail = localStorage.getItem("currentUserEmail");
  
    if (currentUserEmail) {
      const userData = JSON.parse(localStorage.getItem(currentUserEmail));
      if (userData && fullNameDisplay) {
        fullNameDisplay.textContent = `Welcome, ${userData.firstName} ${userData.lastName}`;
      }
  
      if (logoutButton) {
        logoutButton.style.display = "inline-block";
        logoutButton.addEventListener("click", () => {
          localStorage.removeItem("currentUserEmail");
          window.location.href = "LogIn.html";
        });
      }
  
      if (logInBtn) logInBtn.style.display = "none";
      if (signUpBtn) signUpBtn.style.display = "none";
    } else {
      if (logoutButton) logoutButton.style.display = "none";
    }
  
    // ===== SEARCH MODAL LOGIC =====
    const searchInput = document.getElementById("home_search_bar");
    const modal = document.getElementById("user-form-modal");
    const closeButton = document.getElementById("close-modal-button");
  
    if (searchInput && modal && closeButton) {
      searchInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          if (searchInput.value.trim() !== "") {
            modal.style.display = "flex";
          }
        }
      });
  
      closeButton.addEventListener("click", function (e) {
        e.preventDefault();
        modal.style.display = "none";
      });
    }
  });
  