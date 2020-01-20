<template>
	<div class="search">
		<div class="search__bar">
			<button class="search__bar__left-search" v-show="searchInput.length > 0">
				<img src="~/static/pics/global/svg/search.svg" alt="Поиск">
			</button>
			<input class="search__bar__input" placeholder="Искать пляж" v-model="searchInput">
			<img class="search__bar__right-search" src="~/static/pics/global/svg/search.svg" alt="Поиск" v-show="searchInput.length == 0">
			<button class="search__bar__right-cross" v-show="searchInput.length > 0" @click="searchInput = ''">
				<img src="~/static/pics/global/svg/close.svg" alt="Убрать">
			</button>
		</div>
		<button class="search__options">
			<img src="~/static/pics/global/svg/filter.svg" alt="Поиск">
		</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				searchInput: ""
			};
		}
	}
</script>
