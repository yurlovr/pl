<template>
	<div class="custom-checkbox" @click="toggle()">
		<div class="custom-checkbox__checkbox" :class="{ checked: value }">
			<img src="~/static/pics/global/svg/check.svg" v-show="value">
		</div>
		<span v-html="label"></span>
	</div>
</template>

<script>
export default {
	props: ['label', 'value', 'var'],

	methods: {
		toggle() {
			this.$bus.$emit('updateSearchParams', { p: this.var, v: !this.value });
		}
	}
}
</script>