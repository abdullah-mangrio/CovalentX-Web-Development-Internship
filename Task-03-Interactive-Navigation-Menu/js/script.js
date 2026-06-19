const navbar = document.getElementById("navbar");
const progressBar = document.getElementById("progressBar");
const topBtn = document.getElementById("topBtn");

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll("nav a");

/* Navbar + Progress Bar + Back To Top */

window.addEventListener("scroll", () => {

    // Navbar Background Change

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    // Progress Bar

    const scrollTop =
        document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        (scrollTop / scrollHeight) * 100;

    progressBar.style.width =
        progress + "%";

    // Back To Top Button

    if (window.scrollY > 400) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }

    highlightActiveLink();
    revealSections();
});

/* Active Navigation Link */

function highlightActiveLink() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 200;

        if (window.scrollY >= sectionTop) {
            currentSection =
                section.getAttribute("id");
        }
    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {
            link.classList.add("active");
        }
    });
}

/* Reveal Animation */

function revealSections() {

    const triggerPoint =
        window.innerHeight * 0.85;

    sections.forEach(section => {

        const sectionTop =
            section.getBoundingClientRect().top;

        if (sectionTop < triggerPoint) {
            section.classList.add("show");
        }
    });
}

revealSections();

/* Mobile Menu Toggle */

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("show");
});

/* Close Mobile Menu After Click */

navItems.forEach(item => {

    item.addEventListener("click", () => {

        navLinks.classList.remove("show");
    });
});

/* Back To Top */

topBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
