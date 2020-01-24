// register globally
import Vue from 'vue';
import YmapPlugin from 'vue-yandex-maps'

const options = { // you may define your apiKey, lang and version or skip this.
    apiKey: '6a195d57-dcaa-4b51-9aa7-5052e3ce2318', // '' by default
    lang: 'ru_RU', // 'ru_RU' by default
    version: '2.1' // '2.1' by default
};

Vue.use(YmapPlugin, options);

