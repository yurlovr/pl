<template>
<<<<<<< HEAD
    <div class="custom-card">
        <div class="custom-card__pic-area">
            <a
                href="/"
                class="custom-card__link"
                @click.prevent="$bus.goTo('/', $router)"
            >
                <img
                    :src="data.pic"
                    alt="Фото"
                    class="custom-card__pic"
                >
            </a>
            <div
                class="custom-card__temp-area"
                v-if="data.temperature && temp != false"
            >
                <img
                    src="~/static/pics/global/svg/temper_big.svg"
                    alt="Температура"
                    class="big"
                >
                <img
                    src="~/static/pics/global/svg/temper_small.svg"
                    alt="Температура"
                    class="small"
                >
                <span class="custom-card__temp">{{ (data.temperature > 0 ? '+ ' : '') + (data.temperature < 0 ? '- ' : '') + data.temperature }}</span>
                <span class="custom-card__temp-o"><span>o</span></span>
                <span class="custom-card__temp-C">C</span>
            </div>
            <AddToFavorites :fav="data.favorite" />
            <img
                class="custom-card__expensive"
                v-if="data.expensive"
                src="~/static/pics/global/svg/expensive.svg"
                alt="Дорого"
            >
            <button
                class="custom-card__visited"
                @click="visited = !visited"
                v-if="showIfVisited == true"
            >
                <div class="custom-card__visited__round">
                    <img
                        src="~/static/pics/global/svg/tick.svg"
                        v-show="visited"
                    >
                </div>
                <span class="custom-card__visited__text">посетил</span>
            </button>
        </div>
        <div
            class="custom-card__info-area"
            :class="{ event: data.beach }"
        >
            <div
                class="custom-card__rating-area"
                v-if="data.rating"
            >
                <img
                    src="~/static/pics/global/svg/star.svg"
                    alt="Рейтинг"
                >
                <span>{{ data.rating.toFixed(1) }}</span>
            </div>
            <div
                class="custom-card__date-area"
                v-if="data.date"
            >
                <img
                    src="~/static/pics/global/svg/calendar.svg"
                    alt="Дата"
                >
                <span>{{ data.date }}</span>
            </div>
            <a
                href="/"
                class="custom-card__title"
                @click.prevent="$bus.goTo('/', $router)"
                :style="{ 'font-size': data.beach ? '18px' : '20px' }"
            >
                <v-clamp
                    autoresize
                    :max-lines="2"
                >{{ data.title }}</v-clamp>
            </a>
            <div class="custom-card__subtitle-area">
                <a
                    :href="data.beachLink"
                    @click.prevent="$bus.goTo(data.beachLink, $router)"
                    class="custom-card__beach"
                    v-if="data.beach"
                >{{ data.beach }}</a>
                <h6
                    class="custom-card__location"
                    :style="{ 'font-size': data.beach ? '10px' : '12px' }"
                >{{ data.location }}</h6>
                <a
                    :href="data.priceLink"
                    @click.prevent="$bus.goTo(data.priceLink, $router)"
                    class="custom-card__price"
                    :style="{ 'font-size': data.beach ? '10px' : '12px' }"
                    v-if="data.price"
                >от {{ data.price }}
                    <span>
                        <img
                            :style="{ 'height': data.beach ? '9px' : '11px', 'margin-bottom': '3px' }"
                            src="~/static/pics/global/svg/ruble.svg"
                            alt="руб"
                        >
                    </span>/сутки
                </a>
            </div>
        </div>
    </div>
=======
	<div class="custom-card">
		<div class="custom-card__pic-area">
			<a href="/" class="custom-card__link" @click.prevent="$bus.goTo('/', $router)">
				<img :src="data.pic" alt="Фото" class="custom-card__pic">
			</a>
			<div class="custom-card__temp-area" v-if="data.temperature && temp != false">
				<img src="~/static/pics/global/svg/temper_big.svg" alt="Температура" class="big">
				<img src="~/static/pics/global/svg/temper_small.svg" alt="Температура" class="small">
				<span class="custom-card__temp">{{ (data.temperature > 0 ? '+ ' : '') + (data.temperature < 0 ? '- ' : '') + data.temperature }}</span>
				<span class="custom-card__temp-o"><span>o</span></span>
				<span class="custom-card__temp-C">C</span>
			</div>
			<AddToFavorites :fav="data.favorite" />
			<img class="custom-card__expensive" v-if="data.expensive" src="~/static/pics/global/svg/expensive.svg" alt="Дорого">
			<button class="custom-card__visited" @click="visitedToggle()" v-if="showIfVisited == true">
				<div class="custom-card__visited__round">
					<img src="~/static/pics/global/svg/tick.svg" v-show="isVisited">
				</div>
				<span class="custom-card__visited__text">посетил</span>
			</button>
		</div>
		<div class="custom-card__info-area" :class="{ event: data.beach }">
			<div class="custom-card__rating-area" v-if="data.rating">
				<img src="~/static/pics/global/svg/star.svg" alt="Рейтинг">
				<span>{{ data.rating.toFixed(1) }}</span>
			</div>
			<div class="custom-card__date-area" v-if="data.date">
				<img src="~/static/pics/global/svg/calendar.svg" alt="Дата">
				<span>{{ data.date }}</span>
			</div>
			<div><a href="/" class="custom-card__title" @click.prevent="$bus.goTo('/', $router)" :style="{ 'font-size': data.beach ? '18px' : '20px' }"><v-clamp autoresize :max-lines="max">{{ data.title }}</v-clamp></a></div>
			<div class="custom-card__subtitle-area">
				<a :href="data.beachLink" @click.prevent="$bus.goTo(data.beachLink, $router)" class="custom-card__beach" v-if="data.beach">{{ data.beach }}</a>
				<h6 class="custom-card__location" :style="{ 'font-size': data.beach ? '10px' : '12px' }">{{ data.location }}</h6>
				<a :href="data.priceLink" @click.prevent="$bus.goTo(data.priceLink, $router)" class="custom-card__price" :style="{ 'font-size': data.beach ? '10px' : '12px' }" v-if="data.price">от {{ data.price }}
					<span>
						<img :style="{ 'height': data.beach ? '9px' : '11px', 'margin-bottom': '3px' }" src="~/static/pics/global/svg/ruble.svg" alt="руб">
					</span>/сутки
				</a>
			</div>
		</div>
	</div>
>>>>>>> 395b7ebf410d10b7f09e218f6bfb55cac0ffafdb
</template>

<script>
import Vue from 'vue';
import VClamp from 'vue-clamp';
import AddToFavorites from '~/components/global/AddToFavorites';

<<<<<<< HEAD
export default {
    props: ['data', 'showIfVisited', 'temp'],
=======
	export default {
		props: ['data', 'showIfVisited', 'temp', 'visited'],
>>>>>>> 395b7ebf410d10b7f09e218f6bfb55cac0ffafdb

    components: {
        VClamp,
        AddToFavorites
    },

<<<<<<< HEAD
    data () {
        return {
            visited: false
        };
    }
}
</script>
=======
		data() {
			return {
				isVisited: this.visited || false,
				max: 2
			}
		},

		mounted() {
			window.addEventListener('resize', this.onResize, false);
			this.onResize();

			this.$bus.$on('updateVisited', () => {
				this.isVisited = this.visited == true ? true : false;
			})
		},

		methods: {
			visitedAdd() {
				this.isVisited = true;

				this.$bus.$emit('visitedAdd', this.data.beachLink);
			},

			visitedRemove() {
				this.isVisited = false;

				this.$bus.$emit('visitedRemove', this.data.beachLink);
			},

			visitedToggle() {
				if (this.isVisited)
					this.visitedRemove();
				else this.visitedAdd();
			},

			onResize() {
				if (!this.$el.querySelector('.custom-card'))
					window.removeEventListener('resize', this.onResize, false);

				if (window.innerWidth <= 500)
					this.max = 3;
				else this.max = 2;
			}
		}
	}
</script>
>>>>>>> 395b7ebf410d10b7f09e218f6bfb55cac0ffafdb
