<template>
	<div class="beach-page custom-page">
		<div class="beach-page__container custom-container">
			<BeachEventSections :sections="$store.state.eventPageSections" class="beach-page-sections event-page-sections" />
			<SliderHugeBeachEventPage :data="eventData.hugeSliderData" />
			<div class="custom-container-inner">
				<BeachEventSideButtons :share="true" :crossBlue="true" :ymaps="true" :yandex="true" class="event-page__side-buttons" />
			</div>
			<div class="two-part-layout">
				<main class="two-part-layout__left">
					<button class="event-page__hearts" @click="updateHeart()">
						<img src="~/static/pics/global/svg/heart_button_unclicked.svg" v-show="!liked">
						<img src="~/static/pics/global/svg/heart_button_clicked.svg" v-show="liked">
						<span>({{ $store.state.eventMainData.likes + (liked ? 1 : 0) }}) Добавить в избранное</span>
					</button>
					<BeachEventMainInfo :data="$store.state.eventMainData" class="event-page__main-info" />
					<BeachEventMapWeather :data="$store.state.mapWeatherEventData" class="beach-event__map-weather__event-page" />
					<BeachEventAbout id="id-0" :data="$store.state.eventAbout" />
					<BeachEventParkingsTransport id="id-1" :data="$store.state.parkingTransportMapData" />
					<BeachEventReviews id="id-2" :data="$store.state.guestReviewsData" class="beach-page__cardless-area" />
				</main>
				<aside class="two-part-layout__right">
					<BeachEventMapWeather :data="$store.state.mapWeatherEventData" class="beach-event__map-weather__desktop" />
					<AnnouncementCard :data="$store.state.announcementData" />
				</aside>
			</div>
		</div>
		<BeachEventVisitorPics :data="$store.state.visitorPicsData" class="main-page__white-wrapper beach-event__visitor-pics-wrapper" />
		<BeachEvents class="beach-event__similar-beaches" :data="$store.state.beachEventsSliderData" :areaData="$store.state.otherEventsData" />
		<BeachSliderArea class="main-page__hotels" :data="$store.state.hotelData" :areaData="$store.state.hotelAreaData" />
	</div>
</template>

<script>
	import BeachEventSections from '~/components/pages/beach-event/BeachEventSections';
	import SliderHugeBeachEventPage from '~/components/pages/beach-event/SliderHugeBeachEventPage';
	import BeachEventMapWeather from '~/components/pages/beach-event/BeachEventMapWeather';
	import BeachEventSideButtons from '~/components/pages/beach-event/BeachEventSideButtons';
	import BeachEventMainInfo from '~/components/pages/beach-event/BeachEventMainInfo';
	import BeachEventVisitorPics from '~/components/pages/beach-event/BeachEventVisitorPics';
	import BeachEventParkingsTransport from '~/components/pages/beach-event/BeachEventParkingsTransport';
	import BeachEventAbout from '~/components/pages/beach-event/BeachEventAbout';
	import BeachEvents from '~/components/pages/beach-event/BeachEvents';
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
			BeachEvents
		},

		data() {
			return {
				liked: false
			}
		},

		mounted() {
			this.$bus.$on('pToggleFavorites', () => {
				this.liked = !this.liked;
			})
		},

		methods: {
			updateHeart() {
				if (this.liked)
					this.$bus.$emit('decreaseFavorites');
				else this.$bus.$emit('increaseFavorites');

				this.$bus.$emit('cToggleFavorites');

				this.liked = !this.liked;
			}
		},

		validate({ params }) {
		    // Must be a number
		    return /^\d+$/.test(params.id);
		},

		async fetch({ store, params }) {
			await store.dispatch('event/getEvent', params.id);
		},

		computed: {
		    ...mapGetters('event', ['eventData'])
		}
	}
</script>
