<template>
	<div class="custom-checkbox" @click="toggle()">
		<div class="custom-checkbox__checkbox" :class="{ checked: value }">
			<img src="~/static/pics/global/svg/check.svg" v-show="value">
		</div>
		<span>{{ title }}</span>
	</div>
</template>

<script>
export default {
	props: ['title', 'value', 'id', 'type'],

	methods: {
		toggle() {
			this.$bus.$emit('updateSearchParam', { id: this.id, value: !this.value, type: this.type });
		}
	}
}
</script>