<template>
  <div>
    <PageTransitioner />
    <Preloader />
    <Header />
    <nuxt />
    <div class="main-page__white-wrapper"><Footer /></div>
  </div>
</template>

<script>
  import Preloader from '~/components/global/Preloader';
  import PageTransitioner from '~/components/global/PageTransitioner';
  import Header from '~/components/global/Header';
  import Footer from '~/components/global/Footer';

  export default {
    components: {
      PageTransitioner,
      Preloader,
      Header,
      Footer
    },

    mounted() {
      if (process.client && window) {
        window.history.scrollRestoration = 'auto';
      }

      function watchForHover() {
        let hasHoverClass = false;
        let container = document.body;
        let lastTouchTime = 0;

        function enableHover() {
            // discard emulated mouseMove events coming from touch events
            if (new Date() - lastTouchTime < 500) return;
            if (hasHoverClass) return;

            container.className = container.className.replace('touch', '');
            hasHoverClass = true;
        }

        function disableHover() {
            if (!hasHoverClass) return;

            container.className += 'touch';
            hasHoverClass = false;
        }

        function updateLastTouchTime() {
            lastTouchTime = new Date();
        }

        document.addEventListener('touchstart', updateLastTouchTime, true);
        document.addEventListener('touchstart', disableHover, true);
        document.addEventListener('mousemove', enableHover, true);

        enableHover();
      }

      watchForHover();
    }
  }
</script>
