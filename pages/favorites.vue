<template>
  <div class="favorites-page custom-page">
    <h1 class="favorites-page__title custom-page__title custom-container">
      Избранное
    </h1>
    <!-- Сделать блок когда нет ничего -->
    <div v-if="noFavorites">
      <NoFavorites />
    </div>
    <div v-else>
      <div class="favorites-page__favorites-types custom-container">
        <button
          v-if="getHaveMyBeaches"
          class="favorites-page__favorites-type"
          :class="{ active: !showBeachesOrEvents }"
          @click="showBeachesOrEvents = false"
        >
          Пляжи
        </button>
        <button
          v-if="getHaveMyEvents || getHaveMyVisited"
          class="favorites-page__favorites-type"
          :class="{ active: showBeachesOrEvents }"
          @click="showBeachesOrEvents = true"
        >
          Мероприятия
        </button>
      </div>
      <CardGrid
        v-if="myData"
        :per-page="perPage"
        :data="myData"
      />
      <div
        v-show="showBeachesOrEvents && getMyVisited"
        class="custom-container"
      >
        <h3 class="main-page__section-title">
          Посещенные мероприятия
        </h3>
      </div>
      <CardGrid
        v-if="getMyVisited"
        v-show="showBeachesOrEvents && getMyVisited"
        :per-page="perPage"
        :data="getMyVisited"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { COUNT_ELEMENTS_BEACH } from '~/const/const';
import { head } from '~/mixins/head';

export default {
  components: {
    CardGrid: () => import('~/components/global/CardGrid'),
    NoFavorites: () => import('~/components/pages/favorites/NoFavorites'),
  },
  mixins: [head],
  beforeRouteEnter(from, to, next) {
    if (!to.name) {
      next('/');
      return;
    }
    next();
  },
  beforeRouteLeave(from, to, next) {
    this.setMyBeaches(null);
    this.setMyEvents(null);
    next();
  },
  data() {
    return {
      COUNT_ELEMENTS_BEACH,
      // beaches: false, events: true
      showBeachesOrEvents: false,
      noFavorites: false,
    };
  },
  async fetch() {
    if (this.getHaveMyBeaches) {
      await this.setMyBeaches();
    }
    if (!this.getHaveMyBeaches
      && (this.getHaveMyEvents || this.getHaveMyVisited)) {
      this.showBeachesOrEvents = true;
      await this.setMyEvents();
    }
    if (!this.getHaveMyBeaches
      && !this.getHaveMyEvents) {
      this.showBeachesOrEvents = true;
      this.noFavorites = true;
    }

    // if (this.getHaveMyBeaches
    //   || this.getHaveMyEvents
    //   || this.getHaveMyVisited) {
    //   console.log('I HAVE');
    // }
  },

  computed: {
    ...mapGetters('favorites', [
      'getHaveMyBeaches',
      'getHaveMyEvents',
      'getHaveMyVisited',
      'getMyBeaches',
      'getMyEvents',
      'getMyVisited',
    ]),
    ...mapGetters('catalog', {
      perPage: 'getPerPage',
    }),
    myData() {
      return this.showBeachesOrEvents ? this.getMyEvents : this.getMyBeaches
    },
  },

  watch: {
    async showBeachesOrEvents(value) {
      this.$bus.$emit('transition');
      if (value && !this.getMyEvents) {
        await this.setMyEvents();
      }
      this.$bus.$emit('hidePageTransitioner');
    },
  },

  methods: {
    ...mapActions('favorites', [
      'setMyBeaches',
      'setMyEvents',
    ]),
  },
};
</script>
