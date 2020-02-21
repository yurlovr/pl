<template>
    <div
        class="beach-page__water-temp"
        :class="{ active : modalOpen }"
    >
        <div
            class="beach-page__water-temp__inner"
            v-body-scroll-lock="modalOpen"
        >
            <div
                class="beach-page__water-temp__bg"
                @click="toggleModal()"
            ></div>
            <section class="two-part-layout__card">
                <div
                    class="beach-page__water-temp__title-area"
                    :class="{ active : modalOpen }"
                    @click="toggleModal()"
                >
                    <h2 class="two-part-layout__card__title beach-page__water-temp__title">График температуры воды на пляже</h2>
                    <img src="~/static/pics/beach/accordion_dropdown_orange.svg">
                </div>
                <div
                    class="beach-page__water-temp__content"
                    :class="{ active : modalOpen }"
                >
                    <div class="beach-page__water-temp__year-month">
                        <button
                            class="slider-weather__month"
                            :class="{ active : activeMonth == -1 }"
                            @click="activeMonth = -1"
                        ><span>Год</span></button>
                        <button
                            class="slider-weather__month"
                            :class="{ active : activeMonth > -1 }"
                            @click="handlerActiveMonth"
                        ><span>Месяц</span></button>
                    </div>
                    <div
                        class="beach-page__water-temp__histogram"
                        v-show="activeMonth == -1"
                    >
                        <div
                            class="beach-page__water-temp__histogram__item"
                            v-for="(item, i) in monthAvgs"
                            :key="i"
                            @click="activeMonth = i"
                        >
                            <div
                                class="beach-page__water-temp__histogram__item__bar"
                                :style="{ height: (140 * item / Math.max.apply(null, monthAvgs) + 'px') }"
                            >
                                <div class="beach-page__water-temp__histogram__item__bar__info">
                                    <span class="slider-weather__slide__temp-number">{{ (item.toFixed(0) > 0 ? '+ ' : '') + (item.toFixed(0) < 0 ? '- ' : '') + item.toFixed(0) }}</span>
                                    <span class="slider-weather__slide__temp-o"><span>o</span></span>
                                    <span class="slider-weather__slide__temp-C">C</span>
                                </div>
                            </div>
                            <span class="beach-page__water-temp__histogram__item__title">{{ getMonth(i+1) }}</span>
                        </div>
                    </div>
                    <div
                        class="beach-page__water-temp__histogram month"
                        v-if="activeMonth == i"
                        v-for="(month, i) in data"
                        :key="i"
                    >
                        <div
                            class="beach-page__water-temp__histogram__item"
                            v-for="(item, index) in month"
                            :key="index"
                        >
                            <div
                                class="beach-page__water-temp__histogram__item__bar"
                                :style="{ height: (140 * item / Math.max.apply(null, month) + 'px') }"
                            >
                                <div class="beach-page__water-temp__histogram__item__bar__info">
                                    <span class="slider-weather__slide__temp-number">{{ (item.toFixed(0) > 0 ? '+ ' : '') + (item.toFixed(0) < 0 ? '- ' : '') + item.toFixed(0) }}</span>
                                    <span class="slider-weather__slide__temp-o"><span>o</span></span>
                                    <span class="slider-weather__slide__temp-C">C</span>
                                </div>
                            </div>
                            <span class="beach-page__water-temp__histogram__item__title">{{ index+1 }}</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    props: ['data'],

    data () {
        return {
            activeMonth: -1,
            modalOpen: false
        };
    },

    computed: {
        monthAvgs () {
            let avgs = [];
            for (let i = 0; i < this.data.length; i++) {
                avgs.push(this.data[i].reduce((a, b) => a + b, 0) / this.data[i].length);
            }
            return avgs;
        }
    },

    methods: {
        getMonth (i) {
            switch (i) {
                case 1:
                    return 'Янв';
                case 2:
                    return 'Фев';
                case 3:
                    return 'Мар';
                case 4:
                    return 'Апр';
                case 5:
                    return 'Май';
                case 6:
                    return 'Июн';
                case 7:
                    return 'Июл';
                case 8:
                    return 'Авг';
                case 9:
                    return 'Сен';
                case 10:
                    return 'Окт';
                case 11:
                    return 'Ноя';
                case 12:
                    return 'Дек';
                default:
                    return 'A?';
            }
        },

        toggleModal () {
            if (this.modalOpen) {
                this.$el.querySelector('.beach-page__water-temp__content').style.overflow = '';
            } else {
                this.$el.querySelector('.beach-page__water-temp__content').style.overflow = 'visible';
            }

            this.modalOpen = !this.modalOpen;
        },
        handlerActiveMonth () {
            this.activeMonth = new Date().getMonth();
        }

    }
}
</script>
