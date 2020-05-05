<template>
	<header class="header">
		<div class="search__bg" v-show="paramsShown" @click="updateParamsShown(false)"></div>
		<div class="header__bg" :class="{ active : (bgAndBarShown || tempBgAndBarShown) }"></div>
		<div class="header__inner custom-container">
			<a href="/" class="header__logo" @click.prevent="$bus.goTo('/', $router)">
				<img loading="lazy" src="~/static/pics/global/svg/logo-white.svg" alt="НашПляж">
			</a>
			<Search v-show="(bgAndBarShown || tempBgAndBarShown)" />
			<div class="header__left">
				<button class="header__search-button" @click="toggleSearch()" v-show="(bgAndBarShown || tempBgAndBarShown)">
					<img loading="lazy" src="~/static/pics/global/svg/search_white.svg" alt="Поиск">
				</button>
				<div class="header__favorites">
					<a href="/favorites" @click.prevent="$bus.goTo('/favorites', $router)">
						<img loading="lazy" class="header__favorites-img" alt="Избранное" src="~/static/pics/global/svg/heart_white.svg">
						<div class="header__favorites-text">
							<span>Избранное</span>
						</div>
						<span class="header__favorites-number" v-show="favoritesNumber != 0"><span>{{ favoritesNumber }}</span></span>
					</a>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
	import Search from '~/components/global/Search';

	import { mapGetters, mapMutations } from 'vuex';

	export default {
		components: {
			Search
		},

		data() {
			return {
				// show background and the searchBar (searchBar for desktop)
				bgAndBarShown: true,
				tempBgAndBarShown: false,
				favoritesNumber: 0
			}
		},

		computed: {
			...mapGetters(['beachIds', 'eventIds']),
			...mapGetters('search', ['paramsShown'])
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

			this.$bus.$on('increaseFavorites', () => {
				this.favoritesNumber++;
			});

			this.$bus.$on('decreaseFavorites', () => {
				this.favoritesNumber--;
			});

			if (this.beachIds) {
				for (let i = 0; i < this.beachIds.length; i++) {
					if (this.$cookies.get(`favorites.beaches.${this.beachIds[i]}`))
						this.favoritesNumber++;
				}
			} else console.error('Could not fetch beach ids (Header)');

			if (this.eventIds) {
				for (let i = 0; i < this.eventIds.length; i++) {
					if (this.$cookies.get(`favorites.events.${this.eventIds[i]}`))
						this.favoritesNumber++;
				}
			} else console.error('Could not fetch event ids (Header)');
		},

		methods: {
			...mapMutations('search', ['updateParamsShown']),

			toggleSearch() {
				this.$bus.$emit('toggleMobileSearchBar');
			}
		}
	}
</script>
