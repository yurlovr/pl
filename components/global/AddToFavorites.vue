<template>
	<button class="heart" @click.prevent="updateHeart()" @mouseenter="updateHeartHover()" @mouseleave="updateHeartHover()" v-if="data.showFavorite != undefined">
		<img src="~/static/pics/global/svg/heart_unclicked.svg" alt="В избранное" v-show="!favorite && !favoriteHover">
		<img src="~/static/pics/global/svg/heart_clicked.svg" alt="В избранное" v-show="favorite || favoriteHover && !favorite">
	</button>
</template>

<script>
	export default {
		props: ['data'],

		data() {
			return {
				favorite: this.data.beachId && this.$cookies.get(`favorites.beaches.${this.data.beachId}`) || this.data.eventId && this.$cookies.get(`favorites.events.${this.data.eventId}`),
				favoriteHover: false
			}
		},

		mounted() {
			this.$bus.$on('favoriteBeachAdded', id => {
				if (this.data.beachId == id)
					this.favorite = true;
			});
			this.$bus.$on('favoriteEventAdded', id => {
				if (this.data.eventId == id)
					this.favorite = true;
			});
			this.$bus.$on('favoriteBeachRemoved', id => {
				if (this.data.beachId == id)
					this.favorite = false;
			});
			this.$bus.$on('favoriteEventRemoved', id => {
				if (this.data.eventId == id)
					this.favorite = false;
			});
			this.$bus.$on('updateFavorite', () => {
				this.favorite = this.data && this.data.beachId && this.$cookies.get(`favorites.beaches.${this.data.beachId}`) || this.data && this.data.eventId && this.$cookies.get(`favorites.events.${this.data.eventId}`);
			});
		},

		methods: {
			updateHeart() {
				if (this.favorite)
					this.$bus.$emit('decreaseFavorites');
				else this.$bus.$emit('increaseFavorites');

				if (this.data.beachId) {
					if (this.$cookies.get(`favorites.beaches.${this.data.beachId}`)) {
						this.$cookies.set(`favorites.beaches.${this.data.beachId}`, true, {
							maxAge: -1 // remove
						});
						this.$bus.$emit('favoriteBeachRemoved', this.data.beachId);
					} else {
						this.$cookies.set(`favorites.beaches.${this.data.beachId}`, true, {
							maxAge: 30 * 24 * 60 * 60 // one month
						});
						this.$bus.$emit('favoriteBeachAdded', this.data.beachId);
					}
					console.log(this.config)
				} else if (this.data.eventId) {
					if (this.$cookies.get(`favorites.events.${this.data.eventId}`)) {
						this.$cookies.set(`favorites.events.${this.data.eventId}`, true, {
							maxAge: -1 // remove
						});
						this.$bus.$emit('favoriteEventRemoved', this.data.eventId);
					} else {
						this.$cookies.set(`favorites.events.${this.data.eventId}`, true, {
							maxAge: 30 * 24 * 60 * 60 // one month
						});
						this.$bus.$emit('favoriteEventAdded', this.data.eventId);
					}
				}
			},

			updateHeartHover() {
				if (!document.body.classList.contains('touch'))
					this.favoriteHover = !this.favoriteHover;
			}
		}
	}
</script>