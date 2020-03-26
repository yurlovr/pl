<template>
	<div class="search-page__tag">
		<span>{{ tag.value.title.charAt(0).toUpperCase() + tag.value.title.slice(1) }}</span>
		<button class="search-page__tag__remove" @click="removeTag()">
			<img src="~/static/pics/global/svg/close.svg" alt="Убрать">
		</button>
	</div>
</template>

<script>
	export default {
		props: ['tag'],

		methods: {
			removeTag() {
				if (this.tag.type == 'select')
					this.$bus.$emit('updateSearchParam', {param: this.tag.param, value: this.tag.default });
				else this.$bus.$emit('updateSearchParam', {id: this.tag.id, value: false, type: this.tag.type });
				this.$bus.$emit('search');
			}
		}
	}
</script>