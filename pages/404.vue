<template>
	<div class="about-page custom-container custom-page">
		<div class="two-part-layout">
			<main class="two-part-layout__left">
				<section class="two-part-layout__card">
					<div class="about-page__title custom-page__title">404</div>
					<p class="about-page__text">
						Страница, которую вы запрашиваете не существует<br>
						Попробуйте начать <a href="/" @click.prevent="$bus.goTo('/', $router)">сначала</a>
					</p>
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

	export default {
		components: {
			AnnouncementCard
		}
	}
</script>
