<template>
  <div class="about-page custom-container custom-page">
    <div class="two-part-layout">
      <main class="two-part-layout__left" :style="{ 'max-width': '100%' }">
        <section class="two-part-layout__card">
          <div class="about-page__title custom-page__title">404 — Данная страница не найдена</div>
          <p class="about-page__text">
            Данная страница не найдена!<br>
            Почему? Возможно, Вы неправильно ввели адрес в адресной строке браузера.<br>
            Что можно сделать? Вы можете посетить другие разделы
          </p>
        </section>
      </main>
      <!-- <aside class="two-part-layout__right">
        <AnnouncementCard :data="$store.state.announcementData" />
      </aside> -->
    </div>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        meta: {}
      }
    },
    head() {
      const stable = 'ПЛЯЖИ.РУ'
      return {
        title: this.meta.title || stable,
        meta: [
          {
            hid: 'description-beach',
            name: 'description',
            content: this.meta.description || stable
          },
          {hid: 'keywords-beach', name: 'keywords', content: this.meta.keywords || stable},
        ]
      }
    },
    async created() {
      await this.$axios.$get('seo/meta?url=' + this.$route.fullPath).then(res => {
        this.meta = res.data
      })
    }
  }
</script>


