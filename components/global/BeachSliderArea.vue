<template>
	<section class="main-page__beach-slider-area custom-container">
      <h3 class="main-page__section-title" style="margin-bottom: 10px;">{{ data.title }}</h3>
      <div class="main-page__section-subtitle-area">
        <span class="main-page__section-subtitle">{{ data.subtitle }}</span>
        <a v-if="this.data.showMore" :href="`/search?${this.data.showMore.type}[]=${this.data.showMore.id}`" @click.prevent="showMore()" class="main-page__section__subtitle-area__see-all">
          <span>Смотреть все ({{ data.beachNumber }})</span>
        </a>
      </div>
      <SliderBeachEventHotel :data="data.beachSliderData" />
      <div class="main-page__beach-slider-area__see-all-bottom">
        <a v-if="this.data.showMore" :href="`/search?${this.data.showMore.type}[]=${this.data.showMore.id}`" @click.prevent="showMore()" class="main-page__see-all">
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

    methods: {
      showMore() {
        this.$bus.$emit('emptySearchParams');
        this.$bus.$emit('updateSearchParam', this.data.showMore);
        setTimeout(() => {this.$bus.$emit('search')}, 1);
      }
    }
  }
</script>