<template>
    <div class="slider-beh">
        <div v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper" v-if="data">
                <Card
                    v-if="!data.cardData.some(e => e.id == 'fake')"
                    v-for="(slide, i) in data.cardData"
                    :data="slide"
                    :key="i"
                    class="swiper-slide"
                />
              <despodencyCard
                v-else
                v-for="(slide, i) in data.cardData"
                :data="slide"
                :key="i"
                class="swiper-slide"
              />
            </div>
        </div>
        <div class="pagination-wrapper">
            <div class="custom-pagination">
                <button v-if="data && data.cardData"
                    @click="mySwiper.slideTo(i)"
                    class="custom-pagination-bullet"
                    v-for="(b,i) in Math.max(0, data.cardData.length - 1)"
                    :key="i+0.1"
                    :class="{ 'custom-pagination-bullet-active' : i == activeIndex }"
                ></button>
            </div>
        </div>
        <button
            class="slider__arrow-left"
            :style="{ transform: 'translate(-50%, -50%)', display: showLeft && showArrows ? '' : 'none' }"
            @click="mySwiper.slidePrev()"
        >
            <img
                src="~/static/pics/global/svg/slider_arrow_left.svg"
                alt="Налево"
            >
        </button>
        <button
            class="slider__arrow-right"
            :style="{ transform: 'translate(50%, -50%)', display: showRight && showArrows ? '' : 'none' }"
            @click="mySwiper.slideNext();"
        >
            <img
                src="~/static/pics/global/svg/slider_arrow_right.svg"
                alt="Направо"
            >
        </button>
    </div>
</template>

<script>
import Vue from 'vue';
import Card from '~/components/global/Card';
import despodencyCard from "../despodencyCard";
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
        Card,
        despodencyCard
    },

    data () {
        return {
            swiperOption: {
                spaceBetween: 24,
                slidesPerView: this.data && this.data.slideNumber ? this.data.slideNumber : 4,
                init: false,
                breakpoints: {
                    1150: {
                        slidesPerView: 5,
                        spaceBetween: 20
                    },
                    1000: {
                        slidesPerView: 4
                    },
                    700: {
                        slidesPerView: 3
                    },
                    550: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    }
                }
            },
            showLeft: false,
            showRight: false,
            showArrows: true,
            activeIndex: 0
        };
    },

    mounted () {
        this.mySwiper.on('imagesReady', () => {
            window.addEventListener('resize', this.onResize);
            this.onResize();
        });

        this.mySwiper.on('slideChange', () => {
            this.updateArrows();
            this.activeIndex = this.mySwiper.activeIndex;
        });

        this.mySwiper.init(this.swiperOption);
        this.updateArrows();

        this.$bus.$on('hidePageTransitioner', () => {
            setTimeout(() => {this.update()}, 2000);
        });
        this.$bus.$on('mainPageReady', () => {
            setTimeout(() => {this.update()}, 2000);
        });
    },

    methods: {
        onResize () {
            if (window.innerWidth < 1150) {
                this.showArrows = false;
            } else {
                this.showArrows = true;
            }
        },

        updateArrows () {
            if (this.mySwiper) {
                this.showLeft = !this.mySwiper.isBeginning;
                this.showRight = !this.mySwiper.isEnd;
            }
        },

        update() {
            if (this.mySwiper) {
                this.mySwiper.slideNext();
                this.mySwiper.slidePrev();
            }
        }
    },

    beforeRouteLeave(to, from, next) {
        this.mySwiper.destroy();
        next();
    }
}
</script>
