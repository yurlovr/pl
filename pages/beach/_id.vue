<template>
	<div class="beach-page custom-page">
		<div class="beach-page__container custom-container">
			<BeachEventSections :sections="beachData.sections" class="beach-page-sections--w-100" />
			<SliderHugeBeachEventPage :data="beachData.hugeSliderData" id="gallery" />
			<div class="custom-container-inner">
				<BeachEventSideButtons :share="true" :crossBlue="true" :ymaps="true" :yandex="true" />
			</div>
			<div class="two-part-layout">
				<main class="two-part-layout__left">
					<BeachEventMainInfo :data="beachData.mainData" />
					<BeachAvgRating :data="beachData.avgRating" class="beach-page__avg-rating__mobile" />
					<BeachQuickData id="infra" :title="'Инфраструктура пляжа'" :data="beachData.infraData" v-if="beachData.infraData.length > 0" />
					<BeachEventMap :data="beachData.sideMapData" class="beach-event__map-weather__tablet" />
					<BeachEventAbout id="about" :data="beachData.about" />
					<BeachEventMap :data="beachData.sideMapData" class="beach-event__map-weather__mobile" />
					<BeachQuickData id="services" :title="'Услуги и аренда'" :data="beachData.servicesData" v-if="beachData.servicesData.length > 0" />
					<BeachEventParkingsTransport id="pt" :data="beachData.ptData" />
					<BeachWaterTemperatureHistogram id="waterTemp" v-if="beachData.waterHistogramData.length > 0" :data="beachData.waterHistogramData" />
					<BeachEvents id="events" :temp="false" :data="beachData.events" class="beach-page__cardless-area" v-if="beachData.events.cardData.length > 0" />
					<BeachBarsNRestos id="barsNRestos" :data="beachData.barsNRestos" v-if="beachData.barsNRestos.length > 0" class="beach-page__cardless-area" />
					<BeachOpinions :data="beachData.opinions" v-if="beachData.opinions.length > 0" />
					<BeachEventReviews id="reviews" :data="$store.state.guestReviewsData" class="beach-page__cardless-area" />
				</main>
				<aside class="two-part-layout__right">
					<BeachAvgRating :data="beachData.avgRating" class="beach-page__avg-rating__desktop" />
					<BeachEventMap :data="beachData.sideMapData" class="beach-event__map-weather__desktop" />
					<AnnouncementCard :data="$store.state.announcementData" class="beach-page__announcement" />
				</aside>
			</div>
		</div>
		<div class="main-page__white-wrapper beach-event__visitor-pics-wrapper"><BeachEventVisitorPics id="visitorPics" :data="$store.state.visitorPicsData" /></div>
		<BeachSliderArea class="beach-event__similar-beaches" :data="$store.state.similarNearData" />
		<BeachSliderArea class="main-page__hotels" :data="$store.state.hotelData" :areaData="$store.state.hotelAreaData" v-if="false" />
	</div>
</template>

<script>
	import BeachQuickData from '~/components/pages/beach/BeachQuickData';
	import BeachWaterTemperatureHistogram from '~/components/pages/beach/BeachWaterTemperatureHistogram';
	import BeachBarsNRestos from '~/components/pages/beach/BeachBarsNRestos';
	import BeachOpinions from '~/components/pages/beach/BeachOpinions';
	import BeachAvgRating from '~/components/pages/beach/BeachAvgRating';
	import BeachEventSections from '~/components/pages/beach-event/BeachEventSections';
	import SliderHugeBeachEventPage from '~/components/pages/beach-event/SliderHugeBeachEventPage';
	import BeachEventMap from '~/components/pages/beach-event/BeachEventMap';
	import BeachEventSideButtons from '~/components/pages/beach-event/BeachEventSideButtons';
	import BeachEventMainInfo from '~/components/pages/beach-event/BeachEventMainInfo';
	import BeachEventVisitorPics from '~/components/pages/beach-event/BeachEventVisitorPics';
	import BeachEventParkingsTransport from '~/components/pages/beach-event/BeachEventParkingsTransport';
	import BeachEventAbout from '~/components/pages/beach-event/BeachEventAbout';
	import BeachEventReviews from '~/components/pages/beach-event/BeachEventReviews';
	import AnnouncementCard from '~/components/global/AnnouncementCard';
	import BeachSliderArea from '~/components/global/BeachSliderArea';
	import BeachEvents from '~/components/pages/beach/BeachEvents';

	import { mapGetters } from 'vuex';

	export default {
		components: {
			BeachEventSections,
			SliderHugeBeachEventPage,
			AnnouncementCard,
			BeachEventMainInfo,
			BeachSliderArea,
			BeachQuickData,
			BeachEventAbout,
			BeachEventParkingsTransport,
			BeachWaterTemperatureHistogram,
			BeachEvents,
			BeachBarsNRestos,
			BeachOpinions,
			BeachEventReviews,
			BeachEventVisitorPics,
			BeachAvgRating,
			BeachEventMap,
			BeachEventSideButtons
		},

		validate({ params }) {
		    // Must be a number
		    return /^\d+$/.test(params.id);
		},

		async fetch({ store, params }) {
			await store.dispatch('beach/getBeach', params.id);
		},

		computed: {
		    ...mapGetters('beach', ['beachData'])
		}
	}
</script>
