<template>
  <div class="beach-page__water-temp" :class="{ active : modalOpen }">
    <div class="beach-page__water-temp__inner">
      <div class="beach-page__water-temp__bg" @click="toggleModal()"></div>
      <section class="two-part-layout__card">
        <div class="beach-page__water-temp__title-area" :class="{ active : modalOpen }" @click="toggleModal()">
          <h2 class="two-part-layout__card__title beach-page__water-temp__title">График температуры</h2>
          <img  src="~/static/pics/beach/accordion_dropdown_orange.svg">
        </div>
        <hr class="mt-4 mb-4">
        <div class="beach-page__water-temp" :class="{ active : modalOpen }">
          <!--<div class="beach-page__water-temp__histogram">
            <div class="beach-page__water-temp__histogram__item" v-for="(item, i) in data" :key="i">
              <div class="beach-page__water-temp__histogram__item__bar" :style="{ height: (140 * item / Math.max.apply(null, data) + 'px') }">
                <div class="beach-page__water-temp__histogram__item__bar__info">
                  <span class="slider-weather__slide__temp-number">{{ (item.toFixed(0) > 0 ? '+ ' : '') + (item.toFixed(0) < 0 ? '- ' : '' ) + item.toFixed(0) }}</span> <span class="slider-weather__slide__temp-o"><span>o</span></span>
                  <span class="slider-weather__slide__temp-C">C</span>
                </div>
              </div>
              <span class="beach-page__water-temp__histogram__item__title">{{ getMonth(i+1) }}</span>
            </div>
          </div>-->
          <div class="beach-page__water-temp__info">
            <div class="slider-weather__part__info slider-weather__part__temperature-text beach-page__water-temp__text mb-0">
              <img  src="~/static/pics/global/svg/temp_air.svg">
              <span>Среднемесячная температура воздуха</span>
            </div>
            <div class="slider-weather__slide__temp slider-weather__part__info">
              <span class="slider-weather__slide__temp-number">{{ (dataAir[month].toFixed(0) > 0 ? '+ ' : '') + dataAir[month].toFixed(0) }}</span>
              <span class="slider-weather__slide__temp-o"><span>o</span></span>
              <span class="slider-weather__slide__temp-C">C</span>
            </div>
            <div class="slider-weather__part__info slider-weather__part__temperature-text beach-page__water-temp__text ml-auto">
              <img  src="~/static/pics/global/svg/temp_water.svg">
              <span>Среднемесячная температура воды</span>
            </div>
            <div class="slider-weather__slide__temp slider-weather__part__info">
              <span class="slider-weather__slide__temp-number" style="color: #115C91">{{ (data[month].toFixed(0) > 0 ? '+ ' : '') + data[month].toFixed(0) }}</span>
              <span class="slider-weather__slide__temp-o"><span>o</span></span>
              <span class="slider-weather__slide__temp-C">C</span>
            </div>
          </div>
          <line-chart v-if="client_width" :chart-data="chartData" :options="chartData.options" class="line-chart"></line-chart>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import LineChart from '../../../assets/LineChart'
export default {
  props: ['data', 'dataAir'],
  components: {
    LineChart
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize, false);
  },
  mounted() {
    this.onResize()
    this.chartData = {
      labels: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
      datasets: [
        {
          label: 'Температура воды',
          borderWidth: 1,
          borderColor: '#0099FF',
          pointBackgroundColor: '#0099FF',
          pointRadius: 2,
          pointHoverRadius: 2,
          data: this.data
        },
        {
          label: 'Температура воздуха',
          borderWidth: 1,
          borderColor: '#FF8C00',
          pointBackgroundColor: '#FF8C00',
          pointRadius: 2,
          pointHoverRadius: 2,
          data: this.dataAir
        },
        {
          label: '',
          borderWidth: 1,
          borderColor: '#0099FF',
          showLine: false,
          pointBackgroundColor: 'transparent',
          pointHoverBackgroundColor: 'transparent',
          pointRadius: 5,
          data: this.data
        },
        {
          label: '',
          borderWidth: 1,
          borderColor: '#FF8C00',
          showLine: false,
          pointBackgroundColor: 'transparent',
          pointHoverBackgroundColor: 'transparent',
          pointRadius: 5,
          data: this.dataAir
        },
      ],
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                max: 50,
                stepSize: 10,
                padding: 40
              },
              gridLines: {
                borderDash: [2, 2],
                zeroLineColor: 'rgba(0, 0, 0, 0.1)',
                zeroLineBorderDash: [2, 2],
                drawTicks : false
              }
            }],
          xAxes: [
            {
              ticks: {
                padding: 15
              },
              gridLines: {
                borderDash: [2, 2],
                zeroLineColor: 'rgba(0, 0, 0, 0.1)',
                zeroLineBorderDash: [2, 2],
                drawTicks : false
              }
            }]
        },
        legend: {
          position: 'bottom',
          align: 'start',
          reverse: true,
          labels: {
            usePointStyle: true,
            boxWidth: 6,
            padding: 40,
            filter: function(legendItem, data) {
              let index = legendItem.datasetIndex;
              if (index === 0 || index === 1)
              {
                return true;
              }
            },
          },
        },
        tooltips: {
          enabled: false,
          mode: 'index',
          custom: function(tooltipModel){
            // Tooltip Element
            let tooltipEl = document.getElementById('chartjs-tooltip');

            // Create element on first render
            if (!tooltipEl) {
              tooltipEl = document.createElement('div');
              tooltipEl.id = 'chartjs-tooltip';
              tooltipEl.innerHTML = '<table></table>';
              tooltipEl.style.backgroundColor = '#FFFFFF';
              tooltipEl.style.borderRadius = '20px';
              tooltipEl.style.boxShadow = '6px 6px 10px rgba(0, 0, 0, 0.15)';
              document.body.appendChild(tooltipEl);

              let caretEl = document.createElement('div');
              caretEl.innerHTML = '<div></div>';
              caretEl.style.width = '8px';
              caretEl.style.height = '8px';
              caretEl.style.background = '#ffffff';
              caretEl.style.position = 'absolute';
              caretEl.style.left = '46%';
              caretEl.style.webkitTransform = 'rotate(-45deg)';
              caretEl.style.transform = 'rotate(-45deg)';
              tooltipEl.appendChild(caretEl);
            }

            // Hide if no tooltip
            if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = 0;
              return;
            }

            // Set caret Position
            tooltipEl.classList.remove('above', 'below', 'no-transform');
            if (tooltipModel.yAlign) {
              tooltipEl.classList.add(tooltipModel.yAlign);
            } else {
              tooltipEl.classList.add('no-transform');
            }

            function getBody(bodyItem) {
              return bodyItem.lines;
            }

            // Set Text
            if (tooltipModel.body) {
              let bodyLines = tooltipModel.body.map(getBody);

              let innerHtml = '<tbody>';

              bodyLines.forEach(function(body, i) {
                let value = body[0].split(' ')[2];
                let spanValue = (value > 0 ? '+ ' : '') + value;
                let color = i === 0 ? '#115C91' : '#FF8C00';
                let span = `<span class="slider-weather__slide__temp-number" style="font-size: 18px; line-height: 22px; font-weight: 500; color: ${color}">${spanValue}</span>
                          <span class="slider-weather__slide__temp-o" style="left: -3px"><span>o</span></span>
                          <span class="slider-weather__slide__temp-C" style="font-size: 18px; line-height: 22px; font-weight: normal; padding-left: 4px">C</span>`;
                if (i <= 1) {
                  innerHtml += '<tr><td>' + span + '</td></tr>';
                }
              });
              innerHtml += '</tbody>';

              let tableRoot = tooltipEl.querySelector('table');
              tableRoot.innerHTML = innerHtml;
            }

            // `this` will be the overall tooltip
            let position = this._chart.canvas.getBoundingClientRect();

            // Display, position, and set styles for font
            tooltipEl.style.opacity = 1;
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX - tooltipEl.offsetWidth / 2 + 'px';
            tooltipEl.style.top = position.top + window.pageYOffset + Math.min(tooltipModel.dataPoints[0].y, tooltipModel.dataPoints[1].y) - tooltipEl.offsetHeight - 25 + 'px';
            tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
            tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
            tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
            tooltipEl.style.padding = '5px 12px';
            tooltipEl.style.pointerEvents = 'none';
            tooltipEl.style.transition = '0.23s';
            tooltipEl.style.zIndex = 999999;
          }
        },
        responsive: this.client_width > 768,
        maintainAspectRatio: false
      }
    };
  },
  created () {
    let date = new Date();
    this.month = date.getMonth();
  },

  data() {
    return {
      modalOpen: false,
      chartData: null,
      gradientFill: null,
      month: null,
      client_width: null
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
    onResize(){
      this.client_width = window.innerWidth
    }
  }
}
</script>
