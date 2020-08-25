import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    Chart.defaults.global.defaultFontColor = '#4A4A4A';
    Chart.defaults.global.defaultFontFamily = "'Museo', 'Sans', 'Cyrl'";
    // this.chartData создаётся внутри миксина.
    // Если вы хотите передать опции, создайте локальный объект options
    let gradientFill1 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 300);
    gradientFill1.addColorStop(0, '#0099FF');
    gradientFill1.addColorStop(1, 'rgba(0, 153, 255, 0)');

    let gradientFill2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 300);
    gradientFill2.addColorStop(0, '#FF8C00');
    gradientFill2.addColorStop(1, 'rgba(255, 140, 0, 0)');

    this.chartData.datasets[0].backgroundColor = gradientFill2;
    this.chartData.datasets[1].backgroundColor = gradientFill1;

    this.renderChart(this.chartData, this.options)
  },
  watch: {
    chartData () {
      this.$data._chart.update()
    }
  }
}
