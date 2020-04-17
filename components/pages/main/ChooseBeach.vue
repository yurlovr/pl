<template>
	<section class="main-page__choose-beach custom-container" v-if="data">
		<h1 class="main-page__section-title">Выберите свой пляж</h1>
		<div class="main-page__choose-beach__cards">
			<a :href="`/search?typeBeach=${data[0].id}`" @click.prevent="search(data[0])" class="main-page__choose-beach__card">
				<img src="~/static/pics/main/section6_beach_type1.svg">
				<h2 class="main-beach-h2-helper">{{data[0].title}}</h2>
			</a>
			<a :href="`/search?typeBeach=${data[1].id}`" @click.prevent="search(data[1])" class="main-page__choose-beach__card">
				<img src="~/static/pics/main/section6_beach_type2.svg">
				<h2 class="main-beach-h2-helper">{{data[1].title}}</h2>
			</a>
			<a :href="`/search?typeBeach=${data[2].id}`" @click.prevent="search(data[2])" class="main-page__choose-beach__card">
				<img src="~/static/pics/main/section6_beach_type3.svg">
				<h2 class="main-beach-h2-helper">{{data[2].title}}</h2>
			</a>
		</div>
	</section>
</template>

<script>
	export default {
		props: ['data'],

		methods: {
			search(b) {
		      this.$bus.$emit('emptySearchParams');
		      this.$bus.$emit('updateSearchParam', { param: 'beachTypes', value: { title: b.title, id: b.id }});
		      setTimeout(() => {this.$bus.$emit('search')}, 1);
			}
		}
	}
</script>
