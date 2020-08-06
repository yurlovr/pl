<template>
    <div v-if="showModal === true" class="mobile-modal">
      <div class="d-flex justify-content-end" @click="closeModal">
        <img src="~/static/pics/global/svg/close.svg" alt="Убрать">
      </div>
      <div class="text-center">
        <img  src="~/static/pics/global/svg/logo-blue.svg" alt="НашПляж">
      </div>
      <div class="app-view">
        <img  src="~/static/pics/global/svg/logo-blue.svg" alt="НашПляж">
      </div>
      <div class="big-txt">
        <p>С приложением путешествовать проще</p>
      </div>
      <div class="small-txt">
        <p>В приложении удобнее всего совершать, редактировать и отменять бронирования.</p>
      </div>
      <div class="d-flex justify-content-center mt-4">
        <div v-for="item in data">
          <a v-if="item.active === true"
             class="btn btn-dark mobile-link" :href="item.value" role="button">
            <!--<i class="fa fa-apple btn-icon-prepend mdi-36px"></i>-->
            <span class="d-inline-block text-left">
            <small class="font-weight-light d-block">
              {{item.code === 'mobile_ios_link' ? 'Available on the' :
                (item.code === 'mobile_android_link' ? 'Get it on the' : '')}}
            </small>
              {{item.code === 'mobile_ios_link' ? 'App Store' :
                (item.code === 'mobile_android_link' ? 'Google Play' : '')}}
            </span>
          </a>
        </div>
      </div>
      <div class="pt-3 text-center">
        <a href="#" @click="closeModal">Продолжить в мобильной версии сайта</a>
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
            showModal: false
          }
        },
        methods: {
          closeModal() {
            this.$emit('closeModal', false)
          }
        },
        mounted() {
          if (localStorage.getItem('mobileModalDate')) {
            let date = JSON.parse(localStorage.getItem('mobileModalDate'));
            if (moment(date).add(1, 'months').isSame(moment(), 'day')) {
              this.showModal = true;
              localStorage.setItem('mobileModalDate', JSON.stringify(moment()));
            } else {
              this.showModal = false;
            }
          } else {
            this.showModal = true;
            localStorage.setItem('mobileModalDate', JSON.stringify(moment()));
          }
        },
    }
</script>
