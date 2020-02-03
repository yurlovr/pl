<template>
	<div class="search-page__tag" v-show="!tagRemoved">
		<span>{{ tag }}</span>
		<button class="search-page__tag__remove" @click="removeTag()">
			<img src="~/static/pics/global/svg/close.svg" alt="Убрать">
		</button>
	</div>
</template>

<script>
	export default {
		props: ['tag'],

		data() {
			return {
				tagRemoved: false
			}
		},

		methods: {
			removeTag() {
				this.tagRemoved = true;
				setTimeout(() => { this.$bus.$emit('updateSearchTagsSlider') }, 10);
			}
		}
	}
</script>