<template>
  <section
    class="no-similar main-page__white-wrapper custom-container beach-event__visitor-pics main-page__beach-slider-area"
  >
    <div
      class="main-page__beach-slider-area-wrapper"
    >
      <h3
        class="main-page__section-title"
      >
        {{ PLUG_TITLE.EXCURSIONS_BEACH.title }}
      </h3>
      <div
        class="main-page__section-subtitle-area"
      >
        <div
          class="img_container"
        >
          В настоящее время нет доступных экскурсий.
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { PLUG_TITLE } from '~/const/const';

export default {
  data() {
    return {
      PLUG_TITLE,
    };
  },
};
</script>

<style lang="scss">
.no-similar {
  margin-bottom: 60px;
}
</style>
