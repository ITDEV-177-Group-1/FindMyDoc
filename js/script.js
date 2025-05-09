
document.addEventListener("DOMContentLoaded", () => {
    // Save data and redirect on form submit
    const form = document.getElementById("accountForm");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
  
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
  
        window.location.href = "Index.html"; 
      });
    }
  
    // Display name on index.html
    const fullNameDisplay = document.getElementById("userFullName");
    if (fullNameDisplay) {
      const firstName = localStorage.getItem("firstName");
      const lastName = localStorage.getItem("lastName");
  
      if (firstName && lastName) {
        fullNameDisplay.textContent = `Welcome, ${firstName} ${lastName}`;
      }
    }
  
    // Search bar modal logic
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
  
      

    

