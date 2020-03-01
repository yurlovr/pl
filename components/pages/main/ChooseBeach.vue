<template>
	<section class="main-page__choose-beach custom-container">
		<h3 class="main-page__section-title">Выберите свой пляж</h3>
		<div class="main-page__choose-beach__cards">
			<a href="/search" @click.prevent="search()" class="main-page__choose-beach__card">
				<img src="~/static/pics/main/section6_beach_type1.svg">
				<span>Галечные пляжи</span>
			</a>
			<a href="/search" @click.prevent="search()" class="main-page__choose-beach__card">
				<img src="~/static/pics/main/section6_beach_type2.svg">
				<span>Песчаные пляжи</span>
			</a>
			<a href="/search" @click.prevent="search()" class="main-page__choose-beach__card">
				<img src="~/static/pics/main/section6_beach_type3.svg">
				<span>Ракушечные пляжи</span>
			</a>
		</div>
	</section>
</template>

<script>
	export default {
		// TODO: make the links go to filtered search
		methods: {
			search() {
				this.$bus.goTo('/search', this.$router);
			}
		}
	}
</script>
