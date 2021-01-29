<template>
  <div v-if="data" class="about-page custom-container custom-page">
    <h1 class="about-page__title custom-page__title">
      {{ data.title }}
    </h1>
    <div class="two-part-layout">
      <main
        class="two-part-layout__left"
        :style="{ 'max-width': data.announcementData.title ? '' : '100%' }"
      >
        <section class="two-part-layout__card" style="width: fit-content;">
          <p
            class="about-page__text"
            v-html="data.text"
          />
        </section>
      </main>
      <aside v-if="data.announcementData.title" class="two-part-layout__right">
        <AnnouncementCard :data="data.announcementData" />
      </aside>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { head } from '~/mixins/head';
import AnnouncementCard from '~/components/global/AnnouncementCard';

export default {
  components: {
    AnnouncementCard,
  },
  mixins: [head],
  async asyncData({ $axios, route }) {
    const { data } = await $axios.$get(`seo/meta?url=${route.fullPath}`);
    return {
      meta: data,
    };
  },

  async fetch({ store, params, redirect }) {
    const res = await store.dispatch('infoPages/getPageData', params.page);
    if (res === 404) redirect('/404');
  },
  computed: {
    ...mapGetters('infoPages', ['data']),
  },
};
</script>
