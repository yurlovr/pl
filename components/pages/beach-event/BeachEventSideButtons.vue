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
            <button v-show="ymaps && showPave" class="btn-ymaps">
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
    }
}
</script>
