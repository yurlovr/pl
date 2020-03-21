<template>
	<div class="about-page custom-container custom-page" v-if="data">
		<h1 class="about-page__title custom-page__title">{{ data.title }}</h1>
		<div class="two-part-layout">
			<main class="two-part-layout__left">
				<section class="two-part-layout__card">
					<p class="about-page__text" v-html="data.text"></p>
				</section>
			</main>
			<aside class="two-part-layout__right">
				<AnnouncementCard :data="$store.state.announcementData" />
			</aside>
		</div>
	</div>
</template>

<script>
	import AnnouncementCard from '~/components/global/AnnouncementCard';

	import { mapGetters } from 'vuex';

	export default {
		components: {
			AnnouncementCard
		},

		async fetch({ store, params, redirect }) {
			let res = await store.dispatch('infoPages/getPageData', params.page);
			if (res == 404)
				redirect('/404');
		},

		computed: {
			...mapGetters('infoPages', ['data'])
		}
	}
</script>
