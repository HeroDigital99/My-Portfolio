(() => {
  const initShared = () => {
    document.querySelectorAll("[data-current-year]").forEach((node) => { node.textContent = "2026"; });

    const form = document.querySelector("[data-contact-form]");
    if (form) {
      const status = form.querySelector("[data-form-status]");
      const fields = [...form.querySelectorAll("input[required], textarea[required]")];
      const setError = (field, message) => {
        const error = form.querySelector(`[data-error-for="${field.id}"]`);
        if (error) error.textContent = message;
        field.setAttribute("aria-invalid", message ? "true" : "false");
      };
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        let valid = true;
        fields.forEach((field) => {
          const value = field.value.trim();
          let message = "";
          if (!value) message = "This field is required.";
          else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = "Enter a valid email address.";
          setError(field, message);
          if (message) valid = false;
        });
        if (!valid) {
          status.textContent = "Please review the highlighted fields.";
          status.dataset.state = "error";
          return;
        }
        status.textContent = "The form is validated locally. Connect it to a backend or form service before production use; no message was sent.";
        status.dataset.state = "notice";
      });
      fields.forEach((field) => field.addEventListener("input", () => setError(field, "")));
    }
  };

  document.addEventListener("DOMContentLoaded", initShared, { once: true });
})();
