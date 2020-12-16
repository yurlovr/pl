<template>
  <section class="two-part-layout__card">
    <div class="beach-event__main-info">
      <div class="search-page__map-area__card__title-area beach-event__main-info__title-area">
        <div class="beach-event__main-info__title-area__left">
          <h2
            class="search-page__map-area__card__title beach-event__main-info__title"
            v-html="data.title"
          />
          <nuxt-link
            :to="getLink"
            class="search-page__map-area__card__subtitle beach-event__main-info__subtitle"
          >
            {{ data.location }}
          </nuxt-link>
        </div>
        <button
          class="beach-event__main-info__hearts"
          @click="updateHeart()"
        >
          <img
            v-show="!favorite"
            src="~/static/pics/global/svg/heart_button_unclicked.svg"
          >
          <img
            v-show="favorite"
            src="~/static/pics/global/svg/heart_button_clicked.svg"
          >
          <span>
            {{ data.likes + (favorite ? 1 : 0) }}
          </span>
        </button>
      </div>
      <div class="h-line mobile" />
      <h5 class="search-page__map-area__card__subtitle beach-event__main-info__subtitle mobile">
        {{ data.location }}
      </h5>
      <div class="search-page__map-area__card__infos beach-event__main-info__infos">
        <div
          v-if="data.date"
          class="search-page__map-area__card__infos__item beach-event__main-info__infos__item"
        >
          <img src="~/static/pics/global/svg/calendar_big.svg">
          <span class="wrapper">
            <span class="gray">Дата:</span>
            <span>{{ data.date }}</span>
          </span>
        </div>
        <div
          v-if="data.beachLength"
          class="search-page__map-area__card__infos__item beach-event__main-info__infos__item"
        >
          <img src="~/static/pics/search/beach_length.svg">
          <span class="wrapper">
            <span
              class="gray"
            >
              Протяженность линии:
            </span>
            <span>
              {{ data.beachLength }} м
            </span>
          </span>
        </div>
        <div
          v-if="data.price"
          class="search-page__map-area__card__infos__item beach-event__main-info__infos__item"
        >
          <img src="~/static/pics/search/beach_price.svg">
          <span class="wrapper">
            <span class="gray">Вход:</span>
            <span>{{ data.price }} <span>
              <img
                :style="{ 'height': '11px',
                          'width': 'unset',
                          'margin-bottom': '3px',
                          'margin-right': '0',
                }"
                src="~/static/pics/global/svg/ruble_dark.svg"
                alt="руб"
              >
            </span>
              <span
                v-if="!isEvent"
              >
                /день
              </span>
            </span>
          </span>
        </div>
        <div
          v-if="beachType"
          class="search-page__map-area__card__infos__item beach-event__main-info__infos__item"
        >
          <img src="~/static/pics/search/beach_type.svg">
          <span class="wrapper">
            <span class="gray">Поверхность:</span>
            <span>{{ beachType }}</span>
          </span>
        </div>
        <div
          v-if="data.time"
          class="search-page__map-area__card__infos__item beach-event__main-info__infos__item"
        >
          <img src="~/static/pics/search/beach_worktime.svg">
          <span class="wrapper">
            <span
              v-if="!isEvent"
              class="gray"
            >
              Режим работы:
            </span>
            <span v-else class="gray">
              Время проведения:
            </span>
            <span>{{ data.time }}</span>
          </span>
        </div>
        <div
          v-if="data.beachSeabedType"
          class="search-page__map-area__card__infos__item beach-event__main-info__infos__item"
        >
          <img src="~/static/pics/search/beach_seabedtype.svg">
          <span class="wrapper">
            <span class="gray">
              Дно:
            </span>
            <span>{{ data.beachSeabedType }}</span>
          </span>
        </div>
        <div
          v-if="data.sunrise"
          class="search-page__map-area__card__infos__item beach-event__main-info__infos__item"
        >
          <img src="~/static/pics/global/svg/_sunrise.svg">
          <span class="wrapper">
            <span class="gray">
              Время рассвета:</span>
            <span>{{ data.sunrise }}</span>
          </span>
        </div>
        <div
          v-if="data.sunset"
          class="search-page__map-area__card__infos__item beach-event__main-info__infos__item"
        >
          <img src="~/static/pics/global/svg/_sunset.svg">
          <span class="wrapper">
            <span class="gray">Время заката:</span>
            <span>{{ data.sunset }}</span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      favorite: false,
    };
  },
  computed: {
    getLink() {
      if (this.data.beachId) return `/beach-catalog?city=${this.data.locationId}`;
      return `/event-catalog?city=${this.data.locationId}`;
    },

    beachType() {
      if (!this.data.beachType) return null;
      switch (this.data.beachType) {
        case 'Галечные пляжи': return 'Галька';
        case 'Песчаные пляжи': return 'Песок';
        case 'Ракушечные пляжи': return 'Ракушки';
        default: return null;
      }
    },
    isEvent() {
      return this.$route.path.includes('event');
    },
  },

  beforeDestroy() {
    this.$bus.$off('cToggleFavorites');
  },

  mounted() {
    this.$bus.$on('cToggleFavorites', () => {
      this.updateHeart();
    });

    if ((this.data.beachId && this.$cookies.get(`favorites.beaches.${this.data.beachId}`))
      || (this.data.eventId && this.$cookies.get(`favorites.events.${this.data.eventId}`))) {
      this.favorite = true;
    }
  },

  methods: {
    updateHeart() {
      if (this.favorite) this.$bus.$emit('decreaseFavorites');
      else this.$bus.$emit('increaseFavorites');

      this.$bus.$emit('pToggleFavorites');

      this.favorite = !this.favorite;

      if (this.data.beachId) {
        if (this.$cookies.get(`favorites.beaches.${this.data.beachId}`)) {
          this.$cookies.set(`favorites.beaches.${this.data.beachId}`, true, {
            maxAge: -1, // remove
          });
        } else {
          this.$cookies.set(`favorites.beaches.${this.data.beachId}`, true, {
            maxAge: 30 * 24 * 60 * 60, // one month
          });
        }
      } else if (this.data.eventId) {
        if (this.$cookies.get(`favorites.events.${this.data.eventId}`)) {
          this.$cookies.set(`favorites.events.${this.data.eventId}`, true, {
            maxAge: -1, // one month
          });
        } else {
          this.$cookies.set(`favorites.events.${this.data.eventId}`, true, {
            maxAge: 30 * 24 * 60 * 60, // one month
          });
        }
      }
    },
  },
};
</script>
