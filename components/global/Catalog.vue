<template>
	<div class="catalog-page custom-page" v-if="data">
		<div class="custom-container">
			<h3 class="custom-page__title catalog-page__title">{{ data.title }}</h3>
		</div>
		<CardGrid :perPage="20" :data="data.grid" v-if="data && data.grid" />
	</div>
</template>

<script>
import CardGrid from '~/components/global/CardGrid';

import { mapGetters, mapMutations } from 'vuex';

export default {
	props: ['type'],

	components: {
		CardGrid
	},

	computed: {
		...mapGetters('catalog', ['data'])
	},

	created() {
		this.setType(this.type);
		this.setQuery(this.$router.currentRoute.query);
	},

	methods: {
		...mapMutations('catalog', ['setType', 'setQuery'])
	}
}
</script>
