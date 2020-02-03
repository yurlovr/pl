<template>
	<section class="main-page__cities custom-container">
		<h3 class="main-page__section-title">Курортные города Крыма</h3>
		<SliderCities :data="data" />
	</section>
</template>

<script>
  import SliderCities from '~/components/pages/main/sliders/SliderCities';

  export default {
  	props: ['data'],

    components: {
      SliderCities
    }
  }
</script>
