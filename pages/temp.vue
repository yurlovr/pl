<!-- FOR TESTING -->

<template>
	<section class="temp custom-container">
		<div class="temp__el">
			<MapPopupSlider :data="mapPopupData" />
		</div>
		<div class="temp__el">
			<MapPopupText :data="mapPopupTextData" />
		</div>
		<div class="temp__el">
			<MapBeaches :data="mapBeachesData" />
		</div>
	</section>
</template>

<script>
	import MapPopupSlider from '~/components/global/MapPopupSlider';
	import MapPopupText from '~/components/global/MapPopupText';
	import MapBeaches from '~/components/pages/main-page/MapBeaches';

	export default {
		components: {
			MapPopupSlider,
			MapPopupText,
			MapBeaches
		},

		data() {
			return {
				mapPopupData: {
					pics: [
						'/pics/main/section1_beach1.png',
						'/pics/main/section1_beach1.png',
						'/pics/main/section1_beach1.png',
						'/pics/main/section1_beach1.png'
					],
					position: 'bottom',
					rating: 5.0,
					title: 'Массандровский пляж',
					location: 'алушта, КРЫМ'
				},
				mapPopupTextData: {
					title: 'Парковка Варяг',
					subtitle: 'Автомобильная парковка',
					workTime: 'Круглосуточно',
					address: 'Ул. Факидова, 24',
					price: '60 руб. - 3 часа; 150 руб. - сутки',
					position: 'top'
				},
				mapBeachesData: [
					{
						pic: '/pics/main/section1_beach1.png',
						rating: 5.0,
						favorite: false,
						title: 'Массандровский пляж',
						location: 'алушта, КРЫМ'
					},
					{
						pic: '/pics/main/section1_beach2.png',
						rating: 5.0,
						favorite: false,
						title: 'Пляж «Лазурный берег»',
						location: 'алушта, КРЫМ'
					},
					{
						pic: '/pics/main/section1_beach3.png',
						rating: 4.0,
						favorite: false,
						title: 'Массандровский пляж',
						location: 'алушта, КРЫМ'
					}
				]
			}
		}
	}
</script>