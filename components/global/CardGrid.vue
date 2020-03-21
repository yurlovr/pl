<template>
	<section class="card-grid custom-grid-container">
		<Card :data="card" v-for="(card, i) in data.slice((page-1)*perPage, Math.min(page*perPage, data.length))" :key="i" class="card-grid__card" />
		<h4 v-show="data.length == 0" class="favorites-page__empty favorites-page__empty--card-grid">Пусто</h4>
		<div class="pagination-num-wrapper custom-container">
			<Pagination :perPage="perPage" :totalElems="data.length" v-model="page" />
		</div>
	</section>
</template>

<script>
	import Card from '~/components/global/Card';
	import Pagination from '~/components/global/Pagination';

	export default {
		props: ['data', 'perPage'],

		data() {
			return {
				page: 1
			}
		},

		mounted() {
			this.$bus.$on('pageChanged', i => {
				setTimeout(() => {this.$bus.$emit('updateFavorite')}, 1);
			});
		},

		components: {
			Card,
			Pagination
		}
	}
</script>
