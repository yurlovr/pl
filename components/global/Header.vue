<template>
  <header class="header">
    <div
      v-show="paramsShown"
      class="search__bg"
      @click="updateParamsShown(false)"
    />
    <!-- <div class="header__bg" :class="{ active : (bgAndBarShown || tempBgAndBarShown) }" /> -->
    <div class="header__inner custom-container">
      <nuxt-link to="/">
        <img src="~/static/pics/global/svg/logo-white.svg" alt="НашПляж">
      </nuxt-link>
      <!-- <Search v-show="(bgAndBarShown || tempBgAndBarShown)" ref="searchGeneral" /> -->
      <div class="header__left">
        <button
          v-show="(bgAndBarShown || tempBgAndBarShown)"
          class="header__search-button"
          @click="toggleSearch()"
        >
          <img src="~/static/pics/global/svg/search_white.svg" alt="Поиск">
        </button>
        <div class="header__favorites">
          <a href="/favorites" @click.prevent="$bus.goTo('/favorites', $router)">
            <img
              class="header__favorites-img"
              alt="Избранное"
              src="~/static/pics/global/svg/heart_white.svg"
            >
            <div class="header__favorites-text">
              <span>Избранное</span>
            </div>
            <span v-show="count != 0" class="header__favorites-number"><span>{{ count }}</span></span>
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Search from '~/components/global/Search';

export default {
  components: {
    Search,
  },

  data() {
    return {
      // show background and the searchBar (searchBar for desktop)
      bgAndBarShown: true,
      tempBgAndBarShown: false,
    };
  },

  computed: {
    ...mapGetters('search', ['paramsShown']),
    ...mapGetters('favorites', ['count']),
  },

  beforeDestroy() {
    this.$bus.$off('hideHeaderBgAndBar');
    this.$bus.$off('tempHideHeaderBgAndBar');
    this.$bus.$off('showHeaderBgAndBar');
    this.$bus.$off('tempShowHeaderBgAndBar');
  },

  mounted() {
    this.$bus.$on('hideHeaderBgAndBar', () => {
      this.bgAndBarShown = false;
    });

    this.$bus.$on('tempHideHeaderBgAndBar', () => {
      this.tempBgAndBarShown = false;
    });

    this.$bus.$on('showHeaderBgAndBar', () => {
      this.bgAndBarShown = true;
    });

    this.$bus.$on('tempShowHeaderBgAndBar', () => {
      this.tempBgAndBarShown = true;
    });
  },
  methods: {
    ...mapMutations('search', [
        'updateParamsShown',
    ]),
    toggleSearch() {
      this.$refs.searchGeneral.toggleMobileShow();
    },
  },
};
</script>
