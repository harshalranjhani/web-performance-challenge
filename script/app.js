const CONTENT_BREAKING_NEWS = "BREAKING NEWS: 5 people arrested for non designing responsively ***** Sprite popularity drops even further after new, less sugary, drink introduction.*****"
const CONTENT_ARTICLE_TEASERS = [
  "This is an article about first party that happened this weekend",
  "This is an article about second party that happened this weekend",
  "This is an article about third party that happened this weekend"
];

// Initialize content immediately - BEFORE any paint to prevent CLS
const initContent = () => {
  // Use requestAnimationFrame to inject content before layout calculation
  requestAnimationFrame(() => {
    // Populate dynamic content
    const teasers = document.querySelectorAll('.teaser__text');
    const newsTickerBar = document.querySelector('.news-ticker');

    if (newsTickerBar) {
      newsTickerBar.textContent = CONTENT_BREAKING_NEWS;
    }

    teasers.forEach((teaser, index) => {
      if (CONTENT_ARTICLE_TEASERS[index]) {
        teaser.textContent = CONTENT_ARTICLE_TEASERS[index];
      }
    });
  });

  // Handle form submission (non-blocking)
  const form = document.querySelector('.form__base');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Form submitted!');
    });
  }
  
  // Optionally show cookie layer after page load (non-blocking)
  // Uncomment if needed: setTimeout(showCookieLayer, 2000);
};

// Optional: Show cookie layer without blocking initial render
const showCookieLayer = () => {
  const cookieLayer = document.createElement('div');
  cookieLayer.className = 'cookieLayer__base';
  cookieLayer.id = 'cookieLayer';
  cookieLayer.innerHTML = `
    <div class="cookieLayer__content">
      <h2 class="cookieLayer__title">Do you like cookies ?</h2>
      <p class="cookieLayer__text">This site uses cookies for better performance tracking.</p>
      <button class="cookieLayer__button" id="acceptCookies">Accept</button>
      <div class="cookieLayer__disclaimer">Simplified cookie layer for better performance</div>
    </div>
  `;
  document.body.insertBefore(cookieLayer, document.body.firstChild);
  
  const acceptButton = document.getElementById('acceptCookies');
  if (acceptButton) {
    acceptButton.addEventListener('click', () => {
      cookieLayer.style.display = 'none';
    });
  }
};

// Initialize ASAP - even before DOMContentLoaded if possible
if (document.readyState === 'loading') {
  // Try to initialize as early as possible
  document.addEventListener('DOMContentLoaded', initContent);
  // Also try on readystatechange for earlier execution
  document.addEventListener('readystatechange', () => {
    if (document.readyState === 'interactive') {
      initContent();
    }
  });
} else {
  initContent();
}