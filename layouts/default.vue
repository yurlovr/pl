<template>
  <div id="content">
    <PageTransitioner/>
    <Preloader/>
    <Header/>
    <transition
      @afterEnter="transitionEnd()"
    >
      <nuxt class="full-screen"/>
    </transition>
    <div class="main-page__white-wrapper">
      <Footer/>
    </div>
    <search-popup v-if="choose_position" @close="choose_position = false" :coords="last_coordinates"
                  @clean="last_coordinates = {}"></search-popup>
  </div>
</template>

<script>
  import Preloader from '~/components/global/Preloader';
  import PageTransitioner from '~/components/global/PageTransitioner';
  import Header from '~/components/global/Header';
  import Footer from '~/components/global/Footer';
  import SearchPopup from '~/components/global/search/SearchPopup';

  import {mapState} from 'vuex';

  export default {
    middleware: 'error',

    components: {
      PageTransitioner,
      Preloader,
      Header,
      Footer,
      SearchPopup
    },
    data() {
      return {
        choose_position: false,
        last_coordinates: this.$cookies.get('last_coordinates') || {}
      }
    },

    computed: {
      ...mapState(['beaches', 'events'])
    },

    methods: {
      transitionEnd() {
        if (this.$router.currentRoute.path != '/')
          this.$bus.$emit('hidePageTransitioner');
      }
    },

    created() {
      this.$bus.$on('position-modal', (state, coords) => {
        this.last_coordinates = coords
        this.choose_position = state
      })

    },

    mounted() {
      if (process.browser) {

        let scr = document.createElement('script')
        scr.type = 'text/javascript';
        scr.innerHTML = '!function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://vk.com/js/api/openapi.js?168",t.onload=function()\n' +
          '\n' +
          '{VK.Retargeting.Init("VK-RTRG-505686-cbKtO"),VK.Retargeting.Hit()}\n' +
          ',document.head.appendChild(t)}();';
        // let noscr = document.createElement('noscript')
        // noscr.innerHTML = '<img src="https://vk.com/rtrg?p=VK-RTRG-505686-cbKtO" style="position:fixed; left:-999px;" alt=""/>'
        document.head.appendChild(scr);
      }
      // document.head.appendChild(noscr);


      if (process.client && window) {
        window.history.scrollRestoration = 'manual';
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
    },

    beforeRouteLeave(to, from, next) {
      this.$bus.$emit('transition');
      setTimeout(() => {
        next()
      }, 500);
    }
  }
</script>
