<template>
  <div
    v-if="tag && tag !== '/'"
    class="search-page__tag"
  >
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
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    tag: {
      type: [String, Object],
      required: true,
    },
  },
  computed: {
    ...mapGetters('search', [
      'getRenderTags',
    ]),
  },
  methods: {
    ...mapActions('search', [
      'setUpdateSearchTags',
      'setRenderTags',
    ]),
    removeTag() {
      if (this.tag.type === 'select') {
        this.setUpdateSearchTags(this.tag);
      } else {
        this.setUpdateSearchTags({
          ...this.tag,
          value: false,
        });
      }
      this.setRenderTags(this.getRenderTags + 1);
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
