<template>
  <div class="modal-for-3d" v-body-scroll-lock="true">
    <div class="modal-for-3d__modal">
      <div class="modal-for-3d__modal__body">
        <p class="modal-for-3d__modal__body__cross" @click.stop="close">&#10005</p>
        <iframe v-lazy-load :data-src="url" width="560" height="315" allowfullscreen="allowfullscreen"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      url: {
        type: String,
        default: 'https://flystar-rk.ru/pano/Pano_na_site_FlyStar/Chernomorsk_s_visoti/Chernomorsk_s_visoti.html'
      }
    },
    methods:{
      close(){
        // if (event.keyCode == 27) {
          console.log('fdssdfdsf')
          this.$emit('close-modal');
        // }
      }
    }
  }
</script>
