<template>
  <section class="search-page__map-area">
    <div class="search-page__map-area__info-area scroller">
      <client-only>
        <perfect-scrollbar class="scroll-area" ref="scroll" :options="options">
          <SearchMapCard :data="card" v-for="(card, i) in data.filter(v => v.pos && !isNaN(v.pos[0]))" :key="i"
                         :id="'smc-' + i" :class="{ active : activeCard == i }"/>
        </perfect-scrollbar>
      </client-only>
    </div>
    <div class="search-page__map-area__info-area__modal-bg" :class="{ active: indexToShow != -1 }"
         @click="closeModal()"></div>
    <div v-if="mobile>=414" class="search-page__map-area__info-area search-page__map-area__info-area__modal"
         :class="{ active: indexToShow != -1 }" v-body-scroll-lock="indexToShow != -1">
      <SearchMapCard v-if="data" :data="data[indexToShow == -1 ? 0 : indexToShow]"/>
      <div class="search-page__map-area__info-area__modal__close-button-wrapper">
        <button class="search-page__map-area__info-area__modal__close-button" @click="closeModal()">
          <img src="~/static/pics/global/svg/cross_blue.svg">
        </button>
        <!--				<a :href="data ? (data[indexToShow == -1 ? 0 : indexToShow] ? data[indexToShow == -1 ? 0 : indexToShow].beachLink : '#') : '#'" @click.prevent="$bus.goTo(data ? (data[indexToShow == -1 ? 0 : indexToShow] ? data[indexToShow == -1 ? 0 : indexToShow].beachLink : '#') : '#', $router)" class="banner__card__info-area__button"><span>Подробнее</span></a>-->
      </div>
    </div>
    <div v-else @touchend="end" @touchstart="start" @touchmove="moving" :style="{bottom: bot + 'px'}"
         class="search-page__map-area__info-area search-page__map-area__info-area__modal"
         :class="{ active: indexToShow != -1 }" v-body-scroll-lock="indexToShow != -1">
      <SearchMapCard v-if="data" :data="data[indexToShow == -1 ? 0 : indexToShow]"/>
      <div class="search-page__map-area__info-area__modal__close-button-wrapper">
        <button class="search-page__map-area__info-area__modal__close-button" @click="closeModal()">
          <img src="~/static/pics/global/svg/cross_blue.svg">
        </button>
        <!--				<a :href="data ? (data[indexToShow == -1 ? 0 : indexToShow] ? data[indexToShow == -1 ? 0 : indexToShow].beachLink : '#') : '#'" @click.prevent="$bus.goTo(data ? (data[indexToShow == -1 ? 0 : indexToShow] ? data[indexToShow == -1 ? 0 : indexToShow].beachLink : '#') : '#', $router)" class="banner__card__info-area__button"><span>Подробнее</span></a>-->
      </div>
    </div>
    <SearchMap :beaches="data"/>
  </section>
</template>

<script>
  import SearchMap from '~/components/pages/search/SearchMap';
  import SearchMapCard from '~/components/pages/search/SearchMapCard';

  export default {
    props: ['data'],

    components: {
      SearchMap,
      SearchMapCard,
    },

    data() {
      return {
        bot: 0,
        activeIndex: 0,
        activeCard: -1,
        minus: 1,
        indexToShow: -1, // for mobile
        options: {
          swipeEasing: true
        },
        start_y: null,
        end_y: null,
        mobile: 1024
      }
    },

    mounted() {
      if (this.data) {
        this.$bus.$on('scrollToCard', (i) => {
          this.scrollToCard(i);
        });

        this.$bus.$on('openModal', (i) => {
          this.openModal(i);
        });

        this.$bus.$on('closeModalAndUnscrollToCard', (i) => {
          this.closeModal();
          this.activeCard = -1;
        });

        this.$bus.$on('updateScrollbar', (i) => {
          if (this.$refs.scroll && window.innerWidth > 720)
            setTimeout(() => {
              this.$refs.scroll.update()
            }, 1);
        });

        this.closeModal();
      }
    },

    created() {
      if (process.browser) {
        this.mobile = window.innerWidth
        window.onresize = () => {
          this.mobile = window.innerWidth
        }
      }
    },

    methods: {
      moving(e) {
        this.bot -= 2;

      },
      end(e) {
        this.end_y = e.changedTouches[0].pageY
        let dif = Math.abs(this.end_y - this.start_y)
        if (dif >= 300) {
          this.closeModal()
        } else {
          this.bot = 0;
        }

      },
      start(e) {
        this.start_y = e.changedTouches[0].pageY
        console.log(this.start_y, 'e.changedTouches')
      },
      onResize() {
        if (window.innerWidth <= 720) {
          this.minus = 0;
        } else this.minus = 1;
      },

      openModal(i) {
        this.indexToShow = i;
      },

      closeModal() {
        this.bot = 0;
        this.indexToShow = -1;
        this.$bus.$emit('modalClosed');
        this.bot = 0;
      },

      scrollToCard(i) {
        if (this.$el.querySelector('.scroll-area') && this.$el.querySelector(`#smc-${i}`) && this.$el.querySelector('.search-page__map-area__info-area.scroller'))
          this.$el.querySelector('.scroll-area').scrollTop = this.$el.querySelector(`#smc-${i}`).offsetTop - this.$el.querySelector('.search-page__map-area__info-area.scroller').offsetTop;
        this.activeCard = i;
      }
    }
  }
</script>
