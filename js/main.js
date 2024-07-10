const menuToggle = document.querySelector("#menu-toggle");
const navbar = document.querySelector(".navbar-responsive");

menuToggle.addEventListener('change', () => {
  menuToggle.checked ? navbar.classList.add("active") : navbar.classList.remove("active");
})