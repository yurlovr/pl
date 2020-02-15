<template>
	<section class="two-part-layout__card beach-page__quick-data-wrapper">
		<div class="beach-page__quick-data">
			<h2 class="two-part-layout__card__title beach-page__quick-data__title">{{ title }}</h2>
			<div class="beach-page__quick-data__items" :class="{ active: open }">
				<div class="beach-page__quick-data__item" v-if="data.data1">
					<img :src="data.data1.pic">
					<span v-html="data.data1.title"></span>
				</div>
				<div class="beach-page__quick-data__item" v-if="data.data2">
					<img :src="data.data2.pic">
					<span v-html="data.data2.title"></span>
				</div>
				<div class="beach-page__quick-data__item" v-if="data.data3">
					<img :src="data.data3.pic">
					<span v-html="data.data3.title"></span>
				</div>
				<div class="beach-page__quick-data__item" v-if="data.data4">
					<img :src="data.data4.pic">
					<span v-html="data.data4.title"></span>
				</div>
				<div class="beach-page__quick-data__item" v-if="data.data5">
					<img :src="data.data5.pic">
					<span v-html="data.data5.title"></span>
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