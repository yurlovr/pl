<template>
  <div class="beach-page custom-page">
    <div class="beach-page__container custom-container">
      <BeachEventSections :sections="beachData.sections" class="beach-page-sections--w-100"/>
      <SliderHugeBeachEventPage :data="beachData.hugeSliderData" id="gallery" @call-modal="changeModalState"/>
      <div class="custom-container-inner">
        <BeachEventSideButtons :data="beachData.sideMapWeatherData"/>
      </div>
      <div class="two-part-layout">
        <main class="two-part-layout__left">
          <BeachEventMainInfo id="main-info" :data="beachData.mainData"/>
          <div v-if="distance" class="beach-page__avg-rating__mobile distance-right-mobile">
            <p class="m-0">Расстояние до пляжа <span>{{distance.toString().replace(/\./, ',')}} км</span></p>
          </div>
          <BeachAvgRating :data="beachData.avgRating" v-if="beachData.avgRating.ratings.length > 0"
                          class="beach-page__avg-rating__mobile"/>
          <BeachQuickData id="infra" :title="'Инфраструктура пляжа'" :data="beachData.infraData" action="service" :href="true"
                          v-if="beachData.infraData.length > 0"/>
          <BeachEventMapWeather :data="beachData.sideMapWeatherData" class="beach-event__map-weather__tablet"/>
          <BeachEventAbout id="about" :data="beachData.about" v-if="beachData.about && beachData.about.length > 1"
                           :title="'О пляже'"/>
          <BeachEventMapWeather :data="beachData.sideMapWeatherData" v-if="beachData.sideMapWeatherData.pos.length > 0"
                                class="beach-event__map-weather__mobile"/>
          <BeachQuickData id="services" :title="'Услуги и аренда'" :data="beachData.servicesData" action="service"
                          v-if="beachData.servicesData.length > 0"/>
          <BeachEventParkingsTransport id="pt" :data="beachData.ptData"
                                       :additional="[...beachData.servicesData.filter(e => Array.isArray(e.pos)), ...beachData.infraData.filter(e => Array.isArray(e.pos))]"
                                       v-if="beachData.ptData.parkings.auto.length > 0 || beachData.ptData.parkings.bus.length > 0"/>
          <BeachWaterTemperatureHistogram id="water-temp" v-if="beachData.waterHistogramData.length > 0"
                                          :data="beachData.waterHistogramData"/>
          <BeachEvents id="events" :showTemp="false" :data="beachData.events" class="beach-page__cardless-area"
                       v-if="beachData.events.cardData.length > 0"/>
          <BeachBarsNRestos id="barsNRestos" :data="beachData.barsNRestos" v-if="beachData.barsNRestos.length > 0"
                            class="beach-page__cardless-area"/>
          <BeachOpinions id="opinions" :data="beachData.opinions" v-if="beachData.opinions.length > 0"/>
          <BeachEventReviews id="reviews" :typeId="beachData.mainData.beachId" :data="beachData.reviews" :type="'beach'"
                             class="beach-page__cardless-area"/>
        </main>
        <aside class="two-part-layout__right">
            <div class="distance-right" v-if="distance">
              <p class="m-0">Расстояние до пляжа <span>{{distance.toString().replace(/\./, ',')}} км</span></p>
            </div>
          <BeachAvgRating :data="beachData.avgRating" class="beach-page__avg-rating__desktop"/>
          <BeachEventMapWeather :data="beachData.sideMapWeatherData" v-if="beachData.sideMapWeatherData.pos.length > 0"
                                class="beach-event__map-weather__desktop"/>
          <AnnouncementCard :data="beachData.announcementData" class="beach-page__announcement"/>
        </aside>
      </div>
    </div>
    <div class="main-page__white-wrapper beach-event__visitor-pics-wrapper">
      <BeachEventVisitorPics id="visitor-pics" :data="beachData.visitorPics" :type="'beach'"
                             :typeId="beachData.mainData.beachId"/>
    </div>
    <BeachSliderArea id="similar-beaches" class="beach-event__similar-beaches" :data="beachData.similarBeaches"
                     v-if="beachData.similarBeaches.beachNumber"/>
    <iframe360 v-if="show_pano" @close-modal="changeModalState" :url="beachData.hugeSliderData.panorama"></iframe360>
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
  import iframe360 from "../../components/pages/beach/iframe360";

  import {mapGetters} from 'vuex';
  import {getDistanceFromLatLonInKm} from "../../assets/calcDistance";

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
      BeachEventSideButtons,
      iframe360
    },
    data() {
      return {
        show_pano: false,
        last_coordinates: this.$cookies.get('last_coordinates') || {},
        meta: {}
      }
    },

    head(){
    const stable = 'ПЛЯЖИ.РУ'
      return {
        title: this.meta.title || stable,
        meta: [
          {
            hid: 'description-beach',
            name: 'description',
            content: this.meta.description || stable
          },
          {hid: 'keywords-beach', name: 'keywords', content: this.meta.keywords || stable},
        ]
      }
    },

    async fetch({store, params, redirect}) {
      let res = await store.dispatch('beach/getBeach', params.id);
      if (res == 404)
        redirect('/404');
    },

    computed: {
      ...mapGetters('beach', ['beachData']),
      distance(){
        let {sideMapWeatherData:{pos}} = this.beachData;
        if (Object.values(this.last_coordinates).length && pos && pos.length){
          let lat2 = pos[0], lng2 = pos[1],
            {lat, lng} = this.last_coordinates;
          return Number(getDistanceFromLatLonInKm(lat, lng, Number(lat2), Number(lng2)).toFixed(1))
        }
        return null
      },
    },
    methods: {
      changeModalState() {
        this.show_pano = !this.show_pano;
      }
    },
   async created() {
      await this.$axios.$get('seo/meta?url=/beach/'+ this.beachData.mainData.beachId).then(res => {
        this.meta = res.data
      })
    }
  }
</script>
