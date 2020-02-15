<template>
	<div class="custom-checkbox" @click="checked = !checked">
		<div class="custom-checkbox__checkbox" :class="{ checked: checked }">
			<img src="~/static/pics/global/svg/check.svg" v-show="checked">
		</div>
		<span v-html="label"></span>
	</div>
</template>

<script>
	export default {
		props: ['label', 'checked']
	}
</script>