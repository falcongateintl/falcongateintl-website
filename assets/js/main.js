(() => {
  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // Mobile menu
  const header = document.querySelector(".header");
  const btn = document.getElementById("menuBtn");
  const drawer = document.getElementById("mobileDrawer");

  if (!btn || !drawer) return;

  let lastFocus = null;

  const setOpen = (open) => {
    btn.setAttribute("aria-expanded", String(open));
    drawer.hidden = !open;

    if (header) header.classList.toggle("menu-open", open);
    document.body.classList.toggle("no-scroll", open);

    if (open) {
      lastFocus = document.activeElement;
      const firstLink = drawer.querySelector("a");
      if (firstLink) firstLink.focus();
    } else {
      if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
      lastFocus = null;
    }
  };

  // Initialize closed
  setOpen(false);

  // Toggle via button
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = btn.getAttribute("aria-expanded") !== "true";
    setOpen(open);
  });

  // Close when a nav link is clicked
  drawer.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => setOpen(false));
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    const isOpen = btn.getAttribute("aria-expanded") === "true";
    if (!isOpen) return;

    const target = e.target;
    const clickedInside =
      (header && header.contains(target)) || drawer.contains(target) || btn.contains(target);

    if (!clickedInside) setOpen(false);
  });
})();
