<template>
	<div class="announcement-card" v-if="data.title">
		<a :href="data.link" @click.prevent="$bus.goTo(data.link, $router)">
			<div class="announcement-card__pic-area">
				<img class="announcement-card__pic" :src="data.pic">
			</div>
			<div class="announcement-card__info-area" :style="{ background: data.color }">
				<div class="announcement-card__date-area">
					<img class="announcement-card__date-icon" src="~/static/pics/global/svg/calendar-small.svg">
					<span class="announcement-card__date">{{ data.date }}</span>
				</div>
				<h3 class="announcement-card__title">{{ data.title }}</h3>
				<p class="announcement-card__description">{{ data.description }}</p>
			</div>
		</a>
	</div>
</template>

<script>
	export default {
		props: ['data']
	}
</script>
