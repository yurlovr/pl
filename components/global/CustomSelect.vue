<template>
	<div class="custom-new-select" :class="{ open: dropdownOpen }" v-on-clickaway="onBlur" v-if="options">
		<div class="custom-new-select__top" @click="dropdownOpen = !dropdownOpen">
			<span>{{ filteredTitle(title) }}</span>
			<img src="~/static/pics/global/svg/dropdown.svg">
		</div>
		<div class="custom-new-select__bottom" v-show="dropdownOpen">
			<div class="custom-new-select__bottom__item" v-for="(option, i) in options" @click="choose(i)">
				<span>{{ filteredTitle(option.title) }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';

export default {
	props: ['options', 'value', 'param', 'opposite'],

	directives: {
		onClickaway: onClickaway,
	},

	data() {
		return {
			chosenIndex: 0,
			dropdownOpen: false
		}
	},

	computed: {
		title() {
			if (this.param == 'searchBeachLengthFrom' && this.value.id != -1) {
				if (this.options[0].title != 'От')
					return `Протяженность линии от, ${this.value.title} м`;
				else return `От ${this.value.title} м`;
			} else if (this.param == 'searchWaterTempFrom' && this.value.id != -1) {
				if (this.options[0].title != 'От')
					return `Температура воды от, ${this.value.title} °C`;
				else return `От ${this.value.title} м`;
			} else return this.value.title;
		}
	},

	methods: {
		choose(i) {
			this.chosenIndex = i;
			this.dropdownOpen = false;
			this.$bus.$emit('updateSearchParam', { param: this.param, value: { title: this.options[i].title, id: this.options[i].id } });

			// id == 0 is the default value
			if (this.opposite) {
				setTimeout(() => {
					if (this.value.id != -1 && this.opposite.value.id != -1 && (
						(this.param == 'searchWaterTempFrom' || this.param == 'searchBeachLengthFrom') && this.value.title >= this.opposite.value.title) 
						|| 
						(this.param == 'searchWaterTempTo' || this.param == 'searchBeachLengthTo') && this.value.title <= this.opposite.value.title) {
						this.$bus.$emit('updateSearchParam', { param: this.opposite.param, value: { title: this.opposite.options[0].title, id: this.opposite.options[0].id } });
					}
				}, 1);
			}
		},

		onBlur() {
			this.dropdownOpen = false;
		},

		filteredTitle(title) {
			if (title && title.replace)
				return title.replace('посёлок городского типа', 'пгт.')
			return title;
		}
	}
}
</script>