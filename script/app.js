const CONTENT_BREAKING_NEWS = "BREAKING NEWS: 5 people arrested for non designing responsively ***** Sprite popularity drops even further after new, less sugary, drink introduction.*****"
const CONTENT_ARTICLE_TEASERS = [
  "This is an article about first party that happened this weekend",
  "This is an article about second party that happened this weekend",
  "This is an article about third party that happened this weekend"
];

// Initialize content immediately
const initContent = () => {
  // Populate dynamic content
  const teasers = document.querySelectorAll('.teaser__text');
  const newsTickerBar = document.querySelector('.news-ticker');

  if (newsTickerBar) {
    newsTickerBar.textContent = CONTENT_BREAKING_NEWS;
  }

  teasers.forEach((teaser, index) => {
    teaser.textContent = CONTENT_ARTICLE_TEASERS[index];
  });

  // Handle cookie layer
  const cookieLayer = document.getElementById('cookieLayer');
  const acceptButton = document.getElementById('acceptCookies');

  if (cookieLayer && acceptButton) {
    // Block scrolling initially
    document.body.classList.add('no-scroll');

    acceptButton.addEventListener('click', () => {
      cookieLayer.classList.add('cookieLayer__base--accepted');
      cookieLayer.style.display = 'none';
      document.body.classList.remove('no-scroll');
    });
  }

  // Handle form submission
  const submitButton = document.getElementById('button');
  if (submitButton) {
    submitButton.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Form submitted!');
    });
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContent);
} else {
  initContent();
}