<template>
	<section class="banner custom-container">
		<div class="banner__card" :class="{ 'rtl': data.rightToLeft }">
			<div class="banner__card__pic-area">
				<img  class="banner__card__pic" alt="Пляж" :src="data.pic">
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
		props: ['data', 'lastWordYellow'],

		computed: {
			getTitle() {
				if (this.lastWordYellow) {
					let words = this.data.title.split(' ');
					words[words.length - 1] = `<span class="orange">${words[words.length - 1]}</span>`;
					return words.join(' ');
				} else {
					return this.data.title.replace(' ', '<br>').split('<br>').map(v => v = `<span>${v}</span>`).join('<br>');
				}
			}
		}
	}
</script>
