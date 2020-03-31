<template>
	<div class="preloader" v-body-scroll-lock="preloaderShown">
		<img src="~/static/pics/global/svg/logo-blue.svg" alt="НашПляж">
	</div>
</template>

<script>
	export default {
		data() {
			return {
				preloaderShown: true
			}
		},

		mounted() {
			if (this.$router.currentRoute.path != '/') {
				window.onNuxtReady((app) => {
					this.hidePreloader();
				});
			} else {
				this.$bus.$on('mainPageReady', () => {
					this.hidePreloader();
				})
			}
		},

		methods: {
			hidePreloader() {
				document.querySelector('.preloader').style.opacity = 0;
				setTimeout(() => {
					document.querySelector('.preloader').style.display = 'none';
					this.preloaderShown = false;
				}, 1005);
			}
		}
	}
</script>
