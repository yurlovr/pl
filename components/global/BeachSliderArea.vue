<template>
  <section class="main-page__beach-slider-area custom-container">
    <div class="main-page__beach-slider-area-wrapper" :class="{ 'no-subtitle' : !data.subtitle }">
      <h3 class="main-page__section-title" style="margin-bottom: 10px;">
        {{ data.title }}
      </h3>
      <div class="main-page__section-subtitle-area">
        <span class="main-page__section-subtitle">{{ data.subtitle }}</span>
        <nuxt-link
          v-if="!outlink"
          :to="{ path: link, query: { page: 1, count: getPerPage } }"
          class="main-page__section__subtitle-area__see-all"
          @click.prevent="$bus.goTo(link, $router)"
        >
          <span>Смотреть все ({{ data.beachNumber }})</span>
        </nuxt-link>
        <a
          v-if="outlink"
          :href="outlink"
          target="_blank"
          class="main-page__section__subtitle-area__see-all"
        >
          <span>Смотреть все ({{ data.beachNumber }})</span>
        </a>
      </div>
    </div>

    <SliderBeachEventHotel :data="data.beachSliderData" />

    <div class="main-page__beach-slider-area__see-all-bottom">
      <nuxt-link
        v-if="!outlink && data.showMore.type !== 'similar'"
        :to="link"
        class="main-page__see-all"
        @click.prevent="$bus.goTo(link, $router)"
      >
        <span>Смотреть все ({{ data.beachNumber }})</span>
      </nuxt-link>
      <a
        v-if="outlink"
        :href="outlink"
        target="_blank"
        class="main-page__see-all"
      >
        <span>Смотреть все ({{ data.beachNumber }})</span>
      </a>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import SliderBeachEventHotel from '~/components/global/sliders/SliderBeachEventHotel';

export default {

  components: {
    SliderBeachEventHotel,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    outlink: {
      type: String,
      default: '',
    },
    pagination: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters('catalog', [
      'getPerPage',
    ]),
    link() {
      if (this.data.showMore.type === 'beach') {
        return `/${this.data.showMore.type}-${this.data.showMore.query.replace('?', '')}`;
      }
      if (this.data.showMore.type === 'similar') {
        return `/search${this.data.showMore.query ? this.data.showMore.query : ''}`;
      }
      return `/${this.data.showMore.type}-catalog${this.data.showMore.query ? this.data.showMore.query : ''}`;
    },
  },
};
</script>
