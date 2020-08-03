<template>
  <div class="beach-event__review" v-if="data">
    <div class="beach-event__review__pic" v-if="data.pic" :class="{'with-photos': data.photos.length}">
      <img :data-src="data.pic" v-lazy-load>
    </div>
    <div class="review-photo-wrap" v-if="data.photos.length">
      <div class="review-photo-container" v-if="winWidth > 767">
        <div class="review-photo" v-for="(img, index) in data.photos.slice(0, 3)" :key="index + 'photo'">
          <div class="all-photos" @click="openPhotoModal" v-if="data.photos.length > 3 && index==2">
            {{'+' + (data.photos.length - 2)}}
          </div>
          <img :src="img" alt="">
        </div>
      </div>
      <div v-else class="review-photo-container">
        <div class="review-photo" v-for="(img, index) in data.photos.slice(0, 2)" :key="index + 'photo'">
          <div class="all-photos" @click="openPhotoModal" v-if="data.photos.length > 2 && index==1">
            {{'+' + (data.photos.length - 1)}}
          </div>
          <img :src="img" alt="">
        </div>
      </div>
    </div>
    <div class="beach-event__review__title-area">
      <div class="beach-event__review__title-area__left">
        <h3 class="beach-event__review__title">{{ data.name }}</h3>
        <span class="beach-event__review__date">{{ data.date }}</span>
      </div>
      <div class="beach-event__review__title-area__rating">
        <template v-for="i in 5">
          <img src="~/static/pics/global/svg/star.svg" v-if="i <= data.rating">
          <img src="~/static/pics/global/svg/star_pale.svg" v-if="i > data.rating">
        </template>
      </div>
    </div>
    <p class="beach-event__review__comment not-expanded" v-show="!expanded && maxLines > 0"
       v-html="data.comment.slice(0, 300) + '...'"></p>
    <p class="beach-event__review__comment expanded" v-show="expanded || maxLines == 0" v-html="data.comment"></p>
    <button class="beach-event__review__comment__button" @click="expanded = !expanded" v-show="maxLines > 0">
      <span v-show="!expanded">Развернуть</span>
      <span v-show="expanded">Свернуть</span>
      <img src="~/static/pics/beach/dropdown_blue.svg" class="desktop" :class="{ active : expanded }">
      <img src="~/static/pics/global/svg/dropdown.svg" class="tablet" :class="{ active : expanded }">
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
        winWidth: null
      }
    },

    mounted() {
      window.addEventListener('resize', this.onResize, false);
      window.addEventListener('resize', () => {
        this.winWidth = window.innerWidth
      });
      if (this.data && this.data.comment && this.data.comment.length < 300)
        this.maxLines = 0;
    },
    beforeMount() {
      this.windowWidth()
    },
    methods: {
      windowWidth() {
        this.winWidth = window.innerWidth
      },
      openPhotoModal() {
       this.$emit('openModal', )
      }
    },
  }
</script>
