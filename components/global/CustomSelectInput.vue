<template>
	<div class="custom-new-select" :class="{ open: dropdownOpen }" v-on-clickaway="onBlur" v-if="options">
		<div class="custom-new-select__top" @click="dropdownOpen = !dropdownOpen">
			<input type="text" :placeholder="value.title" v-model="input" @input="dropdownOpen = true" @click.stop :class="{ 'not-default': value.id != -1 }">
			<img src="~/static/pics/global/svg/dropdown.svg">
		</div>
		<div class="custom-new-select__bottom" v-show="dropdownOpen">
			<div class="custom-new-select__bottom__item" v-for="(option, i) in filteredOptions" @click="choose(i)">
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

	watch: {
		value: function(n, o) {
			if (n.id != -1)
				this.input = n.title;
		}
	},

	data() {
		return {
			chosenIndex: 0,
			dropdownOpen: false,
			input: ''
		}
	},

	computed: {
		title() {
			if (this.param == 'searchBeachLengthFrom' && this.value.id != -1) {
				if (this.value.title > 3)
					return `Протяженность линии от, ${this.value.title} м`;
				else return `От ${this.value.title} м`;
			} else if (this.param == 'searchWaterTempFrom' && this.value.id != -1) {
				if (this.value.title > 3)
					return `Температура воды от, ${this.value.title} °C`;
				else return `От ${this.value.title} м`;
			} else return this.value.title;
		},

		filteredOptions() {
			if (this.input.replace(/\s/g,"") == "")
				return this.options.map(v => {return { title: v.title.charAt(0).toUpperCase() + v.title.substring(1).toLowerCase(), id: v.id }});

			let filtered = this.options.filter(v => v.id != -1).map(v => { return { title: v.title.toLowerCase(), id: v.id }}).filter(v => { return v.title.indexOf(this.input.toLowerCase()) != -1 }).map(v => {return { title: v.title.charAt(0).toUpperCase() + v.title.substring(1).toLowerCase(), id: v.id }});
			if (filtered.length == 0)
				return [{
					title: 'Ничего не найдено',
					id: -1
				}]
			else return filtered;
		}
	},

	methods: {
		choose(i) {
			if (this.filteredOptions.length > 1) {
				this.chosenIndex = i;
				this.dropdownOpen = false;
				this.$bus.$emit('updateSearchParam', { param: this.param, value: { title: this.filteredOptions[i].title, id: this.filteredOptions[i].id } });
			}
		},

		onBlur() {
			this.dropdownOpen = false;
		}
	}
}
</script>