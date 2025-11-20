document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("cli-cast");
  if (!el || !window.AsciinemaPlayer) return;

  AsciinemaPlayer.create("casts/cli.cast", el, {
    // optional options
    fit: "width",
    loop: true,
    autoPlay: true,
    preload: true
  });
});
