<template>
  <div
    class="beach-page-sections slider-weather__months"
    :class="{ scroll: !atTop }"
  >
    <div
      v-if="sections"
      class="custom-container"
    >
      <div v-swiper:mySwiper="swiperOption">
        <div
          class="swiper-wrapper"
          :style="{ 'justify-content': sections.length <= 8 ? 'flex-start' : 'space-between' }"
        >
          <div
            v-for="(section) in sections"
            :key="section.hash"
            class="swiper-slide"
            :class="{ active : section.hash === activeSectionHash }"
          >
            <a
              :href="`#${section.hash}`"
              class="slider-weather__month beach-page-sections__section"
              :class="{ active : section.hash == activeSectionHash }"
              :style="{ 'margin-right': sections.length <= 8 ? '15px' : '' }"
              @click.prevent="goTo(`#${section.hash}`)"
            >
              <span>{{ section.title }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    sections: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      activeSectionHash: 'gallery',
      swiperOption: {
        freeMode: true,
        spaceBetween: 0,
        slidesPerView: 'auto',
        mousewheel: true,
        init: false,
      },
      margin: 300,
      atTop: true,
      dontScroll: true,
    };
  },

  mounted() {
    if (this.sections && this.sections.length > 0 && process.browser) {
      this.mySwiper.init(this.swiperOption);
    }

    window.addEventListener('scroll', this.onScroll, );
    window.addEventListener('scroll', this.onResize, false);
    this.onResize();
    // this.onScroll();
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll, false);
  },

  methods: {
    onScroll() {
      if (this.dontScroll) {
        setTimeout(() => {
          this.dontScroll = false;
        }, 100);
        return;
      }
      let bounding;
      if (this.sections) {
        for (let i = 0; i < this.sections.length; i++) {
          if (document.querySelector(`#${this.sections[i].hash}`)) {
            bounding = document.querySelector(`#${this.sections[i].hash}`).getBoundingClientRect();
            if (bounding.top <= this.margin && bounding.bottom >= this.margin) {
              this.activeSectionHash = this.sections[i].hash;
              if (this.mySwiper) {
                if (i === 0 || i === this.sections.length - 1) this.mySwiper.slideTo(i);
                else if (i / this.sections.length < 0.25) this.mySwiper.slideTo(i - 1);
                else if (i / this.sections.length > 0.7) this.mySwiper.slideTo(i + 1);
              }
            }
          }
        }
      } else {
        console.error("Couldn't fetch sections (BeachEventSections)");
      }

      if (window.scrollY > 10) {
        this.atTop = false;
      } else {
        this.atTop = true;
      }
    },

    onResize() {
      if (window.innerWidth > 500) this.margin = 300;
      else this.margin = 200;
      this.onScroll();
    },
    goTo(hash) {
      const el = document.querySelector(hash);
      this.dontScroll = true;
      if (this.atTop) {
        this.atTop = false;
      }
      el.scrollIntoView({ block: 'center', behavior: 'smooth' });
      this.activeSectionHash = hash.replace('#', '');
    },
  },
};
</script>
