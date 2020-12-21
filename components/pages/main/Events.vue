<template>
  <div>
    <BlockPlug
      v-if="!getEvents"
      :height="496"
      :text="PLUG_TITLE.EVENTS"
      :class-name="'main-page__beach-slider-area custom-container main-page__beach-events'"
      :show-loader="true"
    />
    <BeachSliderArea
      v-else
      class="main-page__beach-events"
      :data="getEvents"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { PLUG_TITLE } from '~/const/const';

export default {
  components: {
    BeachSliderArea: () => import('~/components/global/BeachSliderArea'),
    BlockPlug: () => import('~/components/global/BlockPlug'),
  },
  data() {
    return {
      PLUG_TITLE,
    };
  },
  async fetch() {
    if (!this.getEvents) {
      this.setEvents();
    }
  },
  computed: {
    ...mapGetters('main', [
      'getEvents',
    ]),
  },
  methods: {
    ...mapActions('main', [
      'setEvents',
    ]),
  },
};
</script>
