  document.addEventListener("DOMContentLoaded", () => {
    // ===== GLOBAL ELEMENTS =====
    const fullNameDisplay = document.getElementById("userFullName");
    const logoutButton = document.getElementById("logoutButton");
    const logInBtn = document.getElementById("log_in");
    const signUpBtn = document.getElementById("sign_up");
    const reviewButton = document.getElementById("reviewButton");

    const currentUserEmail = localStorage.getItem("currentUserEmail");

    // ===== PROTECTED PAGE REDIRECT (e.g., reviews.html) =====
    const isOnLoginPage = window.location.pathname.includes("LogIn.html");
    const isOnReviewPage = window.location.pathname.includes("reviews.html");

     if (!currentUserEmail && (isOnReviewPage /* || other protected pages */)) {
       window.location.href = "LogIn.html";
        return;} 

    // ===== SHOW/HIDE HEADER ELEMENTS BASED ON LOGIN STATUS =====
    if (currentUserEmail) {
      const userData = JSON.parse(localStorage.getItem(currentUserEmail));
      if (userData && fullNameDisplay) {
        fullNameDisplay.textContent = `Welcome, ${userData.firstName} ${userData.lastName}`;
      }

      if (logoutButton) {
        logoutButton.style.display = "inline-block";
        if (!logoutButton.dataset.bound) {
          logoutButton.addEventListener("click", () => {
            localStorage.removeItem("currentUserEmail");
            window.location.href = "LogIn.html";
          });
          logoutButton.dataset.bound = "true";
        }
      }

      if (reviewButton) {
        reviewButton.style.display = "inline-block";
        if (!reviewButton.dataset.bound) {
          reviewButton.addEventListener("click", () => {
            window.location.href = "reviews.html";
          });
          reviewButton.dataset.bound = "true";
        }
      }

      if (logInBtn) logInBtn.style.display = "none";
      if (signUpBtn) signUpBtn.style.display = "none";
    } else {
      if (logoutButton) logoutButton.style.display = "none";
      if (reviewButton) reviewButton.style.display = "none";
    }

    // ===== SIGN-UP FORM LOGIC =====
    const signUpForm = document.getElementById("accountForm");
    if (signUpForm) {
      signUpForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const password = document.getElementById("password").value;

        localStorage.setItem(email, JSON.stringify({ firstName, lastName, password }));
        localStorage.setItem("currentUserEmail", email);
        window.location.href = "Index.html";
      });
    }

    // ===== LOGIN FORM LOGIC =====
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const loginEmail = document.getElementById("loginEmail").value.trim().toLowerCase();
        const loginPassword = document.getElementById("password").value;

        const storedData = localStorage.getItem(loginEmail);

        if (storedData) {
          const user = JSON.parse(storedData);
          if (user.password === loginPassword) {
            localStorage.setItem("currentUserEmail", loginEmail);
            window.location.href = "Index.html";
          } else {
            alert("Incorrect password.");
          }
        } else {
          alert("No account found with that email.");
        }
      });
    }

    // ===== SEARCH BAR & MODAL LOGIC (ONLY IF PRESENT) =====
    const searchInput = document.getElementById("home_search_bar");
    const modal = document.getElementById("user-form-modal");
    const closeButton = document.getElementById("close-modal-button");
    const suggestionBox = document.getElementById("suggestions");
    const symptoms = [
      "Cold", "Cough", "Chest Pain", "Sore Tooth", "Sore Throat", "Dry Skin",
      "Headache", "Fever", "Fatigue", "Nausea", "Vomiting", "Diarrhea", "Runny Nose",
      "Congestion", "Dizziness", "Muscle Aches", "Joint Pain", "Rash", "Itchy Eyes",
      "Sneezing", "Loss of Appetite", "Difficulty Sleeping", "Anxiety", "Depression",
      "Blurred Vision", "Abdominal Pain", "Back Pain"
    ];

    if (searchInput && modal && closeButton && suggestionBox) {
      searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        suggestionBox.innerHTML = "";

        if (query.length === 0) {
          suggestionBox.classList.add("hidden");
          return;
        }

        const matches = symptoms.filter(symptom =>
          symptom.toLowerCase().startsWith(query)
        );

        matches.forEach(match => {
          const li = document.createElement("li");
          li.textContent = match;
          li.addEventListener("click", () => {
            searchInput.value = match;
            suggestionBox.classList.add("hidden");
          });
          suggestionBox.appendChild(li);
        });

        suggestionBox.classList.remove("hidden");
      });

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
