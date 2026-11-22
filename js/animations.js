(() => {
  const initScrollAtmosphere = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ticking = false;
    const update = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      document.documentElement.style.setProperty("--scroll-progress", (window.scrollY / maxScroll).toFixed(3));
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });
    update();
  };

  const initAnimations = () => {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        instance.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -24px" });
    items.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 45, 280)}ms`;
      observer.observe(item);
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    initAnimations();
    initScrollAtmosphere();
  }, { once: true });
})();
