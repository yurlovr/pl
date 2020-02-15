<template>
	<div class="rating-5-star">
		<span>{{ data.title }}</span>
		<div class="rating-5-star__stars" @mouseleave="hover = -1">
			<div class="rating-5-star__star" v-for="i in 5" @mouseover="hover = i+1" @click="chooseRating(i)">
				<svg width="26" height="25" viewBox="0 0 26 25" :fill="i < hover || i < data.rating ? '#FCAB2D' : 'none'" xmlns="http://www.w3.org/2000/svg">
					<path d="M10.021 9.06991L13 1.38357L15.979 9.06991C16.1067 9.39938 16.4154 9.62364 16.7682 9.64328L24.9989 10.1013L18.6094 15.3098C18.3355 15.533 18.2176 15.8959 18.3079 16.2375L20.4157 24.2069L13.4877 19.7396C13.1908 19.5481 12.8092 19.5481 12.5123 19.7396L5.58425 24.2069L7.69207 16.2375C7.78242 15.8959 7.66451 15.533 7.39063 15.3098L1.00106 10.1013L9.23178 9.64328C9.58459 9.62364 9.89326 9.39938 10.021 9.06991ZM25.1989 9.93829L25.1987 9.93847L25.1989 9.93829ZM5.36741 24.3467C5.36746 24.3467 5.36751 24.3467 5.36755 24.3466L5.36741 24.3467Z" stroke="#FCAB2D"/>
				</svg>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['data'],

		data() {
			return {
				hover: -1
			}
		},

		methods: {
			chooseRating(i) {
				this.data.rating = i+1;
				this.hover = -1;
			}
		}
	}
</script>