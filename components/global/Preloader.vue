<template>
  <div
    v-if="loading"
    class="preloader"
  >
    <img
      src="~/static/pics/global/svg/logo-blue.svg"
      alt="НашПляж"
    >
  </div>
</template>

<script>

export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    start() {
      console.log('STARST')
      this.loading = true;
    },
    finish() {
      console.log('FINISH')
      this.loading = false;
    },
  },
};
</script>
