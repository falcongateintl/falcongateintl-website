(() => {
  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // Mobile drawer
  const btn = document.querySelector(".mobile-toggle");
  const drawer = document.getElementById("mobileDrawer");
  if (btn && drawer) {
    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!isOpen));
      drawer.hidden = isOpen;
      drawer.style.display = isOpen ? "none" : "block";
    });

    // Close drawer when clicking a link
    drawer.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        btn.setAttribute("aria-expanded", "false");
        drawer.hidden = true;
        drawer.style.display = "none";
      });
    });
  }

  // Contact form (mailto prefill)
  const form = document.getElementById("contactForm");
  if (!form) return;

  const status = document.getElementById("formStatus");
  const emailTo = "info@falcongateintl.com";
  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("#name")?.value?.trim();
    const email = form.querySelector("#email")?.value?.trim();
    const company = form.querySelector("#company")?.value?.trim();
    const topic = form.querySelector("#topic")?.value?.trim();
    const message = form.querySelector("#message")?.value?.trim();

    if (!name || !email || !topic || !message || !isEmail(email)) {
      if (status) status.textContent = "Please complete the required fields (valid email, topic, and message).";
      return;
    }

    const subject = `Website Inquiry: ${topic}`;
    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      `Topic: ${topic}`,
      "",
      "Message:",
      message
    ].filter(Boolean);

    const body = encodeURIComponent(lines.join("\n"));
    const url = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${body}`;

    if (status) status.textContent = "Opening your email client…";
    window.location.href = url;
  });
})();
