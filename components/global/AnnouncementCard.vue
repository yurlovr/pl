<template>
  <div
    v-if="data"
    class="announcement-card"
  >
    <a
      :href="data.link"
      target="_blank"
    >
      <div class="announcement-card__pic-area">
        <img
          v-lazy-load
          class="announcement-card__pic"
          :data-src="data.pic"
        >
      </div>
      <div
        class="announcement-card__info-area"
        :style="{ background: data.color }"
      >
        <div class="announcement-card__date-area">
          <img
            class="announcement-card__date-icon"
            src="~/static/pics/global/svg/calendar-small.svg"
          >
          <span class="announcement-card__date">
            {{ data.date }}
          </span>
        </div>
        <h3 class="announcement-card__title">
          {{ data.title }}
        </h3>
        <p class="announcement-card__description">
          {{ data.description }}
        </p>
      </div>
    </a>
  </div>
</template>

<script>

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>
