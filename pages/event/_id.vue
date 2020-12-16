<template>
  <div class="beach-page custom-page">
    <div class="beach-page__container custom-container">
      <client-only>
        <BeachEventSectionsWrapper />
        <BeachEventHugeWrapper
          id="gallery"
        />
      </client-only>

      <div class="custom-container-inner">
        <BeachEventSideButtonsWrapper />
      </div>
      <div class="two-part-layout">
        <main class="two-part-layout__left">
          <BeachEventMainInfoWrapper
            id="main-info"
          />
          <!-- <BeachEventInfraWrapper
            id="infra"
          /> -->
          <BeachEventAboutWrapper
            id="about"
          />
          <BeachEventTransportWrapper
            id="pt"
          />
          <client-only>
            <BeachEventReviewsWrapper
              id="reviews"
            />
          </client-only>
        </main>

        <aside class="two-part-layout__right">
          <BeachEventWeatherWrapper />
          <BeachEventAnnouncemetWrapper />
        </aside>
      </div>
    </div>
    <client-only>
      <BeachEventVisitorWrapper
        id="visitor-pics"
      />
    </client-only>
    <BeachEventAnotherPlace />
    <BeachEventHotels />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BeachEventHotels from '~/components/pages/beach-event/BeachEventHotels';
import BeachEventAnotherPlace from '~/components/pages/beach-event/BeachEventAnotherPlace';
import BeachEventVisitorWrapper from '~/components/pages/beach-event/BeachEventVisitorWrapper';
import BeachEventReviewsWrapper from '~/components/pages/beach-event/BeachEventReviewsWrapper';
// import BeachEventInfraWrapper from '~/components/pages/beach-event/BeachEventInfraWrapper';
import BeachEventTransportWrapper from '~/components/pages/beach-event/BeachEventTransportWrapper';
import BeachEventWeatherWrapper from '~/components/pages/beach-event/BeachEventWeatherWrapper';
import BeachEventHugeWrapper from '~/components/pages/beach-event/BeachEventHugeWrapper';
import BeachEventSectionsWrapper from '~/components/pages/beach-event/BeachEventSectionsWrapper';
import BeachEventSideButtonsWrapper from '~/components/pages/beach-event/BeachEventSideButtonsWrapper';
import BeachEventMainInfoWrapper from '~/components/pages/beach-event/BeachEventMainInfoWrapper';
import BeachEventAboutWrapper from '~/components/pages/beach-event/BeachEventAboutWrapper';
import BeachEventAnnouncemetWrapper from '~/components/pages/beach-event/BeachEventAnnouncemetWrapper';

export default {
  components: {
    BeachEventHotels,
    BeachEventAnotherPlace,
    BeachEventVisitorWrapper,
    BeachEventReviewsWrapper,
    // BeachEventInfraWrapper,
    BeachEventTransportWrapper,
    BeachEventWeatherWrapper,
    BeachEventHugeWrapper,
    BeachEventSectionsWrapper,
    BeachEventSideButtonsWrapper,
    BeachEventMainInfoWrapper,
    BeachEventAboutWrapper,
    BeachEventAnnouncemetWrapper,
  },
  async asyncData({ $axios, route }) {
    const { data } = await $axios.$get(`seo/meta?url=/event/${route.params.id}`);
    return { meta: data };
  },
  data() {
    return {
      favorite: false,
    };
  },

  async fetch({ store, params, redirect }) {
    await store.dispatch('event/setDefaultState');
    const res = await store.dispatch('event/getEvent', params.id);
    if (res === 404) redirect('/404');
    await store.dispatch('event/setMapEntity');
  },
  head() {
    const stable = 'ПЛЯЖИ.РУ';
    return {
      title: this.meta.title || stable,
      meta: [
        { hid: 'description-event', name: 'description', content: this.meta.description || stable },
        { hid: 'keywords-event', name: 'keywords', content: this.meta.keywords || stable },
      ],
    };
  },
  // beforeDestroy() {
	// 	  // TODO Use favorites store instead
  //   this.$bus.$off('pToggleFavorites');
  // },
  computed: {
    ...mapGetters('event', [
      'getWeatherData',
      'getMapEntity',
    ]),
    // ...mapGetters(['mapEntity']),
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
