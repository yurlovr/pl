<template>
	<div class="about-page custom-container custom-page">
		<h1 class="about-page__title custom-page__title">404</h1>
		<div class="two-part-layout">
			<main class="two-part-layout__left">
				<section class="two-part-layout__card">
					<p class="about-page__text">
						Что-то пошло не так
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
