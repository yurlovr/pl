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
      <!-- <span v-if="param === 'searchBeachLengthFrom'">
        <span v-if="chosenIndex !== 0">
          Протяженность линии от,
        </span>
        <span class="custom-new-select__length-val">
          {{ title }}
        </span>
      </span> -->
      <!-- <span v-else> -->
      <span>
        {{ title }}
      </span>
      <img src="~/static/pics/global/svg/dropdown.svg">
    </div>
    <!-- <select
      v-if="city"
      id="city-native"
      name="citySelect"
      @change="x => choose(x.target.value)"
    >
      <option
        v-for="(option, i) in options"
        :value="i"
      >
        {{ option.title }}
      </option>
    </select> -->
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
      // this.$bus.$emit('updateSearchParam', { param: this.param, value: { title: this.options[i].title, id: this.options[i].id } });

      // id == 0 is the default value
      // if (this.opposite) {
      //   setTimeout(() => {
      //     if (this.value.id !== -1 && this.opposite.value.id !== -1 && (
      //       (this.param === 'searchWaterTempFrom' || this.param === 'searchBeachLengthFrom') && this.value.title >= this.opposite.value.title)
      //       || (this.param == 'searchWaterTempTo' || this.param === 'searchBeachLengthTo') && this.value.title <= this.opposite.value.title) {
      //       this.$bus.$emit('updateSearchParam', { param: this.opposite.param, value: { title: this.opposite.options[0].title, id: this.opposite.options[0].id } });
      //     }
      //   }, 1);
      // }
    },

    onBlur() {
      this.dropdownOpen = false;
    },

    // filteredTitle(title) {
    //   console.log(title)
    //   if (title && title.replace) return title.replace('посёлок городского типа', 'пгт.');
    //   return title;
    // },
  },
};
</script>
