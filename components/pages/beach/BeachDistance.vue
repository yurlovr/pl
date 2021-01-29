<template>
  <div
    class="distance-right"
  >
    <p class="m-0">
      Расстояние до пляжа
      <span>
        {{ distance.toString().replace(/\./, ',') }}
        км
      </span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    distance: {
      type: String,
      required: true,
    },
  },
};
</script>
