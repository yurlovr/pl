<template>
  <div class="slider-beach-event__modal" v-body-scroll-lock="zoomPhoto" :class="{ active: zoomPhoto }">
    <button class="slider-beach-event__modal__close-button" @click="closeZoomModal()">
      <img src="~/static/pics/global/svg/cross_blue.svg">
    </button>
    <div class="slider-beach-event__modal__inner zoom-modal-inner">
      <v-zoomer :max-scale="10"
                style="width: 100%; height: 100%"
                ref="zoomer">
      <img :src="imageUrl" alt="" title="Двойной клик - максимально увеличить/уменьшить изображение">
      </v-zoomer>
      <div class="mt-3 d-flex justify-content-center align-items-center">
        <span class="mr-2 cursor-pointer" @click="$refs.zoomer.zoomIn()">
           <img src="~/static/pics/search/loop_plus.svg">
        </span>
        <span class="cursor-pointer" @click="$refs.zoomer.zoomOut()">
           <img src="~/static/pics/search/loop_min.svg">
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import VueZoomer from 'vue-zoomer'
  import Vue from "vue";
    export default {
      name: "BeachZoomImage",
      beforeMount() {
        if (process.browser) {
          Vue.use(VueZoomer);
        }
      },
      data() {
          return {
            zoomPhoto: false,
            imageUrl: null
          }
      },
      methods: {
        showZoomModal(image) {
          this.zoomPhoto = true;
          this.imageUrl = image
        },
        closeZoomModal() {
          this.zoomPhoto = false;
          this.imageUrl = null
        }
      }
    }
</script>

<style scoped>

</style>
