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
            <p>Радиус поиска пляжей, км</p>
            <div @click="gg(item.val)" class="modal-geo__modal__body__bottom__left__circle" :class="{active: radius == item.val}" v-for="item in list"><span>{{item.text}}</span></div>
          </div>
          <div class="modal-geo__modal__body__bottom__right">
           <span @click.stop="$emit('close')">Сбросить</span>
            <button type="button" @click="toSearch">Принять</button>
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
        radius: 10000,
        myCircle: null,
        objectManager: null,
        list: [
          {text: 1, val : 1000, small: true},
          {text: 5, val : 5000, small: true},
          {text: 10, val : 10000, small: true},
          {text: 25, val : 25000, small: true},
          {text: 50, val : 50000, small: true},
          {text: 'Более 50', val : 200000, small: false},
        ],
        active_rad: 1
      }
    },
    methods: {
    ...mapMutations('search', ['set_coords', 'set_radius']),
      toSearch(){
        this.set_coords(this.coords)
        this.set_radius(this.radius)
        this.$emit('close')
      },

      gg(r) {
      this.radius = r;
        this.objectManager.remove(this.myCircle);
        this.myCircle = {
          type: "Feature",
          id: 1,
          geometry: {
            type: "Circle",
            coordinates: Object.values(this.coords),
            radius: r
          }
        }
        setTimeout(()=>{
          this.objectManager.add(this.myCircle)
        }, 100)

      },
      initMap() {
        let coords = Object.values(this.coords)
        console.log(coords, 'coords')
        ymaps.load().then(maps => {
          this.map = new maps.Map(this.$el.getElementsByClassName('map')[0], {
            center: coords.length ? coords : [44.50465522867475, 34.21493291965433],
            zoom: 11,
            controls: []
          });


          this.objectManager = new maps.ObjectManager({
            geoObjectOpenBalloonOnClick: true
          })
          let features = [];

          features.push({
            type: "Feature",
            id: 0,
            geometry: {
              type: "Point",
              coordinates: coords.length ? coords : [44.50465522867475, 34.21493291965433],
            },
            draggable: true
          });
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

          this.map.geoObjects.add(this.objectManager);

          this.objectManager.add({
            type: "FeatureCollection",
            features: features
          })


        })
      }
    },
    mounted() {
      this.initMap();
    }
  }
</script>
