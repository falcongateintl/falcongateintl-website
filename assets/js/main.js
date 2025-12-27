(() => {
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

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

    drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
  }
})();
