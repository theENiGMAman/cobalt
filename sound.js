(function() {
  // Use a unique key so we don’t re-create it every page load
  if (!window.__cobaltLoopAudio) {
    const loop = document.createElement("audio");
    loop.src = "loop1.mp3";
    loop.loop = true;
    loop.autoplay = true;
    loop.volume = 0.6;
    loop.muted = false;

    // Try autoplay, otherwise wait for user click
    loop.play().catch(() => {
      document.addEventListener("click", () => {
        loop.play();
      }, { once: true });
    });

    // Store reference globally so it survives page reloads
    window.__cobaltLoopAudio = loop;
    document.body.appendChild(loop);
  }
})();