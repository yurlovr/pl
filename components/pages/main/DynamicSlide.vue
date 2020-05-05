<template>
	<a :href="getLink" @click.prevent="goToSearch()">
		<img  v-show="picLoaded" :src="slide.pic" class="slider-dynamic__slide__pic" @load="picLoaded = true">
		<img  v-show="!picLoaded" src="~/static/pics/global/pics/dynamic_slide_placeholder.png" class="slider-dynamic__slide__pic">
		<h3 class="slider-dynamic__slide__title">{{ slide.title }}</h3>
		<div class="slider-dynamic__slide__beach-number-area">
			<span class="slider-dynamic__slide__beach-number">{{ slide.beachNumber }}</span>
			<span class="slider-dynamic__slide__beach">{{ getBeachText(slide.beachNumber) }}</span>
		</div>
	</a>
</template>

<script>
	export default {
		props: ['slide'],

		data() {
			return {
				picLoaded: false
			}
		},

		computed: {
			getLink() {
				let link = '/search?';
				for (let i = 0; i < this.slide.filter.length; i++) {
					link += `${this.slide.filter[i].type}[]=${this.slide.filter[i].id}&`;
				}
				return link.slice(0, -1);
			}
		},

		methods: {
			goToSearch() {
				this.$bus.$emit('emptySearchParams');
				for (let i = 0; i < this.slide.filter.length; i++) {
			      	this.$bus.$emit('updateSearchParam', this.slide.filter[i]);
			    }
				this.$bus.goTo(this.getLink, this.$router);
			},

			getBeachText(i) {
				if (i % 10 > 1 && i % 10 < 5) return 'пляжа';
				return (i % 10 == 1 && i % 100 != 11) ? 'пляж' : 'пляжей';
			}
		}
	}
</script>
