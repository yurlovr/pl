<template>
	<button class="heart" @click.prevent="updateHeart()" @mouseenter="updateHeartHover()" @mouseleave="updateHeartHover()" v-if="fav == false || fav == true">
		<img src="~/static/pics/global/svg/heart_unclicked.svg" alt="В избранное" v-show="!favorite && !favoriteHover">
		<img src="~/static/pics/global/svg/heart_clicked.svg" alt="В избранное" v-show="favorite || favoriteHover && !favorite">
	</button>
</template>

<script>
	export default {
		props: ['fav'],

		data() {
			return {
				favorite: this.fav,
				favoriteHover: false
			}
		},

		methods: {
			updateHeart() {
				if (this.favorite)
					this.$bus.$emit('decreaseFavorites');
				else this.$bus.$emit('increaseFavorites');

				this.favorite = !this.favorite;
			},

			updateHeartHover() {
				if (!document.body.classList.contains('touch'))
					this.favoriteHover = !this.favoriteHover;
			}
		}
	}
</script>