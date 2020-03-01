<template>
	<div class="search-page__tag">
		<span>{{ tag.tag }}</span>
		<button class="search-page__tag__remove" @click="removeTag()">
			<img src="~/static/pics/global/svg/close.svg" alt="Убрать">
		</button>
	</div>
</template>

<script>
	import { mapGetters, mapMutations, mapActions } from 'vuex';

	export default {
		props: ['tag'],

		computed: {
			...mapGetters('search', ['searchValues']),
		},

		methods: {
			...mapMutations('search', ['updateSearchFilter']),
			...mapMutations('search', ['updateSearchParams']),
			...mapActions('search', ['search']),

			removeTag() {
				this.updateSearchParams({p: this.tag.param, v: this.tag.default});
				this.updateSearchFilter(this.searchValues);
				this.search();
			}
		}
	}
</script>