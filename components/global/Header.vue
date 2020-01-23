<template>
	<header class="header">
		<div class="header__bg" :class="{ active : showBg }"></div>
		<div class="header__inner custom-container">
			<nuxt-link to="/" class="header__logo">
				<img src="~/static/pics/global/svg/nash_plyaj_white.svg" alt="НашПляж">
			</nuxt-link>
			<Search v-if="showSearch" />
			<div class="header__favorites">
				<nuxt-link to="/favorites">Избранное</nuxt-link>
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
				showSearch: true,
				showBg: true
			};
		},

		mounted() {
			this.$bus.$on('dontShowSearch', () => {
				this.showSearch = false;
			});

			this.$bus.$on('showBg', () => {
				this.showBg = true;
			});

			this.$bus.$on('dontShowBg', () => {
				this.showBg = false;
			});

			window.addEventListener('resize', this.onResize);
		},

		methods: {
			onResize() {
				// if ()
			}
		}
	}
</script>
