<template>
  <div class="custom-card">
    <div class="custom-card__pic-area">
      <a :href="data.mainLink ? data.mainLink : '#'" class="custom-card__link" @click.prevent="$bus.goTo(data.mainLink ? data.mainLink : '#', $router)">
        <img :src="data.pic" v-show="this.picLoaded" alt="Фото" class="custom-card__pic" @load="picLoaded = true">
        <img v-show="!this.picLoaded" class="custom-card__pic" src="~/static/pics/global/pics/slider_beh_placeholder.png">
      </a>
      <div class="custom-card__temp-area" v-if="data.tempWater != undefined && temp != false">
        <img src="~/static/pics/global/svg/temper_big.svg" alt="Температура" class="big">
        <img src="~/static/pics/global/svg/temper_small.svg" alt="Температура" class="small">
        <span class="custom-card__temp">{{ (data.tempWater > 0 ? '+ ' : '') + (data.tempWater < 0 ? '- ' : '' ) + data.tempWater }}</span> <span class="custom-card__temp-o"><span>o</span></span>
        <span class="custom-card__temp-C">C</span>
      </div>
      <AddToFavorites :fav="data.favorite" />
      <img class="custom-card__paid" v-if="data.paid" src="~/static/pics/global/svg/paid.svg" alt="Платный">
      <button class="custom-card__visited" @click="visitedToggle()" v-if="showIfVisited == true">
        <div class="custom-card__visited__round">
          <img src="~/static/pics/global/svg/tick.svg" v-show="isVisited">
        </div>
        <span class="custom-card__visited__text">посетил</span>
      </button>
    </div>
    <div class="custom-card__info-area" :class="{ event: data.beach }">
      <div class="custom-card__rating-area" v-if="data.rating">
        <img src="~/static/pics/global/svg/star.svg" alt="Рейтинг">
        <span>{{ data.rating.toFixed(1) }}</span>
      </div>
      <div class="custom-card__date-area" v-if="data.date">
        <img src="~/static/pics/global/svg/calendar.svg" alt="Дата">
        <span>{{ data.date }}</span>
      </div>
      <div><a :href="data.mainLink ? data.mainLink : '#'" class="custom-card__title" @click.prevent="$bus.goTo(data.mainLink ? data.mainLink : '#', $router)" :style="{ 'font-size': data.beach ? '18px' : '20px' }">
          <v-clamp autoresize :max-lines="max">{{ data.title }}</v-clamp>
        </a></div>
      <div class="custom-card__subtitle-area">
        <a :href="data.beachLink ? data.beachLink : '#'" @click.prevent="$bus.goTo(data.beachLink ? data.beachLink : '#', $router)" class="custom-card__beach" v-if="data.beach">{{ data.beach }}</a>
        <a href="/search" class="custom-card__location" :style="{ 'font-size': data.beach ? '10px' : '12px' }" @click.prevent="searchCity()">{{ data.location }}</a>
        <a :href="data.beachLink ? data.beachLink : '#'" @click.prevent="$bus.goTo(data.beachLink ? data.beachLink : '#', $router)" class="custom-card__price" :style="{ 'font-size': data.beach ? '10px' : '12px' }" v-if="data.price">от {{ data.price }}
          <span>
            <img :style="{ 'height': data.beach ? '9px' : '11px', 'margin-bottom': '3px' }" src="~/static/pics/global/svg/ruble.svg" alt="руб">
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

export default {
  props: ['data', 'showIfVisited', 'temp', 'visited'],

  components: {
    VClamp,
    AddToFavorites
  },

  data() {
    return {
      isVisited: this.visited || false,
      max: 2,
      picLoaded: false
    };
  },

  mounted() {
    window.addEventListener('resize', this.onResize, false);
    this.onResize();

    this.$bus.$on('updateVisited', () => {
      this.isVisited = this.visited == true ? true : false;
    });
  },

  methods: {
    visitedAdd() {
      this.isVisited = true;

      this.$bus.$emit('visitedAdd', this.data.beachLink);
    },

    visitedRemove() {
      this.isVisited = false;

      this.$bus.$emit('visitedRemove', this.data.beachLink);
    },

    visitedToggle() {
      if (this.isVisited)
        this.visitedRemove();
      else this.visitedAdd();
    },

    onResize() {
      if (!this.$el.querySelector('.custom-card'))
        window.removeEventListener('resize', this.onResize, false);

      if (window.innerWidth <= 500)
        this.max = 3;
      else this.max = 2;
    },

    searchCity() {
      console.log(this.data)
      this.$bus.$emit('emptySearchParams');
      this.$bus.$emit('updateSearchParam', { param: 'cities', value: { title: this.data.location, id: this.data.locationId }});
      setTimeout(() => {this.$bus.$emit('search')}, 1);
    }
  }
}
</script>
