// The player script loads, but Material delays when custom elements are upgraded.
// This ensures AsciinemaPlayer.create() runs after everything is ready.

document.addEventListener("DOMContentLoaded", () => {
  // Small delay to let Material finish its own initialization
  setTimeout(() => {
    document.querySelectorAll(".asciinema-player").forEach((el) => {
      if (!el.dataset.asciinemaInitialized) {
        const src = el.getAttribute("src");
        const opts = {
          cols: el.getAttribute("cols") || undefined,
          rows: el.getAttribute("rows") || undefined,
          autoplay: el.hasAttribute("autoplay") || false,
          loop: el.hasAttribute("loop") || false,
          poster: el.getAttribute("poster") || undefined,
        };
        AsciinemaPlayer.create(src, el, opts);
        el.dataset.asciinemaInitialized = "true";
      }
    });
  }, 100);
});
