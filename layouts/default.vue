<template>
  <div id="content">
    <!-- <PageTransitioner /> -->
    <!-- <Preloader /> -->

    <MobileSettingsModal
      v-if="getMobileSettings && getMobileSettings.length > 0"
      :data="getMobileSettings"
    />

    <Header />

    <transition
      @afterEnter="transitionEnd()"
    >
      <nuxt class="full-screen" />
    </transition>
    <div class="main-page__white-wrapper">
      <Footer />
    </div>
    <search-popup
      v-if="choose_position"
      :coords="user_coordinates"
      @close="$store.commit('setChoosePosition', false)"
      @clean="$store.commit('setLastUserPos', {})"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Preloader from '~/components/global/Preloader';
import PageTransitioner from '~/components/global/PageTransitioner';
import Header from '~/components/global/Header';
import Footer from '~/components/global/Footer';
import SearchPopup from '~/components/global/search/SearchPopup';
import MobileSettingsModal from '~/components/global/MobileSettingsModal';

export default {

  components: {
    PageTransitioner,
    Preloader,
    Header,
    Footer,
    SearchPopup,
    MobileSettingsModal,
  },
  middleware: 'error',
  data() {
    return {
      open_app: false,
    };
  },

  computed: {
    ...mapState([
      'choose_position',
      'user_coordinates',
    ]),
    ...mapGetters(['getMobileSettings']),
  },

  beforeDestroy() {
    // document.removeEventListener('touchstart', ()=>{}, true);
    // document.removeEventListener('touchstart', ()=>{}, true);
    // document.removeEventListener('mousemove', ()=>{}, true);
  },

  mounted() {
    console.log('Layout mounted');

    // let scr = document.createElement('script')
    // scr.type = 'text/javascript';
    // scr.innerHTML ='!function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://vk.com/js/api/openapi.js?168",t.onload=function()\n' +
    //   '\n' +
    //   '{VK.Retargeting.Init("VK-RTRG-505686-cbKtO"),VK.Retargeting.Hit()}\n' +
    //   ',document.head.appendChild(t)}();';
    // let noscr = document.createElement('noscript')
    // noscr.innerHTML = '<img src="https://vk.com/rtrg?p=VK-RTRG-505686-cbKtO" style="position:fixed; left:-999px;" alt=""/>'
    // document.head.appendChild(scr);
    // document.head.appendChild(noscr);

    window.history.scrollRestoration = 'manual';

    function watchForHover() {
      let hasHoverClass = false;
      const container = document.body;
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

  methods: {
    transitionEnd() {
      if (this.$router.currentRoute.path !== '/') this.$bus.$emit('hidePageTransitioner');
    },
  },
  beforeRouteLeave(to, from, next) {
    this.$bus.$emit('transition');
    setTimeout(() => { next(); }, 500);
  },
};
</script>
