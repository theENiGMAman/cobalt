// ===============================
// CRT EFFECTS + PASSWORD HANDLING
// ===============================

(function () {
  const display = document.getElementById("display");
  let input = "";

  if (!display) return;

  function submit() {
    if (input === PASSWORD) {
      window.location.href = "REDACTED";
    } else {
      window.location.href = "REDACTED";
    }
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      submit();
    } else if (e.key === "Backspace") {
      input = input.slice(0, -1);
    } else if (e.key.length === 1) {
      input += e.key;
    }
    display.textContent = "*".repeat(input.length);
  });
})();

// ===============================
// CRT SCANLINE + GLITCH EFFECT
// ===============================

// Flag to prevent glitch effects during loading
let pageFullyLoaded = false;
// Flag to track button effects vs auto effects
let isGlitchActive = false;
// Store current scroll position
let lastScrollPosition = 0;

// Existing CRT effects code
document.addEventListener('DOMContentLoaded', function() {
  const crtContainer = document.getElementById('crtContainer');
  // Remove the initialization class after 4 seconds (animation duration)
  setTimeout(function() {
    crtContainer.classList.remove('init-animation');
    // Set pageFullyLoaded to true after initialization animation is complete
    pageFullyLoaded = true;
  }, 4000);

  // Track the scan line and apply glitch effect at end of screen
  const scanLineElement = document.querySelector('.scan-line');
  let lastGlitchTime = 0;

  // Create a function to check scan line position and trigger glitch
  function checkScanLinePosition() {
    // Only check if page is fully loaded
    if (!pageFullyLoaded) {
      return;
    }

    // Prevent too frequent glitch effects
    const currentTime = Date.now();
    if (currentTime - lastGlitchTime < 2000) { // prevent more than once per 2 seconds
      return;
    }

    // Get the computed style of the scan line
    const computedStyle = window.getComputedStyle(scanLineElement);
    const topValue = computedStyle.getPropertyValue('top');

    // Convert to number (remove 'px' or '%' and parse)
    let position;
    if (topValue.includes('%')) {
      position = parseFloat(topValue);
    } else {
      const containerHeight = crtContainer.clientHeight;
      position = (parseFloat(topValue) / containerHeight) * 100;
    }

    // If scan line is near the bottom (>95%), trigger glitch effect
    if (position >= 95) {
      // Save current scroll position before applying effect
      lastScrollPosition = window.scrollY;

      // Using shakeScreen with playSound=false for auto glitch
      shakeScreen('glitch', false);
      lastGlitchTime = currentTime;
    }
  }

  // Set up a timer to check the scan line position more frequently
  setInterval(checkScanLinePosition, 100); // Check every 100ms for more responsiveness
});

function shakeScreen(effectType, playSound) {
  // Allow immediate effect application when buttons are clicked (playSound=true)
  // For auto effects (playSound=false), check if an effect is already active
  if (!playSound && isGlitchActive) {
    return;
  }

  // Save scroll position before effect
  lastScrollPosition = window.scrollY;

  isGlitchActive = true;
  const container = document.getElementById('crtContainer');

  // Remove all effect classes
  container.classList.remove('shake', 'horizontal-distort', 'glitch');

  // Force reflow to ensure animation restarts
  void container.offsetWidth;

  // Add only the requested effect
  container.classList.add(effectType);

  // Play sound only for button clicks, not for auto effects
  if (playSound) {
    playStaticSound();
  }

  // Remove the effect class after animation duration
  setTimeout(() => {
    container.classList.remove(effectType);
    // Reset the flag immediately to allow button effects to work instantly
    isGlitchActive = false;

    // Restore scroll position after effect completes
    window.scrollTo({
      top: lastScrollPosition,
      behavior: 'auto'
    });

  }, 600);
}

// ===============================
// AUTO TEXT
// ===============================

window.addEventListener("DOMContentLoaded", () => {
  const lines = document.querySelectorAll("#terminal p");
  let lineIndex = 0;

  function typeLine(p, callback) {
    const str = p.dataset.text || "";
    let i = 0;
    p.innerHTML = "";

    const se = setInterval(() => {
      i++;
      p.innerHTML = str.slice(0, i) + "|";
      if (i >= str.length) {
        clearInterval(se);
        p.innerHTML = str;
        if (callback) callback();
      }
    }, 20);
  }

  function typeAllLines() {
    if (lineIndex < lines.length) {
      typeLine(lines[lineIndex], () => {
        lineIndex++;
        setTimeout(typeAllLines, 300);
      });
    }
  }

  // ⏳ wait 3 seconds before starting typing
  setTimeout(typeAllLines, 3000);
});

// ===============================
// DISTORTION OVERLAY
// ===============================

(function () {
  const distort = document.querySelector(".distort-overlay");
  if (!distort) return;

  function randomize() {
    distort.style.background =
      "radial-gradient(circle at " +
      Math.random() * 100 +
      "% " +
      Math.random() * 100 +
      "%, rgba(0,255,128," +
      Math.random() * 0.15 +
      ") 0%, transparent 80%)";
  }

  setInterval(randomize, 120);
})();

