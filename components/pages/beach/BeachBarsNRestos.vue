<template>
    <section class="beach-page__barsNrestos">
        <div class="swiper-bar-display_mobile">
            <h2 class="two-part-layout__card__title beach-page__barsNrestos__title">Бары и рестораны</h2>
            <a
                href="#"
                class="beach-page__barsNrestos__online-service "
            >
                <img src="~/static/pics/beach/online_service.svg">
                <span>Онлайн обслуживание</span>
            </a>
        </div>
        <div v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper">
                <div
                    class="swiper-slide"
                    v-for="(item, i) in data"
                    :key="i"
                >
                    <div class="beach-page__barsNrestos__subtitle-area">
                        <h3 class="beach-page__barsNrestos__subtitle">{{ item.title }}</h3>

                        <div class="beach-page__barsNrestos__arrow-controls swiper-bar-display">
                            <button @click="mySwiper.slidePrev()">
                                <img
                                    src="~/static/pics/beach/arrow_left_orange.svg"
                                    alt="Налево"
                                >
                            </button>
                            <span class="beach-page__barsNrestos__arrow-controls__text"><span class="orange">{{ i+1 }}</span>/{{ data.length }}</span>
                            <button @click="mySwiper.slideNext()">
                                <img
                                    src="~/static/pics/beach/arrow_right_orange.svg"
                                    alt="Направо"
                                >
                            </button>
                        </div>
                    </div>
                    <p class="beach-page__barsNrestos__description">
                        {{ item.description }}
                    </p>
                    <a
                        href="#"
                        class="beach-page__barsNrestos__online-service swiper-bar-display"
                    >
                        <img src="~/static/pics/beach/online_service.svg">
                        <span>Онлайн <br>обслуживание</span>
                    </a>
                    <SliderBeachBarsNRestos :data="item.pics" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Vue from 'vue';
import SliderBeachBarsNRestos from '~/components/pages/beach/SliderBeachBarsNRestos';

export default {
    props: ['data'],

    beforeMount () {
        if (process.browser) {
            require('swiper/dist/css/swiper.css');
            const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');
            Vue.use(VueAwesomeSwiper);
        }
    },

    components: {
        SliderBeachBarsNRestos
    },

    data () {
        return {
            swiperOption: {
                spaceBetween: 70,
                simulateTouch: false,
                allowTouchMove: false,
                slidesPerView: 1,
                init: false
            }
        };
    },

    mounted () {
        this.mySwiper.init(this.swiperOption);
    }
}
</script>

<style lang="scss" scoped>
.swiper-bar-display {
    display: block;
    &_mobile a {
        display: none;
    }
}
@media (max-width: 768px) {
    .swiper-bar-display {
        display: none;
        &_mobile {
            display: flex;
            justify-content: space-between;
            a {
                display: flex;
                margin: 0;
            }
            h2 {
                margin: 10px 0;
            }
        }
    }
}
@media (max-width: 680px) {
    .swiper-bar-display {
        display: none;
        &_mobile {
            display: block;
            a {
                display: flex;
                margin: 15px 0;
            }
        }
    }
}
</style>
