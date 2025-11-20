document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".asciicast").forEach(el => {
    const src = el.dataset.src;
    if (src) {
      AsciinemaPlayer.create(src, el, {
        // optional options
        fit: "width",
        loop: true,
        autoPlay: true,
        preload: true
      });
    }
  });
});
