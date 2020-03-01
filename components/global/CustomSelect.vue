<template>
	<div class="custom-new-select" :class="{ open: dropdownOpen }" v-on-clickaway="onBlur" v-if="options">
		<div class="custom-new-select__top" @click="dropdownOpen = !dropdownOpen">
			<span>{{ value }}</span>
			<img src="~/static/pics/global/svg/dropdown.svg">
		</div>
		<div class="custom-new-select__bottom" v-show="dropdownOpen">
			<div class="custom-new-select__bottom__item" v-for="(option, i) in options" @click="choose(i)">
				<span>{{ option }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';

export default {
	props: ['options', 'value', 'var'],

	directives: {
		onClickaway: onClickaway,
	},

	data() {
		return {
			chosenIndex: 0,
			dropdownOpen: false
		}
	},

	methods: {
		choose(i) {
			this.chosenIndex = i;
			this.dropdownOpen = false;
			this.$bus.$emit('updateSearchParams', { p: this.var, v: this.options[i] }); // p -> param, v -> value
		},

		onBlur() {
			this.dropdownOpen = false;
		}
	}
}
</script>