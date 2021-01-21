export const head = {
  async asyncData({ $axios, route }) {
    const { data } = await $axios.$get(`seo/meta?url=${route.path}`);
    return {
      meta: data,
    };
  },

  head() {
    const stable = 'ПЛЯЖИ.РУ';
    return {
      title: this.meta.title || stable,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.meta.description || stable,
        },
        { hid: 'keywords-beach', name: 'keywords', content: this.meta.keywords || stable },
      ],
    };
  },
};
