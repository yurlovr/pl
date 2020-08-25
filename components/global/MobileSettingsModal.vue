<template>
    <div v-if="show_mobile_preview" :class="`mobile-modal banner-mobile-${this.modalNumber}`"
         :style="{'background-image': 'url(' + require('~/static/pics/global/mobile/banner_' + this.modalNumber + '.png') + ')' }">
      <div class="content" :class="{'d-flex justify-content-between align-items-center': this.modalNumber === 1}">
        <div :class="{'d-flex justify-content-end': this.modalNumber > 1}" @click="closeModal">
          <img src="~/static/pics/global/mobile/close.png" alt="Убрать">
        </div>
        <div :class="{'text-center logo-block': this.modalNumber > 1}">
          <img v-if="this.modalNumber === 1" src="~/static/pics/global/mobile/logo.png" alt="НашПляж">
          <img v-else src="~/static/pics/global/mobile/logo_2.png" alt="НашПляж" class="w-100">
        </div>
        <div>
          <p class="text">Попробуйте приложение</p>
          <div v-if="this.modalNumber === 1" class="d-flex justify-content-between">
            <div v-for="item in data" class="d-inline-block">
              <a v-if="item.active === true" :href="item.value">
                <img v-if="item.code === 'mobile_android_link'" src="~/static/pics/global/mobile/play.png" alt="Goggle Play">
                <img v-if="item.code === 'mobile_ios_link'" src="~/static/pics/global/mobile/store.png" alt="App Store">
              </a>
            </div>
          </div>
          <div v-else class="d-flex text-center link-block">
            <div v-for="item in data" class="d-inline-block mr-1 ml-1 w-50">
              <a v-if="item.active === true" :href="item.value">
                <img v-if="item.code === 'mobile_android_link'" src="~/static/pics/global/mobile/play_2.png" alt="Goggle Play" class="w-100">
                <img v-if="item.code === 'mobile_ios_link'" src="~/static/pics/global/mobile/store_2.png" alt="App Store" class="w-100">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "MobileSettingsModal",
        props: ['data'],
        data() {
          return {
            modalNumber: 2
          }
        },
        methods: {
          closeModal() {
            this.$emit('closeModal', false)
            this.$store.commit('main/setMobileState', false)
          }
        },
        computed: {
          ...mapState({
            show_mobile_preview: state => state.main.show_mobile_preview
          })
        },
        mounted() {
          this.modalNumber = 2;
        },
    }
</script>
