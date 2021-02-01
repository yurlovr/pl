<template>
  <section
    :id="id"
    class="beach-page__events"
    :class="white && 'two-part-layout__card'"
  >
    <div class="main-page__section-subtitle-area beach-page__events__title-area">
      <h3 class="two-part-layout__card__title beach-page__events__title">
        {{ title }}
      </h3>
    </div>
    <div>
      <p class="text">
        {{ description }}
      </p>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    white: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: '',
    },
  },
};
</script>>

<style lang="scss">
@import '../../../assets/scss/variables';

.text {
  color: $grey;
  margin-bottom: 0;
}
</style>
