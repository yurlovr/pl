<template>
  <component
    :is="wrapperTag"
    :class="['v-lazy-component', { loading: !isIntersected, loaded: isIntersected }]"
  >
    <slot v-if="isIntersected" />
    <!-- Content that is loaded as a placeholder until it comes into view -->
    <slot v-if="!isIntersected" name="placeholder" />
  </component>
</template>

<script>
export default {
  props: {
    wrapperTag: {
      type: String,
      default: 'div',
    },
    rootMargin: {
      type: String,
      default: '0px 0px 0px 0px',
    },
    threshold: {
      type: [Number, Array],
      default: 0,
    },
  },
  data() {
    return {
      isIntersected: false,
      observer: null,
    };
  },
  watch: {
    isIntersected(value) {
      if (value) {
        this.$emit('intersected', this.$el);
      }
    },
  },
  mounted() {
    if ('IntersectionObserver' in window) {
      this.observe();
    } else {
      this.isIntersected = true;
    }
  },
  beforeDestroy() {
    this.unobserve();
  },
  methods: {
    observe() {
      const { rootMargin, threshold } = this;
      const config = { root: null, rootMargin, threshold };
      this.observer = new IntersectionObserver(this.onIntersection, config);
      this.observer.observe(this.$el);
    },
    onIntersection(entries) {
      this.isIntersected = entries.some((entry) => entry.intersectionRatio > 0);
      if (this.isIntersected) {
        this.unobserve();
      }
    },
    unobserve() {
      if ('IntersectionObserver' in window) {
        this.observer.unobserve(this.$el);
      }
    },
  },
};
</script>

<style lang="scss">
.v-lazy-component {
  min-width: 1px;
  min-height: 1px;
}
</style>
