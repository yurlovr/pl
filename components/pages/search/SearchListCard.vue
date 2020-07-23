<template>
  <div class="search-card-list">
    <div class="img_area">
      <a :href="data.humanLink ? data.humanLink : ( data.mainLink ? data.mainLink : '#')"
         @click.prevent="$bus.goTo( data.humanLink ? data.humanLink : ( data.mainLink ? data.mainLink : '#'), $router)"
      >
        <img v-lazy-load :data-src="data.pic" v-show="this.picLoaded" alt="Фото" class="custom-card__pic"
             @load="picLoaded = true">
        <img v-show="!this.picLoaded" class="custom-card__pic"
             src="~/static/pics/global/pics/slider_beh_placeholder.png">
      </a>
      <div class="custom-card__temp-area" v-if="data.tempWater != undefined && showTemp != false">
        <img src="~/static/pics/global/svg/temper_big.svg" alt="Температура" class="big">
        <img src="~/static/pics/global/svg/temper_small.svg" alt="Температура" class="small">
        <span class="custom-card__temp">{{ (data.tempWater > 0 ? '+ ' : '') + (data.tempWater < 0 ? '' : '' ) + data.tempWater }}</span>
        <span class="custom-card__temp-o"><span>o</span></span>
        <span class="custom-card__temp-C">C</span>
      </div>
      <add-to-favorites :data="data"/>
      <img class="custom-card__paid cursor-pointer" v-if="data.paid" src="~/static/pics/global/svg/diamond.svg"
           alt="Платный" :title="data.access  && data.access.DESCRIPTION ? data.access.DESCRIPTION : ''">
    </div>
    <div class="info_area w-100">


      <div class="d-flex flex-column justify-content-between">
        <div class=" heading-area">
        <div class="custom-card__rating-area mobile-rating" v-if="data.rating">
          <img src="~/static/pics/global/svg/star.svg" alt="Рейтинг">
          <span>{{ data.rating.toFixed(1) }}</span>
        </div>
        <div class="d-flex align-items-center flex-shrink-0">
          <a :href="data.humanLink ? data.humanLink : ( data.mainLink ? data.mainLink : '#')"
             @click.prevent="$bus.goTo( data.humanLink ? data.humanLink : ( data.mainLink ? data.mainLink : '#'), $router)"
          >
            <h4 v-html="data.title"></h4>
          </a>
        </div>
        <div class="d-flex align-items-center info-area justify-content-between">
          <div class="custom-card__rating-area" v-if="data.rating">
            <img src="~/static/pics/global/svg/star.svg" alt="Рейтинг">
            <span>{{ data.rating.toFixed(1) }}</span>
          </div>
          <a v-if="!data.another_place" :href="`/search?city=${data.locationId}`" @click.prevent="searchCity()"
             class="custom-card__location"
             :style="{ 'font-size': data.beach ? '10px' : '12px' }">{{ data.location }}</a>
          <a v-else class="custom-card__location"
             :style="{ 'font-size': data.beach ? '10px' : '12px' }">{{ data.geo_string }}</a>
        </div>
      </div>
        <div class="description-area">
          <v-clamp autoresize :max-lines="max">{{htmlKiller(data.desc)}}</v-clamp>
        </div>
      </div>
      <div class="button-area">
        <a href="" class="banner__card__info-area__button">Подробнее</a>
      </div>
    </div>
  </div>
</template>

<script>
  import AddToFavorites from "../../global/AddToFavorites";
  import VClamp from 'vue-clamp';

  export default {
    name: "SearchListCard",
    components: {AddToFavorites, VClamp},
    props: ['data', 'showTemp'],
    data() {
      return {
        picLoaded: false,
        max: 5,
      }
    },
    methods: {
      htmlKiller(s){
        return s ? s.trim().replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ') : ''
      },
      onResize() {
        const size = window.innerWidth
        if (size >= 1440){
          this.max = 5;
        } else {
          if (size < 1440 && size >=768){
            this.max = 3;
          } else {
            this.max = 4;
          }
        }
      },
    },
    mounted() {
      window.addEventListener('resize', this.onResize, false);
      this.onResize();
    }
  }
</script>

<style scoped>

</style>
