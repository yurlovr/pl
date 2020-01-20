<template>
	<section class="main-page__map">
		<div class="custom-container">
			<h3 class="main-page__section-title">Карта пляжей Крыма</h3>
		</div>
		<GmapMap
				:center="data.center"
				:zoom="9"
				ref="mapRef"
				:options="data.options"
				style="width: 100%; height: 650px">
			<gmap-custom-marker
					v-for="(item, index) in data.markers"
					:marker="item"
					:key="index"
					:clickable="true"
					:draggable="false"
					@click.native="setActiveAddress(item)">
				<div class="overlay-map__marker">
					<span>{{ index }}</span>
				</div>
			</gmap-custom-marker>
		</GmapMap>
	</section>
</template>

<script>
	import GmapCustomMarker from 'vue2-gmap-custom-marker';

	export default {
		props: ['data'],

		components: {
			'gmap-custom-marker': GmapCustomMarker
		},

		methods: {
			setActiveAddress(item) {
				this.$refs.mapRef.panTo(item);
			}
		}
	}
</script>
