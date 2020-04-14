<style scoped>
  iframe {
    width: 100%;
    height: 100%;
  }
</style>
<template>
  <client-only>
    <div class="w-100 h-100 overflow-hidden">
      <div v-show="show"
           class="my-flex justify-content-center align-items-center w-100 h-100 play-back position-absolute"
           v-click-outside="outside">
        <img style="width: 48px; height: 48px" src="~/static/pics/global/pics/play.png" alt="play"
             @click="playVideo"/>
      </div>
      <!-- <iframe ref="playVideo" :src="pic+'?rel=0'" width="100%" height="100%"
               id="vid"
               frameborder="0" allowfullscreen></iframe>-->

      <youtube :video-id="transformUrl(url)" :ref="reference" :fit-parent="true"></youtube>
    </div>
  </client-only>
</template>

<script>
  import {getIdFromUrl} from 'vue-youtube';
  import ClickOutside from 'vue-click-outside'

  export default {
    props: ['url', 'reference'],
    directives: {
      ClickOutside
    },
    data() {
      return {
        show: true
      }
    },
    methods: {
      async playVideo() {
        await this.$refs[this.reference].player.playVideo();
        this.show = false
      },
      transformUrl(s) {
        return getIdFromUrl(s)
      },
      outside() {
        this.$refs[this.reference].player.stopVideo();
        this.show = true;
      }
    }
  }
</script>
