const navbar = document.getElementById("navbar");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
