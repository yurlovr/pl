<template>
	<section class="main-page__beach-slider-area custom-container">
    <div class="main-page__beach-slider-area-wrapper" :class="{ 'no-subtitle' : !data.subtitle }">
      <h3 class="main-page__section-title" style="margin-bottom: 10px;">{{ data.title }}</h3>
      <div class="main-page__section-subtitle-area">
        <span class="main-page__section-subtitle">{{ data.subtitle }}</span>
        <a :href="link" @click.prevent="$bus.goTo(link, $router)" class="main-page__section__subtitle-area__see-all">
          <span>Смотреть все ({{ data.beachNumber }})</span>
        </a>
      </div>
    </div>
    <SliderBeachEventHotel :data="data.beachSliderData" />
    <div class="main-page__beach-slider-area__see-all-bottom">
      <a :href="link" @click.prevent="$bus.goTo(link, $router)" class="main-page__see-all">
        <span>Смотреть все ({{ data.beachNumber }})</span>
      </a>
    </div>
  </section>
</template>

<script>
  import SliderBeachEventHotel from '~/components/global/sliders/SliderBeachEventHotel';

  export default {
  	props: ['data'],

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