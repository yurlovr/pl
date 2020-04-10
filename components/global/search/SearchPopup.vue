<template>
  <div class="modal-geo" v-body-scroll-lock="true">
    <div class="modal-geo__modal">
      <div class="modal-geo__modal__body">
        <!--        <span @click="gg"> butt</span>-->
        <div class="modal-geo__modal__body__top">
          <p>Мое местоположение</p>
        </div>
        <div class="map"></div>
        <div class="modal-geo__modal__body__bottom">
          <div class="modal-geo__modal__body__bottom__left">
            <div class="modal-geo__modal__body__bottom__left__radius">Радиус поиска пляжей, км</div>
            <div @click="gg(item.val)" class="modal-geo__modal__body__bottom__left__circle"
                 :class="{active: radius == item.val, small: item.small, big: !item.small}" v-for="item in list"><span>{{item.text}}</span></div>
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
</template>

<script>
  import ymaps from "ymaps";
  import {mapMutations} from 'vuex'

  export default {
    props: ['coords'],
    data() {
      return {
        map: null,
        localCoords: [],
        radius: 10000,
        myCircle: null,
        objectManager: null,
        list: [
          {text: 1, val: 1000, small: true},
          {text: 5, val: 5000, small: true},
          {text: 10, val: 10000, small: true},
          {text: 25, val: 25000, small: true},
          {text: 50, val: 50000, small: true},
          {text: 'Более 50', val: 200000, small: false},
        ],
        myPlacemark: null
      }
    },
    methods: {
      ...mapMutations('search', ['set_coords', 'set_radius']),
      toSearch() {
        this.set_coords(this.localCoords)
        this.set_radius(this.radius)
        this.$emit('close')
      },

      reset() {
        this.$cookies.remove('last_coordinates');
        this.$cookies.set('geo_locating', -1, {
          maxAge: -1 // remove
        });
        this.set_coords({})
        this.set_radius(null)
        this.$bus.$emit('changeToggle', false);
        this.$emit('close');
        this.$emit('clean');
      },

      gg(r) {
        this.radius = r;
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
      initMap() {
        let coords = Object.values(this.localCoords)
        console.log(coords, 'coords')
        ymaps.load().then(maps => {
          this.map = new maps.Map(this.$el.getElementsByClassName('map')[0], {
            center: coords.length ? coords : [44.50465522867475, 34.21493291965433],
            zoom: 11,
            controls: ['fullscreenControl', 'zoomControl', 'geolocationControl']
          });

          let searchControl = new maps.control.SearchControl({
            options: {
              noPlacemark: true,
              provider: 'yandex#search'
            }
          })
          this.map.controls.add(searchControl);


          searchControl.events.add('resultselect', (e) => {
            let index = e.get('index');

            searchControl.getResult(index).then((res) => {
              console.log(res.geometry._coordinates, 'res.geometry._coordinates')
            });
          })



          this.myPlacemark = new maps.Placemark(coords, {
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

          this.objectManager = new maps.ObjectManager({
            // geoObjectOpenBalloonOnClick: true
          })
          let features = [];

  /*        features.push({
            type: "Feature",
            id: 0,
            geometry: {
              type: "Point",
              coordinates: coords.length ? coords : [44.50465522867475, 34.21493291965433],
            },
            draggable: true
          });*/
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
        })
      }
    },
    mounted() {
      this.localCoords = this.coords;
      this.initMap();
    }
  }
</script>
