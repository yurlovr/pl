<template>
  <section
    v-if="data.about"
    class="two-part-layout__card"
  >
    <h2 class="two-part-layout__card__title beach-event__about__title">
      {{ data.title }}
    </h2>
    <div class="beach-event__about__text-area">
      <span v-html="data.about" />
    </div>
    <div
      v-if="data.about && data.about.length > 300"
      class="beach-event__about__accordion"
    >
      <div
        class="beach-event__about__accordion__gradient"
        :class="{ hidden: accordionOpen }"
      />
      <button
        class="beach-event__about__accordion__button"
        @click="toggleAccordion()"
      >
        <span v-show="!accordionOpen">Развернуть</span>
        <span v-show="accordionOpen">Свернуть</span>
        <img
          src="~/static/pics/global/svg/arrow_down_orange.svg"
          :style="{ 'transform': `scaleY(${accordionOpen ? '-1' : '1'})` }"
        >
      </button>
    </div>
  </section>
</template>

<script>

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      accordionOpen: false,
    };
  },

  mounted() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
    this.closeAccordion();
  },

  methods: {
    onResize() {
      if (window.innerWidth <= 800) {
        // readjust the height
        if (this.accordionOpen) this.openAccordion();
      }
    },
    toggleAccordion() {
      if (this.accordionOpen) {
        this.closeAccordion();
      } else {
        this.openAccordion();
      }
    },

    closeAccordion() {
      this.accordionOpen = false;
      if (this.data && this.data.length > 300) this.$el.querySelector('.beach-event__about__text-area').style.height = `${190}px`;
      else this.$el.querySelector('.beach-event__about__text-area').style.height = '';
    },

    openAccordion() {
      this.accordionOpen = true;
      this.$el.querySelector('.beach-event__about__text-area').style.height = `${this.$el.querySelector('.beach-event__about__text-area').scrollHeight}px`;
    },
  },
};
</script>
