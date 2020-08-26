<template>
	<div class="rating-5-star">
		<span>{{ data.title }}</span>
		<div class="rating-5-star__stars" @mouseleave="hover = -1">
			<div class="rating-5-star__star" v-for="i in 5" @mouseover="hover = i+1" @click="chooseRating(i)">
				<svg width="26" height="25" viewBox="0 0 26 25" :fill="i < hover || i < data.rating+1 ? '#FCAB2D' : 'none'" xmlns="http://www.w3.org/2000/svg" class="desk-svg">
					<path d="M10.021 9.06991L13 1.38357L15.979 9.06991C16.1067 9.39938 16.4154 9.62364 16.7682 9.64328L24.9989 10.1013L18.6094 15.3098C18.3355 15.533 18.2176 15.8959 18.3079 16.2375L20.4157 24.2069L13.4877 19.7396C13.1908 19.5481 12.8092 19.5481 12.5123 19.7396L5.58425 24.2069L7.69207 16.2375C7.78242 15.8959 7.66451 15.533 7.39063 15.3098L1.00106 10.1013L9.23178 9.64328C9.58459 9.62364 9.89326 9.39938 10.021 9.06991ZM25.1989 9.93829L25.1987 9.93847L25.1989 9.93829ZM5.36741 24.3467C5.36746 24.3467 5.36751 24.3467 5.36755 24.3466L5.36741 24.3467Z" stroke="#FCAB2D"/>
				</svg>
        <svg width="44" height="44" viewBox="0 0 44 44" :fill="i < hover || i < data.rating+1 ? '#FCAB2D' : 'none'" xmlns="http://www.w3.org/2000/svg" class="mob-svg">
          <path d="M16.999 14.2869L22 1.38358L27.001 14.2869C27.1287 14.6164 27.4374 14.8406 27.7902 14.8603L41.6074 15.6292L30.881 24.3728L31.1969 24.7603L30.881 24.3728C30.6071 24.596 30.4892 24.9589 30.5796 25.3005L34.118 38.679L22.4877 31.1796C22.1908 30.9881 21.8092 30.9881 21.5123 31.1796L9.88197 38.679L13.4204 25.3005C13.5108 24.9589 13.3929 24.596 13.119 24.3728L12.8031 24.7603L13.119 24.3728L2.39261 15.6292L16.2098 14.8603C16.5626 14.8406 16.8713 14.6164 16.999 14.2869ZM41.8074 15.4662L41.8071 15.4663L41.8074 15.4662Z" stroke="#FF8C00"/>
        </svg>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['data'],

		model: {
			prop: 'rating',
	    	event: 'change'
		},


		data() {
			return {
				hover: -1,
				rating: 0
			}
		},

		methods: {
			chooseRating(i) {
				if (this.rating == i) {
					this.rating = 0;
					this.$emit('change', this.rating);
					return;
				}

				this.hover = -1;
				this.rating = i;
				this.$emit('change', this.rating)
			}
		}
	}
</script>
