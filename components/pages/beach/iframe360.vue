<template>
  <div v-body-scroll-lock="true" class="modal-for-3d">
    <div class="modal-for-3d__modal">
      <div class="modal-for-3d__modal__body">
        <p class="modal-for-3d__modal__body__cross" @click.stop="close">
          &#10005
        </p>
        <a
          href="/"
          target="_blank"
          class="logo-360"
        ><img src="~/static/pics/global/svg/logo-white.svg" alt="НашПляж"></a>

        <iframe
          v-lazy-load
          :data-src="url"
          width="560"
          height="315"
          allowfullscreen="allowfullscreen"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: 'https://flystar-rk.ru/pano/Pano_na_site_FlyStar/Chernomorsk_s_visoti/Chernomorsk_s_visoti.html',
    },
  },
  methods: {
    close() {
      // if (event.keyCode == 27) {
      this.$emit('close-modal');
      // }
    },
  },
};
</script>
