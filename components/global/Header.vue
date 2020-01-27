<template>
	<header class="header">
		<div class="header__bg" :class="{ active : (bgAndBarShown || tempBgAndBarShown) }"></div>
		<div class="header__inner custom-container">
			<a href="/" class="header__logo" @click.prevent="$bus.goTo('/', $router)">
				<img src="~/static/pics/global/svg/nash_plyaj_white.svg" alt="НашПляж">
			</a>
			<Search v-show="(bgAndBarShown || tempBgAndBarShown)" />
			<div class="header__left">
				<button class="header__search-button" @click="toggleSearch()" v-show="(bgAndBarShown || tempBgAndBarShown)">
					<img src="~/static/pics/global/svg/search_white.svg" alt="Поиск">
				</button>
				<div class="header__favorites">
					<a href="/favorites" @click.prevent="$bus.goTo('/', $router)">
						<img class="header__favorites-img" alt="Избранное" src="~/static/pics/global/svg/heart_white.svg">
						<span class="header__favorites-text">Избранное</span>
					</a>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
	import Search from '~/components/global/Search';

	export default {
		components: {
			Search
		},

		data() {
			return {
				// show background and the searchBar (searchBar for desktop)
				bgAndBarShown: true,
				tempBgAndBarShown: false
			}
		},

		mounted() {
			this.$bus.$on('hideHeaderBgAndBar', () => {
				this.bgAndBarShown = false;
			});

			this.$bus.$on('tempHideHeaderBgAndBar', () => {
				this.tempBgAndBarShown = false;
			});

			this.$bus.$on('showHeaderBgAndBar', () => {
				this.bgAndBarShown = true;
			});

			this.$bus.$on('tempShowHeaderBgAndBar', () => {
				this.tempBgAndBarShown = true;
			});
		},

		methods: {
			toggleSearch() {
				this.$bus.$emit('toggleMobileSearchBar');

				// if (window.innerWidth <= 650) {
				// 	this.mobileSearchHeight = this.mobileSearchHeight == 0 ? 42 : 0;
				// }
			}
		}
	}
</script>
