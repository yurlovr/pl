<template>
	<div class="beach-page custom-page">
		<div class="beach-page__container custom-container">
			<BeachEventSections :sections="$store.state.eventPageSections" />
			<SliderHugeBeachEventPage :data="$store.state.eventPageSectionsData" />
			<div class="custom-container-inner">
				<BeachEventSideButtons :mail="true" :telegram="true" :crossOrange="true" />
			</div>
			<div class="two-part-layout">
				<main class="two-part-layout__left">
					<BeachEventMainInfo :data="$store.state.eventMainData" />
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
		}
	}
</script>
