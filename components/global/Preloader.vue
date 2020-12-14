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
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
  },
};
</script>
