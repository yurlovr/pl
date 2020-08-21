<template>
  <div class="beach-page__water-temp" :class="{ active : modalOpen }">
    <div class="beach-page__water-temp__inner" v-body-scroll-lock="modalOpen">
      <div class="beach-page__water-temp__bg" @click="toggleModal()"></div>
      <section class="two-part-layout__card">
        <div class="beach-page__water-temp__title-area" :class="{ active : modalOpen }" @click="toggleModal()">
          <h2 class="two-part-layout__card__title beach-page__water-temp__title">График температуры воды на пляже</h2>
          <img  src="~/static/pics/beach/accordion_dropdown_orange.svg">
        </div>
        <div class="beach-page__water-temp__content" :class="{ active : modalOpen }">
          <div class="beach-page__water-temp__histogram">
            <div class="beach-page__water-temp__histogram__item" v-for="(item, i) in data" :key="i">
              <div class="beach-page__water-temp__histogram__item__bar" :style="{ height: (140 * item / Math.max.apply(null, data) + 'px') }">
                <div class="beach-page__water-temp__histogram__item__bar__info">
                  <span class="slider-weather__slide__temp-number">{{ (item.toFixed(0) > 0 ? '+ ' : '') + (item.toFixed(0) < 0 ? '- ' : '' ) + item.toFixed(0) }}</span> <span class="slider-weather__slide__temp-o"><span>o</span></span>
                  <span class="slider-weather__slide__temp-C">C</span>
                </div>
              </div>
              <span class="beach-page__water-temp__histogram__item__title">{{ getMonth(i+1) }}</span>
            </div>
          </div>
        </div>
        <line-chart :chart-data="chartData"></line-chart>
      </section>
    </div>
  </div>
</template>

<script>
import LineChart from '../../../assets/LineChart'
export default {
  props: ['data'],
  components: {
    LineChart
  },

  created () {
    this.chartData = {
      labels: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
      datasets: [
        {
          label: 'Температура воды',
          borderWidth: 1,
          borderColor: '#0099FF',
          data: this.data
        }, {
          label: 'Температура воздуха',
          borderWidth: 1,
          borderColor: '#FF8C00',
          data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(),
            this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(),
            this.getRandomInt(), this.getRandomInt()]
        }
      ]
    };
  },

  data() {
    return {
      modalOpen: false,
      chartData: null,
      gradientFill: null
    };
  },

  methods: {
    getMonth(i) {
      switch (i) {
        case 1:
          return 'Янв';
        case 2:
          return 'Фев';
        case 3:
          return 'Мар';
        case 4:
          return 'Апр';
        case 5:
          return 'Май';
        case 6:
          return 'Июн';
        case 7:
          return 'Июл';
        case 8:
          return 'Авг';
        case 9:
          return 'Сен';
        case 10:
          return 'Окт';
        case 11:
          return 'Ноя';
        case 12:
          return 'Дек';
        default:
          return 'A?';
      }
    },

    toggleModal() {
      if (this.modalOpen) {
        this.$el.querySelector('.beach-page__water-temp__content').style.overflow = '';
      } else {
        this.$el.querySelector('.beach-page__water-temp__content').style.overflow = 'visible';
      }

      this.modalOpen = !this.modalOpen;
    },

    getRandomInt () {
      return Math.floor(Math.random() * (20 - 5 + 1)) + 5
    }

  }
}
</script>
