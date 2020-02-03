<template>
  <div class="pagination">
    <div class="inner">
      <template v-if="showPrev">
        <nuxt-link v-if="prev" :to="routeToPage(prev)" class="page previous">
          <img src="~/static/pics/global/svg/arrow_prev_orange.svg">
        </nuxt-link>
        <span v-else class="page previous disabled">
          <img src="~/static/pics/global/svg/arrow_prev_gray.svg">
        </span>
      </template>
      <template v-for="it in prevPages">
        <nuxt-link v-if="it !== -1" :key="it" :to="routeToPage(it)" class="page">{{ it }}</nuxt-link>
        <span v-else :key="it" class="page more">...</span>
      </template>
      <span class="page current">{{ page }}</span>
      <template v-for="it in nextPages">
        <nuxt-link v-if="it !== -1" :key="it" :to="routeToPage(it)" class="page">{{ it }}</nuxt-link>
        <span v-else :key="it" class="page more">...</span>
      </template>
      <template v-if="showNext">
        <nuxt-link v-if="next" :to="routeToPage(next)" class="page next">
          <img src="~/static/pics/global/svg/arrow_next.svg">
        </nuxt-link>
        <span v-else class="page next disabled">
          <img src="~/static/pics/global/svg/arrow_next_gray.svg">
        </span>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      page: {
        type: Number,
        required: true
      },
      size: {
        type: Number,
        required: true
      },
      totalElements: {
        type: Number,
        required: true
      },
      PAGE_SIZE_DEFAULT: {
        type: Number,
        default: 10
      },
      PAGE_SIZE_MAX: {
        type: Number,
        default: 100
      },
      PAGE_NUMBER_MAX: {
        type: Number,
        default: 100
      },
      pageParamName: {
        type: String,
        default: 'page'
      },
      sizeParamName: {
        type: String,
        default: 'size'
      },
      maxPagesToList: {
        type: Number,
        default: 9
      },
      showPrev: {
        type: Boolean,
        default: true
      },
      showNext: {
        type: Boolean,
        default: true
      },
      pageSizeOptions: {
        type: Array | null,
        default: null
      }
    },

    computed: {
      prevPages() {
        const pages = []
        let it = this.pageSafe
        let iterations = this.maxPagesToList - 1 - Math.min(Math.floor(this.maxPagesToList / 2), this.noOfPagesAfter) - (this.showMorePrev ? 2 : 0)
        while (iterations > 0 && it !== null) {
          it = this.prevPage(it)
          if (it !== null) {
            pages.unshift(it)
          }
          iterations--
        }
        if (this.showMorePrev) {
          pages.unshift(-1)
          pages.unshift(1)
        }
        return pages
      },

      nextPages() {
        const pages = []
        let it = this.pageSafe
        let iterations = this.maxPagesToList - 1 - Math.min(Math.floor(this.maxPagesToList / 2), this.noOfPagesBefore) - (this.showMoreNext ? 2 : 0)
        while (iterations > 0 && it !== null) {
          it = this.nextPage(it)
          if (it !== null) {
            pages.push(it)
          }
          iterations--
        }
        if (this.showMoreNext) {
          pages.push(-1)
          pages.push(this.lastPage)
        }
        return pages
      },

      prev() {
        return this.prevPage(this.pageSafe)
      },

      next() {
        return this.nextPage(this.pageSafe)
      },

      sizeSafe() {
        return Math.max(1, Math.min(this.size, this.PAGE_SIZE_MAX))
      },

      pageSafe() {
        return Math.max(1, Math.min(this.page, this.PAGE_NUMBER_MAX))
      },

      totalElementsSafe() {
        return Math.max(0, this.totalElements)
      },

      lastPage() {
        return Math.min(Math.ceil(this.totalElementsSafe / this.sizeSafe), this.PAGE_NUMBER_MAX)
      },

      noOfPagesBefore() {
        return this.pageSafe - 1
      },

      noOfPagesAfter() {
        return this.lastPage - this.pageSafe
      },

      showMorePrev() {
        return this.maxPagesToList - Math.min(Math.floor(this.maxPagesToList / 2), this.noOfPagesAfter) <= this.noOfPagesBefore
      },

      showMoreNext() {
        return this.maxPagesToList - Math.min(Math.floor(this.maxPagesToList / 2), this.noOfPagesBefore) <= this.noOfPagesAfter
      }
    },

    methods: {
      prevPage (it) {
        const prev = it - 1
        return prev >= 1 ? prev : null
      },

      nextPage (it) {
        const next = it + 1
        if (next <= this.PAGE_NUMBER_MAX && it * this.sizeSafe < this.totalElementsSafe) {
          return next
        }
        return null
      },

      routeToPage(page) {
        console.debug('routeToPage', page)
        const query = {
          ...this.$route.query
        }
        if (page <= 1) {
          delete query[this.pageParamName]
        } else {
          query[this.pageParamName] = page
        }
        console.debug('query', query)
        return { query: query }
      }
    }
  }
</script>

<style lang="stylus" scoped>

  .pagination
    text-align center

    .inner
      margin auto 0
      display flex
      align-items center

      a:focus, a:hover
        opacity: .7
        text-decoration: none

  .page
    -webkit-user-select: none
    border: none
    color: #73767D
    cursor: pointer
    float: left
    font-style: normal
    font-weight: 600
    margin-left: -1px
    padding: 7px 12px
    position: relative
    user-select: none
    vertical-align: middle
    white-space: nowrap
    display flex
    align-items center
    font-size: 16px;
    line-height: 130%;
    

  .page.previous
    margin-left: 0

  .page.next
    margin-right: 0

  .page.current
    color: #151B20
    cursor: default

  .page.disabled, .page.more
    color: #d1d5da
    cursor: default

  a
    text-decoration none

</style>
