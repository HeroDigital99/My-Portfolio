(() => {
  const body = document.body;
  const root = body?.dataset.root || "./";

  const loadComponent = async (name) => {
    const target = document.querySelector(`[data-component="${name}"]`);
    if (!target) return;
    try {
      const response = await fetch(`${root}components/${name}.html`);
      if (!response.ok) throw new Error(`Unable to load ${name}`);
      const markup = await response.text();
      target.outerHTML = markup.replaceAll("{{ROOT}}", root);
    } catch (error) {
      target.innerHTML = `<p class="component-error">${name} is unavailable in this preview. Start the site through a local HTTP server.</p>`;
      console.warn(error);
    }
  };

  Promise.all([loadComponent("header"), loadComponent("footer")]).finally(() => {
    document.dispatchEvent(new CustomEvent("components:ready"));
  });
})();
