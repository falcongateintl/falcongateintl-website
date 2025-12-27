(() => {
  // Year
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // Mobile drawer toggle
  const header = document.querySelector(".header");
  const btn = document.getElementById("menuBtn");
  const drawer = document.getElementById("mobileDrawer");

  if (btn && drawer && header) {
    const setOpen = (open) => {
      btn.setAttribute("aria-expanded", String(open));
      drawer.hidden = !open;
      header.classList.toggle("menu-open", open);
    };

    setOpen(false);

    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") !== "true";
      setOpen(open);
    });

    drawer.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  }

  // Formspree submit
  const form = document.getElementById("contactForm");
  if (!form) return;

  const status = document.getElementById("formStatus");
  const submitBtn = form.querySelector('button[type="submit"]');

  const setStatus = (msg) => {
    if (status) status.textContent = msg;
  };

  const setLoading = (loading) => {
    if (!submitBtn) return;
    submitBtn.disabled = loading;
    submitBtn.textContent = loading ? "Sending…" : "Send message";
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    setStatus("");
    setLoading(true);

    try {
      const action = form.getAttribute("action");
      if (!action) {
        setStatus("Form is missing the Formspree action URL.");
        setLoading(false);
        return;
      }

      const formData = new FormData(form);

      const res = await fetch(action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      });

      if (res.ok) {
        form.reset();
        setStatus("Message sent. We’ll respond shortly.");
      } else {
        let msg = "Something went wrong. Please try again or email info@falcongateintl.com.";
        try {
          const data = await res.json();
          if (data && data.errors && data.errors.length) {
            msg = data.errors.map(e => e.message).join(" ");
          }
        } catch {}
        setStatus(msg);
      }
    } catch (err) {
      setStatus("Network error. Please try again or email info@falcongateintl.com.");
    } finally {
      setLoading(false);
    }
  });
})();
