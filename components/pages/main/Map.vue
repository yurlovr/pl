<template>
  <section class="main-page__map">
    <button
      v-show="step === 2"
      id="go-to-step-1-button"
      class="main-page__map__return"
    >
      <img
        src="~/static/pics/global/svg/arrow_prev_orange.svg"
        alt="Назад"
      >
    </button>
    <div class="map__zoom-wrapper">
      <button
        ref="zoomPlus"
        class="map__zoom map__zoom-plus"
      >
        <img src="~/static/pics/global/svg/plus.svg">
      </button>
      <button
        ref="zoomMinus"
        class="map__zoom map__zoom-minus"
      >
        <img src="~/static/pics/global/svg/minus.svg">
      </button>
    </div>
    <div
      ref="yamap"
      class="map"
    >
      <PopupMapWrapper
        v-if="active"
        @close-popup="closeActive"
      />
    </div>
  </section>
</template>

<script>
import ymaps from 'ymaps';
import { mapGetters, mapActions } from 'vuex';
import PopupMapWrapper from './PopupMapWrapper.vue';

export default {
  components: {
    PopupMapWrapper,
  },
  props: ['data', 'mapData'],
  data() {
    return {
      zoom: 8,
      chosen: -1,
      curSwiper: null,
      map: null,
      step: 1,
      chosenObject: -1,
      oldZoom: null,
      clickToCluster: false,
      maps: null,
      currentObjectId: null,
      active: false,
      objectManager: null,
    };
  },
  computed: {
    ...mapGetters('main', {
      clusters: 'getClusters',
      beachFromMap: 'getBeachFromMap',
    }),
    points() {
      return this.clusters.map((item) => ({
        id: item.id,
        geometry: {
          type: 'Point',
          coordinates: item.coords,
        },
        properties: {
          hintContent: `<strong>${item.beachName}</strong>`,
        },
        name: item.beachName,
      }));
    },
  },
  async mounted() {
    this.initMap();

    window.addEventListener('resize', this.onResize);
    this.onResize();
  },

  methods: {
    ...mapActions('main', [
      'setBeachFromMap',
    ]),
    initMap() {
      ymaps
        .load()
        .then((maps) => {
          this.maps = maps;
          this.map = new maps.Map(this.$refs.yamap, {
            center: [45.08862278414359, 35.649618227986906],
            zoom: this.zoom,
            controls: ['typeSelector'],
          });

          const objectManager = new maps.ObjectManager({
            clusterize: true,
            gridSize: 80,
            clusterDisableClickZoom: false,
            clusterHasBalloon: false,
            geoObjectOpenBalloonOnClick: true,
          });
          this.objectManager = objectManager;
          objectManager.objects.options.set({
            iconLayout: 'default#image',
            iconImageHref: '/pics/global/svg/map_beach_72dpi.svg',
            iconImageSize: [30, 42],
          });

          objectManager.clusters.options.set('preset', 'islands#darkOrangeClusterIcons');
          objectManager.clusters.events.add('click', () => {
            if (this.active) {
              this.closeActive();
            }
            if (this.currentObjectId) {
              objectManager.objects.setObjectOptions(this.currentObjectId, {
                iconImageHref: '/pics/global/svg/map_beach_72dpi.svg',
              });
              this.currentObjectId = null;
            }
          });
          objectManager.objects.events.add('click', async (e) => {
            const currentObjectId = e.get('objectId');
            if (this.currentObjectId && this.currentObjectId === currentObjectId) {
              this.currentObjectId = null;
              objectManager.objects.setObjectOptions(currentObjectId, {
                iconImageHref: '/pics/global/svg/map_beach_72dpi.svg',
              });
            } else {
              objectManager.objects.setObjectOptions(this.currentObjectId, {
                iconImageHref: '/pics/global/svg/map_beach_72dpi.svg',
              });
              this.currentObjectId = currentObjectId;
              objectManager.objects.setObjectOptions(currentObjectId, {
                iconImageHref: '/pics/global/svg/pin_active.svg',
              });
              this.active = true;
              this.setBeachFromMap(null);
              await this.setBeachFromMap(currentObjectId);
              objectManager.objects.setObjectOptions(currentObjectId, {
                iconImageHref: '/pics/global/svg/pin_active.svg',
              });
            }
          });
          objectManager.clusters.events.add('click', () => {
            this.clickToCluster = true;
          });
          objectManager.add(this.points);
          this.map.geoObjects.add(objectManager);
          this.map.behaviors.disable('scrollZoom');

          this.$refs.zoomPlus.addEventListener('click', () => {
            if (this.oldZoom) this.oldZoom = null;
            if (this.zoom < 20) {
              this.zoom += 1;
              this.map.setZoom(this.zoom);
            }
          });

          this.$refs.zoomMinus.addEventListener('click', () => {
            if (this.zoom < 8) return;
            if (this.zoom >= 9 && !this.oldZoom) {
              this.zoom -= 1;
            }
            if (this.oldZoom) {
              this.zoom = this.oldZoom;
              this.oldZoom = null;
            }
            this.map.setZoom(this.zoom);
          });

          this.map.events.add('boundschange', () => {
            if (this.clickToCluster) {
              const zoom = this.map.getZoom();
              this.oldZoom = this.zoom;
              this.zoom = zoom;
              this.clickToCluster = false;
            }
          });
          // // markers
          // const iconStep1 = maps.templateLayoutFactory.createClass(
          //   '<div class="map__circle-orange step-1"><span>$[properties.iconContent]</span></div>',
          // );
          this.$emit('map-loaded');
        })
        // })
        .catch((error) => console.error('Yandex Maps ERROR:', error));
      // }, 1);
    },
    onResize() {
      if (this.map) this.map.container.fitToViewport();
    },
    closeActive() {
      this.active = false;
      this.setBeachFromMap(null);
      this.objectManager.objects.setObjectOptions(this.currentObjectId, {
        iconImageHref: '/pics/global/svg/map_beach_72dpi.svg',
      });
      this.currentObjectId = null;
    },
  },
};
</script>
<style lang="scss" scoped>
.map {
  position: relative;
}
</style>
