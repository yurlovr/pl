<template>
	<div class="search">
		<div class="search__bar">
			<button class="search__bar__left-search" v-show="searchInput.length > 0">
				<img src="~/static/pics/global/svg/search.svg" alt="Поиск">
			</button>
			<input class="search__bar__input" placeholder="Искать пляж" v-model="searchInput">
			<img class="search__bar__right-search" src="~/static/pics/global/svg/search.svg" alt="Поиск" v-show="searchInput.length == 0">
			<button class="search__bar__right-cross" v-show="searchInput.length > 0" @click="searchInput = ''">
				<img src="~/static/pics/global/svg/close.svg" alt="Убрать">
			</button>
			<div class="search__params" style="height: 0;">
				<div class="search__params__inner">
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
									<div class="search__params__part--dropdown search__params__part--dropdown--merged">
										<select name="beach-length-from" value="Протяженность линии от, м">
											<option selected="selected">Протяженность линии от, м</option>
										</select>
										<select name="beach-length-to" value="до">
											<option selected="selected">до</option>
										</select>
									</div>
								</div>
								<div class="search__params__part__dropdowns">
									<div class="search__params__part--dropdown search__params__part--dropdown--merged">
										<select name="water-temperature-from" value="Температура воды от">
											<option selected="selected">
												Температура воды от, &deg;C
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
								<input type="checkbox" id="search-city" v-model="params.searchCity" value="search-city">
								<label for="search-city">Городские</label>
							</div>
							<div class="search__params__part--checkbox">
								<input type="checkbox" id="search-popular-beaches">
								<label for="search-popular-beaches">Популярные пляжи</label>
							</div>
							<div class="search__params__part--checkbox">
								<input type="checkbox" id="search-active-rest">
								<label for="search-active-rest">Активный отдых</label>
							</div>
							<div class="search__params__part--checkbox">
								<input type="checkbox" id="search-wild">
								<label for="search-wild">Дикие</label>
							</div>
							<div class="search__params__part--checkbox">
								<input type="checkbox" id="search-family-rest">
								<label for="search-family-rest">Отдых для всей семьи</label>
							</div>
							<div class="search__params__part--checkbox">
								<input type="checkbox" id="search-events">
								<label for="search-events">Мероприятия</label>
							</div>
						</div>
						<h3 class="search__params__title">Дополнительные параметры</h3>
						<div class="search__params__part__checkboxes search__params__part__checkboxes--second">
							<div class="search__params__part--checkbox">
								<input type="checkbox" id="search-public-transport">
								<label for="search-public-transport">Остановка общественного<br>транспорта</label>
							</div>
							<div class="search__params__part--checkbox">
								<input type="checkbox" id="search-active-rest-inventory">
								<label for="search-active-rest-inventory">Инвентарь для активного<br>отдыха</label>
							</div>
							<div class="search__params__part--checkbox">
								<input type="checkbox" id="search-medical-help">
								<label for="search-medical-help">Пункт медицинской<br>помощи</label>
							</div>
							<div class="search__params__part--checkbox">
								<input type="checkbox" id="search-bars" name="search-bars" value="search-bars">
								<label for="search-bars">Бары, рестораны</label>
							</div>
							<div class="search__params__part--checkbox">
								<input type="checkbox" id="search-showers">
								<label for="search-showers">Душевые кабины</label>
							</div>
							<div class="search__params__part--checkbox">
								<input type="checkbox" id="search-rescue-station">
								<label for="search-rescue-station">Спасательный пункт</label>
							</div>
							<div class="search__params__part--checkbox">
								<input type="checkbox" id="search-parking">
								<label for="search-parking">Парковка</label>
							</div>
							<div class="search__params__part--checkbox">
								<input type="checkbox" id="search-swimming-inventory">
								<label for="search-swimming-inventory">Инвентарь для плавания</label>
							</div>
							<div class="search__params__part--checkbox">
								<input type="checkbox" id="search-water-purity">
								<label for="search-water-purity">Чистота воды</label>
							</div>
							<div class="search__params__part--checkbox">
								<input type="checkbox" id="search-security">
								<label for="search-security">Безопаснось</label>
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
			<img src="~/static/pics/global/svg/filter.svg" alt="Поиск" v-show="!searchParams">
			<img src="~/static/pics/global/svg/close_blue.svg" alt="Закрыть" v-show="searchParams">
		</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				searchInput: "",
				searchParams: false,
				params: {
					searchCity: false
				}
			};
		},

		mounted() {
			window.addEventListener('resize', this.onResize);
		},

		methods: {
			toggleParams() {
				this.searchParams = !this.searchParams;

				if (!this.searchParams) {
					this.$el.querySelector('.search__params').style.height = 0;
				} else {
					this.$el.querySelector('.search__params').style.height = this.$el.querySelector('.search__params').scrollHeight + 'px';
				}
			},

			onResize() {
				if (this.searchParams) {
					this.$el.querySelector('.search__params').style.height = 0;
					setTimeout(() => {
						this.$el.querySelector('.search__params').style.height = this.$el.querySelector('.search__params').scrollHeight + 'px';
					}, 1);
				}
			}
		}
	}
</script>
