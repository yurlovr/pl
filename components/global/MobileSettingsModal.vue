<template>
    <div v-if="showModal === true" :class="`mobile-modal banner-mobile-${this.modalNumber}`"
         :style="{'background-image': 'url(' + require('~/static/pics/global/mobile/banner_' + this.modalNumber + '.png') + ')' }">
      <div class="content" :class="{'d-flex justify-content-between align-items-center': this.modalNumber === 1}">
        <div :class="{'d-flex justify-content-end': this.modalNumber > 1}" @click="closeModal">
          <img src="~/static/pics/global/mobile/close.png" alt="Убрать">
        </div>
        <div :class="{'text-center': this.modalNumber > 1}">
          <img v-if="this.modalNumber === 1" src="~/static/pics/global/mobile/logo.png" alt="НашПляж">
          <img v-else src="~/static/pics/global/mobile/logo_2.png" alt="НашПляж">
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
          <div v-else class="text-center">
            <div v-for="item in data" class="d-inline-block mr-1 ml-1">
              <a v-if="item.active === true" :href="item.value">
                <img v-if="item.code === 'mobile_android_link'" src="~/static/pics/global/mobile/play_2.png" alt="Goggle Play">
                <img v-if="item.code === 'mobile_ios_link'" src="~/static/pics/global/mobile/store_2.png" alt="App Store">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        name: "MobileSettingsModal",
        props: ['data'],
        data() {
          return {
            showModal: false,
            modalNumber: 2
          }
        },
        methods: {
          closeModal() {
            this.$emit('closeModal', false)
          }
        },
        mounted() {
          if (!localStorage.getItem('krym-visited')) {
            this.modalNumber = 2;
            this.showModal = true;
            localStorage.setItem('krym-visited', 1);
          }
        },
    }
</script>
