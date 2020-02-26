<template>
	<section class="two-part-layout__card beach-page__quick-data-wrapper">
		<div class="beach-page__quick-data">
			<h2 class="two-part-layout__card__title beach-page__quick-data__title">{{ title }}</h2>
			<div class="beach-page__quick-data__items" :class="{ active: open }">
				<div class="beach-page__quick-data__item" v-for="item in data">
					<img :src="item.pic">
					<span v-html="item.title"></span>
					<div class="beach-page__quick-data__popup">
						<div class="beach-page__quick-data__popup__section">
							<h5 class="beach-page__quick-data__popup__heading">Время проката</h5>
							<span class="beach-page__quick-data__popup__time">С 9:00 до 21:00</span>
							<span class="beach-page__quick-date__popup__comment">Оплата осуществляется в кабинке “Шезлонги”</span>
							<span class="beach-page__quick-date__popup__comment">Минимальный срок аренды 2 часа</span>
						</div>
						<div class="beach-page__quick-data__popup__section">
							<h5 class="beach-page__quick-data__popup__heading">Стоимость, руб/час</h5>
							<div class="beach-page__quick-data__popup__price-wrapper">
								<span>Шезлонг мягкий</span>
								<span>500</span>
							</div>
							<div class="beach-page__quick-data__popup__price-wrapper">
								<span>Шезлонг 1-ая линия</span>
								<span>1 000</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<button class="beach-page__quick-data__accordion-button" @click="open = !open" :class="{ active: open }">
				<span v-show="open">Свернуть</span>
				<span v-show="!open">Развернуть</span>
				<img src="~/static/pics/global/svg/dropdown.svg">
			</button>
		</div>
	</section>
</template>

<script>
	export default {
		props: ['data', 'title'],

		data() {
			return {
				open: false
			}
		}
	}
</script>