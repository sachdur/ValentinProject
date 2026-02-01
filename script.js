(() => {
  const questionContainer = document.querySelector('.question-container');
  const resultContainer = document.querySelector('.result-container');
  const gifResult = document.querySelector('.gif-result');
  const heartLoader = document.querySelector('.cssload-main');
  const yesBtn = document.querySelector('.js-yes-btn');
  const noBtn = document.querySelector('.js-no-btn');
  const buttonArea = document.querySelector('.button-container');
  const soundBtn = document.querySelector('.js-sound-btn');

  if (!questionContainer || !resultContainer || !gifResult || !heartLoader || !yesBtn || !noBtn || !buttonArea) {
    console.error('Missing expected DOM elements. Check your HTML class names.');
    return;
  }

  let revealTimeout = null;

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function moveNoButton() {
    // Ensure the button stays inside the button area.
    const areaRect = buttonArea.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxX = Math.max(0, areaRect.width - btnRect.width);
    const maxY = Math.max(0, areaRect.height - btnRect.height);

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    noBtn.style.left = `${Math.round(newX)}px`;
    noBtn.style.top = `${Math.round(newY)}px`;
  }

  // Desktop hover
  noBtn.addEventListener('mouseenter', moveNoButton);

  // Mobile / touch (and also works on desktop)
  noBtn.addEventListener(
    'touchstart',
    (e) => {
      e.preventDefault();
      moveNoButton();
    },
    { passive: false }
  );

  // If user tries to click "No", we still move it.
  noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
  });

  // Keep it within bounds on resize.
  window.addEventListener('resize', () => {
    const areaRect = buttonArea.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const left = parseFloat(noBtn.style.left || '0');
    const top = parseFloat(noBtn.style.top || '0');

    const maxX = Math.max(0, areaRect.width - btnRect.width);
    const maxY = Math.max(0, areaRect.height - btnRect.height);

    noBtn.style.left = `${Math.round(clamp(left, 0, maxX))}px`;
    noBtn.style.top = `${Math.round(clamp(top, 0, maxY))}px`;
  });

  yesBtn.addEventListener('click', () => {
    if (revealTimeout) clearTimeout(revealTimeout);

    // Make sure the result video is allowed to play on mobile.
    try {
      gifResult.currentTime = 0;
      gifResult.play().catch(() => {});
    } catch (_) {}

    questionContainer.style.display = 'none';
    heartLoader.style.display = 'block';

    revealTimeout = setTimeout(() => {
      heartLoader.style.display = 'none';
      resultContainer.style.display = 'block';

      // Optional: show a button to enable sound (most phones block autoplay w/ sound)
      if (soundBtn) soundBtn.hidden = false;
    }, 2500);
  });

  if (soundBtn) {
    soundBtn.addEventListener('click', async () => {
      try {
        gifResult.muted = false;
        gifResult.volume = 1;
        await gifResult.play();
        soundBtn.hidden = true;
      } catch (e) {
        // If the browser still blocks it, keep the button visible.
        console.warn('Sound/Play blocked by browser:', e);
      }
    });
  }

  // Initial "No" position inside the area
  requestAnimationFrame(() => {
    const areaRect = buttonArea.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    const maxX = Math.max(0, areaRect.width - btnRect.width);
    const startX = Math.round(maxX * 0.65);
    noBtn.style.left = `${startX}px`;
    noBtn.style.top = '0px';
  });
})();
