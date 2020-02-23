<template>
	<div class="custom-new-select" :class="{ open: dropdownOpen }" v-on-clickaway="onBlur">
		<div class="custom-new-select__top" @click="dropdownOpen = !dropdownOpen">
			<span>{{ options[chosenIndex] }}</span>
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
	props: ['options'],

	directives: {
		onClickaway: onClickaway,
	},

	model: {
	    prop: 'chosenIndex',
	    event: 'change'
	},

	data() {
		return {
			chosenIndex: 0,
			dropdownOpen: false
		}
	},

	mounted() {
		
	},

	methods: {
		choose(i) {
			this.chosenIndex = i;
			this.dropdownOpen = false;
			this.$emit('change', this.options[i]);
		},

		onBlur() {
			this.dropdownOpen = false;
		}
	}
}
</script>