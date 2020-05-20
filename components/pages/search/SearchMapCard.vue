<template>
	<a :href="data.beachLink" @click.prevent="$bus.goTo(data.beachLink, $router)" class="search-page__map-area__card" v-if="data">
		<div class="search-page__map-area__card__pic-area">
			<img v-lazy-load :data-src="data.pic">
		</div>
		<div class="search-page__map-area__card__info-area">
			<div class="search-page__map-area__card__title-area">
				<h3 class="search-page__map-area__card__title">{{ data.title }}</h3>
				<div class="search-page__map-area__card__rating-area" v-if="data.rating">
					<img  src="~/static/pics/global/svg/star.svg" alt="Рейтинг">
					<span>{{ data.rating.toFixed(1) }}</span>
				</div>
			</div>
			<h5 class="search-page__map-area__card__subtitle">{{ data.location }}</h5>
			<div class="search-page__map-area__card__infos">
				<div class="search-page__map-area__card__infos__item" v-if="data.beachLength">
					<img  src="~/static/pics/search/beach_length.svg">
					<span>{{ data.beachLength }}</span>
				</div>
				<div class="search-page__map-area__card__infos__item" v-if="data.beachPrice">
					<img  src="~/static/pics/search/beach_price.svg">
					<span>{{ data.beachPrice }} <span>
						<img  :style="{ 'height': '11px', 'width': 'unset', 'margin-bottom': '3px', 'margin-right': '0' }" src="~/static/pics/global/svg/ruble_dark.svg" alt="руб">
					</span>/день</span>
				</div>
				<div class="search-page__map-area__card__infos__item" v-if="data.beachType">
					<img  src="~/static/pics/search/beach_type.svg">
					<span>{{ data.beachType }}</span>
				</div>
				<div class="search-page__map-area__card__infos__item" v-if="data.beachWorktime">
					<img  src="~/static/pics/search/beach_worktime.svg">
					<span>{{ data.beachWorktime }}</span>
				</div>
				<div class="search-page__map-area__card__infos__item" v-if="data.beachSeabedType">
					<img  src="~/static/pics/search/beach_seabedtype.svg">
					<span>{{ data.beachSeabedType }}</span>
				</div>
			</div>
		</div>
	</a>
</template>

<script>
	export default {
		props: ['data'],
    methods:{
      a(e){
        // console.log('dfsfsdfsdfsdfsd', e)
      },
      b(e){
        console.log(e, 'e')
      }
    }
	}
</script>
