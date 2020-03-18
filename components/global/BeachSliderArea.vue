<template>
	<section class="main-page__beach-slider-area custom-container">
      <div class="main-page__beach-slider-area-wrapper" :class="{ 'no-subtitle' : !data.subtitle }">
        <h3 class="main-page__section-title" style="margin-bottom: 10px;">{{ data.title }}</h3>
        <div class="main-page__section-subtitle-area">
          <span class="main-page__section-subtitle">{{ data.subtitle }}</span>
          <a v-if="this.data.showMore.length > 0" :href="getLink" @click.prevent="showMore()" class="main-page__section__subtitle-area__see-all">
            <span>Смотреть все ({{ data.beachNumber }})</span>
          </a>
        </div>
      </div>
      <SliderBeachEventHotel :data="data.beachSliderData" />
      <div class="main-page__beach-slider-area__see-all-bottom">
        <a v-if="this.data.showMore.length > 0" :href="getLink" @click.prevent="showMore()" class="main-page__see-all">
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
      getLink() {
        let link = '/search?';
        for (let i = 0; i < this.data.showMore.length; i++) {
          if (this.data.showMore[i].type)
            link += `${this.data.showMore[i].type}[]=${this.data.showMore[i].id}&`;
          else if (this.data.showMore[i].param)
            link += `${this.data.showMore[i].query}=${this.data.showMore[i].value.id}&`;
        }
        return link.slice(0, -1);
      }
    },

    methods: {
      showMore() {
        this.$bus.$emit('emptySearchParams');
        for (let i = 0; i < this.data.showMore.length; i++) {
          this.$bus.$emit('updateSearchParam', this.data.showMore[i]);
        }
        setTimeout(() => {this.$bus.$emit('search')}, 1);
      }
    }
  }
</script>