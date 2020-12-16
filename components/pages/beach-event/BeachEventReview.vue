<template>
  <div v-if="data" class="beach-event__review">
    <div
      v-if="data.pic"
      class="beach-event__review__pic"
      :class="{'with-photos': data.photos && data.photos.length}"
    >
      <img v-lazy-load :data-src="data.pic">
    </div>
    <div v-if="data.photos && data.photos.length" class="review-photo-wrap">
      <div v-if="winWidth > 767" class="review-photo-container">
        <div
          v-for="(img, index) in data.photos.slice(0, 3)"
          :key="index + 'photo'"
          class="review-photo"
        >
          <div
            v-if="data.photos && data.photos.length > 3 && index==2"
            class="all-photos"
            @click="openPhotoModal"
          >
            {{ '+' + (data.photos.length - 3) }}
          </div>
          <img :src="img" alt="">
        </div>
      </div>
      <div v-else class="review-photo-container">
        <div
          v-for="(img, index) in data.photos.slice(0, 2)"
          :key="index + 'photo'"
          class="review-photo"
        >
          <div
            v-if="data.photos.length > 2 && index==1"
            class="all-photos"
            @click="openPhotoModal"
          >
            {{ '+' + (data.photos.length - 2) }}
          </div>
          <img :src="img" alt="">
        </div>
      </div>
    </div>
    <div class="beach-event__review__title-area">
      <div class="beach-event__review__title-area__left">
        <h3 class="beach-event__review__title">
          {{ data.name }}
        </h3>
        <span class="beach-event__review__date">{{ data.date }}</span>
      </div>
      <div class="beach-event__review__title-area__rating">
        <template v-for="i in 5">
          <img v-if="i <= data.rating" src="~/static/pics/global/svg/star.svg">
          <img v-if="i > data.rating" src="~/static/pics/global/svg/star_pale.svg">
        </template>
      </div>
    </div>
    <p
      v-show="!expanded && maxLines > 0"
      class="beach-event__review__comment not-expanded"
      v-html="data.comment.slice(0, 300) + '...'"
    />
    <p
      v-show="expanded || maxLines == 0"
      class="beach-event__review__comment expanded"
      v-html="data.comment"
    />
    <button
      v-show="maxLines > 0"
      class="beach-event__review__comment__button"
      @click="expanded = !expanded"
    >
      <span v-show="!expanded">Развернуть</span>
      <span v-show="expanded">Свернуть</span>
      <img
        src="~/static/pics/beach/dropdown_blue.svg"
        class="desktop"
        :class="{ active : expanded }"
      >
      <img
        src="~/static/pics/global/svg/dropdown.svg"
        class="tablet"
        :class="{ active : expanded }"
      >
    </button>
  </div>
</template>

<script>
export default {
  props: ['data', 'lines'],

  data() {
    return {
      expanded: false,
      maxLines: this.lines || 0,
      winWidth: null,
    };
  },

  mounted() {
    window.addEventListener('resize', this.onResize, false);
    window.addEventListener('resize', () => {
      this.winWidth = window.innerWidth;
    });
    if (this.data && this.data.comment && this.data.comment.length < 300) this.maxLines = 0;
  },
  beforeMount() {
    this.windowWidth();
  },
  methods: {
    windowWidth() {
      this.winWidth = window.innerWidth;
    },
    openPhotoModal() {
      this.$emit('openModal');
    },
  },
};
</script>
