<template>
  <section v-if="hasBanner" class="banner custom-container">
    <div
      class="banner__card"
      :class="{ 'rtl': data.rightToLeft }"
    >
      <div
        class="banner__card__pic-area"
      >
        <img
          v-lazy-load
          :data-src="data.pic"
          class="banner__card__pic"
          alt="Пляж"
        >
      </div>
      <div class="banner__card__info-area">
        <h4
          class="banner__card__info-area__title"
          v-html="getTitle"
        />
        <p
          class="banner__card__info-area__text"
          v-html="data.description"
        />
        <a :href="data.link" class="banner__card__info-area__button">
          <span>{{ data.buttonText }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    lastWordYellow: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters('main', [
      'getBanners',
    ]),
    hasBanner() {
      return !!this.getBanners[this.index];
    },
    data() {
      return this.getBanners[this.index] || this.getBanners[0];
    },
    getTitle() {
      const titleArray = this.data.title.split(' ');
      return titleArray.map((i, ind, array) => {
        if (ind === array.length - 1 && this.lastWordYellow) {
          return `<span class="orange">${i}</span>`;
        }
        return `<span>${i}</span>`;
      }).join(' ');
    },
  },
};
</script>
