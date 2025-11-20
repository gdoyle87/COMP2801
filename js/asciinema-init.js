// Enhanced init for Material for MkDocs + GitHub Pages + Admonitions
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    // Scan for any element with a .cast src (covers <asciinema-player> or divs)
    document.querySelectorAll('[src*=".cast"]').forEach((el) => {
      if (!el.dataset.asciinemaInitialized) {
        const src = el.getAttribute("src");
        if (!src) return;

        const opts = {
          cols: parseInt(el.getAttribute("cols")) || undefined,
          rows: parseInt(el.getAttribute("rows")) || undefined,
          autoplay: el.hasAttribute("autoplay") || false,
          loop: el.hasAttribute("loop") || false,
          preload: el.hasAttribute("preload") || false,  // Now handles preload="true"
          poster: el.getAttribute("poster") || undefined,
          // Add startFrom if needed: startFrom: parseInt(el.getAttribute("start-from")) || 0,
        };

        try {
          AsciinemaPlayer.create(src, el, opts);
          el.dataset.asciinemaInitialized = "true";
          console.log("Asciinema initialized:", src);  // Debug: check console
        } catch (error) {
          console.error("Asciinema init failed for", src, error);
        }
      }
    });
  }, 250);  // Bumped for admonitions
});
