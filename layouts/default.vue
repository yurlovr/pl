<template>
  <div>
    <Preloader />
    <Header />
    <nuxt />
    <Footer />
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
    }
  }
</script>
