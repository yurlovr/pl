<template>
    <div class="beach-event__side-buttons">
        <transition name="bounce">
            <button v-show="showShare">
                <img src="~/static/pics/global/svg/mail.svg">
            </button>
        </transition>
        <transition name="bounce">
            <button v-show="showShare">
                <img src="~/static/pics/global/svg/telegram-side.svg">
            </button>
        </transition>
        <button
            class="bg-orange"
            v-show="showShare"
            @click="showShare = !showShare"
        >
            <img src="~/static/pics/global/svg/cross.svg">
        </button>
        <button
            class="bg-orange"
            v-show="!showShare"
            @click="showShare = !showShare"
        >
            <img src="~/static/pics/global/svg/share.svg">
        </button>

        <button
            class="bg-blue"
            v-show="!showPave"
            @click="showPave = !showPave"
        >
            <img src="~/static/pics/global/svg/pave_way.svg">
        </button>
        <button
            class="bg-blue"
            v-show="showPave"
            @click="showPave = !showPave"
        >
            <img src="~/static/pics/global/svg/cross.svg">
        </button>
        <transition name="bounce">
            <button v-show="ymaps && showPave">
                <img src="~/static/pics/global/svg/ymaps.svg">
            </button>
        </transition>
        <transition name="bounce">
            <button
                v-show="yandex && showPave"
                class="btn-display"
            >
                <img src="~/static/pics/global/svg/yandex.svg">
            </button>
        </transition>
    </div>
</template>

<script>
export default {
    props: ['share', 'crossBlue', 'crossOrange', 'ymaps', 'yandex', 'mail', 'telegram'],
    data () {
        return {
            showShare: false,
            showPave: false
        };
    },

}
</script>
<style lang="scss" scoped>
.bounce-enter-active {
    animation: bounce-in 0.5s;
}
.bounce-leave-active {
    animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
    0% {
        transform: scale(0);
        height: 10px;
    }

    50% {
        transform: scale(1.5);
        height: 60px;
    }
    100% {
        transform: scale(1);
    }
}
// .fade-enter-active,
// .fade-leave-active {
//     transition: opacity 1.5s;
// }
// .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
//     opacity: 0;
// }

.btn-display {
    display: block;
}

@media (max-width: 680px) {
    .btn-display {
        display: none;
    }
}
</style>
