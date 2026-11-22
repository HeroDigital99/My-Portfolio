(() => {
  const triggers = Array.from(document.querySelectorAll("[data-gallery-trigger]"));
  if (!triggers.length) return;

  const isArabic = () => document.documentElement.dir === "rtl" || document.documentElement.lang === "ar";
  const strings = {
    en: { heading: "Image preview", close: "Close image viewer", previous: "Previous image", next: "Next image", open: "View full image" },
    ar: { heading: "معاينة الصورة", close: "إغلاق عارض الصور", previous: "الصورة السابقة", next: "الصورة التالية", open: "عرض الصورة كاملة" }
  };
  const locale = () => strings[isArabic() ? "ar" : "en"];

  const dialog = document.createElement("dialog");
  dialog.className = "project-lightbox";
  dialog.setAttribute("aria-labelledby", "project-lightbox-heading");
  dialog.innerHTML = `
    <header class="project-lightbox__top">
      <div class="project-lightbox__heading-wrap">
        <p class="project-lightbox__eyebrow">PORTFOLIO GALLERY</p>
        <h2 id="project-lightbox-heading" class="project-lightbox__heading"></h2>
      </div>
      <button class="project-lightbox__close" type="button"><span aria-hidden="true">×</span><span class="project-lightbox__sr-only"></span></button>
    </header>
    <div class="project-lightbox__stage">
      <button class="project-lightbox__nav project-lightbox__previous" type="button"><span class="project-lightbox__arrow" aria-hidden="true"></span><span class="project-lightbox__sr-only"></span></button>
      <div class="project-lightbox__image-wrap"><img class="project-lightbox__image" alt=""><p class="project-lightbox__loading" aria-live="polite"></p></div>
      <button class="project-lightbox__nav project-lightbox__next" type="button"><span class="project-lightbox__arrow" aria-hidden="true"></span><span class="project-lightbox__sr-only"></span></button>
    </div>
    <footer class="project-lightbox__bottom"><p class="project-lightbox__caption" aria-live="polite"></p><span class="project-lightbox__counter" aria-live="polite"></span></footer>
  `;
  document.body.append(dialog);

  const heading = dialog.querySelector(".project-lightbox__heading");
  const closeButton = dialog.querySelector(".project-lightbox__close");
  const previousButton = dialog.querySelector(".project-lightbox__previous");
  const nextButton = dialog.querySelector(".project-lightbox__next");
  const imageElement = dialog.querySelector(".project-lightbox__image");
  const captionElement = dialog.querySelector(".project-lightbox__caption");
  const counterElement = dialog.querySelector(".project-lightbox__counter");
  let activeItems = [];
  let activeIndex = -1;

  const captionFor = (button) => {
    const caption = button.closest("figure")?.querySelector("figcaption")?.textContent?.trim();
    return caption || button.querySelector("img")?.alt || "Portfolio image";
  };

  const updateLabels = () => {
    const labels = locale();
    const rtl = isArabic();
    heading.textContent = labels.heading;
    dialog.dir = rtl ? "rtl" : "ltr";
    closeButton.setAttribute("aria-label", labels.close);
    closeButton.title = labels.close;
    closeButton.querySelector(".project-lightbox__sr-only").textContent = labels.close;
    previousButton.setAttribute("aria-label", labels.previous);
    previousButton.querySelector(".project-lightbox__sr-only").textContent = labels.previous;
    nextButton.setAttribute("aria-label", labels.next);
    nextButton.querySelector(".project-lightbox__sr-only").textContent = labels.next;
    previousButton.querySelector(".project-lightbox__arrow").textContent = rtl ? "→" : "←";
    nextButton.querySelector(".project-lightbox__arrow").textContent = rtl ? "←" : "→";
    triggers.forEach((button) => {
      const title = `${labels.open}: ${captionFor(button)}`;
      button.setAttribute("aria-label", title);
      const hint = button.querySelector(".project-gallery-hint");
      if (hint) hint.textContent = labels.open;
    });
  };

  const render = () => {
    const button = activeItems[activeIndex];
    const image = button?.querySelector("img");
    if (!image) return;
    imageElement.src = image.currentSrc || image.src;
    imageElement.alt = image.alt || captionFor(button);
    captionElement.textContent = captionFor(button);
    counterElement.textContent = `${activeIndex + 1} / ${activeItems.length}`;
    previousButton.disabled = activeItems.length < 2;
    nextButton.disabled = activeItems.length < 2;
  };

  const openViewer = (button) => {
    const group = button.closest("[data-gallery-group]");
    activeItems = Array.from((group || document).querySelectorAll("[data-gallery-trigger]"));
    activeIndex = activeItems.indexOf(button);
    if (activeIndex < 0) return;
    updateLabels();
    render();
    document.body.classList.add("project-lightbox-open");
    if (typeof dialog.showModal === "function") {
      try { dialog.showModal(); }
      catch (_) { dialog.setAttribute("open", ""); dialog.classList.add("is-fallback"); }
    } else {
      dialog.setAttribute("open", "");
      dialog.classList.add("is-fallback");
    }
    closeButton.focus();
  };

  const closeViewer = () => {
    if (dialog.open && typeof dialog.close === "function") dialog.close();
    else {
      dialog.removeAttribute("open");
      dialog.classList.remove("is-fallback");
      document.body.classList.remove("project-lightbox-open");
    }
  };

  const move = (step) => {
    if (activeItems.length < 2) return;
    activeIndex = (activeIndex + step + activeItems.length) % activeItems.length;
    render();
  };

  triggers.forEach((button) => {
    button.type = "button";
    button.setAttribute("aria-haspopup", "dialog");
    button.addEventListener("click", () => openViewer(button));
  });
  closeButton.addEventListener("click", closeViewer);
  previousButton.addEventListener("click", () => move(-1));
  nextButton.addEventListener("click", () => move(1));
  dialog.addEventListener("click", (event) => { if (event.target === dialog) closeViewer(); });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("project-lightbox-open");
    imageElement.removeAttribute("src");
    activeItems = [];
    activeIndex = -1;
  });
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") { event.preventDefault(); move(isArabic() ? 1 : -1); }
    if (event.key === "ArrowRight") { event.preventDefault(); move(isArabic() ? -1 : 1); }
    if (event.key === "Home" && activeItems.length) { event.preventDefault(); activeIndex = 0; render(); }
    if (event.key === "End" && activeItems.length) { event.preventDefault(); activeIndex = activeItems.length - 1; render(); }
  });

  updateLabels();
  new MutationObserver(updateLabels).observe(document.documentElement, { attributes: true, attributeFilter: ["dir", "lang"] });
})();
