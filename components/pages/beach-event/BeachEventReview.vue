<template>
	<div class="beach-event__review" v-if="data">
		<div class="beach-event__review__pic" v-if="data.pic">
			<img :src="data.pic">
		</div>
		<div class="beach-event__review__title-area">
			<div class="beach-event__review__title-area__left">
				<h3 class="beach-event__review__title">{{ data.name }}</h3>
				<span class="beach-event__review__date">{{ data.date }}</span>
			</div>
			<div class="beach-event__review__title-area__rating">
				<template v-for="i in 5">
					<img src="~/static/pics/global/svg/star.svg" v-if="i <= data.rating">
					<img src="~/static/pics/global/svg/star_pale.svg" v-if="i > data.rating">
				</template>
			</div>
		</div>
		<p class="beach-event__review__comment">
			<client-only>
				<v-clamp :expanded="expanded" autoresize :max-lines="maxLines" ref="clamper">{{ data.comment }}</v-clamp>
			</client-only>
		</p>
		<button class="beach-event__review__comment__button" @click="expanded = !expanded" v-show="maxLines > 0">
			<span v-show="!expanded">Развернуть</span>
			<span v-show="expanded">Свернуть</span>
			<img src="~/static/pics/beach/dropdown_blue.svg" class="desktop" :class="{ active : expanded }">
			<img src="~/static/pics/global/svg/dropdown.svg" class="tablet" :class="{ active : expanded }">
		</button>
	</div>
</template>

<script>
	import VClamp from 'vue-clamp';

	export default {
		props: ['data', 'lines'],

		components: {
			VClamp
		},

		data() {
			return {
				expanded: false,
				maxLines: this.lines || 0
			}
		},

		mounted() {
			window.addEventListener('resize', this.onResize, false);
			setTimeout(() => { this.onResize(); }, 500);
		},

		methods: {
			onResize() {
				if (!this.$el.querySelector('.beach-event__review')) {
					window.removeEventListener('resize', this.onResize, false);
					return;
				}

				if (this.$refs.clamper && this.$refs.clamper.offset > 340 && !this.lines != 0)
					this.maxLines = 4;
			}
		}
	}
</script>