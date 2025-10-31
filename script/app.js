const CONTENT_BREAKING_NEWS = "BREAKING NEWS: 5 people arrested for non designing responsively ***** Sprite popularity drops even further after new, less sugary, drink introduction.*****"
const CONTENT_ARTICLE_TEASERS = [
  "This is an article about first party that happened this weekend",
  "This is an article about second party that happened this weekend",
  "This is an article about third party that happened this weekend" ];

const acceptCookies = () => {
  document.body.classList.remove('no-scroll');
  document.querySelector('.cookieLayer__base').classList.add('cookieLayer__base--accepted');
};

const dynamicContent = () => {
  const teasers = document.querySelectorAll('.teaser__text');
  const newsTickerBar = document.querySelector('.news-ticker');

  // Set content immediately for better performance
  if (newsTickerBar) {
    newsTickerBar.textContent = CONTENT_BREAKING_NEWS;
  }

  // create dynamic content
  teasers.forEach((teaser, index) => {
    teaser.textContent = CONTENT_ARTICLE_TEASERS[index];
  });
};

const cookieLayerInit = () => {
  Vue.component('CookieLayer', {
    template: `<div class="cookieLayer__content">
        <h2 class="cookieLayer__title">{{ title }}</h2>
        <p class="cookieLayer__text">{{ text1 }}</p>
        <p class="cookieLayer__text">{{ text2 }}</p>
        <button class="cookieLayer__button" button v-on:click="$emit('accept')">{{ buttonLabel }}</button>
        <div class="cookieLayer__disclaimer">{{ disclaimer }}</div>
      </div>`,
      data: function () {
        return {
          title: 'Do you like cookies ?',
          text1: 'This is the best chocolate chip cookies recipe ever! No funny ingredients, no chilling time, etc. Just a simple, straightforward, amazingly delicious, doughy yet still fully cooked, chocolate chip cookie that turns out perfectly every single time!',
          text2: 'The first step in making these easy chocolate chip cookies to to combine the dry ingredients in a medium size bowl. Next, cream together butter and sugars. Add the eggs & vanilla and beat to combine. Add dry ingredients and stir until just combined. Then add the chocolate chips and beat until they are evenly distributed throughout the dough.',
          buttonLabel: 'I solemny swear I will bake these cookies',
          disclaimer: 'This box is made using Vue.js and is super awesome !!! ............. or is it ???'
        }
      },
  });

  const vueApp = new Vue({
    el: '#cookie-vue',
    data: { 
      displayCookieBox: true,
    },
    methods: {
      acceptCookies() {
        this.displayCookieBox = false;
        document.body.classList.remove('no-scroll');
      }
    },
    mounted() {
      document.body.classList.add('no-scroll');
    }
  });
};

// Removed performance-killing functions:
// - layoutTrashing: Caused unnecessary layout recalculations
// - JSblocking: Blocked main thread with pointless loop

const initApp = () => {
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContent);
  } else {
    initContent();
  }
};

const initContent = () => {
  // Initialize lazy loading if available
  if (typeof LazyLoad !== 'undefined') {
    const lazyLoadInstance = new LazyLoad();
    lazyLoadInstance.update();
  }

  dynamicContent();

  // Initialize Vue-based cookie layer if Vue is available
  if (typeof Vue !== 'undefined') {
    cookieLayerInit();
  }

  // Add event listener for form submission
  const submitButton = document.getElementById('button');
  if (submitButton) {
    submitButton.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Form submitted!');
    });
  }
};

initApp();