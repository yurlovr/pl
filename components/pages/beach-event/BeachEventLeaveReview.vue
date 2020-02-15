<template>
	<div class="beach-event__leave-review">
		<button class="main-page__card__info-area__button beach-event__leave-review__button" @click="modalOpen = true">
			<span>Оставить отзыв</span>
		</button>
		<div class="beach-event__leave-review__modal" v-show="modalOpen" v-body-scroll-lock="modalOpen">
			<div class="beach-event__leave-review__modal__bg" @click="modalOpen = false"></div>
			<div class="beach-event__leave-review__modal__card">
				<div class="beach-event__leave-review__modal__title-area">
					<h3 class="beach-event__leave-review__modal__title">
						<span>Оставить отзыв</span>
						<div class="beach-event__leave-review__modal__close" @click="modalOpen = false">
							<img src="~/static/pics/global/svg/close_blue.svg">
						</div>
					</h3>
					<div class="beach-event__leave-review__modal__img-area" @click="chooseImg">
						<span class="beach-event__leave-review__modal__part-title">Добавьте фото</span>
						<img src="~/static/pics/beach/upload.svg">
					</div>
				</div>
				<div class="beach-event__leave-review__modal__input-name-area">
					<span class="beach-event__leave-review__modal__part-title">Представьтесь</span>
					<input class="beach-event__leave-review__modal__part-title" type="text" name="name" placeholder="Фамилия, имя, отчество" v-model="name">
				</div>
				<div class="beach-event__leave-review__modal__ratings-area">
					<span class="beach-event__leave-review__modal__part-title">Ваша оценка</span>
					<div class="beach-event__leave-review__modal__ratings">
						<Rating5Star class="beach-event__leave-review__modal__rating" :data="rating" v-for="(rating, i) in ratings" :key="i" />
					</div>
				</div>
				<div class="beach-event__leave-review__modal__review-area">
					<span class="beach-event__leave-review__modal__part-title">Оставьте отзыв</span>
					<textarea maxlength="10000" placeholder="Введите текст"></textarea>
				</div>
				<div class="beach-event__leave-review__modal__send-button-area">
					<button class="main-page__card__info-area__button">
						<span>Отправить</span>
					</button>
					<div class="beach-event__leave-review__modal__bottom-space"></div>
				</div>
			</div>
		</div>
		<input v-show="false" type="file" accept="image" name="image" @change="uploadImage" ref="imageLoader">
	</div>
</template>

<script>
	import Rating5Star from '~/components/global/Rating5Star';

	export default {
		components: {
			Rating5Star
		},

		data() {
			return {
				modalOpen: false,

				name: '',
				review: '',
				ratings: [
					{
						title: 'Природа',
						ratings: 0
					},
					{
						title: 'Чистота воды',
						ratings: 0
					},
					{
						title: 'Чистота берега',
						ratings: 0
					},
					{
						title: 'Инфраструктура',
						ratings: 0
					},
					{
						title: 'Безопасность',
						ratings: 0
					},
					{
						title: 'Доступность',
						ratings: 0
					}
				]
			}
		},

		methods: {
			chooseImg() {
				this.$refs.imageLoader.click();
			},

			uploadImage() {

			}
		}
	}
</script>