<template>
	<section class="card-grid custom-grid-container">
		<Card :data="card" :showIfVisited="showIfVisited" :visited="visited" v-for="(card, i) in data" :key="i" class="card-grid__card" />
		<div class="pagination-num-wrapper custom-container" v-if="data.length > 20">
			<RouterPagination :page="1" :size="20" :totalElements="data.length" />
		</div>
	</section>
</template>

<script>
	import Card from '~/components/global/Card';
	import RouterPagination from '~/components/global/RouterPagination';

	export default {
		props: ['data', 'showIfVisited', 'visited'],

		components: {
			Card,
			RouterPagination
		}
	}
</script>
