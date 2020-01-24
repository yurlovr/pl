<template>
	<!--  :class="{ active : paramsShown }" -->
	<div  class="search" :class="{ hidden: (mobileView && !mobileSearchBarShown && !tempMobileSearchBarShown), 'dark-bg': paramsShown }">
		<div class="search__bar">
			<button class="search__bar__left-search" v-show="searchInput.length > 0">
				<img src="~/static/pics/global/svg/search.svg" alt="Поиск">
			</button>
			<input class="search__bar__input" placeholder="Искать пляж" v-model="searchInput">
			<img class="search__bar__right-search" src="~/static/pics/global/svg/search.svg" alt="Поиск" v-show="searchInput.length == 0">
			<button class="search__bar__right-cross" v-show="searchInput.length > 0" @click="searchInput = ''">
				<img src="~/static/pics/global/svg/close.svg" alt="Убрать">
			</button>
			<div class="search__params" style="height: 0;" v-body-scroll-lock="paramsShown">
				<div class="search__params__inner">
					<button class="search__params__close" @click="toggleParams()">
						<img src="~/static/pics/global/svg/close_blue.svg" alt="Закрыть">
					</button>
					<form class="search__params__form">
						<h3 class="search__params__title">Параметры поиска</h3>
						<div class="search__params__part__dropdowns-area">
							<div class="search__params__part__dropdowns-row">
								<div class="search__params__part__dropdowns">
									<div class="search__params__part--dropdown search__params__part--dropdown--wider">
										<select name="city" value="Любой город">
											<option selected="selected">Любой город</option>
										</select>
									</div>
									<div class="search__params__part--dropdown">
										<select name="beach-type" value="Тип пляжа">
											<option selected="selected">Тип пляжа</option>
										</select>
									</div>
								</div>
								<div class="search__params__part__dropdowns">
									<div class="search__params__part--dropdown search__params__part--dropdown--wider">
										<select name="work-schedule" value="Режим работы">
											<option selected="selected">Режим работы</option>
										</select>
									</div>
									<div class="search__params__part--dropdown">
										<select name="price" value="Стоимость">
											<option selected="selected">Стоимость</option>
										</select>
									</div>
								</div>
							</div>
							<div class="search__params__part__dropdowns-row">
								<div class="search__params__part__dropdowns">
									<span class="search__params__part__label" v-show="searchMobileText">Протяженность линии, метров</span>
									<div class="search__params__part--dropdown search__params__part--dropdown--merged">
										<select name="beach-length-from" value="Протяженность линии от, м">
											<option selected="selected">{{ searchMobileText && !labelId || showCorrectSelectText ?  'От' : 'Протяженность линии от, м' }}</option>
										</select>
										<select name="beach-length-to" value="до">
											<option selected="selected">до</option>
										</select>
									</div>
								</div>
								<div class="search__params__part__dropdowns">
									<span class="search__params__part__label" v-show="searchMobileText">Температура воды от, &deg;C</span>
									<div class="search__params__part--dropdown search__params__part--dropdown--merged">
										<select name="water-temperature-from" value="Температура воды от">
											<option selected="selected">
												{{ searchMobileText && !labelId || showCorrectSelectText ? 'От' : 'Температура воды от, &deg;C' }}
											</option>
										</select>
										<select name="water-temperature-to" value="до">
											<option selected="selected">до</option>
										</select>
									</div>
								</div>
							</div>
						</div>
						<div class="search__params__part__checkboxes search__params__part__checkboxes--first">
							<div class="search__params__part--checkbox">
								<input type="checkbox" :id="'search-city' + labelId" v-model="params.searchCity" value="search-city">
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
						<h3 class="search__params__title">Дополнительные параметры</h3>
						<div class="search__params__part__checkboxes search__params__part__checkboxes--second">
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
							<button class="search__params__apply">Применить</button>
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
					searchCity: false
				},
				searchInput: ""
			};
		},

		mounted() {
			window.addEventListener('resize', this.onResize);
			this.onResize();

			this.$bus.$on('showCorrectSelectText', () => {
				this.showCorrectSelectText = true;
			});

			this.$bus.$on('dontShowCorrectSelectText', () => {
				this.showCorrectSelectText = true;
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
				setTimeout(() => {
					if (this.paramsShown)
						this.$el.querySelector('.search__params').style.overflow = '';
				}, 1001);
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

				// if (window.innerWidth <= 450 && this.labelId && !this.paramsShown) {
				// 	this.$bus.$emit('openparamsShown');
				// 	return;
				// }

				// if (this.openedFromMain) {
				// 	this.openedFromMain = false;

				// 	this.$bus.$emit('closeparamsShown');
				// }

				// this.paramsShown = !this.paramsShown;

				// if (!this.paramsShown) {
				// 	this.$el.querySelector('.search__params').style.height = 0;
				// 	// document.body.style.overflow = '';
				// 	const scrollY = document.body.style.top;
				// 	document.body.style.position = '';
				// 	document.body.style.top = '';
				// 	window.scrollTo(0, parseInt(scrollY || '0') * -1);
				// } else {
				// 	this.$el.querySelector('.search__params').style.height = this.$el.querySelector('.search__params').scrollHeight + 'px';

				// 	if (window.innerWidth <= 650 && !this.labelId) {
				// 		document.body.style.position = 'fixed';
				// 		document.body.style.top = `-${window.scrollY}px`;
				// 		// document.body.style.overflow = 'hidden';
				// 	}
				// }
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
			}
		}
	}
</script>
