<template>
  <div class="beach-event__side-buttons">
    <transition name="bounce">
      <a :href="`mailto:?subject=Ссылка%20на%20пляж%20|%20Наш%20пляж&body=${link}`" v-show="showShare">
        <img src="~/static/pics/global/svg/mail.svg">
      </a>
    </transition>
    <transition name="bounce">
      <a :href="`tg://msg_url?url=https://${link}/`" v-show="showShare">
        <img src="~/static/pics/global/svg/telegram-side.svg">
      </a>
    </transition>
    <button class="bg-orange" @click="showShare = !showShare">
      <img src="~/static/pics/global/svg/cross.svg" v-show="showShare">
      <img src="~/static/pics/global/svg/share.svg" v-show="!showShare">
    </button>
    <button class="bg-blue" @click="showPave = !showPave" v-if="data.pos">
      <img src="~/static/pics/global/svg/cross.svg" v-show="showPave">
      <img src="~/static/pics/global/svg/pave_way.svg" v-show="!showPave">
    </button>
    <transition name="bounce" v-if="data.pos">
      <a target="_blank" :href="`https://yandex.ru/maps/?ll=${data.pos[1]}%2C${data.pos[0]}&z=12`" v-show="showPave" class="btn-ymaps">
        <img src="~/static/pics/global/svg/ymaps.svg">
      </a>
    </transition>
    <transition name="bounce" v-if="data.pos">
      <a target="_blank" :href="`https://yandex.ru/maps/?ll=${data.pos[1]}%2C${data.pos[0]}&z=12`" v-show="showPave" class="btn-display">
        <img src="~/static/pics/global/svg/yandex.svg">
      </a>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['data'],

  data() {
    return {
      showShare: false,
      showPave: false,
      link: ''
    };
  },

  mounted() {
    this.link = window.location.href;
  }
}
</script>
