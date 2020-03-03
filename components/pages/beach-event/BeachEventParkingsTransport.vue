<template>
	<div class="beach-event__pt-wrapper">
		<section class="two-part-layout__card">
			<div class="beach-event__pt">
				<h2 class="two-part-layout__card__title beach-event__pt__title">Парковки и общественный транспорт</h2>
				<div class="beach-event__pt__bottom">
					<div class="beach-event__pt__left">
						<button class="beach-event__pt__type" @click="active = 0" :class="{ active: active == 0 }">
							<div class="beach-event__pt__type-inner">
								<img src="~/static/pics/beach/car.svg">
								<span>Автомобиль</span>
							</div>
							<div class="beach-event__pt__bottom-line"></div>
						</button>
						<button class="beach-event__pt__type" @click="active = 1" :class="{ active: active == 1 }">
							<div class="beach-event__pt__type-inner">
								<img src="~/static/pics/beach/bus.svg">
								<span>Общественный транспорт</span>
							</div>
						</button>
					</div>
					<div class="beach-event__pt__right">
						<nuxt-link to="/" class="beach-event__pt__right__button banner__card__info-area__button">
							<span>Проложить маршрут</span>
						</nuxt-link>
					</div>
				</div>
			</div>
		</section>
		<BeachEventPtMap :data="data" />
		<nuxt-link to="/" class="beach-event__pt__right__button banner__card__info-area__button bottom">
			<span>Проложить маршрут</span>
		</nuxt-link>
	</div>
</template>

<script>
	import BeachEventPtMap from '~/components/pages/beach-event/BeachEventPtMap';

	export default {
		props: ['data'],

		components: {
			BeachEventPtMap
		},

		data() {
			return {
				active: 0
			}
		}
	}
</script>
