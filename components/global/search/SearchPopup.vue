<template>
  <client-only>
    <div class="modal-geo" v-body-scroll-lock="true">
      <div class="modal-geo__modal">
        <div class="modal-geo__modal__body">
          <!--        <span @click="gg"> butt</span>-->
          <p class="modal-geo__modal__body__cross" @click.stop="reset">&#10005</p>
          <div class="modal-geo__modal__body__top">
            <p>Мое местоположение</p>
          </div>
          <div class="map" id="map-modal"></div>
          <div class="modal-geo__modal__body__bottom">
            <div class="modal-geo__modal__body__bottom__left">
              <div class="modal-geo__modal__body__bottom__left__radius">Радиус поиска пляжей, км</div>
              <div class="modal-geo__modal__body__bottom__left__circles">
              <div @click="gg(item.val, item.zoom)" class="modal-geo__modal__body__bottom__left__circles__circle"
                   :class="{active: radius == item.val, small: item.small, big: !item.small}" v-for="item in list">
                <span>{{item.text}}</span></div>
              </div>
            </div>
            <div class="modal-geo__modal__body__bottom__right">
              <div class="modal-geo__modal__body__bottom__right__clean" @click.stop="reset">Сбросить</div>
              <button type="button" class="modal-geo__modal__body__bottom__right__accept" @click="toSearch">
                <span>Принять</span></button>
            </div>
          </div>
          <!--        <p class="modal-geo__modal__body__cross" @click.stop="$emit('close')">&#10005</p>-->
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>

  import {mapMutations} from 'vuex'

  export default {
    props: ['coords'],
    data() {
      return {
        map: null,
        mapShow: false,
        localCoords: [],
        radius: 5000,
        myCircle: null,
        objectManager: null,
        list: [
          {text: 1, val: 1000, small: true, zoom: 14},
          {text: 5, val: 5000, small: true, zoom: 12},
          {text: 10, val: 10000, small: true, zoom: 11},
          {text: 25, val: 25000, small: true, zoom: 10},
          {text: 50, val: 50000, small: true, zoom: 9},
          {text: '>', val: 220000, small: true},
        ],
        myPlacemark: null,
        zoom: 12
      }
    },
    watch: {
      zoom(n) {
        if (n) {
          this.map.setZoom(n, {duration: 300})
        }
      }
    },
    methods: {
      ...mapMutations('search', ['set_coords', 'set_radius']),
      mapClick(e) {
        let coords = e.get('coords');
        if (this.myPlacemark) {
          this.myPlacemark.geometry.setCoordinates(coords);
          this.localCoords = coords;
          this.gg(this.radius)
        }
      },

      initMapState(coords = [55.753215, 37.622504]) {
        console.log(document.getElementById('map'))
        this.map = new ymaps.Map(`map-modal`, {
          center: coords,
          zoom: this.zoom,
          controls: ['fullscreenControl', 'zoomControl', 'geolocationControl'],
        })
        let searchControl = new ymaps.control.SearchControl({
          options: {
            noPlacemark: true,
            provider: 'yandex#search'
          }
        })

        this.map.controls.add(searchControl);
        this.map.events.add("click", this.mapClick);


        searchControl.events.add('resultselect', (e) => {
          let index = e.get('index');

          searchControl.getResult(index).then((res) => {
            this.myPlacemark.geometry.setCoordinates(res.geometry._coordinates);
            this.localCoords = res.geometry._coordinates;
            this.gg(this.radius)
          });
        })

        this.myPlacemark = new ymaps.Placemark(coords, {
          iconCaption: 'Я'
        }, {
          preset: 'islands#violetDotIconWithCaption',
          draggable: true
        });
        this.map.geoObjects.add(this.myPlacemark)


        this.myPlacemark.events.add('dragend', () => {
          this.localCoords = this.myPlacemark.geometry.getCoordinates();
          let my_coords = {
            lat: this.localCoords[0],
            lng: this.localCoords[1]
          }
          this.$cookies.set('last_coordinates', JSON.stringify(my_coords), {
            maxAge: 30 * 24 * 60 * 60 // one month
          });
          this.gg(this.radius);
        })

        this.objectManager = new ymaps.ObjectManager({
          // geoObjectOpenBalloonOnClick: true
        })

        let features = [];
        this.myCircle = {
          type: "Feature",
          id: 1,
          geometry: {
            type: "Circle",
            coordinates: coords.length ? coords : [44.50465522867475, 34.21493291965433],
            radius: this.radius
          }
        }
        features.push(this.myCircle)

        this.map.geoObjects.add(this.objectManager)

        this.objectManager.add({
          type: "FeatureCollection",
          features: features
        })
      },

      initialize() {
        ymaps.ready(() => {
          this.initMapState(Object.values(this.localCoords));
        })
      },
      toSearch() {
        this.set_coords(this.localCoords)
        this.set_radius(this.radius)
        this.$emit('close');
        this.$bus.$emit('changeToggle', true);
      },

      reset() {
        this.$cookies.remove('last_coordinates');
        this.$cookies.remove('geo_locating');
        this.$cookies.set('geo_locating', -1, {
          maxAge: -1 // remove
        });
        this.set_coords({})
        this.set_radius(null)
        this.$bus.$emit('changeToggle', false);
        this.$emit('close');
        this.$emit('clean');
      },

      gg(r, zoom = null) {
        this.radius = r;
        if (zoom) {
          this.zoom = zoom;
        }
        this.objectManager.remove(this.myCircle);
        this.myCircle = {
          type: "Feature",
          id: 1,
          geometry: {
            type: "Circle",
            coordinates: Object.values(this.localCoords),
            radius: r
          }
        }
        setTimeout(() => {
          this.objectManager.add(this.myCircle)
        }, 100)

      },
    },
    mounted() {
      this.localCoords = this.coords;
      // this.initMap();
      const filePathToJSScript = 'https://api-maps.yandex.ru/2.1.75/?apikey=bdc132c0-4837-43fd-b052-a5367c424bd0&lang=ru_RU'
      let scripts = Array
        .from(document.querySelectorAll('script'))
        .map(scr => scr.src);
      if (!scripts.includes(filePathToJSScript)) {
        let scriptYandexMap = document.createElement('script')
        scriptYandexMap.setAttribute('src', filePathToJSScript)
        scriptYandexMap.setAttribute('id', 'ya-script')
        document.head.appendChild(scriptYandexMap)
        scriptYandexMap.addEventListener("load", this.initialize)
      } else {
        this.initialize()
      }
    },
    beforeDestroy() {
      document.getElementById('ya-script').remove()
    }
  }
</script>
