<template>
	<div class="beach-page custom-page">
		<div class="beach-page__container custom-container">
			<BeachPageSections />
			<SliderHugeBeachEventPage :data="$store.state.hugeSliderData" />
			<div class="two-part-layout">
				<main class="two-part-layout__left">
					<BeachEventMainInfo :data="$store.state.beachMainData" />
					<BeachQuickData :title="'Инфраструктура пляжа'" :data="$store.state.beachInfraData" />
					<BeachEventAbout :data="$store.state.beachAbout" />
					<BeachQuickData :title="'Услуги и аренда'" :data="$store.state.beachServicesData" />
				</main>
				<aside class="two-part-layout__right">
					<AnnouncementCard :data="$store.state.announcementData" />
				</aside>
			</div>
		</div>
		<BeachSliderArea class="beach-page__similar-beaches" :data="$store.state.beachSliderData" :areaData="$store.state.similarNearAreaData" />
		<BeachSliderArea class="main-page__hotels" :data="$store.state.hotelData" :areaData="$store.state.hotelAreaData" />
	</div>
</template>

<script>
	import BeachPageSections from '~/components/pages/beach/BeachPageSections';
	import BeachQuickData from '~/components/pages/beach/BeachQuickData';
	import SliderHugeBeachEventPage from '~/components/pages/beach-event/SliderHugeBeachEventPage';
	import BeachEventMainInfo from '~/components/pages/beach-event/BeachEventMainInfo';
	import BeachEventAbout from '~/components/pages/beach-event/BeachEventAbout';
	import AnnouncementCard from '~/components/global/AnnouncementCard';
	import BeachSliderArea from '~/components/global/BeachSliderArea';

	export default {
		components: {
			BeachPageSections,
			SliderHugeBeachEventPage,
			AnnouncementCard,
			BeachEventMainInfo,
			BeachSliderArea,
			BeachQuickData,
			BeachEventAbout
		}
	}
</script>