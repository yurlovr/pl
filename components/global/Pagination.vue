<template>
  <div v-show="totalElems >= perPage" class="pagination">
    <button
      class="pagination__button-left"
      :disabled="page === 1"
      @click="changePage(page-1)"
    >
      <img
        v-show="page === 1"
        alt="Назад"
        src="~/static/pics/global/svg/pagination_prev_gray.svg"
      >
      <img
        v-show="page > 1"
        alt="Назад"
        src="~/static/pics/global/svg/pagination_prev_orange.svg"
      >
    </button>
    <button
      class="pagination__button"
      :class="{ 'current': page === 1 }"
      :disabled="page === 1"
      @click="changePage(1)"
    >
      <span>1</span>
    </button>
    <button
      v-for="button in buttons"
      :key="button"
      class="pagination__button"
      :class="{ 'three-dots': button === '. . .', 'current': button === page }"
      :disabled="button == '. . .' || button == page"
      @click="changePage(button)"
    >
      <span>{{ button }}</span>
    </button>
    <button
      class="pagination__button"
      :class="{ 'current': page == lastPage }"
      :disabled="page == lastPage"
      @click="changePage(lastPage)"
    >
      <span>{{ lastPage }}</span>
    </button>
    <button
      class="pagination__button-right"
      :disabled="page == lastPage"
      @click="changePage(page+1)"
    >
      <img
        v-show="page == lastPage"
        alt="Вперед"
        src="~/static/pics/global/svg/pagination_next_gray.svg"
      >
      <img
        v-show="page < lastPage"
        alt="Вперед"
        src="~/static/pics/global/svg/pagination_next_orange.svg"
      >
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {

  model: {
    prop: 'page',
    event: 'change',
  },
  props: ['perPage', 'totalElems', 'scrollId'],

  data() {
    return {
      buttons: [], // only consists of the middle numbers and ...
    };
  },

  computed: {
    ...mapGetters('catalog', [
      'getPage',
    ]),
    lastPage() {
      return Math.ceil(this.totalElems / this.perPage);
    },
    page: {
      get() {
        return this.getPage;
      },
      set(val) {
        this.setPage(val);
      },
    },
  },
  watch: {
    totalElems(newVal, oldVal) {
      if ((newVal < oldVal) && (newVal % this.perPage === 0)) {
        this.page -= 1;
        setTimeout(() => this.generatePagination(this.page), 1);
      }
    },
    page(newVal) {
      this.$emit('changePage', newVal);
    },
  },

  mounted() {
    setTimeout(() => this.generatePagination(this.page), 1);
  },

  methods: {
    ...mapActions('catalog', [
      'setPage',
    ]),
    changePage(p) {
      if (p > 0 && p < this.lastPage + 1) {
        this.page = p;
        this.$emit('change', p);
        this.$bus.$emit('pageChanged', p);
        this.generatePagination(p);
        if (this.scrollId) {
          this.$nextTick(() => {
            const offset_top = document.getElementById(this.scrollId).offsetTop;
            window.scrollTo(0, offset_top);
          });
        }
      }
    },

    generatePagination(p) {
      this.buttons = [];
      if (this.lastPage === 2) return;

      if (p === 1) p = 2;
      else if (p === this.lastPage) p = this.lastPage - 1;

      if (p - 2 > 1) this.buttons.push('. . .');
      if (p - 1 > 1) this.buttons.push(p - 1);
      if (p !== 1 && p !== this.lastPage); // Math.ceil(totalElems / perPage) is the last page
      this.buttons.push(p);
      if (p + 1 < this.lastPage) this.buttons.push(p + 1);
      if (p + 2 < this.lastPage) this.buttons.push('. . .');
    },
  },

};
</script>
