<template>
	<div class="beach-page__avg-rating" @click="toggleModal()" :class="{ active: modalOpen }">
		<div class="beach-page__avg-rating__bg"></div>
		<div class="beach-page__avg-rating__card">
			<div class="beach-page__avg-rating__title-area">
				<div class="beach-page__avg-rating__title-area__left">
					<h4 class="beach-page__avg-rating__title">Средняя оценка</h4>
					<div class="beach-page__avg-rating__title-area__info">
						<img src="~/static/pics/global/svg/star.svg">
						<span>{{ data.rating }} ({{ data.peopleCount }})</span>
					</div>
				</div>
				<div class="beach-page__avg-rating__title-area__right">
					<img src="~/static/pics/beach/accordion_dropdown_orange.svg">
				</div>
			</div>
			<div class="beach-page__avg-rating__modal">
			<div class="h-line"></div>
				<div class="beach-page__avg-rating__ratings">
					<div class="beach-page__avg-rating__rating" v-for="rating in data.ratings">
						<span>{{ rating.title }}</span>
						<div class="beach-page__avg-rating__rating__stars">
							<template v-for="i in 5">
								<img src="~/static/pics/global/svg/star.svg" v-if="i <= rating.rating">
								<img src="~/static/pics/global/svg/star_pale.svg" v-if="i > rating.rating">
							</template>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['data'],

		data() {
			return {
				modalOpen: false
			}
		},

		methods: {
			toggleModal() {
				if (window.innerWidth <= 1200) {
					this.modalOpen = !this.modalOpen;
				}
			}
		}
	}
</script>