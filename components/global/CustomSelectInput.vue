<template>
	<div class="custom-new-select custom-new-select" :class="{ open: dropdownOpen }" v-on-clickaway="onBlur" v-if="options">
		<div class="custom-new-select__top" @click="openDropdown()">
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
				this.input = n.title.charAt(0).toUpperCase() + n.title.slice(1).replace('осёлок городского типа', 'гт.');
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
		filteredOptions() {
			if (this.input.replace(/\s/g,"") == "")
				return this.options.map(v => {return { title: v.title.toLowerCase().replace('осёлок городского типа', 'гт.').split(' ').map(word => word != 'Любой город' ? word.charAt(0).toUpperCase() + word.slice(1) : word).join(' '), id: v.id }});

			let filtered = this.options
						.filter(v => v.id != -1).map(v => { return { title: v.title.toLowerCase().replace('осёлок городского типа', 'гт.'), id: v.id }})
						.filter(v => { return v.title.indexOf(this.input.toLowerCase().replace('осёлок городского типа', 'гт.')) != -1 })
						.map(v => {return { title: v.title.toLowerCase().replace('осёлок городского типа', 'гт.').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), id: v.id }});
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
			if (this.filteredOptions.length == 1 && this.filteredOptions[0].id == -1) return;

			this.chosenIndex = i;
			this.dropdownOpen = false;
			this.$bus.$emit('updateSearchParam', { param: this.param, value: { title: this.filteredOptions[i].title, id: this.filteredOptions[i].id } });
		},

		onBlur() {
			this.dropdownOpen = false;
		},

		openDropdown() {
			this.dropdownOpen = !this.dropdownOpen;
			if (this.dropdownOpen || !this.dropdownOpen && this.filteredOptions[this.chosenIndex].id == -1)
				this.input = '';
			else this.input = this.filteredOptions[this.chosenIndex].title;
		}
	}
}
</script>