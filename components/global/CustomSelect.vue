<template>
	<div class="custom-new-select" :class="{ open: dropdownOpen }" v-on-clickaway="onBlur" v-if="options">
		<div class="custom-new-select__top" @click="dropdownOpen = !dropdownOpen">
			<span>{{ title }}</span>
			<img src="~/static/pics/global/svg/dropdown.svg">
		</div>
		<div class="custom-new-select__bottom" v-show="dropdownOpen">
			<div class="custom-new-select__bottom__item" v-for="(option, i) in options" @click="choose(i)">
				<span>{{ option.title }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';

export default {
	props: ['options', 'value', 'param'],

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
				if (!isNaN(this.value.title))
					return `Протяженность линии от, ${this.value.title} м`;
				else return `От ${this.value.title} м`;
			} else if (this.param == 'searchWaterTempFrom' && this.value.id != -1) {
				if (!isNaN(this.value.title))
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
		},

		onBlur() {
			this.dropdownOpen = false;
		}
	}
}
</script>