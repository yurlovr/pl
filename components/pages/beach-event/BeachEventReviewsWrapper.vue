<template>
  <div>
    <BlockPlug
      v-if="!reviews"
      :height="132"
      :text="PLUG_TITLE.REVIEWS"
      :class-name="'main-page__beach-slider-area custom-container main-page__family-rest'"
      :show-loader="true"
    />
    <BeachEventReviews
      v-else
      :type="'event'"
      :type-id="id"
      :data="reviews"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { PLUG_TITLE } from '~/const/const';

export default {
  components: {
    BeachEventReviews: () => import('~/components/pages/beach-event/BeachEventReviews'),
    BlockPlug: () => import('~/components/global/BlockPlug'),
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      PLUG_TITLE,
    };
  },
  async fetch() {
    await this.setReviews(this.id);
  },
  computed: {
    ...mapGetters('reviews', {
      reviews: 'getReviews',
    }),
  },
  beforeDestroy() {
    this.setDefaultReviews();
  },
  methods: {
    ...mapActions('reviews', [
      'setReviews',
      'setDefaultReviews',
    ]),
  },
};
</script>
