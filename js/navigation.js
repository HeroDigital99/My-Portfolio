(() => {
  const initNavigation = () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const dropdowns = [...document.querySelectorAll("[data-dropdown]")];
    if (!menuToggle || !navLinks) return;

    const closeMenu = () => {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    };

    menuToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(open));
    });

    dropdowns.forEach((dropdown) => {
      const button = dropdown.querySelector(".nav-dropdown-toggle");
      button?.addEventListener("click", () => {
        const open = dropdown.classList.toggle("is-open");
        button.setAttribute("aria-expanded", String(open));
        dropdowns.filter((item) => item !== dropdown).forEach((item) => {
          item.classList.remove("is-open");
          item.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
        });
      });
    });

    navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".nav-dropdown")) {
        dropdowns.forEach((dropdown) => {
          dropdown.classList.remove("is-open");
          dropdown.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
        });
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        dropdowns.forEach((dropdown) => dropdown.classList.remove("is-open"));
      }
    });

    const page = document.body.dataset.page;
    if (page) {
      document.querySelectorAll(`[data-nav="${page}"]`).forEach((link) => link.classList.add("active"));
      if (["project", "projects"].includes(page)) document.querySelector("[data-dropdown] .nav-dropdown-toggle")?.classList.add("active");
      if (["insight", "insights"].includes(page)) document.querySelectorAll("[data-dropdown]")[1]?.querySelector(".nav-dropdown-toggle")?.classList.add("active");
    }
  };

  document.addEventListener("components:ready", initNavigation, { once: true });
  document.addEventListener("DOMContentLoaded", initNavigation, { once: true });
})();
