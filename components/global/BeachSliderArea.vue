<template>
  <section class="main-page__beach-slider-area custom-container">
    <div class="main-page__beach-slider-area-wrapper" :class="{ 'no-subtitle' : !data.subtitle }">
      <h3 class="main-page__section-title" style="margin-bottom: 10px;">{{ data.title }}</h3>
      <div class="main-page__section-subtitle-area">
        <span class="main-page__section-subtitle">{{ data.subtitle }}</span>
        <a v-if="!outlink" :href="link" @click.prevent="$bus.goTo(link, $router)"
           class="main-page__section__subtitle-area__see-all">
          <span>Смотреть все ({{ data.beachNumber }})</span>
        </a>
        <a v-else :href="outlink" target="_blank" class="main-page__section__subtitle-area__see-all">
          <span>Смотреть все ({{ data.beachNumber }})</span>
        </a>
      </div>
    </div>

    <client-only>
      <SliderBeachEventHotel :data="data.beachSliderData" />
    </client-only>

    <div class="main-page__beach-slider-area__see-all-bottom">
      <a v-if="!outlink" :href="link" @click.prevent="$bus.goTo(link, $router)" class="main-page__see-all">
        <span>Смотреть все ({{ data.beachNumber }})</span>
      </a>
      <a v-else :href="outlink" target="_blank" class="main-page__see-all">
        <span>Смотреть все ({{ data.beachNumber }})</span>
      </a>
    </div>
  </section>
</template>

<script>
  import SliderBeachEventHotel from '~/components/global/sliders/SliderBeachEventHotel';

  export default {
    props: ['data', 'outlink'],

    components: {
      SliderBeachEventHotel
    },

    computed: {
      link() {
        return `/${this.data.showMore.type}-catalog${this.data.showMore.query ? this.data.showMore.query : ''}`;
      }
    }
  }
</script>
