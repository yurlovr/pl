<template>
  <div>
    <BlockPlug
      v-if="!getWaterTemp"
      :height="668"
      :text="PLUG_TITLE.GRAF_TEMP"
      :show-loader="true"
    />
    <BeachWaterTemperatureHistogram
      v-else
      id="water-temp"
      :data="dataTemperatures.waterHistogramData"
      :data-air="dataTemperatures.airHistogramData"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { PLUG_TITLE } from '~/const/const';

export default {
  components: {
    BeachWaterTemperatureHistogram: () => import('~/components/pages/beach/BeachWaterTemperatureHistogram'),
    BlockPlug: () => import('~/components/global/BlockPlug'),
  },
  props: {
    cityId: {
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
    if (!this.getWaterTemp) {
      await this.setWaterTemp();
    }
  },
  computed: {
    ...mapGetters('temperatures', [
      'getWaterTemp',
    ]),
    dataTemperatures() {
      const result = {
        waterHistogramData: [],
        airHistogramData: [],
      };
      if (!this.getWaterTemp) return result;
      Object.keys(this.getWaterTemp).forEach((key) => {
        const currentCity = this.getWaterTemp[key].find((item) => item.CITY.ID === this.cityId);
        if (currentCity) {
          result.waterHistogramData.push(+currentCity.TEMP.WATER);
          result.airHistogramData.push(+currentCity.TEMP.AIR);
        }
      });
      return result;
    },
  },
  methods: {
    ...mapActions('temperatures', [
      'setWaterTemp',
    ]),
  },
};
</script>
