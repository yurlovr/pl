<template>
	<div class="beach-page custom-page">
		<div class="beach-page__container custom-container">
			<BeachEventSections :sections="$store.state.beachPageSections" class="beach-page-sections--w-100" />
			<SliderHugeBeachEventPage :data="$store.state.beachPageSectionsData" id="id-0" />
			<div class="custom-container-inner">
				<BeachEventSideButtons :share="true" :crossBlue="true" :ymaps="true" :yandex="true" />
			</div>
			<div class="two-part-layout">
				<main class="two-part-layout__left">
					<BeachEventMainInfo :data="$store.state.beachMainData" />
					<BeachAvgRating :data="$store.state.avgRating" class="beach-page__avg-rating__mobile" />
					<BeachQuickData id="id-1" :title="'Инфраструктура пляжа'" :data="$store.state.beachInfraData" />
					<BeachEventMapWeather :data="$store.state.mapWeatherData" class="beach-event__map-weather__tablet" />
					<BeachEventAbout id="id-2" :data="$store.state.beachAbout" />
					<BeachEventMapWeather :data="$store.state.mapWeatherData" class="beach-event__map-weather__mobile" />
					<BeachQuickData id="id-3" :title="'Услуги и аренда'" :data="$store.state.beachServicesData" />
					<BeachEventParkingsTransport id="id-4" :data="$store.state.parkingTransportMapData" />
					<BeachWaterTemperatureHistogram id="id-5" :data="$store.state.beachWaterTemperatureData" />
					<BeachEvents id="id-6" :temp="false" :data="$store.state.beachEventData" class="beach-page__cardless-area" />
					<BeachBarsNRestos id="id-7" :data="$store.state.beachBarsNRestos" class="beach-page__cardless-area" />
					<BeachOpinions :data="$store.state.opinionsData" />
					<BeachEventReviews id="id-9" :data="$store.state.guestReviewsData" class="beach-page__cardless-area" />
				</main>
				<aside class="two-part-layout__right">
					<BeachAvgRating :data="$store.state.avgRating" class="beach-page__avg-rating__desktop" />
					<BeachEventMapWeather :data="$store.state.mapWeatherData" class="beach-event__map-weather__desktop" />
					<AnnouncementCard :data="$store.state.announcementData" class="beach-page__announcement" />
				</aside>
			</div>
		</div>
		<BeachEventVisitorPics id="id-8" :data="$store.state.visitorPicsData" class="main-page__white-wrapper beach-event__visitor-pics-wrapper" />
		<BeachSliderArea class="beach-event__similar-beaches" :data="$store.state.beachSliderData" :areaData="$store.state.similarNearAreaData" />
		<BeachSliderArea class="main-page__hotels" :data="$store.state.hotelData" :areaData="$store.state.hotelAreaData" />
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
	import BeachEventMapWeather from '~/components/pages/beach-event/BeachEventMapWeather';
	import BeachEventSideButtons from '~/components/pages/beach-event/BeachEventSideButtons';
	import BeachEventMainInfo from '~/components/pages/beach-event/BeachEventMainInfo';
	import BeachEventVisitorPics from '~/components/pages/beach-event/BeachEventVisitorPics';
	import BeachEventParkingsTransport from '~/components/pages/beach-event/BeachEventParkingsTransport';
	import BeachEventAbout from '~/components/pages/beach-event/BeachEventAbout';
	import BeachEventReviews from '~/components/pages/beach-event/BeachEventReviews';
	import AnnouncementCard from '~/components/global/AnnouncementCard';
	import BeachSliderArea from '~/components/global/BeachSliderArea';
	import BeachEvents from '~/components/pages/beach/BeachEvents';

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
			BeachEventMapWeather,
			BeachEventSideButtons
		}
	}
</script>
