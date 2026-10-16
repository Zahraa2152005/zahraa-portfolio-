document.addEventListener("DOMContentLoaded", function () {

  const yearElement = document.getElementById("currentYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const navbar = document.getElementById("mainNavbar");

  function updateNavbar() {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    }
  }

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    revealElements.forEach(function (element) {
      observer.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("visible");
    });
  }

  const navMenu = document.getElementById("navbarMenu");
  const navLinks = document.querySelectorAll("#navbarMenu .nav-link");
  const navbarToggler = document.querySelector(".navbar-toggler");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (
        navMenu &&
        navMenu.classList.contains("show") &&
        window.bootstrap &&
        navbarToggler
      ) {
        const collapse = bootstrap.Collapse.getOrCreateInstance(navMenu);
        collapse.hide();
      }

      navLinks.forEach(function (item) {
        item.classList.remove("active");
      });

      link.classList.add("active");
    });
  });

  const sections = document.querySelectorAll("section[id]");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;

          navLinks.forEach(function (link) {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + sectionId
            );
          });
        }
      });
    }, {
      rootMargin: "-25% 0px -60% 0px"
    });

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");

  if (contactForm && formFeedback) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      formFeedback.textContent =
        "The form design works, but messages are not sent yet. Connect an email service to receive them.";

      formFeedback.classList.add("feedback-warning");
    });
  }

});