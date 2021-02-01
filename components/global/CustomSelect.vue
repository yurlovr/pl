<template>
  <div
    v-if="options"
    v-on-clickaway="onBlur"
    class="custom-new-select"
    :class="[{ open: dropdownOpen }, {'native-select' : city}]"
  >
    <div
      class="custom-new-select__top"
      @click="dropdownOpen = !dropdownOpen"
    >
      <span>
        {{ title }}
      </span>
      <img src="~/static/pics/global/svg/dropdown.svg">
    </div>
    <div
      v-show="dropdownOpen"
      class="custom-new-select__bottom"
    >
      <div
        v-for="option in options"
        :key="option.id"
        class="custom-new-select__bottom__item"
        @click="choose(option)"
      >
        <span>
          {{ option.title }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { directive as onClickaway } from 'vue-clickaway';

export default {

  directives: {
    onClickaway,
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
    param: {
      type: String,
      required: true,
    },
    opposite: {
      type: Object,
      default: () => {},
    },
    city: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      // chosenIndex: 0,
      dropdownOpen: false,
    };
  },

  computed: {
    title() {
      if (this.param === 'searchBeachLengthFrom' && this.value.id !== -1) {
        if (this.options[0].title !== 'От') return `${this.value.title} м`;
        return `От ${this.value.title} м`;
      } if (this.param === 'searchWaterTempFrom' && this.value.id !== -1) {
        if (this.options[0].title !== 'От') return `Температура воды от, ${this.value.title} °C`;
        return `От ${this.value.title} м`;
      } return this.value.title;
    },
  },

  methods: {
    ...mapActions('search', [
      'setSearchParams',
    ]),
    choose(option) {
      this.dropdownOpen = false;
      this.setSearchParams({
        param: this.param,
        option,
      });
    },

    onBlur() {
      this.dropdownOpen = false;
    },
  },
};
</script>
