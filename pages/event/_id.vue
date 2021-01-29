<template>
  <div class="beach-page custom-page">
    <div class="beach-page__container custom-container">
      <client-only>
        <BeachEventSectionsWrapper />
        <BeachEventHugeWrapper />
      </client-only>

      <div class="custom-container-inner">
        <BeachEventSideButtonsWrapper />
      </div>
      <div class="two-part-layout">
        <main class="two-part-layout__left">
          <BeachEventMainInfoWrapper />
          <BeachEventInfraWrapper />
          <BeachEventAboutWrapper />
          <BeachEventTransportWrapper />
        </main>

        <aside class="two-part-layout__right">
          <BeachEventWeatherWrapper
            :page="'event'"
          />
          <LazyComponent>
            <AnnouncemetWrapper />
          </LazyComponent>
        </aside>
      </div>
      <LazyComponent>
        <template #placeholder>
          <BlockPlug
            :id="'reviews'"
            :text="PLUG_TITLE.REVIEWS"
            :height="132"
          />
        </template>
        <BeachEventReviewsWrapper
          :id="getMainInfo.eventId"
        />
      </LazyComponent>
    </div>

    <LazyComponent>
      <template #placeholder>
        <BlockPlug
          :id="'visitor-pics'"
          :text="PLUG_TITLE.VISITOR_PICS"
        />
      </template>
      <VisitorPicsWrapper
        :id="getEventId"
        :title="meta.h1 || 'мероприятии' "
      />
    </LazyComponent>

    <LazyComponent>
      <template #placeholder>
        <BlockPlug
          :text="PLUG_TITLE.ANY_PLACES"
        />
      </template>
      <AnyPlaces
        :page="'main'"
      />
    </LazyComponent>

    <LazyComponent>
      <template #placeholder>
        <BlockPlug
          :text="PLUG_TITLE.ANY_PLACES"
        />
      </template>
      <AnyPlaces
        :page="'event'"
      />
    </LazyComponent>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BeachEventInfraWrapper from '~/components/pages/beach-event/BeachEventInfraWrapper';
import BeachEventTransportWrapper from '~/components/pages/beach-event/BeachEventTransportWrapper';
import BeachEventWeatherWrapper from '~/components/pages/beach-event/BeachEventWeatherWrapper';
import BeachEventHugeWrapper from '~/components/pages/beach-event/BeachEventHugeWrapper';
import BeachEventSectionsWrapper from '~/components/pages/beach-event/BeachEventSectionsWrapper';
import BeachEventSideButtonsWrapper from '~/components/pages/beach-event/BeachEventSideButtonsWrapper';
import BeachEventMainInfoWrapper from '~/components/pages/beach-event/BeachEventMainInfoWrapper';
import BeachEventAboutWrapper from '~/components/pages/beach-event/BeachEventAboutWrapper';
import AnnouncemetWrapper from '~/components/global/AnnouncemetWrapper';
import { head } from '~/mixins/head';
import { PLUG_TITLE } from  '~/const/const';

export default {
  components: {
    BeachEventInfraWrapper,
    BeachEventTransportWrapper,
    BeachEventWeatherWrapper,
    BeachEventHugeWrapper,
    BeachEventSectionsWrapper,
    BeachEventSideButtonsWrapper,
    BeachEventMainInfoWrapper,
    BeachEventAboutWrapper,
    AnnouncemetWrapper,
    LazyComponent: () => import('~/components/global/LazyComponent'),
    BlockPlug: () => import('~/components/global/BlockPlug'),
    VisitorPicsWrapper: () => import('~/components/global/VisitorPicsWrapper'),
    AnyPlaces: () => import('~/components/pages/main/AnyPlaces'),
    BeachEventReviewsWrapper: () => import('~/components/pages/beach-event/BeachEventReviewsWrapper'),
  },
  mixins: [head],
  data() {
    return {
      favorite: false,
      PLUG_TITLE,
    };
  },

  async fetch({ store, params, redirect }) {
    await store.dispatch('event/setDefaultState');
    await store.dispatch('event/getEvent', params.id);
    if (store.getters['event/getError']) redirect('/404');
    await store.dispatch('event/setMapEntity');
  },

  computed: {
    ...mapGetters('event', [
      'getWeatherData',
      'getMapEntity',
      'getError',
      'getMainInfo',
      'getEventId',
    ]),
  },

  mounted() {
    // TODO Use favorites store instead
    // this.$bus.$on('pToggleFavorites', () => {
    //   this.favorite = !this.favorite;
    // });

    // if (this.eventData.mainData.eventId && this.$cookies.get(`favorites.events.${this.eventData.mainData.eventId}`)) {
    //   this.favorite = true;
    // }
  },

  methods: {
    updateHeart() {
      this.$bus.$emit('cToggleFavorites');
    },
  },
};
</script>
