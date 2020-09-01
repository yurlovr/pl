<template>
  <div class="custom-card despondency" v-if="data">
    <div class="custom-card__pic-area minus-zoom">
      <a v-if="!data.another_place" :href="data.humanLink ? data.humanLink : ( data.mainLink ? data.mainLink : '#')"
         class="custom-card__link"
         @click.prevent="$bus.goTo( data.humanLink ? data.humanLink : ( data.mainLink ? data.mainLink : '#'), $router)">
        <img v-if="data.custom_photo" :src="data.pic" v-show="this.picLoaded" alt="Фото" class="custom-card__pic"
             @load="picLoaded = true">
        <img v-else v-lazy-load :data-src="data.pic" v-show="this.picLoaded" alt="Фото" class="custom-card__pic"
             @load="picLoaded = true">
        <img  v-show="!this.picLoaded" class="custom-card__pic minus-zoom"
             src="~/static/pics/global/pics/slider_height_placeholder.png">
      </a>
      <a v-else :href="data.internal_url" class="custom-card__link" target="_blank">
        <img v-if="data.custom_photo" :src="data.pic" v-show="this.picLoaded" alt="Фото" class="custom-card__pic"
             @load="picLoaded = true">
        <img v-else v-lazy-load :data-src="data.pic" v-show="this.picLoaded" alt="Фото" class="custom-card__pic"
             @load="picLoaded = true">
        <img v-show="!this.picLoaded" class="custom-card__pic minus-zoom"
             src="~/static/pics/global/pics/slider_height_placeholder.png">
      </a>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VClamp from 'vue-clamp';
import AddToFavorites from '~/components/global/AddToFavorites';
import moment from 'moment'
import {getDistanceFromLatLonInKm} from "../../assets/calcDistance";

moment.locale('ru')
const today = moment().format('L')
export default {
  props: ['data', 'showTemp'],

  components: {
    VClamp,
    AddToFavorites
  },

  data() {
    return {
      visited: this.data && this.data.eventId && this.$cookies.get(`visited.events.${this.data.eventId}`),
      max: 2,
      picLoaded: false,
      // last_coordinates: this.$cookies.get('last_coordinates') || {}
    };
  },
  computed: {
    last_coordinates() {
      let cookie_coords = this.$cookies.get('last_coordinates') || {},
        route_coords = this.$route.params && this.$route.params.coordinates ? this.$route.params.coordinates : {}
      if (Object.values(cookie_coords).length) {
        return cookie_coords
      }
      return route_coords ? (() => {
        let obj = Object.values(route_coords);
        return obj.length == 2 ? {lat: obj[0], lng: obj[1]} : {}
      })() : {}
    }
  },

  beforeDestroy() {
    this.$bus.$off('visitedAdd');
    this.$bus.$off('visitedRemove');
    this.$bus.$off('updateVisited');
  },

  mounted() {
    window.addEventListener('resize', this.onResize, false);
    this.onResize();

    this.$bus.$on('visitedAdd', id => {
      if (this.data && this.data.eventId == id)
        this.visited = true;
    });
    this.$bus.$on('visitedRemove', id => {
      if (this.data && this.data.eventId == id)
        this.visited = false;
    });
    this.$bus.$on('updateVisited', () => {
      this.visited = this.data && this.data.eventId && this.$cookies.get(`visited.events.${this.data.eventId}`);
    });
  },

  methods: {
    distanceValue(d) {
      if (d && d.length == 2 && Object.keys(this.last_coordinates).length) {
        let lat2 = d[0], lng2 = d[1],
          {lat, lng} = this.last_coordinates;
        return Number(getDistanceFromLatLonInKm(lat, lng, Number(lat2), Number(lng2)).toFixed(1)).toString().replace(/\./, ',')
      }
      return 0;
    },
    showIfEventIsPast(date) {
      return moment(today, 'L').isSameOrAfter(moment(date, 'L'));
    },
    updateVisited() {
      if (this.data.eventId) {
        if (this.$cookies.get(`visited.events.${this.data.eventId}`)) {
          this.$cookies.remove(`visited.events.${this.data.eventId}`);
          this.$bus.$emit('visitedRemove', this.data.eventId);
        } else {
          this.$cookies.set(`visited.events.${this.data.eventId}`, true, {
            maxAge: 30 * 24 * 60 * 60 // one month
          });
          this.$bus.$emit('visitedAdd', this.data.eventId);
        }
      }
    },

    formattedDate(date) {
      if (date) {
        let day = date.slice(0, 2),
          month = date.slice(3, 5),
          year = date.slice(8, 10),
          time = date.slice(11, 16);
        return `${day}.${month}.${year} ${time}`;
      }
      return "";
    },

    onResize() {
      if (!this.$el || !this.$el.querySelector || !this.$el.querySelector('.custom-card'))
        window.removeEventListener('resize', this.onResize, false);

      if (window.innerWidth <= 500)
        this.max = 3;
      else this.max = 2;
    },

    searchCity() {
      this.$bus.$emit('emptySearchParams');
      this.$bus.$emit('updateSearchParam', {
        param: 'cities',
        value: {title: this.data.location, id: this.data.locationId}
      });
      setTimeout(() => {
        this.$bus.$emit('search')
      }, 1);
    }
  }
}
</script>
