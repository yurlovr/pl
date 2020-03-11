<template>
	<section class="main-page__beach-events custom-container" v-if="data">
		<div class="main-page__beach-events__title-area">
			<h3 class="main-page__section-title" style="margin-bottom: 0;">{{ data.title }}</h3>
			<a v-if="this.data.showMore" :href="`/search?${this.data.showMore.type}[]=${this.data.showMore.id}`" @click.prevent="showMore()" class="main-page__see-all main-page__beach-events__see-all-top">
	          <span>Смотреть все ({{ data.beachNumber }})</span>
	        </a>
		</div>
		<SliderBeachEventHotel :data="data.beachSliderData" />
		<div class="main-page__beach-events__see-all-bottom" v-if="data.beachNumber">
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