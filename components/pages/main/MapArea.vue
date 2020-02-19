<template>
    <section class="main-page__map">
        <div class="custom-container">
            <h3 class="main-page__section-title">Карта пляжей Крыма</h3>
        </div>
        <div class="overlay-map">
            <MapBeaches :data="data.mapBeachesData" v-if="step == 2"/>
            <Map :addressBeaches="data.addressBeaches" :center="data.center" />
        </div>
    </section>
</template>

<script>
    import MapBeaches from '~/components/pages/main/MapBeaches';
    import Map from '~/components/pages/main/Map';

    export default {
        props: ['data'],

        data() {
            return {
                step: 1
            }
        },

        components: {
            MapBeaches,
            Map
        },

        mounted() {
            this.$bus.$on('changeStep', stepID => {
                this.step = stepID;
            });
        }
    }
</script>
