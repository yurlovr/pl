<template>
    <div class="beach-page-sections slider-weather__months">
        <div class="custom-container">
            <div v-swiper:mySwiper="swiperOption">
                <div class="swiper-wrapper">
                    <div
                        class="swiper-slide"
                        v-for="(section, i) in sections"
                        :class="{ active : section.hash == activeSectionHash }"
                    >
                        <nuxt-link
                            :to="{path: '#'+section.hash, hash: '#'+section.hash}"
                            class="slider-weather__month beach-page-sections__section"
                            :class="{ active : section.hash == activeSectionHash }"
                        >
                            <span>{{ section.title }}</span>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';

export default {
    props: ['sections'],

    beforeMount () {
        if (process.browser) {
            require('swiper/dist/css/swiper.css');
            const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');
            Vue.use(VueAwesomeSwiper);
        }
    },

    data () {
        return {
            activeSectionHash: '#',
            swiperOption: {
                freeMode: true,
                spaceBetween: 0,
                slidesPerView: 'auto',
                init: false
            },
            margin: 300
        };
    },

    mounted () {
        this.mySwiper.init(this.swiperOption);

        window.addEventListener('scroll', this.onScroll, false);
        window.addEventListener('scroll', this.onResize, false);
        this.onResize();
    },

    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll, false);
    },

    methods: {
        onScroll() {
            let bounding;
            for (let i = 0; i < this.sections.length; i++) {
                if (document.querySelector(`#${this.sections[i].hash}`)) {
                    bounding = document.querySelector(`#${this.sections[i].hash}`).getBoundingClientRect();
                    if (bounding.top <= this.margin && bounding.bottom >= this.margin)
                            this.activeSectionHash = this.sections[i].hash;
                }
            }
        },

        onResize() {
            if (window.innerWidth > 500)
                this.margin = 300;
            else this.margin = 200;
        }
    }
}
</script>
