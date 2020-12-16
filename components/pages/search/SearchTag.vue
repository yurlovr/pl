<template>
  <div class="search-page__tag">
    <span>
      {{ tag.value.title }}
    </span>
    <button
      class="search-page__tag__remove"
      @click="removeTag()"
    >
      <img
        src="~/static/pics/global/svg/close.svg"
        alt="Убрать"
      >
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    tag: {
      type: Object,
      required: true,
    },
  },

  methods: {
    ...mapActions('search', [
      'updateSearchTags',
    ]),
    removeTag() {
      if (this.tag.type === 'select') {
        // this.$bus.$emit('updateSearchParam', { param: this.tag.param, value: this.tag.default })}
        this.updateSearchTags({
          param: this.tag.param,
          currentValue: this.tag.value,
          value: this.tag.default,
        });
      } else this.$bus.$emit('updateSearchParam', { id: this.tag.id, value: false, type: this.tag.type });
      // this.$bus.$emit('search');
    },
  },
};
</script>
<style lang="scss" scoped>
  .search-page__tag {
    & span::first-letter {
      text-transform: uppercase;
    }
  }
</style>
