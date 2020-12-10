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
          :to="{ path: '/search', query: {[card.filter[0].type] : card.filter[0].id}}"
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

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    plural,
    // search(card) {
    //   this.$bus.$emit('emptySearchParams');
    //   for (let i = 0; i < card.filter.length; i++) {
    //     this.$bus.$emit('updateSearchParam', card.filter[i]);
    //   }
    //   setTimeout(() => { this.$bus.$emit('search'); }, 1);
    // },
  },
};
</script>
