<template>
  <section class="main-page__beach-type custom-container">
    <h3 class="main-page__section-title">
      {{ data.title }}
    </h3>
    <div class="main-page__beach-type__card-area">
      <div
        v-for="card in data.cards"
        :key="card.id"
        class="main-page__beach-type__card"
      >
        <nuxt-link
          :to="{ path: '/search', query: {[`${[card.filter[0].type]}[]`] : card.filter[0].id, page: 1, count: COUNT_ELEMENTS_BEACH}}"
        >
          <img
            v-lazy-load
            :data-src="card.pic"
            class="main-page__beach-type__card__bg"
          >
          <div class="main-page__beach-type__card__text-area">
            <h4 class="main-page__beach-type__card__title">
              {{ card.title }}
            </h4>
            <p class="main-page__beach-type__card__text">
              {{ card.description }}
            </p>
          </div>
          <div class="main-page__beach-type__card__beach-number-area">
            <span class="main-page__beach-type__card__beach-number">
              {{ card.beachNumber }}
            </span>
            <span class="main-page__beach-type__card__beach">
              {{ plural(card.beachNumber, 'пляж', 'пляжа', 'пляжей') }}
            </span>
          </div>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import { plural } from '~/helpers';
import { COUNT_ELEMENTS_BEACH } from '~/const/const';

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      COUNT_ELEMENTS_BEACH,
    };
  },
  methods: {
    plural,
  },
};
</script>
<style lang="scss" scoped>
.main-page__beach-type__card {
  background-color: #278596;
}
</style>
