<template>
	<div class="custom-checkbox" @click="toggle()">
		<div class="custom-checkbox__checkbox" :class="{ checked: checked }">
			<img src="~/static/pics/global/svg/check.svg" v-show="checked">
		</div>
		<span v-html="label"></span>
	</div>
</template>

<script>
export default {
	props: ['label'],

	model: {
		prop: 'checked',
    	event: 'change'
	},

	data() {
		return {
			checked: false
		}
	},

	methods: {
		toggle() {
			this.checked = !this.checked;
			this.$emit('change', this.checked);
		}
	}
}
</script>