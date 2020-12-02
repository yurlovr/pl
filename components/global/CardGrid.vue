<template>
	<section class="card-grid custom-grid-container">
		<Card :data="card"
          :index="i"
          v-for="(card, i) in data.slice((page-1)*perPage, Math.min(page*perPage, data.length))"
          :key="card.id || card.eventId || card.beachId || i"
          class="card-grid__card"
    />
		<h4 v-show="data.length == 0"
        class="favorites-page__empty favorites-page__empty--card-grid">
      {{ emptyText ? emptyText : 'Пусто'}}
    </h4>
		<div class="pagination-num-wrapper custom-container"
         v-show="data.length > perPage">
			<Pagination :perPage="perPage"
                  :totalElems="data.length"
                  @changePage="onChangePage"
      />
		</div>
	</section>
</template>

<script>
	import Card from '~/components/global/Card';
	import Pagination from '~/components/global/Pagination';

	export default {
		props: ['data', 'perPage', 'emptyText'],

		data() {
			return {
				page: 1
			}
		},
    beforeDestroy() {
      this.$bus.$off('pageChanged');
    },

    mounted() {
			this.$bus.$on('pageChanged', i => {
				setTimeout(() => {this.$bus.$emit('updateFavorite')}, 1);
			});
		},

		components: {
			Card,
			Pagination
		},

    methods: {
		  onChangePage(pageNum) {
		    this.page = pageNum;
      }
    },
	}
</script>
