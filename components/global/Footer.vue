<template>
  <footer class="footer custom-container">
    <div class="footer__top">
      <div class="footer__right">
        <nuxt-link :to="'/'">
          <img
            src="~/static/pics/global/svg/logo-blue.svg"
            alt="НашПляж"
            class="footer__logo"
          >
        </nuxt-link>
      </div>
      <div class="footer__left">
        <div class="footer__part">
          <h4>О проекте</h4>
          <nuxt-link :to="'/about'">
            О нас
          </nuxt-link>
          <nuxt-link :to="'/media'">
            СМИ
          </nuxt-link>
        </div>
        <div class="footer__part">
          <h4>Партнерство</h4>
          <nuxt-link :to="{ path: '/beach-catalog', query: { page: 1, count: 20 } }">
            Каталог пляжей
          </nuxt-link>
          <nuxt-link :to="{ path: '/event-catalog', query: { page: 1, count: 2 } }">
            Каталог мероприятий
          </nuxt-link>
          <nuxt-link :to="'/partner-info'">
            Информация для партнеров
          </nuxt-link>
        </div>
        <div class="footer__part">
          <h4>Правила и условия</h4>
          <nuxt-link :to="'/contacts'">
            Контакты
          </nuxt-link>
        </div>
        <!-- <div class="footer__part">
          <h4>Мы в соцсетях</h4>
          <div class="footer__part__social-links">
            <a v-for="(link, key) in social_links" :key="'footer-social'+key" class="footer__part__social" target="_blank" :href="link.VALUE">
              <img :src="require(`~/static/pics/global/svg/${link.CODE}.svg`)" :alt="link.CODE">
            </a>
            <a class="footer__part__social" href="https://odnoklassniki.ru">
              <img src="~/static/pics/global/svg/link_ok.svg" alt="Odnoklassniki">
            </a>
            <a class="footer__part__social" href="https://vk.com">
              <img src="~/static/pics/global/svg/link_vk.svg" alt="VK">
            </a>
            <a class="footer__part__social" href="https://instagram.com">
              <img src="~/static/pics/global/svg/link_instagram.svg" alt="Instagram">
            </a>
          </div>
        </div> -->
      </div>
    </div>
    <div class="footer__line" />
    <div class="footer__bottom">
      <div class="footer__right">
        <span class="footer__bottom__text">© «пляжи.ру»</span>
      </div>
      <div class="footer__left">
        <div class="footer__part">
          <nuxt-link
            class="footer__bottom__link footer__bottom__text"
            :to="'/confidentiality'"
          >
            Конфиденциальность
          </nuxt-link>
        </div>
        <div class="footer__part">
          <nuxt-link
            class="footer__bottom__link footer__bottom__text"
            :to="'/license'"
          >
            Лицензионное соглашение
          </nuxt-link>
        </div>
        <div class="footer__part">
          <nuxt-link
            class="footer__bottom__link footer__bottom__text"
            :to="'/agreement'"
          >
            Соглашение об оказании услуг
          </nuxt-link>
        </div>
        <div class="footer__part">
          <nuxt-link
            class="footer__bottom__link footer__bottom__text"
            :to="'/rules'"
          >
            Правила пользования сайтом
          </nuxt-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      social_links: [],
    };
  },
  created() {
    this.$axios.$get('settings/list').then(res => {
      this.social_links = res.data.list.filter(_ =>!_.CODE.includes('mobile'));
    });
  },
};
</script>
