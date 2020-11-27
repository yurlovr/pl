<template>
	<header class="header">
		<div class="search__bg" v-show="paramsShown" @click="updateParamsShown(false)"></div>
		<div class="header__bg" :class="{ active : (bgAndBarShown || tempBgAndBarShown) }"></div>
		<div class="header__inner custom-container">
			<a href="/" class="header__logo" @click.prevent="$bus.goTo('/', $router)">
				<img  src="~/static/pics/global/svg/logo-white.svg" alt="НашПляж">
			</a>
			<Search ref="searchGeneral" v-show="(bgAndBarShown || tempBgAndBarShown)" />
			<div class="header__left">
				<button class="header__search-button" @click="toggleSearch()" v-show="(bgAndBarShown || tempBgAndBarShown)">
					<img  src="~/static/pics/global/svg/search_white.svg" alt="Поиск">
				</button>
				<div class="header__favorites">
					<a href="/favorites" @click.prevent="$bus.goTo('/favorites', $router)">
						<img  class="header__favorites-img" alt="Избранное" src="~/static/pics/global/svg/heart_white.svg">
						<div class="header__favorites-text">
							<span>Избранное</span>
						</div>
						<span class="header__favorites-number" v-show="count != 0"><span>{{ count }}</span></span>
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
			}
		},

		computed: {
			...mapGetters('search', ['paramsShown']),
			...mapGetters('favorites', ['count']),
		},

    beforeDestroy() {
      this.$bus.$off('hideHeaderBgAndBar');
      this.$bus.$off('tempHideHeaderBgAndBar');
      this.$bus.$off('showHeaderBgAndBar');
      this.$bus.$off('tempShowHeaderBgAndBar');
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
			...mapMutations('search', [
			  'updateParamsShown'
      ]),
			toggleSearch() {
				this.$refs.searchGeneral.toggleMobileShow()
			}
		}
	}
</script>
