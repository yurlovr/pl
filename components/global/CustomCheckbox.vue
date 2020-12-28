<template>
  <div
    class="custom-checkbox"
    @click="toggle"
  >
    <div
      class="custom-checkbox__checkbox"
      :class="{ checked: value }"
    >
      <img
        v-show="value"
        src="~/static/pics/global/svg/check.svg"
      >
    </div>
    <span>
      {{ title }}
    </span>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions('search', [
      'setSearchParams',
    ]),
    toggle() {
      const {
        id,
        value,
        type,
        title,
      } = this;
      this.setSearchParams({
        id,
        type,
        value: !value,
        title,
      });
    },
  },
};
</script>
