<template>
	<div class="page-transitioner" id="transitioner" :class="{ active : active }">
		<div class="page-transitioner__left" id="page-transitioner__left"></div>
		<div class="page-transitioner__right" id="page-transitioner__right"></div>
		<img  class="page-transitioner__logo" id="page-transitioner__logo" src="~/static/pics/global/svg/logo-blue.svg">
	</div>
</template>

<script>
	export default {
		data() {
			return {
				active: false
			};
		},
    beforeDestroy() {
      this.$bus.$off('transition');
      this.$bus.$off('hidePageTransitioner');
    },

    mounted() {
			let	left = document.getElementById('page-transitioner__left'),
				right = document.getElementById('page-transitioner__right'),
				logo = document.getElementById('page-transitioner__logo'),
				transitioner = document.getElementById('transitioner');
			this.$bus.$on('transition', () => { this.transition(left, right, logo, transitioner); });
			this.$bus.$on('hidePageTransitioner', () => {
				logo.style.opacity = 0;

				setTimeout(() => {
					left.style.transform = `translateY(${window.innerHeight + 100}px)`;
					right.style.transform = `translateY(-${window.innerHeight + 100}px)`;
					setTimeout(() => {
						this.active = false;
						document.documentElement.style.overflow = '';
					}, 500);
				}, 500);
			});
		},

		methods: {
			transition(left, right, logo, transitioner) {
				left.style.transform = `translateY(-${window.innerHeight + 100}px)`;
				right.style.transform = `translateY(${window.innerHeight + 100}px)`;
				document.documentElement.style.overflow = 'hidden';
				this.active = true;
				setTimeout(() => {
					left.style.transform = `translateY(0)`;
					right.style.transform = `translateY(0)`;

					setTimeout(() => {
						window.scrollTo(0,0);
						logo.style.opacity = 1;
					}, 500);
				}, 1);
			}
		}
	}
</script>
