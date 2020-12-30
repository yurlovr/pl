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
          v-if="getHaveMyEvents"
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
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { COUNT_ELEMENTS_BEACH } from '~/const/const';

export default {
  components: {
    CardGrid: () => import('~/components/global/CardGrid'),
    NoFavorites: () => import('~/components/pages/favorites/NoFavorites'),
  },
  beforeRouteEnter(from, to, next) {
    if (!to.name) {
      next('/');
      return;
    }
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
      && this.getHaveMyEvents) {
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
