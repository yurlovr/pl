<template>
  <div class="custom-card" v-if="data">
    <div class="custom-card__pic-area">
      <a v-if="!data.another_place" :href="data.humanLink ? data.humanLink : ( data.mainLink ? data.mainLink : '#')"
         class="custom-card__link"
         @click.prevent="$bus.goTo( data.humanLink ? data.humanLink : ( data.mainLink ? data.mainLink : '#'), $router)">
        <img v-if="data.custom_photo" :src="data.pic" alt="Фото" class="custom-card__pic" />
        <img v-else v-lazy-load :data-src="data.pic" alt="Фото" class="custom-card__pic" />
        <div class="custom-card__pic custom-card__pic-placeholder" >
          <span class="custom-card__pic-placeholder-text">загрузка изображения</span>
        </div>
      </a>
      <a v-else :href="data.internal_url" class="custom-card__link" target="_blank">
        <img v-if="data.custom_photo" :src="data.pic" alt="Фото" class="custom-card__pic"
             />
        <img v-else v-lazy-load :data-src="data.pic" alt="Фото" class="custom-card__pic"
              />
        <div class="custom-card__pic custom-card__pic-placeholder" >
          <span class="custom-card__pic-placeholder-text">загрузка изображения</span>
        </div>
      </a>
      <div class="custom-card__temp-area" v-if="data.tempWater != undefined && showTemp != false">
        <img src="~/static/pics/global/svg/temper_big.svg" alt="Температура" class="big">
        <img src="~/static/pics/global/svg/temper_small.svg" alt="Температура" class="small">
        <span class="custom-card__temp">{{ (data.tempWater > 0 ? '+ ' : '') + (data.tempWater < 0 ? '' : '' ) + data.tempWater }}</span>
        <span class="custom-card__temp-o"><span>o</span></span>
        <span class="custom-card__temp-C">C</span>
      </div>

      <AddToFavorites :data="data"/>

      <img class="custom-card__paid cursor-pointer" v-if="data.paid" src="~/static/pics/global/svg/diamond.svg"
           alt="Платный" :title="data.access  && data.access.DESCRIPTION ? data.access.DESCRIPTION : ''">
      <button class="custom-card__visited"
              @click="updateVisited()"
              v-if="this.data && this.data.eventId"
              v-show="showIfEventIsPast(data.date)">
        <div class="custom-card__visited__round">
          <img src="~/static/pics/global/svg/tick.svg" v-show="isVisited(this.data.eventId)">
        </div>
        <span class="custom-card__visited__text">посетил</span>
      </button>
    </div>
    <div class="custom-card__info-area position-relative" :class="{ event: data.beach }">
      <p class="distance"
         v-if="data.show_distance"
         v-show="data.ignore_global_km || distanceValue(data.coordinates)"
         :style="{ position: !data.rating && (data.another_place || data.hotels) ? 'relative !important' : 'absolute'}"
      >
        {{ data.ignore_global_km ? data.dist : distanceValue(data.coordinates) }} км
      </p>
<!--            <div class="mobile-distance">-->
<!--              <span v-if="data.show_distance" v-show="distanceValue(data.coordinates)">-->
<!--                {{distanceValue(data.coordinates)}} км-->
<!--              </span>-->
<!--            </div>-->
      <div class="custom-card__rating-area" v-if="data.rating">
        <img src="~/static/pics/global/svg/star.svg" alt="Рейтинг">
        <span>{{ data.rating.toFixed(1) }}</span>
      </div>
      <div class="custom-card__date-area" v-if="data.date">
        <img src="~/static/pics/global/svg/calendar.svg" alt="Дата">
        <span>{{ formattedDate(data.date) }}</span>
      </div>
      <div>
        <a v-if="!data.another_place" :href="data.humanLink ? data.humanLink : ( data.mainLink ? data.mainLink : '#')"
           class="custom-card__title"
           @click.prevent="$bus.goTo( data.humanLink ? data.humanLink : ( data.mainLink ? data.mainLink : '#'), $router)"
           :style="{ 'font-size': data.beach ? '18px' : '20px' }">

          <client-only>
            <v-clamp autoresize :max-lines="max" v-html="data.title"></v-clamp>
          </client-only>

        </a>
        <a v-else :href="data.internal_url"
           target="_blank"
           class="custom-card__title"
           :style="{ 'font-size': data.beach ? '18px' : '20px' }">

          <client-only>
            <v-clamp autoresize :max-lines="max" v-html="data.title"></v-clamp>
          </client-only>

        </a>
      </div>
      <div class="custom-card__subtitle-area">
        <a :href="data.beachLink ? data.beachLink : '#'"
           @click.prevent="$bus.goTo(data.beachLink ? data.beachLink : '#', $router)" class="custom-card__beach"
           v-if="data.beach" v-html="data.beach"></a>
        <a v-if="!data.another_place" :href="`/search?city=${data.locationId}`" @click.prevent="searchCity()"
           class="custom-card__location"
           :style="{ 'font-size': data.beach ? '10px' : '12px' }">{{ data.location }}</a>
        <a v-else class="custom-card__location"
           :style="{ 'font-size': data.beach ? '10px' : '12px' }">{{ data.geo_string }}</a>
        <div v-if="!data.another_place">
          <a
            :href="data.beachLink ? data.beachLink : '#'"
            @click.prevent="$bus.goTo(data.beachLink ? data.beachLink : '#', $router)" class="custom-card__price"
            :style="{ 'font-size': data.beach ? '10px' : '12px' }" v-if="data.price">от {{ data.price }}
            <span>
            <img :style="{ 'height': data.beach ? '9px' : '11px', 'margin-bottom': '3px' }"
                 src="~/static/pics/global/svg/ruble.svg" alt="руб">
          </span>/сутки
          </a>
        </div>
        <div v-else>
          <a :href="data.internal_url"
             target="_blank"
             class="custom-card__price"
             :style="{ 'font-size': data.beach ? '10px' : '12px' }"
             v-if="data.price"
          >от {{ data.price }}
            <span>
            <img :style="{ 'height': data.beach ? '9px' : '11px', 'margin-bottom': '3px' }"
                 src="~/static/pics/global/svg/ruble.svg" alt="руб">
          </span>/сутки
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VClamp from 'vue-clamp';
import { mapGetters, mapMutations } from 'vuex';
import AddToFavorites from '~/components/global/AddToFavorites';
import moment from 'moment'
import {getDistanceFromLatLonInKm} from "../../assets/calcDistance";

// TODO Russian local?
moment.locale('ru')
const today = moment().format('L')

export default {
  name: 'CardComponent',
  props: ['data', 'showTemp'],

  components: {
    VClamp,
    AddToFavorites
  },

  data() {
    return {
      max: 2,
      picLoaded: false,
      distance: false,
      // last_coordinates: this.$cookies.get('last_coordinates') || {}
    };
  },
  // serverCacheKey: props => {
  //   const {id, eventId, beachId} = props.data;
  //   console.log('cached CardComponent by id: ', id || eventId || beachId || null);
  //   return id || eventId || beachId || null;
  // },
  computed: {
    ...mapGetters('favorites', ['isVisited']),

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
    this.$bus.$off('show_geo');
  },

  mounted() {
    window.addEventListener('resize', this.onResize, false);
    this.onResize();

    this.$bus.$on('show_geo', value => {
      this.distance = value
    });
  },

  methods: {
    ...mapMutations('favorites', [
      'removeVisited',
      'addVisited',
    ]),
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
      const { eventId } = this.data
      if (eventId) {
        this.isVisited(eventId)
          ? this.removeVisited(eventId)
          : this.addVisited(eventId)
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
