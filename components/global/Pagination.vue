<template>
  <div class="pagination" v-show="totalElems > perPage">
    <button class="pagination__button-left" @click="changePage(page-1)" :disabled="page == 1">
      <img  alt="Назад" v-show="page == 1" src="~/static/pics/global/svg/pagination_prev_gray.svg">
      <img  alt="Назад" v-show="page > 1" src="~/static/pics/global/svg/pagination_prev_orange.svg">
    </button>
    <button class="pagination__button" @click="changePage(1)" :class="{ 'current': page == 1 }" :disabled="page == 1">
      <span>1</span>
    </button>
    <button class="pagination__button" v-for="button in buttons" @click="changePage(button)" :class="{ 'three-dots': button == '. . .', 'current': button == page }" :disabled="button == '. . .' || button == page">
      <span>{{ button }}</span>
    </button>
    <button class="pagination__button" @click="changePage(lastPage)" :class="{ 'current': page == lastPage }" :disabled="page == lastPage">
      <span>{{ lastPage }}</span>
    </button>
    <button class="pagination__button-right" @click="changePage(page+1)" :disabled="page == lastPage">
      <img  alt="Вперед" v-show="page == lastPage" src="~/static/pics/global/svg/pagination_next_gray.svg">
      <img  alt="Вперед" v-show="page < lastPage" src="~/static/pics/global/svg/pagination_next_orange.svg">
    </button>
  </div>
</template>

<script>
export default {
  props: [ 'perPage', 'totalElems', 'scrollId' ],

  model: {
    prop: 'page',
    event: 'change'
  },

  data() {
    return {
      page: 1,
      buttons: [] // only consists of the middle numbers and ...
    }
  },

  mounted() {
    setTimeout(() => this.generatePagination(this.page), 1);
  },

  computed: {
    lastPage() {
      return Math.ceil(this.totalElems / this.perPage);
    }
  },

  methods: {
    changePage(p) {
      if (p > 0 && p < this.lastPage + 1) {
        this.page = p;
        this.$emit('change', p);
        this.$bus.$emit('pageChanged', p)
        this.generatePagination(p);
        if (this.scrollId){
          this.$nextTick(()=>{
            let offset_top = document.getElementById(this.scrollId).offsetTop
            window.scrollTo(0, offset_top);
          })
        }
      }
    },

    generatePagination(p) {
      this.buttons = [];
      if (this.lastPage == 2) return;

      if (p == 1) p = 2;
      else if (p == this.lastPage) p = this.lastPage - 1;

      if (p - 2 > 1)
        this.buttons.push('. . .');
      if (p - 1 > 1)
        this.buttons.push(p - 1);
      if (p != 1 && p != this.lastPage); // Math.ceil(totalElems / perPage) is the last page
        this.buttons.push(p);
      if (p + 1 < this.lastPage)
        this.buttons.push(p + 1);
      if (p + 2 < this.lastPage)
        this.buttons.push('. . .');
    }
  },
  watch: {
    totalElems(newVal, oldVal) {
      if((newVal < oldVal) && (newVal % this.perPage === 0) ) {
        this.page -= 1;
        setTimeout(() => this.generatePagination(this.page), 1);
      }
    },
    page(newVal) {
      this.$emit('changePage', newVal)
    }
  }

}
</script>
