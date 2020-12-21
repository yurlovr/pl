<template>
  <section
    :style="{'height': `${height}px`}"
    :class="className"
  >
    <div
      class="main-page__beach-slider-area-wrapper"
      :class="{ 'no-subtitle' : !text.description }"
    >
      <h3
        v-if="text.title"
        class="main-page__section-title"
      >
        {{ text.title }}
      </h3>
      <div
        class="main-page__section-subtitle-area"
      >
        <span
          v-if="text.description"
          class="main-page__section-subtitle"
        >
          {{ text.description }}
        </span>
        <div
          v-if="showLoader"
          class="img_container"
        >
          <img
            src="~/static/pics/global/svg/logo-blue.svg"
            alt="НашПляж"
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: 500,
    },
    text: {
      type: Object,
      default: () => ({
        text: '',
        description: '',
      }),
    },
    className: {
      type: String,
      default: '',
    },
    showLoader: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style scoped>
.main-page__section-title {
  margin-bottom: 10px;
}
.main-page__beach-slider-area-wrapper.no-subtitle {
  flex-direction: column;
}
.main-page__section-subtitle-area {
  flex-direction: column;
  align-items: center;
}
.main-page__section-subtitle {
  align-self: flex-start;
}
.img_container {
  margin-top: 10%;
}

.img_container img {
  animation: fade 1500ms infinite;
}

@keyframes fade {
    0% { opacity: 1; }
    10% { opacity: 0.7; }
    20% { opacity: 0.6; }
    30% { opacity: 0.4; }
    40% { opacity: 0.3; }
    50% { opacity: 0.2; }
    60% { opacity: 0.3; }
    70% { opacity: 0.4; }
    80% {opacity: 0.6; }
    90% {opacity: 0.7; }
    100% {opacity: 1; }
  }
</style>
