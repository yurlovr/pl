<template>
  <div class="favorites-page custom-page">
    <h1 class="favorites-page__title custom-page__title custom-container">Избранное</h1>
    <div class="favorites-page__favorites-types custom-container">
      <button class="favorites-page__favorites-type"
              @click="showBeachesOrEvents = false"
              :class="{ active: !showBeachesOrEvents }">
        Пляжи
      </button>
      <button class="favorites-page__favorites-type"
              @click="showBeachesOrEvents = true"
              :class="{ active: showBeachesOrEvents }">
        Мероприятия
      </button>
    </div>
    <CardGrid :emptyText="'У вас нет понравившихся пляжей'"
              :perPage="12"
              :data="getBeaches"
              v-show="!showBeachesOrEvents"
    />
    <CardGrid :emptyText="'У вас нет понравившихся мероприятий'"
              :perPage="12"
              :data="getEvents"
              :showIfVisited="true"
              v-show="showBeachesOrEvents"
    />

    <div class="custom-container"
         v-show="showBeachesOrEvents">
      <h3 class="main-page__section-title">Посещенные мероприятия</h3>
      <h4 class="favorites-page__empty" v-show="getVisitedEvents.length == 0">У вас нет посещенных мероприятий</h4>
    </div>
    <CardGrid :perPage="12"
              :data="getVisitedEvents"
              v-show="showBeachesOrEvents && getVisitedEvents.length > 0"
    />
  </div>
</template>

<script>
import CardGrid from '~/components/global/CardGrid';
import { mapGetters } from 'vuex';

  export default {
    components: {
      CardGrid
    },

    computed: {
      ...mapGetters('favorites', [
        'getBeaches',
        'getEvents',
        'getVisitedEvents'
      ])
    },

    async asyncData({ $axios, route }){
      const { data } = await $axios.$get('seo/meta?url=' + route.fullPath)
      return { meta: data }
    },

    data() {
      return {
        showBeachesOrEvents: false, // beaches: false, events: true
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
          {
            hid: 'keywords-beach',
            name: 'keywords',
            content: this.meta.keywords || stable
          },
        ]
      }
    },
  }
</script>
