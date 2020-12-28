<template>
  <div class="footer__part">
    <h4>Мы в соцсетях</h4>
    <div class="footer__part__social-links">
      <a
        v-for="link in SOC_LINK"
        :key="link.id"
        class="footer__part__social"
        target="_blank"
        :href="link.link"
      >
        <img
          :src="require(`~/static/pics/global/svg/link_${link.id}.svg`)"
          :alt="link.id"
        >
      </a>
    </div>
  </div>
</template>

<script>
import { SOC_LINK } from '~/const/const';

export default {
  data() {
    return {
      SOC_LINK,
    };
  },
};
</script>

<style lang="scss" scoped>
.footer__part__social:hover {
  filter: invert(1);
}
</style>
