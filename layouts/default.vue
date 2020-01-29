<template>
  <div>
    <Preloader />
    <Header />
    <nuxt />
    <div class="main-page__white-wrapper"><Footer /></div>
  </div>
</template>

<script>
  import Preloader from '~/components/global/Preloader';
  import Header from '~/components/global/Header';
  import Footer from '~/components/global/Footer';

  export default {
    components: {
      Preloader,
      Header,
      Footer
    },

    mounted() {
      if (process.client && window) {
        window.history.scrollRestoration = 'auto';
      }
    }
  }
</script>
