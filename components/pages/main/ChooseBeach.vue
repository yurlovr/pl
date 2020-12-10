<template>
  <section class="main-page__choose-beach custom-container">
    <h3 class="main-page__section-title">
      Выберите свой пляж
    </h3>
    <div class="main-page__choose-beach__cards">
      <ChooseBeachItem
        v-for="item in TYPE_BEACHES"
        :key="item.id"
        :item="item"
      />
    </div>
  </section>
</template>

<script>
import ChooseBeachItem from './ChooseBeachItem.vue';
import { TYPE_BEACHES } from '~/const/const';

export default {
  components: {
    ChooseBeachItem,
  },
  data() {
    return {
      TYPE_BEACHES,
    };
  },
};
</script>
