<template>
  <footer class="footer custom-container">
    <div class="footer__top">
      <div class="footer__right">
        <a href="/" @click.prevent="$bus.goTo('/', $router)">
          <img src="~/static/pics/global/svg/logo-blue.svg" alt="НашПляж" class="footer__logo">
        </a>
      </div>
      <div class="footer__left">
        <div class="footer__part">
          <h4>О проекте</h4>
          <a href="/about" @click.prevent="$bus.goTo('/about', $router)">О нас</a>
          <a href="/media" @click.prevent="$bus.goTo('/media', $router)">СМИ</a>
        </div>
        <div class="footer__part">
          <h4>Партнерство</h4>
          <a href="/beach-catalog" @click.prevent="$bus.goTo('/beach-catalog', $router)">Каталог пляжей</a>
          <a href="/event-catalog" @click.prevent="$bus.goTo('/event-catalog', $router)">Каталог мероприятий</a>
          <a href="/partner-info" @click.prevent="$bus.goTo('/partner-info', $router)">Информация для партнеров</a>
        </div>
        <div class="footer__part">
          <h4>Правила и условия</h4>
          <a href="/contacts" @click.prevent="$bus.goTo('/contacts', $router)">Контакты</a>
        </div>
        <div class="footer__part">
          <h4>Мы в соцсетях</h4>
          <div class="footer__part__social-links">
            <a v-for="(link, key) in social_links" :key="'footer-social'+key" class="footer__part__social" target="_blank" :href="link.VALUE">
              <img :src="require(`~/static/pics/global/svg/${link.CODE}.svg`)" :alt="link.CODE">
            </a>
            <!--<a class="footer__part__social" href="https://odnoklassniki.ru">
              <img src="~/static/pics/global/svg/link_ok.svg" alt="Odnoklassniki">
            </a>
            <a class="footer__part__social" href="https://vk.com">
              <img src="~/static/pics/global/svg/link_vk.svg" alt="VK">
            </a>
            <a class="footer__part__social" href="https://instagram.com">
              <img src="~/static/pics/global/svg/link_instagram.svg" alt="Instagram">
            </a>-->
          </div>
        </div>
      </div>
    </div>
    <div class="footer__line"></div>
    <div class="footer__bottom">
      <div class="footer__right">
        <span class="footer__bottom__text">© «пляжи.ру»</span>
      </div>
      <div class="footer__left">
        <div class="footer__part">
          <a href="/confidentiality" @click.prevent="$bus.goTo('/confidentiality', $router)"
             class="footer__bottom__link footer__bottom__text">Конфиденциальность</a>
        </div>
        <div class="footer__part">
          <a href="/license" @click.prevent="$bus.goTo('/license', $router)"
             class="footer__bottom__link footer__bottom__text">Лицензионное соглашение</a>
        </div>
        <div class="footer__part">
          <a href="/agreement" @click.prevent="$bus.goTo('/agreement', $router)"
             class="footer__bottom__link footer__bottom__text">Соглашение об оказании услуг</a>
        </div>
        <div class="footer__part">
          <a href="/rules" @click.prevent="$bus.goTo('/rules', $router)"
             class="footer__bottom__link footer__bottom__text">Правила пользования сайтом</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      social_links: []
    }
  },
   created() {
    this.$axios.$get('settings/list').then(res => {
      this.social_links = res.data.list.filter(_ =>!_.CODE.includes('mobile'));
    })
  }
}
</script>
