<template>
	<div class="favorites-page custom-page">
		<h1 class="favorites-page__title custom-page__title custom-container">Избранное</h1>
		<div class="favorites-page__favorites-types custom-container">
			<button class="favorites-page__favorites-type" @click="showBeachesOrEvents = false" :class="{ active: !showBeachesOrEvents }">
				Пляжи
			</button>
			<button class="favorites-page__favorites-type" @click="showBeachesOrEvents = true" :class="{ active: showBeachesOrEvents }">
				Мероприятия
			</button>
		</div>
		<CardGrid :data="beachesToShow" v-show="!showBeachesOrEvents" />
		<CardGrid :data="eventsToShow" :showIfVisited="true" v-show="showBeachesOrEvents" />
		<div class="custom-container">
			<h3 class="main-page__section-title">Посещенные мероприятия</h3>
			<h4 class="favorites-page__empty" v-show="visited.length == 0">Пусто</h4>
		</div>
		<CardGrid :data="visited" :showIfVisited="true" v-show="visited.length > 0" />
	</div>
</template>

<script>
	import CardGrid from '~/components/global/CardGrid';

	import { mapGetters, mapState } from 'vuex';

	export default {
		components: {
			CardGrid
		},

		computed: {
			...mapGetters(['beachIds', 'eventIds']),
			...mapGetters(['beaches', 'events']),
		},

		data() {
			return {
				showBeachesOrEvents: false, // beaches: false, events: true
				visited: [],
				beachesToShow: [],
				eventsToShow: []
			}
		},

		mounted() {
			this.$bus.$on('visitedAdd', id => {
				this.visited.push(this.eventsToShow[this.eventsToShow.map(v => v.eventId).indexOf(id)]);
			});
			this.$bus.$on('visitedRemove', id => {
				if (this.visited && this.visited.length > 0) {
					this.visited.splice(this.visited.map(v => v.eventId).indexOf(id), 1);
				}
				setTimeout(() => {this.$bus.$emit('updateVisited')}, 1);
			});

			this.$bus.$on('favoriteBeachRemoved', id => {
				if (this.beachesToShow.length > 0) {
					this.beachesToShow.splice(this.beachesToShow.map(v => v.beachId).indexOf(id), 1);
				}
				setTimeout(() => {this.$bus.$emit('updateFavorite')}, 1);
			});
			this.$bus.$on('favoriteEventAdded', id => {
				this.eventsToShow.push(this.events[this.events.map(v => v.eventId).indexOf(id)]);
			});
			this.$bus.$on('favoriteEventRemoved', id => {
				if (this.eventsToShow.length > 0) {
					this.eventsToShow.splice(this.eventsToShow.map(v => v.eventId).indexOf(id), 1);
				}
				setTimeout(() => {this.$bus.$emit('updateFavorite')}, 1);
			});

			// filling the beaches and events to show
			if (this.beachIds && this.beaches) {
				for (let i = 0; i < this.beachIds.length; i++) {
					if (this.$cookies.get(`favorites.beaches.${this.beachIds[i]}`))
						this.beachesToShow.push(this.beaches[i]);
				}
			} else console.error('Could not fetch beach ids (favorites)');

			if (this.eventIds && this.events) {
				for (let i = 0; i < this.eventIds.length; i++) {
					if (this.$cookies.get(`favorites.events.${this.eventIds[i]}`))
						this.eventsToShow.push(this.events[i]);
				}
			} else console.error('Could not fetch event ids (favorites)');

			// filling visited events
			if (this.eventIds && this.events) {
				for (let i = 0; i < this.eventIds.length; i++) {
					if (this.$cookies.get(`visited.events.${this.eventIds[i]}`))
						this.visited.push(this.events[i]);
				}
			} else console.error('Could not fetch event ids (favorites)');
		}
	}
</script>