<template>
  <div class="custom-card" v-if="data">
    <div class="custom-card__pic-area">
      <a :href="data.humanLink ? data.humanLink : ( data.mainLink ? data.mainLink : '#')" class="custom-card__link"
         @click.prevent="$bus.goTo( data.humanLink ? data.humanLink : ( data.mainLink ? data.mainLink : '#'), $router)">
        <img :src="data.pic" v-show="this.picLoaded" alt="Фото" class="custom-card__pic" @load="picLoaded = true">
        <img v-show="!this.picLoaded" class="custom-card__pic"
             src="~/static/pics/global/pics/slider_beh_placeholder.png">
      </a>
      <div class="custom-card__temp-area" v-if="data.tempWater != undefined && showTemp != false">
        <img src="~/static/pics/global/svg/temper_big.svg" alt="Температура" class="big">
        <img src="~/static/pics/global/svg/temper_small.svg" alt="Температура" class="small">
        <span class="custom-card__temp">{{ (data.tempWater > 0 ? '+ ' : '') + (data.tempWater < 0 ? '- ' : '' ) + data.tempWater }}</span>
        <span class="custom-card__temp-o"><span>o</span></span>
        <span class="custom-card__temp-C">C</span>
      </div>
      <AddToFavorites :data="data"/>
      <img class="custom-card__paid" v-if="data.paid" src="~/static/pics/global/svg/paid.svg" alt="Платный">
      <button class="custom-card__visited" @click="updateVisited()" v-if="this.data && this.data.eventId"
              v-show="showIfEventIsPast(data.date)">
        <div class="custom-card__visited__round">
          <img src="~/static/pics/global/svg/tick.svg" v-show="visited">
        </div>
        <span class="custom-card__visited__text">посетил</span>
      </button>
    </div>
    <div class="custom-card__info-area position-relative" :class="{ event: data.beach }">
      <p class="distance" v-if="data.show_distance" v-show="distanceValue(data.coordinates)">
        {{distanceValue(data.coordinates)}} км</p>
      <!--      <div class="mobile-distance"><span v-if="data.show_distance" v-show="distanceValue(data.coordinates)">{{distanceValue(data.coordinates)}} км</span></div>-->
      <div class="custom-card__rating-area" v-if="data.rating">
        <img src="~/static/pics/global/svg/star.svg" alt="Рейтинг">
        <span>{{ data.rating.toFixed(1) }}</span>
      </div>
      <div class="custom-card__date-area" v-if="data.date">
        <img src="~/static/pics/global/svg/calendar.svg" alt="Дата">
        <span>{{ formattedDate(data.date) }}</span>
      </div>
      <div><a :href="data.mainLink ? data.mainLink : '#'" class="custom-card__title"
              @click.prevent="$bus.goTo(data.mainLink ? data.mainLink : '#', $router)"
              :style="{ 'font-size': data.beach ? '18px' : '20px' }">
        <v-clamp autoresize :max-lines="max">{{ data.title }}</v-clamp>
      </a></div>
      <div class="custom-card__subtitle-area">
        <a :href="data.beachLink ? data.beachLink : '#'"
           @click.prevent="$bus.goTo(data.beachLink ? data.beachLink : '#', $router)" class="custom-card__beach"
           v-if="data.beach">{{ data.beach }}</a>
        <a :href="`/search?city=${data.locationId}`" @click.prevent="searchCity()" class="custom-card__location"
           :style="{ 'font-size': data.beach ? '10px' : '12px' }">{{ data.location }}</a>
        <a :href="data.beachLink ? data.beachLink : '#'"
           @click.prevent="$bus.goTo(data.beachLink ? data.beachLink : '#', $router)" class="custom-card__price"
           :style="{ 'font-size': data.beach ? '10px' : '12px' }" v-if="data.price">от {{ data.price }}
          <span>
            <img :style="{ 'height': data.beach ? '9px' : '11px', 'margin-bottom': '3px' }"
                 src="~/static/pics/global/svg/ruble.svg" alt="руб">
          </span>/сутки
        </a>
      </div>
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
