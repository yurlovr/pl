<template>
  <div class="beach-page custom-page">
    <div class="beach-page__container custom-container">

       <client-only>

        <!-- Navigation Menu -->
        <BeachEventSections
          :sections="getSections"
          class="beach-page-sections--w-100"
        />

        <!-- Main gallery slider -->
        <SliderHugeBeachEventPage
          :data="beach"
          id="gallery"
          @call-modal="changeModalState"
        />

      </client-only>

      <!-- TODO Не совсем понятно зачем тут эта обертка -->
      <div class="custom-container-inner">

        <!-- Sidebar actions -->
        <BeachEventSideButtons
          :data="beach"
        />
      </div>

      <div class="two-part-layout">

        <!-- Left side -->
        <main class="two-part-layout__left">

          <!-- Main info -->
          <BeachEventMainInfo
            id="main-info"
            :data="beach"
          />

          <!-- Distance -->
          <!-- TODO Почему это здесь? -->
          <div class="beach-page__avg-rating__mobile distance-right-mobile" v-if="distance">
            <p class="m-0">Расстояние до пляжа <span>{{distance.toString().replace(/\./, ',')}} км</span></p>
          </div>

          <!-- Rating Mobile -->
          <BeachAvgRating
            :data="beach"
            v-if="beach.ratings.length > 0"
            class="beach-page__avg-rating__mobile"
          />

          <!-- Infrastructure -->
          <BeachQuickData
            id="infra"
            :title="'Инфраструктура пляжа'"
            :data="beach.infrastructures"
            action="service"
            :href="true"
            v-if="beach.infrastructures.length > 0"
          />

          <!-- Weather -->
          <BeachEventMapWeather
            :data="beach"
            :locationData="beach"
            class="beach-event__map-weather__tablet"
          />

          <!-- About -->
          <BeachEventAbout
            id="about"
            :data="beach.desc"
            v-if="beach.desc && beach.desc.length > 1"
            :title="'О пляже'"
          />

          <!-- Weather mobile?? -->
          <!-- TODO Непонятно, это вообще используется? -->
          <BeachEventMapWeather
            :data="beach"
            :locationData="beach"
            v-if="beach.pos.length > 0"
            class="beach-event__map-weather__mobile"
          />

          <!-- Services -->
          <BeachQuickData
            id="services"
            :title="'Услуги и аренда'"
            :data="beach.services"
            action="service"
            v-if="beach.services.length > 0"
          />

          <!-- Transport map  -->
<!--          <BeachEventParkingsTransport-->
<!--            id="pt"-->
<!--            :data="getParking"-->
<!--            :additional="[...getParking.filter(e => Array.isArray(e.pos)), ...getInfraData.filter(e => Array.isArray(e.pos))]"-->
<!--            v-if="getParking.parkings.auto.length > 0 || getParking.parkings.bus.length > 0"-->
<!--          />-->

          <!-- Temp Chart -->
          <BeachWaterTemperatureHistogram
            id="water-temp"
            v-if="getWaterTemp.waterHistogramData.length > 0"
            :data="getWaterTemp.waterHistogramData"
            :dataAir="getWaterTemp.airHistogramData"
          />

          <!-- Events Slider -->
          <BeachEvents
            id="events"
            :showTemp="false"
            :data="getEvents"
            class="beach-page__cardless-area"
            v-if="getEvents.cardData.length > 0"
          />

          <!-- Places -->
          <BeachBarsNRestos
            id="barsNRestos"
            :data="barsNRestos"
            v-if="barsNRestos.length > 0"
            class="beach-page__cardless-area"
          />

          <!-- Opinions -->
          <!-- TODO Check this shit! -->
          <BeachOpinions
            id="opinions"
            :data="opinions"
            v-if="opinions.length > 0"
          />

          <client-only>
            <!-- Testimonials -->
            <BeachEventReviews
              id="reviews"
              :typeId="beach.beachId"
              :data="reviews"
              :type="'beach'"
              class="beach-page__cardless-area"
            />

          </client-only>
        </main>


        <!-- Sidebar -->
        <aside class="two-part-layout__right">

          <!-- Distance -->
          <!-- TODO Check mobile -->
          <!-- TODO Move to component -->
          <div class="distance-right" v-if="distance">
            <p class="m-0">
              Расстояние до пляжа <span>{{distance.toString().replace(/\./, ',')}} км</span>
            </p>
          </div>

          <!-- Rating sidebar -->
          <BeachAvgRating
            :data="beach"
            class="beach-page__avg-rating__desktop"
          />

          <!-- Map sidebar -->
          <BeachEventMapWeather
            :locationData="beach"
            :data="beach"
            v-if="beach.pos.length > 0"
            class="beach-event__map-weather__desktop"
          />

          <!-- Announcement -->
          <!-- TODO Что это?? -->
          <AnnouncementCard
            v-if="getAnnounce"
            :data="getAnnounce"
            class="beach-page__announcement"
          />

        </aside>
      </div>
    </div>

    <div class="custom-container">

      <BeachSliderArea
        v-if="hotelsData.hotels && hotelsData.hotels.beachNumber > 0"
        :data="hotelsData.hotels"
        class="hotels-section"
        outlink="https://nash.travel/hotel"
      />
    </div>

    <div class="main-page__white-wrapper beach-event__visitor-pics-wrapper">

      <client-only>
        <BeachEventVisitorPics
          id="visitor-pics"
          :data="visitorPics"
          :type="'beach'"
          :typeId="beach.beachId"
        />
      </client-only>

    </div>

    <BeachSliderArea
      id="similar-beaches"
      class="beach-event__similar-beaches"
      :data="getSimilarBeaches"
      v-if="getSimilarBeaches && getSimilarBeaches.beachNumber"
    />

    <iframe360
      v-if="show_pano"
      @close-modal="changeModalState"
      :url="beach.panorama">
    </iframe360>
  </div>
</template>

<script>
  import BeachQuickData from '~/components/pages/beach/BeachQuickData';
  import BeachWaterTemperatureHistogram from '~/components/pages/beach/BeachWaterTemperatureHistogram';
  import BeachBarsNRestos   from '~/components/pages/beach/BeachBarsNRestos';
  import BeachOpinions      from '~/components/pages/beach/BeachOpinions';
  import BeachAvgRating     from '~/components/pages/beach/BeachAvgRating';
  import BeachEventSections from '~/components/pages/beach-event/BeachEventSections';
  import SliderHugeBeachEventPage from '~/components/pages/beach-event/SliderHugeBeachEventPage';
  import BeachEventMapWeather  from '~/components/pages/beach-event/BeachEventMapWeather';
  import BeachEventSideButtons from '~/components/pages/beach-event/BeachEventSideButtons';
  import BeachEventMainInfo    from '~/components/pages/beach-event/BeachEventMainInfo';
  import BeachEventVisitorPics from '~/components/pages/beach-event/BeachEventVisitorPics';
  import BeachEventParkingsTransport from '~/components/pages/beach-event/BeachEventParkingsTransport';
  import BeachEventAbout    from '~/components/pages/beach-event/BeachEventAbout';
  import BeachEventReviews  from '~/components/pages/beach-event/BeachEventReviews';
  import AnnouncementCard   from '~/components/global/AnnouncementCard';
  import BeachSliderArea    from '~/components/global/BeachSliderArea';
  import BeachEvents        from '~/components/pages/beach/BeachEvents';
  import iframe360          from '~/components/pages/beach/iframe360';

  import {mapGetters, mapState} from 'vuex';
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
      }
    },
    async asyncData( {$axios, route}){
      const {data} = await $axios.$get('seo/meta?url=/beach/'+ route.params.id)
      return {
        meta: data
      }
    },

    head() {
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
      ...mapState('beach', [
        'beach',
        'events',
        'barsNRestos',
        'opinions',
        'reviews',
        'similarBeaches',
        'visitorPics',
      ]),
      ...mapGetters('beach', [
        'getSections',
        'getWaterTemp',
        'getParking',
        'getEvents',
        'hotelsData',
        'getAnnounce',
        'getSimilarBeaches'
      ]),
      ...mapGetters(['mapEntity']),
      // TODO
      distance() {
        if (!this.beach) return
        let { pos } = this.beach;
        if (Object.values(this.last_coordinates).length && pos && pos.length){
          const [ lat2, lng2 ] = pos
          const { lat, lng } = this.last_coordinates;
          return getDistanceFromLatLonInKm(lat, lng, Number(lat2), Number(lng2))
            .toFixed(1)
        }
        return null
      },
    },
    methods: {
      changeModalState() {
        this.show_pano = !this.show_pano;
      }
    },
  }
</script>

<style lang="scss">
.hotels-section {
  padding: 0;
  margin-top: 30px;
  margin-bottom: 30px;
  .custom-card {
    &__pic {
      height: 340px;
    }
  }
  .slider__arrow-left, .slider__arrow-right {
    top: 170px;
  }
}
</style>
