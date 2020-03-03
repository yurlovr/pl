<template>
	<section class="banner custom-container">
		<div class="banner__card" :class="{ 'rtl': data.rightToLeft }">
			<div class="banner__card__pic-area">
				<img class="banner__card__pic" alt="Пляж" :src="data.pic">
				<div v-if="showInfoOnPic">
					<div class="banner__card__pic-area__title-area">
						<h5 class="banner__card__pic-area__pretitle">Вход на пляж</h5>
						<h4 class="banner__card__pic-area__title">Бесплатно</h4>
					</div>
					<div class="banner__card__pic-area__icon-area">
						<div class="banner__card__pic-area__icon-wrapper">
							<img class="banner__card__pic-area__icon" src="~/static/pics/main/section3_lounger.svg">
							<span>Шезлонги</span>
						</div>
						<div class="banner__card__pic-area__icon-wrapper">
							<img class="banner__card__pic-area__icon" src="~/static/pics/main/section3_umbrella.svg">
							<span>Пляжные<br>зонтики</span>
						</div>
						<div class="banner__card__pic-area__icon-wrapper">
							<img class="banner__card__pic-area__icon" src="~/static/pics/main/section3_towel.svg">
							<span>Пляжные<br>полотенца</span>
						</div>
						<div class="banner__card__pic-area__icon-wrapper">
							<img class="banner__card__pic-area__icon" src="~/static/pics/main/section3_equip.svg">
							<span>Инвентать<br>для плавания</span>
						</div>
						<div class="banner__card__pic-area__icon-wrapper">
							<img class="banner__card__pic-area__icon" src="~/static/pics/main/section3_sport.svg">
							<span>Спортивный<br>инвентарь</span>
						</div>
						<div class="banner__card__pic-area__icon-wrapper">
							<img class="banner__card__pic-area__icon" src="~/static/pics/main/section3_bar.svg">
							<span>Бар и<br>ресторан</span>
						</div>
					</div>
					<div class="banner__card__pic-area__bottom-gradient"></div>
				</div>
			</div>
			<div class="banner__card__info-area">
				<h4 class="banner__card__info-area__title" v-html="getTitle"></h4>
				<p class="banner__card__info-area__text">
					{{ data.description }}
				</p>
				<a :href="data.link" @click="$bus.goTo(data.link, $router)" class="banner__card__info-area__button">
					<span>{{ data.buttonText }}</span>
				</a>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		props: ['data', 'showInfoOnPic', 'lastWordYellow'],

		computed: {
			getTitle() {
				if (this.lastWordYellow) {
					let words = this.data.title.split(' ');
					words = words.join(' ').replace(' ', '<br>').replace(' ', '<br>').split('<br>').map(v => v = `<span>${v}</span>`);
					words[words.length - 1] = `<span class="orange">${words[words.length - 1]}</span>`;
					return words.join('<br>');
				} else {
					return this.data.title.replace(' ', '<br>').split('<br>').map(v => v = `<span>${v}</span>`).join('<br>');
				}
			}
		}
	}
</script>