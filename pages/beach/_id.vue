<template>
  <div class="beach-page custom-page">
    <div class="beach-page__container custom-container">
      <client-only>
        <!-- Navigation Menu -->
        <BeachEventSections
          :sections="getSections"
          :beach="true"
          class="beach-page-sections--w-100"
        />

        <!-- Main gallery slider -->
        <SliderHugeBeachEventPage
          :data="beach"
          @call-modal="changeModalState"
        />
      </client-only>

      <!-- TODO Не совсем понятно зачем тут эта обертка -->
      <div class="custom-container-inner">
        <!-- Sidebar actions -->
        <BeachEventSideButtons
          :data="beach"
          :dont-show-pave="true"
        />
      </div>

      <div class="two-part-layout">
        <!-- Left side -->
        <main class="two-part-layout__left">
          <!-- Main info -->
          <BeachEventMainInfo
            :data="beach"
          />

          <!-- Distance -->
          <!-- TODO Почему это здесь? -->
          <div v-if="distance" class="beach-page__avg-rating__mobile distance-right-mobile">
            <p class="m-0">
              Расстояние до пляжа <span>{{ distance.toString().replace(/\./, ',') }} км</span>
            </p>
          </div>

          <!-- Rating Mobile -->
          <BeachAvgRating
            v-if="beach.ratings.length > 0"
            :data="beach"
            class="beach-page__avg-rating__mobile"
          />

          <!-- Infrastructure -->
          <BeachQuickData
            v-if="beach.infrastructures.length > 0"
            :title="'Инфраструктура пляжа'"
            :data="beach.infrastructures"
            action="service"
            :href="true"
          />

          <!-- Weather -->
          <BeachEventMapWeather
            :data="beach"
            :location-data="beach"
            :beach="true"
            class="beach-event__map-weather__tablet"
          />

          <!-- About -->
          <BeachEventAbout
            v-if="beach.desc && beach.desc.length > 1"
            :data="{about: beach.desc, title: 'О пляже'}"
          />

          <!-- Weather mobile?? -->
          <!-- TODO Непонятно, это вообще используется? -->
          <BeachEventMapWeather
            v-if="beach.pos.length > 0"
            :data="beach"
            :location-data="beach"
            :beach="true"
            class="beach-event__map-weather__mobile"
          />

          <!-- Services -->
          <div id="services">
            <BeachQuickData
              v-if="beach.services.length > 0"
              :title="'Услуги и аренда'"
              :data="beach.services"
              action="service"
            />
          </div>

          <!-- Transport map  -->
          <BeachEventParkingsTransport
            v-if="getParking && (getParking.parkings.auto.length > 0 || getParking.parkings.bus.length > 0)"
            id="pt"
            :additional="[...getParking.parkings.auto.filter(e => Array.isArray(e.pos)), ...getParking.parkings.bus.filter(e => Array.isArray(e.pos)), ...getInfraData.filter(e => Array.isArray(e.pos))]"
            :data="getParking"
          />

          <!-- Temp Chart -->
          <BeachWaterTemperatureHistogram
            v-if="getWaterTemp.waterHistogramData.length > 0"
            id="water-temp"
            :data="getWaterTemp.waterHistogramData"
            :data-air="getWaterTemp.airHistogramData"
          />

          <!-- Events Slider -->
          <BeachEvents
            v-if="getEvents.cardData.length > 0"
            :show-temp="false"
            :data="getEvents"
            class="beach-page__cardless-area"
          />

          <!-- Places -->
          <BeachBarsNRestos
            v-if="barsNRestos.length > 0"
            :data="barsNRestos"
            class="beach-page__cardless-area"
          />

          <!-- Opinions -->
          <!-- TODO Check this shit! -->
          <BeachOpinions
            v-if="opinions.length > 0"
            id="opinions"
            :data="opinions"
          />

          <client-only>
            <!-- Testimonials -->
            <BeachEventReviews
              :type-id="beach.beachId"
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
          <div v-if="distance" class="distance-right">
            <p class="m-0">
              Расстояние до пляжа <span>{{ distance.toString().replace(/\./, ',') }} км</span>
            </p>
          </div>

          <!-- Rating sidebar -->
          <BeachAvgRating
            :data="beach"
            class="beach-page__avg-rating__desktop"
          />

          <!-- Map sidebar -->
          <BeachEventMapWeather
            v-if="beach.pos.length > 0"
            :location-data="beach"
            :data="beach"
            :beach="true"
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
          :data="visitorPics"
          :type="'beach'"
          :type-id="beach.beachId"
          :title="meta.h1 || 'пляже' "
        />
      </client-only>
    </div>
    <div id="similar-beaches">
      <BeachSliderArea
        v-if="getSimilarBeaches && getSimilarBeaches.beachNumber"
        class="beach-event__similar-beaches"
        :data="getSimilarBeaches"
      />
    </div>
    <iframe360
      v-if="show_pano"
      :url="beach.panorama"
      @close-modal="changeModalState"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
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
import iframe360 from '~/components/pages/beach/iframe360';

import { getDistanceFromLatLonInKm } from '../../assets/calcDistance';
import { head } from '~/mixins/head';

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
    iframe360,
  },
  mixins: [head],
  data() {
    return {
      show_pano: false,
      last_coordinates: this.$cookies.get('last_coordinates') || {},
    };
  },

  async fetch({ store, params, redirect }) {
    const res = await store.dispatch('beach/getBeach', params.id);
    if (res === 404) redirect('/404');
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
      'getInfraData',
      'getEvents',
      'hotelsData',
      'getAnnounce',
      'getSimilarBeaches',
    ]),
    ...mapGetters(['mapEntity']),
    // TODO
    distance() {
      if (!this.beach) return;
      const { pos } = this.beach;
      if (Object.values(this.last_coordinates).length && pos && pos.length) {
        const [lat2, lng2] = pos;
        const { lat, lng } = this.last_coordinates;
        return getDistanceFromLatLonInKm(lat, lng, Number(lat2), Number(lng2))
          .toFixed(1);
      }
      return null;
    },
  },
  methods: {
    changeModalState() {
      this.show_pano = !this.show_pano;
    },
  },
};
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
