<template>
	<div class="search-page__tags">
		<div class="search-page__desktop-tablet custom-container">
			<SearchTag v-for="(tag, i) in tags" :tag="tag" :key="i" />
		</div>
		<div class="search-page__mobile custom-container">
			<div v-swiper:mySwiper="swiperOption">
				<div class="swiper-wrapper">
					<SearchTag class="swiper-slide" v-for="(tag, i) in tags" :tag="tag" :key="i" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// import Vue from 'vue';
	import SearchTag from '~/components/pages/search/SearchTag';

	export default {
		props: ['tags'],

		components: {
			SearchTag
		},

		// beforeMount () {
			// if (process.browser) {
			// 	require('swiper/dist/css/swiper.css');
			// 	const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');
			// 	Vue.use(VueAwesomeSwiper);
			// }
		// },

		data() {
			return {
				swiperOption: {
					init: false,
					freeMode: true,
					observer: true,
					observeParents: true,
					slidesPerView: 'auto'
				},
			}
		},

		mounted() {
			this.mySwiper.init(this.swiperOption);

			this.$bus.$on('updateSearchTagsSlider', () => { if (this.mySwiper) this.mySwiper.update() });
		},
    beforeDestroy() {
      this.$bus.$off('updateSearchTagsSlider')
    }
  }
</script>
