<template>
  <div class="search-card-list">
    <div class="img_area">
      <nuxt-link
        :to="data.humanLink ? data.humanLink : ( data.mainLink ? data.mainLink : '#')"
      >
        <img
          v-lazy-load
          :data-src="data.pic"
          alt="Фото"
          class="custom-card__pic"
        >
        <div class="slide-placeholder">
          <span class="slide-placeholder__text">
            загрузка изображения
          </span>
        </div>
      </nuxt-link>
      <div
        v-if="data.tempWater != undefined && showTemp != false"
        class="custom-card__temp-area"
      >
        <img
          src="~/static/pics/global/svg/temper_big.svg"
          alt="Температура"
          class="big"
        >
        <img
          src="~/static/pics/global/svg/temper_small.svg"
          alt="Температура"
          class="small"
        >
        <span class="custom-card__temp">
          {{ `${data.tempWater > 0 ? '+ ' : '- '} ${data.tempWater}` }}
        </span>
        <span class="custom-card__temp-o">
          <span>o</span>
        </span>
        <span class="custom-card__temp-C">
          C
        </span>
      </div>
      <add-to-favorites :data="data" />
      <img
        v-if="data.paid"
        class="custom-card__paid cursor-pointer"
        src="~/static/pics/global/svg/diamond.svg"
        alt="Платный"
        :title="data.access && data.access.DESCRIPTION ? data.access.DESCRIPTION : ''"
      >
    </div>
    <div class="info_area w-100">
      <div class="d-flex flex-column justify-content-between h-100">
        <div>
          <div class=" heading-area">
            <div
              v-if="data.rating"
              class="custom-card__rating-area mobile-rating"
            >
              <img
                src="~/static/pics/global/svg/star.svg"
                alt="Рейтинг"
              >
              <span>{{ data.rating.toFixed(1) }}</span>
            </div>
            <div class="d-flex align-items-center flex-shrink-0">
              <nuxt-link
                :to="data.humanLink ? data.humanLink : ( data.mainLink ? data.mainLink : '#')"
              >
                <h4 v-html="data.title" />
              </nuxt-link>
            </div>
            <div class="d-flex align-items-center info-area justify-content-between">
              <div
                v-if="data.rating"
                class="custom-card__rating-area"
              >
                <img
                  src="~/static/pics/global/svg/star.svg"
                  alt="Рейтинг"
                >
                <span>{{ data.rating.toFixed(1) }}</span>
              </div>
              <a
                v-if="!data.another_place"
                :href="`/search?city=${data.locationId}`"
                class="custom-card__location"
                :style="{ 'font-size': data.beach ? '10px' : '12px' }"
                @click.prevent="searchCity()"
              >
                {{ data.location }}
              </a>
              <a
                v-else
                class="custom-card__location"
                :style="{ 'font-size': data.beach ? '10px' : '12px' }"
              >
                {{ data.geo_string }}
              </a>
            </div>
          </div>
          <div class="description-area line-variant">
            <v-clamp
              autoresize
              :max-lines="max"
            >
              {{ htmlKiller(data.desc) }}
            </v-clamp>
          </div>
        </div>

        <div class="button-area">
          <nuxt-link
            :to="data.humanLink ? data.humanLink : ( data.mainLink ? data.mainLink : '#')"
            class="banner__card__info-area__button"
          >
            Подробнее
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VClamp from 'vue-clamp';
import _ from 'lodash';
import AddToFavorites from '../../global/AddToFavorites.vue';

export default {
  name: 'SearchListCard',
  components: { AddToFavorites, VClamp },
  props: {
    data: {
      type: Object,
      required: true,
    },
    showTemp: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      picLoaded: false,
      max: 5,
    };
  },
  mounted() {
    window.addEventListener('resize', this.onResize, false);
    this.onResize();
  },
  methods: {
    htmlKiller(s) {
      if (!s) return '';
      return _.unescape(s.trim()
        .replace(/<\/?[^>]+>/ig, ' ')
        .replace(/&nbsp;/g, ' '));
    },
    onResize() {
      const size = window.innerWidth;
      if (size >= 1440) {
        this.max = 5;
      } else if (size < 1440 && size >= 768) {
        this.max = 3;
      } else {
        this.max = 4;
      }
    },
  },
};
</script>

<style scoped>

</style>
