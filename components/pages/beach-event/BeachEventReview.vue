<template>
	<div class="beach-event__review" v-if="data">
		<div class="beach-event__review__pic" v-if="data.pic">
			<img :data-src="data.pic" v-lazy-load>
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
    <div class="review-photo-container" v-if="data.photos.length">
      <div class="review-photo" v-for="img in data.photos.slice(0, 2)">
        <img :src="img" alt="">
      </div>

    </div>
		<p class="beach-event__review__comment not-expanded" v-show="!expanded && maxLines > 0" v-html="data.comment.slice(0, 300) + '...'"></p>
		<p class="beach-event__review__comment expanded" v-show="expanded || maxLines == 0" v-html="data.comment"></p>
		<button class="beach-event__review__comment__button" @click="expanded = !expanded" v-show="maxLines > 0">
			<span v-show="!expanded">Развернуть</span>
			<span v-show="expanded">Свернуть</span>
			<img src="~/static/pics/beach/dropdown_blue.svg" class="desktop" :class="{ active : expanded }">
			<img src="~/static/pics/global/svg/dropdown.svg" class="tablet" :class="{ active : expanded }">
		</button>
	</div>
</template>

<script>
	export default {
		props: ['data', 'lines'],

		data() {
			return {
				expanded: false,
				maxLines: this.lines || 0
			}
		},

		mounted() {
			window.addEventListener('resize', this.onResize, false);
			if (this.data && this.data.comment && this.data.comment.length < 300)
				this.maxLines = 0;
		}
	}
</script>
