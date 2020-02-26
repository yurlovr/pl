<template>
	<section class="two-part-layout__card beach-page__quick-data-wrapper">
		<div class="beach-page__quick-data">
			<h2 class="two-part-layout__card__title beach-page__quick-data__title">{{ title }}</h2>
			<div class="beach-page__quick-data__items" :class="{ active: open }">
				<div class="beach-page__quick-data__item" v-for="item in data">
					<img :src="item.pic">
					<span v-html="item.title"></span>
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