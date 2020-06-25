<template>
  <section class="two-part-layout__card">
    <div class="beach-event__main-info">
      <div class="search-page__map-area__card__title-area beach-event__main-info__title-area">
        <div class="beach-event__main-info__title-area__left">
          <h1 class="search-page__map-area__card__title beach-event__main-info__title " v-html="data.title"></h1>
          <a :href="getLink" @click.prevent="$bus.goTo(getLink, $router)"
             class="search-page__map-area__card__subtitle beach-event__main-info__subtitle">{{ data.location }}</a>
        </div>
        <button class="beach-event__main-info__hearts" @click="updateHeart()">
          <svg class="svg-heart" width="23" height="22" viewBox="0 0 23 22" xmlns="http://www.w3.org/2000/svg">
            <path
              :class="[{lovely: favorite}, 'unknown']"
              d="M6.4114 18.2772C8.93676 20.5476 11.2238 21.8947 11.3196 21.9511C11.3758 21.9837 11.4378 22 11.5002 22C11.5626 22 11.6246 21.9837 11.6804 21.9511C11.7766 21.8951 14.0629 20.5476 16.5879 18.2775C18.933 16.1684 21.9103 12.8427 22.7763 8.97267C23.7425 4.65581 21.4196 1.53737 18.8521 0.467244C16.1418 -0.662585 13.3093 0.300012 11.5002 2.91786C9.69077 0.299641 6.85822 -0.664069 4.14717 0.467244C1.58011 1.53775 -0.742509 4.65581 0.223677 8.97267C1.08867 12.8423 4.06629 16.1684 6.4114 18.2772Z"
              fill="#FEE6C0"/>
          </svg>
          <!--<img  src="~/static/pics/global/svg/heart_button_unclicked.svg" v-show="!favorite">
          <img src="~/static/pics/global/svg/heart_button_clicked.svg" v-show="favorite">-->
          <span>{{ data.likes + (favorite ? 1 : 0) }}</span>
        </button>
      </div>
      <div class="h-line mobile"></div>
      <h5 class="search-page__map-area__card__subtitle beach-event__main-info__subtitle mobile">{{ data.location }}</h5>
      <div class="search-page__map-area__card__infos beach-event__main-info__infos">
        <div class="search-page__map-area__card__infos__item beach-event__main-info__infos__item" v-if="data.date">
          <img src="~/static/pics/global/svg/calendar_big.svg">
          <span class="wrapper"><span class="gray">Дата:</span><span>{{ data.date }}</span></span>
        </div>
        <div class="search-page__map-area__card__infos__item beach-event__main-info__infos__item"
             v-if="data.beachLength">
          <img src="~/static/pics/search/beach_length.svg">
          <span class="wrapper"><span
            class="gray">Протяженность линии:</span><span>{{ data.beachLength }} м</span></span>
        </div>
        <div class="search-page__map-area__card__infos__item beach-event__main-info__infos__item" v-if="data.price">
          <img src="~/static/pics/search/beach_price.svg">
          <span class="wrapper"><span class="gray">Вход:</span><span>{{ data.price }} <span>
					<img :style="{ 'height': '11px', 'width': 'unset', 'margin-bottom': '3px', 'margin-right': '0' }"
               src="~/static/pics/global/svg/ruble_dark.svg" alt="руб">
					</span><span v-if="!isEvent">/день</span></span></span>
        </div>
        <div class="search-page__map-area__card__infos__item beach-event__main-info__infos__item" v-if="beachType">
          <img src="~/static/pics/search/beach_type.svg">
          <span class="wrapper"><span class="gray">Поверхность:</span><span>{{ beachType }}</span></span>
        </div>
        <div class="search-page__map-area__card__infos__item beach-event__main-info__infos__item" v-if="data.time">
          <img src="~/static/pics/search/beach_worktime.svg">
          <span class="wrapper"><span class="gray" v-if="!isEvent">Режим работы:</span><span class="gray" v-else>Время проведения:</span><span>{{ data.time }}</span></span>
        </div>
        <div class="search-page__map-area__card__infos__item beach-event__main-info__infos__item"
             v-if="data.beachSeabedType">
          <img src="~/static/pics/search/beach_seabedtype.svg">
          <span class="wrapper"><span class="gray">Дно:</span><span>{{ data.beachSeabedType }}</span></span>
        </div>
        <div class="search-page__map-area__card__infos__item beach-event__main-info__infos__item" v-if="data.sunrise">
          <img src="~/static/pics/global/svg/_sunrise.svg">
          <span class="wrapper"><span class="gray">Время рассвета:</span><span>{{ data.sunrise }}</span></span>
        </div>
        <div class="search-page__map-area__card__infos__item beach-event__main-info__infos__item" v-if="data.sunset">
          <img src="~/static/pics/global/svg/_sunset.svg">
          <span class="wrapper"><span class="gray">Время заката:</span><span>{{ data.sunset }}</span></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    props: ['data'],

    data() {
      return {
        favorite: false
      }
    },

    mounted() {
      this.$bus.$on('cToggleFavorites', () => {
        this.updateHeart();
      });

      if (this.data.beachId && this.$cookies.get(`favorites.beaches.${this.data.beachId}`) || this.data.eventId && this.$cookies.get(`favorites.events.${this.data.eventId}`))
        this.favorite = true;
    },

    computed: {
      getLink() {
        if (this.data.beachId)
          return `/beach-catalog?city=${this.data.locationId}`;
        else (this.data.eventId)
        return `/event-catalog?city=${this.data.locationId}`;
      },

      beachType() {
        if (this.data.beachType) {
          if (this.data.beachType == 'Галечные пляжи')
            return 'Галька';
          else if (this.data.beachType == 'Песчаные пляжи')
            return 'Песок';
          else if (this.data.beachType == 'Ракушечные пляжи')
            return 'Ракушки';
        } else {
          return null;
        }
      },
      isEvent() {
        return this.$route.path.includes('event')
      }
    },

    methods: {
      updateHeart() {
        if (this.favorite)
          this.$bus.$emit('decreaseFavorites');
        else this.$bus.$emit('increaseFavorites');

        this.$bus.$emit('pToggleFavorites');

        this.favorite = !this.favorite;

        if (this.data.beachId) {
          if (this.$cookies.get(`favorites.beaches.${this.data.beachId}`))
            this.$cookies.set(`favorites.beaches.${this.data.beachId}`, true, {
              maxAge: -1 // remove
            });
          else {
            this.$cookies.set(`favorites.beaches.${this.data.beachId}`, true, {
              maxAge: 30 * 24 * 60 * 60 // one month
            });
          }
        } else if (this.data.eventId) {
          if (this.$cookies.get(`favorites.events.${this.data.eventId}`))
            this.$cookies.set(`favorites.events.${this.data.eventId}`, true, {
              maxAge: -1 // one month
            });
          else {
            this.$cookies.set(`favorites.events.${this.data.eventId}`, true, {
              maxAge: 30 * 24 * 60 * 60 // one month
            });
          }
        }
      }
    }
  }
</script>
