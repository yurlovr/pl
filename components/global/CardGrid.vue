<template>
	<section class="card-grid custom-grid-container">
		<div class="card-grid__card" v-for="(card, i) in data" :key="i">
			<nuxt-link :to="card.link" class="card-grid__card__link">
				<div class="card-grid__card__pic-area">
					<img :src="card.pic" class="card-grid__card__pic">
					<button class="card-grid__card__heart-button">
						<img src="~/static/pics/global/svg/heart_unclicked.svg" alt="В избранное" v-show="!card.favorite" @click.prevent>
						<img src="~/static/pics/global/svg/heart_clicked.svg" alt="В избранное" v-show="card.favorite" @click.prevent>
					</button>
					<div class="card-grid__card__temp-area" v-if="card.temperature">
						<img src="~/static/pics/global/svg/temper_big.svg" alt="Температура">
						<span class="card-grid__card__temp">{{ (card.temperature > 0 ? '+ ' : '') + (card.temperature < 0 ? '- ' : '') + card.temperature }}</span>
						<span class="card-grid__card__temp-o"><span>o</span></span>
						<span class="card-grid__card__temp-C">C</span>
					</div>
					<img class="card-grid__card__expensive" v-if="card.expensive" src="~/static/pics/global/svg/expensive.svg" alt="Дорого">
				</div>
			</nuxt-link>
			<div class="card-grid__card__info-area" :style="{ 'height': data[0].beach ? '114px' : 'unset' }">
				<div class="card-grid__card__rating-area" v-if="card.rating">
					<img src="~/static/pics/global/svg/star.svg" alt="Рейтинг">
					<span>{{ card.rating.toFixed(1) }}</span>
				</div>
				<div class="card-grid__card__date-area" v-if="card.date">
					<img src="~/static/pics/global/svg/calendar.svg" alt="Дата">
					<span>{{ card.date }}</span>
				</div>
				<nuxt-link to="/" class="card-grid__card__title" :style="{ 'font-size': card.beach ? '18px' : '20px' }"><v-clamp autoresize :max-lines="2">{{ card.title }}</v-clamp></nuxt-link>
				<div class="card-grid__card__subtitle-area">
					<nuxt-link :to="card.beachLink" class="card-grid__card__beach" v-if="card.beach">{{ card.beach }}</nuxt-link>
					<h6 class="card-grid__card__location" :style="{ 'font-size': card.beach ? '10px' : '12px' }">{{ card.location }}</h6>
					<nuxt-link :to="card.priceLink" class="card-grid__card__price" :style="{ 'font-size': card.beach ? '10px' : '12px' }" v-if="card.price">от {{ card.price }} ₽/сутки</nuxt-link>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import Vue from 'vue';
	import VClamp from 'vue-clamp';

	export default {
		props: ['data'],

		components: {
	  		VClamp
		}
	}
</script>
