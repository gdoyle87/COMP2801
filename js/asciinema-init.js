document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("demo-cast");
  if (!el || !window.AsciinemaPlayer) return;

  AsciinemaPlayer.create("casts/cli.cast", el, {
    // optional options
    fit: "width",
    loop: true,
    autoPlay: true,
    preload: true
  });
});
