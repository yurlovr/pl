<template>
	<div class="beach-page custom-page">
		<div class="beach-page__container custom-container">
			<BeachEventSections :sections="beachData.sections" class="beach-page-sections--w-100" />
			<SliderHugeBeachEventPage :data="beachData.hugeSliderData" id="id-0" />
			<div class="custom-container-inner">
				<BeachEventSideButtons :share="true" :crossBlue="true" :ymaps="true" :yandex="true" />
			</div>
			<div class="two-part-layout">
				<main class="two-part-layout__left">
					<BeachEventMainInfo :data="beachData.mainData" />
					<BeachAvgRating :data="beachData.avgRating" class="beach-page__avg-rating__mobile" />
					<BeachQuickData id="id-1" :title="'Инфраструктура пляжа'" :data="beachData.infraData" />
					<BeachEventMap :data="beachData.sideMapData" class="beach-event__map-weather__tablet" />
					<BeachEventAbout id="id-2" name="id-2" :data="beachData.about" />
					<BeachEventMap :data="beachData.sideMapData" class="beach-event__map-weather__mobile" />
					<BeachQuickData id="id-3" name="id-3" :title="'Услуги и аренда'" :data="beachData.servicesData" />
					<BeachEventParkingsTransport id="id-4" name="id-4" :data="beachData.ptData" />
					<BeachWaterTemperatureHistogram id="id-5" name="id-5" v-if="beachData.waterHistogramData.length > 0" :data="beachData.waterHistogramData" />
					<BeachEvents id="id-6" name="id-6" :temp="false" :data="beachData.events" class="beach-page__cardless-area" />
					<BeachBarsNRestos id="id-7" name="id-7" :data="beachData.barsNRestos" class="beach-page__cardless-area" />
					<BeachOpinions :data="beachData.opinions" />
					<BeachEventReviews id="id-9" name="id-9" :data="$store.state.guestReviewsData" class="beach-page__cardless-area" />
				</main>
				<aside class="two-part-layout__right">
					<BeachAvgRating :data="beachData.avgRating" class="beach-page__avg-rating__desktop" />
					<BeachEventMap :data="beachData.sideMapData" class="beach-event__map-weather__desktop" />
					<AnnouncementCard :data="$store.state.announcementData" class="beach-page__announcement" />
				</aside>
			</div>
		</div>
		<BeachEventVisitorPics id="id-8" name="id-8" :data="$store.state.visitorPicsData" class="main-page__white-wrapper beach-event__visitor-pics-wrapper" />
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
