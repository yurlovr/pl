<template>
  <section
    id="infra"
    class="two-part-layout__card beach-page__quick-data-wrapper"
  >
    <div class="beach-page__quick-data">
      <h2 class="two-part-layout__card__title beach-page__quick-data__title">{{ title }}</h2>
      <div class="beach-page__quick-data__items" :class="{ active: open || data && data.length && data.length <= 4 }">
        <div class="beach-page__quick-data__item" v-for="item in filteredData" @click="callMapAction(item)">
          <img v-lazy-load :data-src="item.pic">
          <span v-html="item.title"></span>
          <div class="beach-page__quick-data__popup">
            <div class="beach-page__quick-data__popup__section">
              <h5 class="beach-page__quick-data__popup__heading">{{item.title}}</h5>
              <h5 class="beach-page__quick-data__popup__heading" v-show="item.time">Время проката</h5>
              <span class="beach-page__quick-data__popup__time" v-show="item.time">{{ item.time }}</span>
              <span class="beach-page__quick-date__popup__comment" v-show="item.description" v-html="item.description"></span>
              <span class="beach-page__quick-date__popup__comment" v-show="item.comment2">{{ item.comment2 }}</span>
            </div>
            <div class="beach-page__quick-data__popup__section" v-show="item.prices">
              <h5 class="beach-page__quick-data__popup__heading">Стоимость, руб/час</h5>
              <div class="beach-page__quick-data__popup__price-wrapper" v-for="price in item.prices">
                <span>{{ price.label }}</span>
                <span>{{ price.cost }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="beach-page__quick-data__accordion-button" @click="open = !open"
              v-if="data && data.length && data.length > 4" :class="{ active: open }">
        <span v-show="open">Свернуть</span>
        <span v-show="!open">Развернуть</span>
        <img src="~/static/pics/global/svg/dropdown.svg">
      </button>
    </div>
  </section>
</template>

<script>
  export default {
    props: ['data', 'title', 'action', 'href'],

    data() {
      return {
        open: false
      }
    },
    computed: {
      filteredData() {
        return this.getUniqueItemsById(this.data);
      }
    },
    methods: {
      getUniqueItemsById(items) {
        const uniqueServiceIdList =  [...(new Set(items.map(item => item.id)))];
        const filteredData = [];
        uniqueServiceIdList.forEach(id => {
          const item = items.find(item => item.id === id);
          filteredData.push(item);
        })
        return filteredData;
      },
      callMapAction(item) {
        if (this.href){
          document.getElementById('parks').scrollIntoView(true);   //Even IE6 supports this
        }
        this.$nextTick(() => {
          const {pos, id} = item;
          if (Array.isArray(pos) && id && this.action) {
            this.$bus.$emit('call-balloon-' + this.action, id, pos)
          }
        })
        // this.$bus.$emit('call-balloon-'+this.action, 1)
      }
    }
  }
</script>
