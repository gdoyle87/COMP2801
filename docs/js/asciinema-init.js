// asciinema-init.js – fixed version that respects cols/rows
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.querySelectorAll('.asciinema-player, [src*=".cast"]').forEach(el => {
      if (el.dataset.asciinemaInitialized) return;

      const src = el.getAttribute("src");
      if (!src) return;

      // Read cols/rows from the HTML attributes (this was missing before!)
      const cols = el.getAttribute("cols") || undefined;
      const rows = el.getAttribute("rows") || undefined;

      const opts = {
        cols: cols ? parseInt(cols, 10) : undefined,
        rows: rows ? parseInt(rows, 10) : undefined,
        preload: el.hasAttribute("preload"),
        autoplay: el.hasAttribute("autoplay"),
        loop: el.hasAttribute("loop"),
        speed: el.getAttribute("speed") || 1,
        poster: el.getAttribute("poster") || undefined,
      };

      AsciinemaPlayer.create(src, el, opts);
      el.dataset.asciinemaInitialized = "true";
      console.log("asciinema player initialized with cols:", opts.cols, "rows:", opts.rows);
    });
  }, 200);
});
