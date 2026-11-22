(() => {
  const initProjectFilters = () => {
    const buttons = [...document.querySelectorAll("[data-filter-button]")];
    const cards = [...document.querySelectorAll("[data-category]")];
    if (!buttons.length || !cards.length) return;
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filterButton;
        buttons.forEach((item) => {
          const active = item === button;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-pressed", String(active));
        });
        cards.forEach((card) => {
          const categories = (card.dataset.category || "").split(" ");
          const show = filter === "all" || categories.includes(filter);
          card.classList.toggle("is-hidden", !show);
        });
      });
    });
  };
  document.addEventListener("DOMContentLoaded", initProjectFilters, { once: true });
})();
