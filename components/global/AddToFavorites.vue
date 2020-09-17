<template>
	<button class="heart" @click.stop="updateHeart" @mouseenter="updateHeartHover()" @mouseleave="updateHeartHover()" v-if="data.showFavorite != undefined">
<!--		<img  src="~/static/pics/global/svg/heart_unclicked.svg" alt="В избранное" v-show="!favorite && !favoriteHover">
		<img  src="~/static/pics/global/svg/heart_clicked.svg" alt="В избранное" v-show="favorite || favoriteHover && !favorite">-->
    <svg class="svg-heart" width="12" height="11" viewBox="0 0 23 22" xmlns="http://www.w3.org/2000/svg">
      <path
        :class="[{lovely: favorite || favoriteHover && !favorite}, {unknown: !favorite && !favoriteHover}]"
        d="M6.4114 18.2772C8.93676 20.5476 11.2238 21.8947 11.3196 21.9511C11.3758 21.9837 11.4378 22 11.5002 22C11.5626 22 11.6246 21.9837 11.6804 21.9511C11.7766 21.8951 14.0629 20.5476 16.5879 18.2775C18.933 16.1684 21.9103 12.8427 22.7763 8.97267C23.7425 4.65581 21.4196 1.53737 18.8521 0.467244C16.1418 -0.662585 13.3093 0.300012 11.5002 2.91786C9.69077 0.299641 6.85822 -0.664069 4.14717 0.467244C1.58011 1.53775 -0.742509 4.65581 0.223677 8.97267C1.08867 12.8423 4.06629 16.1684 6.4114 18.2772Z"
        fill="#FEE6C0"/>
    </svg>
	</button>
</template>

<script>
	export default {
		props: ['data'],

		data() {
			return {
				favorite: this.data.beachId && !this.data.eventId && this.$cookies.get(`favorites.beaches.${this.data.beachId}`) || this.data.eventId && this.$cookies.get(`favorites.events.${this.data.eventId}`),
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
				this.favorite = this.data && this.data.beachId && !this.data.eventId && this.$cookies.get(`favorites.beaches.${this.data.beachId}`) || this.data && this.data.eventId && this.$cookies.get(`favorites.events.${this.data.eventId}`);
			});
		},

		methods: {
			updateHeart() {
				if (this.favorite)
					this.$bus.$emit('decreaseFavorites');
				else this.$bus.$emit('increaseFavorites');

				if (this.data.beachId && !this.data.eventId) {
					if (this.$cookies.get(`favorites.beaches.${this.data.beachId}`)) {
            this.$cookies.remove(`favorites.beaches.${this.data.beachId}`);
						this.$bus.$emit('favoriteBeachRemoved', this.data.beachId);
					} else {
						this.$cookies.set(`favorites.beaches.${this.data.beachId}`, true, {
							maxAge: 30 * 24 * 60 * 60 // one month
						});
						this.$bus.$emit('favoriteBeachAdded', this.data.beachId);
					}
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
