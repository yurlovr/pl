<template>
	<div class="beach-event__pt-wrapper">
		<section class="two-part-layout__card">
			<div class="beach-event__pt" id="parks">
				<h2 class="two-part-layout__card__title beach-event__pt__title">Парковки и общественный транспорт</h2>
				<div class="beach-event__pt__bottom">
					<div class="beach-event__pt__left">
						<button class="beach-event__pt__type" @click="showOnMap(0)" :class="{ active: active == 0 }">
							<div class="beach-event__pt__type-inner">
								<img src="~/static/pics/beach/car.svg">
								<span>Автомобиль</span>
							</div>
							<div class="beach-event__pt__bottom-line"></div>
						</button>
						<button class="beach-event__pt__type" @click="showOnMap(1)" :class="{ active: active == 1 }">
							<div class="beach-event__pt__type-inner">
								<img src="~/static/pics/beach/bus.svg">
								<span>Общественный транспорт</span>
							</div>
						</button>
					</div>
					<div class="beach-event__pt__right">
						<a v-if="data" :href="'https://yandex.ru/maps/' + yandexTransform(pos)" target="_blank" class="beach-event__pt__right__button banner__card__info-area__button">
							<span>Проложить маршрут</span>
						</a>
					</div>
				</div>
			</div>
		</section>
		<BeachEventPtMap :data="data" :additional="additional"/>
		<a v-if="data" :href="'https://yandex.ru/maps/' + yandexTransform(pos)" target="_blank" class="beach-event__pt__right__button banner__card__info-area__button bottom">
			<span>Проложить маршрут</span>
		</a>
	</div>
</template>

<script>
	import BeachEventPtMap from '~/components/pages/beach-event/BeachEventPtMap';

	export default {
		props: ['data', 'additional'],

		components: {
			BeachEventPtMap
		},

		data() {
			return {
				active: 0,
				userPos: {
					lat: 50,
					long: 50
				},
				pos: []
			}
		},

    computed: {
      last_coordinates() {
        let cookie_coords = this.$cookies.get('last_coordinates') || {},
          route_coords = this.$route.params && this.$route.params.coordinates ? this.$route.params.coordinates : {}
        if (Object.values(cookie_coords).length) {
          return cookie_coords
        }
        return route_coords ? (() => {
          let obj = Object.values(route_coords);
          return obj.length == 2 ? {lat: obj[0], lng: obj[1]} : {}
        })() : {}
      }
    },

		mounted() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(this.setUserPos);
			} else console.error("Cannot get user's position (ParkingsTransport)");

			this.$bus.$on('routeCoords', coords => {
				this.pos = coords;
			})
		},

		methods: {
      yandexTransform(pos) {
        const user_pos = Object.values(this.last_coordinates).join(','),
          beach_pos = pos.join(',')
        return '?rtext=' + user_pos + '~' + beach_pos + '&rtt=auto&z=12'
      },
			setUserPos(pos) {
			  console.log(pos, 'poooooos')
				this.userPos.lat = pos.coords.latitude;
				this.userPos.long = pos.coords.longitude;
        const {coords: {latitude, longitude}} = pos;
        let my_coords = {
          lat: latitude,
          lng: longitude
        }
        console.log(my_coords, 'm')
        this.$cookies.set('last_coordinates', JSON.stringify(my_coords), {
          maxAge: 30 * 24 * 60 * 60 // one month
        });
			},

			showOnMap(i) { // 0 parkings, 1 transport
				this.active = i;
				this.$bus.$emit('showOnMap', i);
			}
		}
	}
</script>
