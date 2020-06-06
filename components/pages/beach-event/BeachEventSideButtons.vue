<template>
  <div class="beach-event__side-buttons">
    <a href="yandexnavi://build_route_on_map?lat_from=55.74&lon_from=37.60&lat_to=55.76&lon_to=37.64">Строю маршрут</a>
    <transition name="bounce">
      <a :href="`mailto:?subject=Ссылка%20на%20пляж%20|%20Наш%20пляж&body=${link}`" v-show="showShare">
        <img src="~/static/pics/global/svg/mail.svg">
      </a>
    </transition>
    <transition name="bounce">
      <a :href="`tg://msg_url?url=${link}/`" v-show="showShare">
        <img src="~/static/pics/global/svg/telegram-side.svg">
      </a>
    </transition>
    <button class="bg-orange" @click="showShare = !showShare">
      <img src="~/static/pics/global/svg/cross.svg" v-show="showShare">
      <img src="~/static/pics/global/svg/share.svg" v-show="!showShare">
    </button>
    <button class="bg-blue" @click="showPave = !showPave" v-if="data.pos && !dontShowPave">
      <img src="~/static/pics/global/svg/cross.svg" v-show="showPave">
      <img src="~/static/pics/global/svg/pave_way.svg" v-show="!showPave">
    </button>
    <transition name="bounce" v-if="data.pos">
      <a target="_blank" :href="'https://yandex.ru/maps/' + yandexTransform(data.pos)" v-show="showPave"
         class="btn-ymaps">
        <img src="~/static/pics/global/svg/ymaps.svg">
      </a>
    </transition>
    <transition name="bounce" v-if="data.pos">
      <a :href="`yandexnavi://build_route_on_map?` + yandexTransform(data.pos, true) " v-show="showPave"
         class="btn-display">
        <img src="~/static/pics/global/svg/yandex.svg">
      </a>
    </transition>
  </div>
</template>
<script>
  export default {
    props: ['data', 'dontShowPave'],
    data() {
      return {
        showShare: false,
        showPave: false,
        link: ''
      };
    },
    computed: {
      last_coordinates() {
        let cookie_coords = this.$cookies.get('last_coordinates') || {},
          route_coords = this.$route.params && this.$route.params.coordinates ? this.$route.params.coordinates : {}
        if (Object.values(cookie_coords).length) {
          return cookie_coords
        }
        return route_coords ? (() => {
          let obj = Object.values(route_coords);
          return obj.length == 2 ? {lat: obj[0], lng: obj[1]} : {}
        })() : {}
      }
    },
    methods: {
      yandexTransform(pos, navi = false) {
        if (!navi) {
          const user_pos = Object.values(this.last_coordinates).join(','),
            beach_pos = pos.join(',')
          return '?rtext=' + user_pos + '~' + beach_pos + '&rtt=auto&z=12'
        }
        const user_pos = Object.values(this.last_coordinates)
        console.log(`lat_from=${user_pos[0]}&lon_from=${user_pos[1]}&lan_to=${pos[0]}&lon_to=${pos[1]}`, 'ffff')
        return `lat_from=${user_pos[0]}&lon_from=${user_pos[1]}&lan_to=${pos[0]}&lon_to=${pos[1]}`;
      }
    },
    mounted() {
      this.link = window.location.href;
    }
  }
</script>
