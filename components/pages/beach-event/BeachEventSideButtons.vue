<template>
  <div class="beach-event__side-buttons">
    <transition name="bounce">
      <a
        v-show="showShare"
        :href="`mailto:${data.email || ''}?subject=Ссылка%20на%20пляж%20|%20Наш%20пляж&body=${link}`"
      >
        <img src="~/static/pics/global/svg/mail.svg">
      </a>
    </transition>
    <transition
      v-if="data.telegram"
      name="bounce"
    >
      <a
        v-show="showShare"
        :href="`tg://resolve?domain=${data.telegram.split('/').slice(-1)[0]}`"
      >
        <img src="~/static/pics/global/svg/telegram-side.svg">
      </a>
    </transition>
    <button
      class="bg-orange"
      @click="showShare = !showShare"
    >
      <img
        v-show="showShare"
        src="~/static/pics/global/svg/cross.svg"
      >
      <img
        v-show="!showShare"
        src="~/static/pics/global/svg/share.svg"
      >
    </button>
    <button
      v-if="data.pos && !dontShowPave"
      class="bg-blue"
      @click="showPave = !showPave"
    >
      <img
        v-show="showPave"
        src="~/static/pics/global/svg/cross.svg"
      >
      <img
        v-show="!showPave"
        src="~/static/pics/global/svg/pave_way.svg"
      >
    </button>
    <transition
      v-if="pos && yandexTransform(data.pos)"
      name="bounce"
    >
      <a
        v-show="showPave"
        target="_blank"
        :href="'https://yandex.ru/maps/' + yandexTransform(data.pos)"
        class="btn-ymaps"
      >
        <img src="~/static/pics/global/svg/ymaps.svg">
      </a>
    </transition>
    <transition
      v-if="pos && yandexTransform(data.pos, true)"
      name="bounce"
    >
      <a
        v-show="showPave"
        :href="`yandexnavi://build_route_on_map?` + yandexTransform(data.pos, true) "
        class="btn-display"
      >
        <img src="~/static/pics/global/svg/yandex.svg">
      </a>
    </transition>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    dontShowPave: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showShare: false,
      showPave: false,
      link: '',
    };
  },
  computed: {
    ...mapGetters('event', {
      email: 'getEmail',
      telegram: 'getTelegram',
      pos: 'getPosition',
    }),
    lastCoordinates() {
      const cookieCoords = this.$cookies.get('last_coordinates') || {};
      const routeCoords = this.$route.params && this.$route.params.coordinates
        ? this.$route.params.coordinates
        : {};
      if (Object.values(cookieCoords).length) {
        return cookieCoords;
      }
      return routeCoords ? (() => {
        const obj = Object.values(routeCoords);
        return obj.length === 2 ? { lat: obj[0], lng: obj[1] } : {};
      })() : {};
    },
  },
  mounted() {
    this.link = window.location.href;
  },
  methods: {
    yandexTransform(pos, navi = false) {
      if (!navi) {
        const userPos = Object.values(this.lastCoordinates).join(',');
        const beachPos = pos.join(',');
        return `?rtext=${userPos}~${beachPos}&rtt=auto&z=12`;
      }
      const userPos = Object.values(this.lastCoordinates);
      return `lat_from=${userPos[0]}&lon_from=${userPos[1]}&lat_to=${pos[0]}&lon_to=${pos[1]}`;
    },
  },
};
</script>
