<template>
	<div class="beach-event__side-buttons">
		<button class="bg-orange" v-if="share">
			<img src="~/static/pics/global/svg/share.svg">
		</button>
		<button v-if="mail">
			<img src="~/static/pics/global/svg/mail.svg">
		</button>
		<button v-if="telegram">
			<img src="~/static/pics/global/svg/telegram-side.svg">
		</button>
		<button :class="{ 'bg-blue': crossBlue, 'bg-orange': crossOrange }">
			<img src="~/static/pics/global/svg/cross.svg">
		</button>
		<button v-if="ymaps">
			<img src="~/static/pics/global/svg/ymaps.svg">
		</button>
		<button v-if="yandex">
			<img src="~/static/pics/global/svg/yandex.svg">
		</button>
	</div>
</template>

<script>
	export default {
		props: ['share', 'crossBlue', 'crossOrange', 'ymaps', 'yandex', 'mail', 'telegram']
	}
</script>