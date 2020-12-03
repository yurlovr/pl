<template>
    <div class="beach-page-sections slider-weather__months" :class="{ scroll: !atTop }">
        <div class="custom-container" v-if="sections">
            <div v-swiper:mySwiper="swiperOption">
                <div class="swiper-wrapper" :style="{ 'justify-content': sections.length <= 8 ? 'flex-start' : 'space-between' }">
                    <div
                        class="swiper-slide"
                        v-for="(section, i) in sections"
                        :class="{ active : section.hash == activeSectionHash }"
                    >
                        <nuxt-link
                            :to="{path: '#'+section.hash, hash: '#'+section.hash}"
                            class="slider-weather__month beach-page-sections__section"
                            :class="{ active : section.hash == activeSectionHash, 'd-none': !section.show }"
                            :style="{ 'margin-right': sections.length <= 8 ? '15px' : '' }"
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
                mousewheel: true,
                init: false
            },
            margin: 300,
            atTop: true
        };
    },

    mounted () {
        if (this.sections && this.sections.length > 0 && process.browser) {
          this.mySwiper.init(this.swiperOption);
        }

        window.addEventListener('scroll', this.onScroll, false);
        window.addEventListener('scroll', this.onResize, false);
        this.onResize();
        this.onScroll();
    },

    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll, false);
    },

    methods: {
        onScroll() {
            let bounding;
            if (this.sections) {
                for (let i = 0; i < this.sections.length; i++) {
                    if (document.querySelector(`#${this.sections[i].hash}`)) {
                        bounding = document.querySelector(`#${this.sections[i].hash}`).getBoundingClientRect();
                        if (bounding.top <= this.margin && bounding.bottom >= this.margin) {
                            this.activeSectionHash = this.sections[i].hash;
                            if (this.mySwiper) {
                                if (i == 0 || i == this.sections.length - 1)
                                    this.mySwiper.slideTo(i);
                                else if (i / this.sections.length < .25)
                                    this.mySwiper.slideTo(i-1);
                                else if (i / this.sections.length > .7)
                                    this.mySwiper.slideTo(i+1);
                            }
                        }
                    }
                }
            } else console.error("Couldn't fetch sections (BeachEventSections)");

            if (window.scrollY > 10) {
                this.atTop = false;
            } else this.atTop = true;
        },

        onResize() {
            if (window.innerWidth > 500)
                this.margin = 300;
            else this.margin = 200;

            this.onScroll();
        }
    }
}
</script>
