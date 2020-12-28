<style lang="scss">
  .youtube-slider, .modality {
    iframe {
      width: 100%;
      height: 100%;
    }
  }

  @media (max-width: 600px) {
    .modality {
      iframe {
        height: 300px;
      }
    }
  }
  @media (max-width: 500px) {
    .modality {
      iframe {
        height: 225px;
      }
    }
  }
</style>
<template>
  <client-only>
    <div class="w-100 h-100 overflow-hidden" :class="{modality: modal, 'youtube-slider': !modal}">
      <button @click.stop="playVideo" :id="reference" class="d-none">emit play</button>
      <youtube :video-id="transformUrl(url)" :ref="reference" :fit-parent="true" v-click-outside="outside"></youtube>
    </div>
  </client-only>
</template>

<script>
  import {getIdFromUrl} from 'vue-youtube';
  import ClickOutside from 'vue-click-outside'

  export default {
    props: ['url', 'reference', 'modal'],
    directives: {
      ClickOutside
    },
    methods: {
      playVideo() {
        this.$nextTick(() => {
          // console.log('herer', this.$refs[this.reference].player)
          this.$refs[this.reference].player.playVideo();
        })
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
