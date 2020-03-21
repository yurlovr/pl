<template>
	<div class="beach-page custom-page">
		<div class="beach-page__container custom-container">
			<BeachEventSections :sections="eventData.sections" class="beach-page-sections event-page-sections" />
			<SliderHugeBeachEventPage :data="eventData.hugeSliderData" id="gallery" />
			<div class="custom-container-inner">
				<BeachEventSideButtons class="event-page__side-buttons" :data="eventData.sideMapWeatherData" :dontShowPave="true" />
			</div>
			<div class="two-part-layout">
				<main class="two-part-layout__left">
					<button class="event-page__hearts" @click="updateHeart()">
						<img src="~/static/pics/global/svg/heart_button_unclicked.svg" v-show="!favorite">
						<img src="~/static/pics/global/svg/heart_button_clicked.svg" v-show="favorite">
						<span>({{ eventData.mainData.likes + (favorite ? 1 : 0) }}) Добавить в избранное</span>
					</button>
					<BeachEventMainInfo id="main-info" :data="eventData.mainData" class="event-page__main-info" />
					<BeachQuickData id="infra" :title="'Инфраструктура'" :data="eventData.infraData" v-if="eventData.infraData.length > 0" />
					<BeachEventAbout id="about" :data="eventData.about" v-if="eventData.about.length > 0" />
					<BeachEventParkingsTransport id="pt" :data="eventData.ptData" v-if="eventData.ptData.parkings.auto.length > 0 || eventData.ptData.parkings.bus.length > 0" />
					<BeachEventReviews id="reviews" :typeId="eventData.mainData.eventId" :data="eventData.reviews" :type="'event'" class="beach-page__cardless-area" />
				</main>
				<aside class="two-part-layout__right">
					<BeachEventMapWeather :data="eventData.sideMapWeatherData" v-if="eventData.sideMapWeatherData.pos.length > 0" class="beach-event__map-weather__desktop" />
					<AnnouncementCard :data="eventData.announcementData" />
				</aside>
			</div>
		</div>
		<div class="main-page__white-wrapper beach-event__visitor-pics-wrapper">
			<BeachEventVisitorPics id="visitor-pics" :data="eventData.visitorPics" :type="'event'" :typeId="eventData.mainData.eventId" />
		</div>
		<BeachSliderArea id="other-events" class="beach-event__similar-beaches" :data="eventData.otherEvents" v-if="eventData.otherEvents.beachNumber > 0" />
	</div>
</template>

<script>
	import BeachQuickData from '~/components/pages/beach/BeachQuickData';
	import BeachEventSections from '~/components/pages/beach-event/BeachEventSections';
	import SliderHugeBeachEventPage from '~/components/pages/beach-event/SliderHugeBeachEventPage';
	import BeachEventMapWeather from '~/components/pages/beach-event/BeachEventMapWeather';
	import BeachEventSideButtons from '~/components/pages/beach-event/BeachEventSideButtons';
	import BeachEventMainInfo from '~/components/pages/beach-event/BeachEventMainInfo';
	import BeachEventVisitorPics from '~/components/pages/beach-event/BeachEventVisitorPics';
	import BeachEventParkingsTransport from '~/components/pages/beach-event/BeachEventParkingsTransport';
	import BeachEventAbout from '~/components/pages/beach-event/BeachEventAbout';
	import BeachEventReviews from '~/components/pages/beach-event/BeachEventReviews';
	import AnnouncementCard from '~/components/global/AnnouncementCard';
	import BeachSliderArea from '~/components/global/BeachSliderArea';

	import { mapGetters } from 'vuex';

	export default {
		components: {
			BeachEventSections,
			SliderHugeBeachEventPage,
			AnnouncementCard,
			BeachEventMainInfo,
			BeachSliderArea,
			BeachEventAbout,
			BeachEventParkingsTransport,
			BeachEventReviews,
			BeachEventVisitorPics,
			BeachEventMapWeather,
			BeachEventSideButtons,
			BeachQuickData
		},

		data() {
			return {
				favorite: false
			}
		},

		mounted() {
			this.$bus.$on('pToggleFavorites', () => {
				this.favorite = !this.favorite;
			})

			if (this.eventData.mainData.eventId && this.$cookies.get(`favorites.events.${this.eventData.mainData.eventId}`))
				this.favorite = true;
		},

		methods: {
			updateHeart() {
				this.$bus.$emit('cToggleFavorites');
			}
		},

		async fetch({ store, params, redirect }) {
			let res = await store.dispatch('event/getEvent', params.id);
			if (res == 404)
				redirect('/404');
		},

		computed: {
		    ...mapGetters('event', ['eventData'])
		}
	}
</script>
