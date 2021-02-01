<template>
  <div
    class="beach-page custom-page"
  >
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
      <div class="custom-container-inner">
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

          <!-- Rating Mobile -->
          <BeachAvgRating
            v-if="beach.ratings.length > 0"
            :data="beach"
            class="beach-page__avg-rating__mobile"
          />

          <!-- Infrastructure -->
          <section
            id="infra"
            class="two-part-layout__card beach-page__quick-data-wrapper"
          >
            <BeachQuickData
              v-if="beach.infrastructures.length > 0"
              :title="'Инфраструктура пляжа'"
              :data="beach.infrastructures.filter((i) => ![
                'ostanovki-obshchestvennogo-transporta',
                'parkovka',
              ].includes(i.code))"
              action="service"
              :href="true"
            />
          </section>

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

          <section
            id="services"
            class="two-part-layout__card beach-page__quick-data-wrapper"
            :class="!beach.services.length ? 'no-data' : ''"
          >
            <BeachQuickData
              v-if="beach.services.length > 0"
              :title="'Услуги и аренда'"
              :data="beach.services"
              action="service"
            />
            <NoBlock
              v-else
              :title="PLUG_TITLE.SERVICES.title"
              :description="'В настоящий момент раздел находится в заполнении.'"
              :white="true"
            />
          </section>

          <BeachEventParkingsTransport
            v-if="getParking && (getParking.parkings.auto.length > 0
              || getParking.parkings.bus.length > 0)"
            id="pt"
            :additional="[...getParking.parkings.auto.filter(e => Array.isArray(e.pos)),
                          ...getParking.parkings.bus.filter(e => Array.isArray(e.pos)),
                          ...getInfraData.filter(e => Array.isArray(e.pos))]"
            :data="getParking"
          />
          <LazyComponent>
            <template #placeholder>
              <BlockPlug
                :id="'water-temp'"
                :text="PLUG_TITLE.GRAF_TEMP"
                :height="668"
              />
            </template>
            <BeachWaterTemperature
              :city-id="beach.locationId"
            />
          </LazyComponent>

          <!-- Events Slider -->

          <LazyComponent>
            <template #placeholder>
              <BlockPlug
                :id="'events'"
                :text="PLUG_TITLE.EVENT"
                :height="374"
              />
            </template>
            <BeachEventsWrapper
              :beach-id="beach.id"
            />
          </LazyComponent>

          <LazyComponent>
            <template #placeholder>
              <BlockPlug
                :text="PLUG_TITLE.BARS"
              />
            </template>
            <BeachBarsWrapper
              :title="meta.h1"
              :beach-id="beach.id"
            />
          </LazyComponent>

          <LazyComponent>
            <template #placeholder>
              <BlockPlug
                :id="'opinions'"
                :text="PLUG_TITLE.OPINIONS"
              />
            </template>
            <BeachOpinionsWrapper
              :beach-id="beach.id"
            />
          </LazyComponent>

          <LazyComponent>
            <template #placeholder>
              <BlockPlug
                :id="'reviews'"
                :text="PLUG_TITLE.REVIEWS"
                :height="132"
              />
            </template>
            <BeachEventReviewsWrapper
              :id="beach.id"
            />
          </LazyComponent>
        </main>

        <aside class="two-part-layout__right">
          <BeachDistance
            v-if="distance"
            :distance="distance"
          />
          <BeachAvgRating
            :data="beach"
            class="beach-page__avg-rating__desktop"
          />
          <BeachEventMapWeather
            v-if="beach.pos.length > 0"
            :location-data="beach"
            :data="beach"
            :beach="true"
            class="beach-event__map-weather__desktop"
          />
          <!-- <LazyComponent>
            <AnnouncemetWrapper />
          </LazyComponent> -->
        </aside>
      </div>

      <LazyComponent>
        <template #placeholder>
          <BlockPlug
            :text="PLUG_TITLE.ANY_PLACES"
          />
        </template>
        <AnyPlaces
          :page="'beach'"
          :beach-id="beach.id"
        />
      </LazyComponent>

      <div class="beach-event__visitor-pics-wrapper">
        <LazyComponent>
          <template #placeholder>
            <BlockPlug
              :id="'visitor-pics'"
              :text="PLUG_TITLE.VISITOR_PICS"
              :height="672"
            />
          </template>
          <VisitorPicsWrapper
            :id="beach.id"
            :title="meta.h1 || 'пляже' "
          />
        </LazyComponent>
      </div>

      <LazyComponent>
        <template #placeholder>
          <BlockPlug
            :text="PLUG_TITLE.EXCURSIONS_BEACH"
            :height="649"
          />
        </template>
        <Excursions
          :page="'beach'"
          :beach-id="beach.id"
          :excursions-ids="beach.excursions"
        />
      </LazyComponent>

      <LazyComponent>
        <template #placeholder>
          <BlockPlug
            :id="'similar'"
            :text="PLUG_TITLE.SIMILAR"
            :height="365"
          />
        </template>
        <BeachSimilarWrapper
          :city-id="beach.locationId"
          :tags="beach.tags"
          :beach-id="beach.id"
        />
      </LazyComponent>
      <iframe360
        v-if="show_pano"
        :url="beach.panorama"
        @close-modal="changeModalState"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { getDistanceFromLatLonInKm } from '../../assets/calcDistance';
import { head } from '~/mixins/head';
import { PLUG_TITLE } from  '~/const/const';

export default {
  components: {
    iframe360: () => import('~/components/pages/beach/iframe360'),
    BeachEventAbout: () => import('~/components/pages/beach-event/BeachEventAbout'),
    BeachEventParkingsTransport: () => import('~/components/pages/beach-event/BeachEventParkingsTransport'),
    BeachEventMainInfo: () => import('~/components/pages/beach-event/BeachEventMainInfo'),
    BeachEventSideButtons: () => import('~/components/pages/beach-event/BeachEventSideButtons'),
    BeachEventMapWeather: () => import('~/components/pages/beach-event/BeachEventMapWeather'),
    SliderHugeBeachEventPage: () => import('~/components/pages/beach-event/SliderHugeBeachEventPage'),
    BeachEventSections: () => import('~/components/pages/beach-event/BeachEventSections'),
    BeachAvgRating: () => import('~/components/pages/beach/BeachAvgRating'),
    BeachQuickData: () => import('~/components/pages/beach/BeachQuickData'),
    LazyComponent: () => import('~/components/global/LazyComponent'),
    BlockPlug: () => import('~/components/global/BlockPlug'),
    BeachBarsWrapper: () => import('~/components/pages/beach/BeachBarsWrapper'),
    AnnouncemetWrapper: () => import('~/components/global/AnnouncemetWrapper'),
    VisitorPicsWrapper: () => import('~/components/global/VisitorPicsWrapper'),
    AnyPlaces: () => import('~/components/pages/main/AnyPlaces'),
    BeachEventReviewsWrapper: () => import('~/components/pages/beach-event/BeachEventReviewsWrapper'),
    BeachWaterTemperature: () => import('~/components/pages/beach/BeachWaterTemperature'),
    BeachOpinionsWrapper: () => import('~/components/pages/beach/BeachOpinionsWrapper'),
    BeachDistance: () => import('~/components/pages/beach/BeachDistance'),
    BeachSimilarWrapper: () => import('~/components/pages/beach/BeachSimilarWrapper'),
    BeachEventsWrapper: () => import('~/components/pages/beach/BeachEventsWrapper'),
    Excursions: () => import('~/components/global/Excursions'),
    NoBlock: () => import('~/components/pages/beach/NoBlock'),
  },
  mixins: [head],
  data() {
    return {
      show_pano: false,
      last_coordinates: this.$cookies.get('last_coordinates') || {},
      PLUG_TITLE,
    };
  },

  async fetch({ store, params, redirect }) {
    await store.dispatch('beach/getBeach', params.id);
    if (store.getters['beach/getError']) {
      redirect('/404');
    }
  },
  computed: {
    ...mapState('beach', [
      'beach',
      'events',
      'barsNRestos',
      'reviews',
      'similarBeaches',
    ]),
    ...mapGetters('beach', [
      'getSections',
      'getParking',
      'getInfraData',
      'getError',
    ]),
    distance() {
      if (!this.beach) return null;
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
.two-part-layout {
  min-height: 1000px;
}
#infra, #services {
  min-height: 485px;
}
#services.no-data {
  min-height: 250px;
}
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
