<template>
	<div class="preloader">
		<img src="~/static/pics/global/svg/nash_plyaj_blue.svg" alt="НашПляж">
	</div>
</template>

<script>
	export default {
		mounted() {
			window.onNuxtReady((app) => {
				document.querySelector('.preloader').style.opacity = 0;
				setTimeout(() => {
					document.querySelector('.preloader').style.display = 'none';
				}, 1005);
			});
		}
	}
</script>
