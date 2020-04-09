<template>
	<div class="beach-event__pt-wrapper">
		<section class="two-part-layout__card">
			<div class="beach-event__pt">
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
						<a v-if="data" :href="`https://yandex.ru/maps/?rtext=${userPos.lat},${userPos.long}~${pos[0]},${pos[1]}`" target="_blank" class="beach-event__pt__right__button banner__card__info-area__button">
							<span>Проложить маршрут</span>
						</a>
					</div>
				</div>
			</div>
		</section>
		<BeachEventPtMap :data="data" :additional="additional"/>
		<a v-if="data" :href="`https://yandex.ru/maps/?rtext=${userPos.lat},${userPos.long}~${pos[0]},${pos[1]}`" target="_blank" class="beach-event__pt__right__button banner__card__info-area__button bottom">
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

		mounted() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(this.setUserPos);
			} else console.error("Cannot get user's position (ParkingsTransport)");

			this.$bus.$on('routeCoords', coords => {
				this.pos = coords;
			})
		},

		methods: {
			setUserPos(pos) {
				this.userPos.lat = pos.coords.latitude;
				this.userPos.long = pos.coords.longitude;
			},

			showOnMap(i) { // 0 parkings, 1 transport
				this.active = i;
				this.$bus.$emit('showOnMap', i);
			}
		}
	}
</script>
