<template>
	<div class="beach-event__leave-review">
		<button class="banner__card__info-area__button beach-event__leave-review__button" @click="modalOpen = true">
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
						<span class="beach-event__leave-review__modal__part-title" v-show="file == null">Добавьте фото</span>
						<span class="beach-event__leave-review__modal__part-title" v-if="file != null">{{ file.name }}</span>
						<img :src="file == null ? 'pics/beach/upload.svg' : fileName">
					</div>
				</div>
				<div class="beach-event__leave-review__modal__input-name-area">
					<span class="beach-event__leave-review__modal__part-title">Представьтесь</span>
					<input class="beach-event__leave-review__modal__part-title" type="text" name="name" placeholder="Фамилия, имя, отчество" v-model="name">
				</div>
				<div class="beach-event__leave-review__modal__ratings-area">
					<span class="beach-event__leave-review__modal__part-title">Ваша оценка</span>
					<div class="beach-event__leave-review__modal__ratings">
						<Rating5Star class="beach-event__leave-review__modal__rating" v-model="rating.rating" :data="rating" v-for="(rating, i) in ratings" :key="i" />
					</div>
				</div>
				<div class="beach-event__leave-review__modal__review-area">
					<span class="beach-event__leave-review__modal__part-title">Оставьте отзыв</span>
					<textarea maxlength="10000" placeholder="Введите текст" v-model="review"></textarea>
				</div>
				<div class="beach-event__leave-review__modal__send-button-area">
					<button class="banner__card__info-area__button" @click="sendReview()" :disabled="error == false">
						<span v-show="error == null && !addPic && !ratingsNotFilled && !noName && !noDescription">Отправить</span>
						<span v-show="noName == true && error == null">Пожалуйста представьтесь</span>
						<span v-show="addPic == true && !noName && error == null">Пожалуйста добавьте фото</span>
						<span v-show="ratingsNotFilled == true && !addPic && !noName && error == null">Пожалуйста дайте полную оценку</span>
						<span v-show="noDescription == true && !ratingsNotFilled && !addPic && !noName && error == null">Пожалуйста напишите отзыв</span>
						<span v-show="error == true">Не получилось отправить отзыв, попробовать отправить заного</span>
						<span v-show="error == false">Отзыв успешно отправлен</span>
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
		props: ['typeId', 'type'],

		components: {
			Rating5Star
		},

		data() {
			return {
				modalOpen: false,
				error: null,
				addPic: false,
				ratingsNotFilled: false,
				noName: false,
				noDescription: false,
				// info to send
				file: null,
				fileName: '',
				name: '',
				review: '',
				ratings: [
					{
						title: 'Природа',
						rating: 0
					},
					{
						title: 'Чистота воды',
						rating: 0
					},
					{
						title: 'Чистота берега',
						rating: 0
					},
					{
						title: 'Инфраструктура',
						rating: 0
					},
					{
						title: 'Безопасность',
						rating: 0
					},
					{
						title: 'Доступность',
						rating: 0
					}
				]
			}
		},

		methods: {
			chooseImg() {
				this.$refs.imageLoader.click();
			},

			uploadImage() {
				if (this.$refs.imageLoader){
					this.file = this.$refs.imageLoader.files[0];
					const reader = new FileReader();
					reader.onload = (e) => {
						this.fileName = e.target.result;
					}
					reader.readAsDataURL(this.$refs.imageLoader.files[0]);
				} else console.error('Cannot find image loader (BeachEventLeaveReview)');
			},

			async sendReview() {
				if (this.error == false) // means that the data was sent successfully, no need to send it again
					return;
				if (this.name.replace(/\s/g,"") == "") {
					this.noName = true;
					return;
				} else
					this.noName = false;
				if (this.file == null) {
					this.addPic = true;
					return;
				} else
					this.addPic = false;
				if (this.ratings[0].rating == 0 || this.ratings[1].rating == 0 || this.ratings[2].rating == 0 || this.ratings[3].rating == 0 || this.ratings[4].rating == 0 || this.ratings[5].rating == 0) {
					this.ratingsNotFilled = true;
					return;
				} else
					this.ratingsNotFilled = false;
				if (this.review.replace(/\s/g,"") == "") {
					this.noDescription = true;
					return;
				} else
					this.noDescription = false;

				const data = new FormData();
				data.append('id', this.typeId);
				data.append('fio', this.name);
				data.append('rating[nature]', this.ratings[0].rating);
				data.append('rating[water_purity]', this.ratings[1].rating);
				data.append('rating[shore_cleanliness]', this.ratings[2].rating);
				data.append('rating[infrastructure]', this.ratings[3].rating);
				data.append('rating[security]', this.ratings[4].rating);
				data.append('rating[availability]', this.ratings[5].rating);
				data.append('description', this.review);
				data.append('photo', this.file);

				await this.$axios.$post(`/review/${this.type}Add`, {
					data
				}).then(res => {
					if (res.status) this.error = false;
					else this.error = true;
				})
			}
		}
	}
</script>