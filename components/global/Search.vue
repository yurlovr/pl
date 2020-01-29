<template>
	<div  class="search" :class="{ hidden: (mobileView && !mobileSearchBarShown && !tempMobileSearchBarShown), 'dark-bg': paramsShown && !labelId }">
		<div class="search__bar">
			<button class="search__bar__left-search" v-show="searchInput.length > 0">
				<img src="~/static/pics/global/svg/search.svg" alt="Поиск">
			</button>
			<input class="search__bar__input" placeholder="Искать пляж" v-model="searchInput">
			<a href="/search" class="search__bar__right-search" @click.prevent="$bus.goTo('/search', $router)">
				<img src="~/static/pics/global/svg/search.svg" alt="Поиск" v-show="searchInput.length == 0">
			</a>
			<button class="search__bar__right-cross" v-show="searchInput.length > 0" @click="searchInput = ''">
				<img src="~/static/pics/global/svg/close.svg" alt="Убрать">
			</button>
			<div class="search__params" style="height: 0;" v-body-scroll-lock="paramsShown && mobileView" :class="{ 'not-main' : labelId }">
				<div class="search__params__inner">
					<button class="search__params__close" @click="toggleParams()">
						<img src="~/static/pics/global/svg/close_blue.svg" alt="Закрыть">
					</button>
					<form class="search__params__form" v-on:submit.prevent>
						<h3 class="search__params__title search__params__title--first">Параметры поиска</h3>
						<div class="search__params__part__dropdowns-area">
							<div class="search__params__part__dropdowns-row">
								<div class="search__params__part__dropdowns">
									<div class="search__params__part--dropdown search__params__part--dropdown--wider">
										<select name="city" v-model="params.searchCity" :class="{ default : params.searchCity == 'Любой город' }">
											<option selected="selected" class="default">Любой город</option>
											<option v-for="val in cityValues" :value="val">{{ val }}</option>
										</select>
									</div>
									<div class="search__params__part--dropdown">
										<select name="beach-type" v-model="params.searchBeachType" :class="{ default : params.searchBeachType == 'Тип пляжа' }">
											<option selected="selected" class="default">Тип пляжа</option>
											<option v-for="val in beachTypeValues" :value="val">{{ val }}</option>
										</select>
									</div>
								</div>
								<div class="search__params__part__dropdowns">
									<div class="search__params__part--dropdown search__params__part--dropdown--wider">
										<select name="work-schedule" v-model="params.searchWorkSchedule" :class="{ default : params.searchWorkSchedule == 'Режим работы' }">
											<option selected="selected" class="default">Режим работы</option>
											<option v-for="val in workSchedule" :value="val">{{ val }}</option>
										</select>
									</div>
									<div class="search__params__part--dropdown">
										<select name="price" v-model="params.searchPrice" :class="{ default : params.searchPrice == 'Стоимость' }">
											<option selected="selected" class="default">Стоимость</option>
											<option>Платно</option>
											<option>Бесплатно</option>
										</select>
									</div>
								</div>
							</div>
							<div class="search__params__part__dropdowns-row">
								<div class="search__params__part__dropdowns" :class="{ equal : searchMobileText && !labelId || showCorrectSelectText }">
									<span class="search__params__part__label" v-show="searchMobileText && !labelId || showCorrectSelectText">Протяженность линии, метров</span>
									<div class="search__params__part--dropdown search__params__part--dropdown--merged">
										<select name="beach-length-from" v-model="params.searchBeachLengthFrom" :class="{ default : params.searchBeachLengthFrom == 'От' || params.searchBeachLengthFrom == 'Протяженность линии от, м' }">
											<option selected="selected" class="default">{{ searchMobileText && !labelId || showCorrectSelectText ?  'От' : 'Протяженность линии от, м' }}</option>
											<option v-for="val in beachLengthFromValues" :value="val">{{ val }}</option>
										</select>
										<select name="beach-length-to" v-model="params.searchBeachLengthTo" :class="{ default : params.searchBeachLengthTo == 'До' }">
											<option selected="selected" class="default">До</option>
											<option v-for="val in beachLengthToValues" :value="val">{{ val }}</option>
										</select>
									</div>
								</div>
								<div class="search__params__part__dropdowns" :class="{ equal : searchMobileText && !labelId || showCorrectSelectText }">
									<span class="search__params__part__label" v-show="searchMobileText && !labelId || showCorrectSelectText">Температура воды от, &deg;C</span>
									<div class="search__params__part--dropdown search__params__part--dropdown--merged">
										<select name="water-temperature-from" v-model="params.searchWaterTempFrom" :class="{ default : params.searchWaterTempFrom == 'От' || params.searchWaterTempFrom == 'Температура воды от, °C' }">
											<option selected="selected" class="default">
												{{ searchMobileText && !labelId || showCorrectSelectText ? 'От' : 'Температура воды от, &deg;C' }}
											</option>
											<option v-for="val in waterTemperatureFromValues" :value="val">{{ val }}</option>
										</select>
										<select name="water-temperature-to" v-model="params.searchWaterTempTo" :class="{ default : params.searchWaterTempTo == 'До' }">
											<option selected="selected" class="default">До</option>
											<option v-for="val in waterTemperatureToValues" :value="val">{{ val }}</option>
										</select>
									</div>
								</div>
							</div>
						</div>
						<div class="search__params__part__checkboxes search__params__part__checkboxes--first">
							<div class="search__params__part--checkbox">
								<input type="checkbox" :id="'search-city' + labelId" value="search-city">
								<label :for="'search-city' + labelId">Городские</label>
							</div>
							<div class="search__params__part--checkbox">
								<input type="checkbox" :id="'search-popular-beaches' + labelId">
								<label :for="'search-popular-beaches' + labelId">Популярные пляжи</label>
							</div>
							<div class="search__params__part--checkbox">
								<input type="checkbox" :id="'search-active-rest' + labelId">
								<label :for="'search-active-rest' + labelId">Активный отдых</label>
							</div>
							<div class="search__params__part--checkbox">
								<input type="checkbox" :id="'search-wild' + labelId">
								<label :for="'search-wild' + labelId">Дикие</label>
							</div>
							<div class="search__params__part--checkbox">
								<input type="checkbox" :id="'search-family-rest' + labelId">
								<label :for="'search-family-rest' + labelId">Отдых для всей семьи</label>
							</div>
							<div class="search__params__part--checkbox">
								<input type="checkbox" :id="'search-events' + labelId">
								<label :for="'search-events' + labelId">Мероприятия</label>
							</div>
						</div>
						<div class="search__params__title-area" @click="toggleAddParams()">
							<h3 class="search__params__title">Дополнительные параметры</h3>
							<img src="~/static/pics/global/svg/dropdown.svg" :class="{ active : addParamsHeight == 0 }">
						</div>
						<div class="search__params__part__checkboxes search__params__part__checkboxes--second" :style="{ height: addParamsHeight }">
							<div class="search__params__part--checkbox">
								<input type="checkbox" :id="'search-public-transport' + labelId">
								<label :for="'search-public-transport' + labelId">Остановка общественного<br>транспорта</label>
							</div>
							<div class="search__params__part--checkbox">
								<input type="checkbox" :id="'search-active-rest-inventory' + labelId">
								<label :for="'search-active-rest-inventory' + labelId">Инвентарь для активного<br>отдыха</label>
							</div>
							<div class="search__params__part--checkbox">
								<input type="checkbox" :id="'search-medical-help' + labelId">
								<label :for="'search-medical-help' + labelId">Пункт медицинской<br>помощи</label>
							</div>
							<div class="search__params__part--checkbox">
								<input type="checkbox" :id="'search-bars' + labelId" name="search-bars" value="search-bars">
								<label :for="'search-bars' + labelId">Бары, рестораны</label>
							</div>
							<div class="search__params__part--checkbox">
								<input type="checkbox" :id="'search-showers' + labelId">
								<label :for="'search-showers' + labelId">Душевые кабины</label>
							</div>
							<div class="search__params__part--checkbox">
								<input type="checkbox" :id="'search-rescue-station' + labelId">
								<label :for="'search-rescue-station' + labelId">Спасательный пункт</label>
							</div>
							<div class="search__params__part--checkbox">
								<input type="checkbox" :id="'search-parking' + labelId">
								<label :for="'search-parking' + labelId">Парковка</label>
							</div>
							<div class="search__params__part--checkbox">
								<input type="checkbox" :id="'search-swimming-inventory' + labelId">
								<label :for="'search-swimming-inventory' + labelId">Инвентарь для плавания</label>
							</div>
							<div class="search__params__part--checkbox">
								<input type="checkbox" :id="'search-water-purity' + labelId">
								<label :for="'search-water-purity' + labelId">Чистота воды</label>
							</div>
							<div class="search__params__part--checkbox">
								<input type="checkbox" :id="'search-security' + labelId">
								<label :for="'search-security' + labelId">Безопаснось</label>
							</div>
						</div>
						<div class="search__params__apply-area">
							<a href="/search" @click.prevent="$bus.goTo('/search', $router)" class="search__params__apply"><span>Применить</span></a>
							<div class="search__params__apply-area__blank"></div>
						</div>
					</form>
				</div>
			</div>
		</div>
		<button class="search__options" @click="toggleParams()">
			<img src="~/static/pics/global/svg/filter.svg" alt="Поиск" v-show="!paramsShown">
			<img src="~/static/pics/global/svg/close_blue.svg" alt="Закрыть" v-show="paramsShown">
		</button>
	</div>
</template>

<script>

	export default {
		// if labelId is given, it means that it's not the slider in the header
		// differentiates IDs for parameters
		props: ['labelId'],

		data() {
			return {
				// in the params change От to Протяженность линии от or Температура воды от
				searchMobileText: false,
				// sometimes it is not needed to show the mobile text even its corrected for a small width
				showCorrectSelectText: false,

				// are parameters shown?
				paramsShown: false,
				// mobile search bar vars (<= 650px) and temp for it
				mobileSearchBarShown: false,
				tempMobileSearchBarShown: false,

				// mobileView starts from 650px and less
				mobileView: false,

				// all parameters v-model here
				params: {
					searchCity: 'Любой город',
					searchBeachType: 'Тип пляжа',
					searchWorkSchedule: 'Режим работы',
					searchPrice: 'Стоимость',
					searchBeachLengthFrom: 'Протяженность линии от, м',
					searchBeachLengthTo: 'До',
					searchWaterTempFrom: 'Температура воды от, °C',
					searchWaterTempTo: 'До'
				},
				searchInput: "",
				addParamsHeight: 0,

				cityValues: [
					'Алушта',
					'Камчатка',
					'Москва',
					'Лондон',
					'Париж',
					'Непариж'
				],
				beachTypeValues: [
					'Песчаный',
					'Ракушечный',
					'Каменный',
					'Паркетный',
					'Нормальный'
				],
				workSchedule: [
					'9-6',
					'Когда не работаю',
					'Когда солнечно',
					'Когда закат',
					'Не могу решиться'
				],
				beachLengthFromValues: [
					'0',
					'1000',
					'2000'
				],
				beachLengthToValues: [
					'0',
					'1000',
					'2000'
				],
				waterTemperatureFromValues: [
					'10',
					'20',
					'30'
				],
				waterTemperatureToValues: [
					'10',
					'20',
					'30'
				]
			};
		},

		mounted() {
			window.addEventListener('resize', this.onResize);
			this.onResize();

			this.$bus.$on('showCorrectSelectText', () => {
				this.showCorrectSelectText = true;
			});

			this.$bus.$on('dontShowCorrectSelectText', () => {
				this.showCorrectSelectText = false;
			});

			this.$bus.$on('showBgAndBar', () => {
				this.showBgAndBar = true;
			});

			this.$bus.$on('hideBgAndBar', () => {
				this.showBgAndBar = false;
			});

			this.$bus.$on('tempShowMobileSearchBar', () => { // !thisl.labelId means it's the header's search
				if (!this.labelId) {
					this.tempMobileSearchBarShown = true;
				}
			});

			this.$bus.$on('tempHideMobileSearchBar', () => { // !thisl.labelId means it's the header's search
				if (!this.labelId) {
					this.tempMobileSearchBarShown = false;
				}
			});

			// for screens <= 650, the main search will have different design for its bar, so, to show it, another button is clicked
			// and it is caught here
			this.$bus.$on('toggleMobileSearchBar', () => {
				if (this.mobileSearchBarShown)
					this.mobileSearchBarShown = false;
				else this.mobileSearchBarShown = true;
			});

			// when requested to open the header search from elsewhere, this gets called
			// it shows the header and opens the parameters automatically
			// when the params are closed, the script makes sure to hide the header (tempShowHeader = false)
			// (temp because the header itself checks if it should be shown at all depending on the scroll)
			// and hides the search-bar if it was not shown (tempShowSearch = false)
			this.$bus.$on('showParams', () => {
				// only the search in the header can be opened using this event (it has no labelId)
				if (!this.labelId) {
					this.showParams();
				}
			});

			this.$bus.$on('hideParams', () => {
				this.hideParams();
			});
		},

		methods: {
			showParams() {
				// check, if not the main search (the search in the header) (has labelId), then
				// if the screen size is less than 450px, then open the one in the header by calling an event (temporary)
				if (this.labelId && window.innerWidth <= 450) {
					document.documentElement.style.overflow = 'hidden';
					document.addEventListener('touchmove', function(e) { e.preventDefault() }, false);
					this.$el.querySelector('.search__params').addEventListener('touchmove', function(e) { e.stopPropagation() }, false);
					this.$bus.$emit('tempShowHeaderBgAndBar');
					this.$bus.$emit('tempShowMobileSearchBar');
					setTimeout(() => { this.$bus.$emit('showParams') }, 1);
					return;
				}

				this.paramsShown = true;
				this.$el.querySelector('.search__params').style.height = this.$el.querySelector('.search__params').scrollHeight + 'px';
				this.$el.querySelector('.search__params').style.overflow = 'hidden';
				setTimeout(() => {
					if (this.paramsShown)
						this.$el.querySelector('.search__params').style.overflow = '';
				}, 1001);
			},

			hideParams() {
				this.paramsShown = false;
				this.$el.querySelector('.search__params').style.height = 0;
				this.$el.querySelector('.search__params').style.overflow = 'hidden';
				// setTimeout(() => {
				// 	if (this.paramsShown)
				// 		this.$el.querySelector('.search__params').style.overflow = '';
				// }, 1001);
			},

			toggleAddParams() {
				this.showAddParams = !this.showAddParams;

				if (this.showAddParams) {
					this.addParamsHeight = this.$el.querySelector('.search__params__part__checkboxes--second').scrollHeight + 'px';

					if (window.innerWidth > 450/* && this.labelId */) {
						this.$el.querySelector('.search__params').style.height = '';
						setTimeout(() => {
							if (this.showAddParams)
								this.$el.querySelector('.search__params').style.height = this.$el.querySelector('.search__params').scrollHeight + 'px';
						}, 201);
					}
				} else {
					this.addParamsHeight = 0;

					if (window.innerWidth > 450/* && this.labelId */) {
						this.$el.querySelector('.search__params').style.height = '';
						setTimeout(() => {
							if (!this.showAddParams)
								this.$el.querySelector('.search__params').style.height = this.$el.querySelector('.search__params').scrollHeight + 'px';
						}, 201);
					}
				}
			},

			toggleParams() {
				if (this.tempMobileSearchBarShown) {
					this.tempMobileSearchBarShown = false;
					this.$bus.$emit('tempHideHeaderBgAndBar');
					document.documentElement.style.overflow = '';
				}

				if (this.paramsShown)
					this.hideParams();
				else this.showParams();
			},

			onResize() {
				// if it's not the main slider and its params are open, and the screen size gets lower than 450, then close its own params
				if (window.innerWidth <= 450 && this.labelId && this.paramsShown){
					setTimeout(() => {
						this.toggleParams();
					}, 2);
				}

				// recalculate the height for the params if they are open
				if (this.paramsShown) {
					this.$el.querySelector('.search__params').style.height = 0;
					setTimeout(() => {
						this.$el.querySelector('.search__params').style.height = this.$el.querySelector('.search__params').scrollHeight + 'px';
					}, 1);
				}

				// turn on mobile view for width lower than 650 ONLY for the header search
				if (window.innerWidth <= 650 && !this.labelId) {
					this.mobileView = true;
				} else {
					this.mobileView = false;
				}

				// show mobile texts of parameters for width less than 800px (still if showCorrectSelectText is off, then it won't be shown)
				if (window.innerWidth <= 800) {
					this.searchMobileText = true;
				} else {
					this.searchMobileText = false;
				}

				// correcting the params values if they area set to default for different screen width
				if (this.searchMobileText && !this.labelId || this.showCorrectSelectText) {
					if (this.params.searchBeachLengthFrom == 'Протяженность линии от, м')
						this.params.searchBeachLengthFrom = 'От';
					if (this.params.searchWaterTempFrom == 'Температура воды от, °C')
						this.params.searchWaterTempFrom = 'От';
				} else {
					if (this.params.searchBeachLengthFrom == 'От')
						this.params.searchBeachLengthFrom = 'Протяженность линии от, м';
					if (this.params.searchWaterTempFrom == 'От')
						this.params.searchWaterTempFrom = 'Температура воды от, °C';
				}
			}
		}
	}
</script>
