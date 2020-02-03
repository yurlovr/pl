<template>
	<section class="main-page__beach-type custom-container">
		<h3 class="main-page__section-title">Выбирайте по своим желаниям</h3>
		<div class="main-page__beach-type__card-area">
			<div class="main-page__beach-type__card">
				<img src="~/static/pics/main/section10_pic1.png" class="main-page__beach-type__card__bg">
				<div class="main-page__beach-type__card__text-area">
					<h4 class="main-page__beach-type__card__title">Городские</h4>
					<p class="main-page__beach-type__card__text">
						Оборудованные ляжи, со всей<br>необходимой инфраструктурой<br>для комфортного отдыха
					</p>
				</div>
				<nuxt-link :to="data.beachLink1" class="main-page__beach-type__card__beach-number-area">
					<span class="main-page__beach-type__card__beach-number">{{ data.beachNumber1 }}</span>
					<span class="main-page__beach-type__card__beach">ПЛЯЖЕЙ</span>
				</nuxt-link>
			</div>
			<div class="main-page__beach-type__card">
				<img src="~/static/pics/main/section10_pic2.png" class="main-page__beach-type__card__bg">
				<div class="main-page__beach-type__card__text-area">
					<h4 class="main-page__beach-type__card__title">Дикие</h4>
					<p class="main-page__beach-type__card__text">
						Уединение с природой, релакс.<br>Хотите тишины и спокойствия –<br>посмотрите нашу подборку
					</p>
				</div>
				<nuxt-link :to="data.beachLink2" class="main-page__beach-type__card__beach-number-area">
					<span class="main-page__beach-type__card__beach-number">{{ data.beachNumber2 }}</span>
					<span class="main-page__beach-type__card__beach">ПЛЯЖЕЙ</span>
				</nuxt-link>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		props: ['data']
	}
</script>