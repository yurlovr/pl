<template>
    <div class="beach-event__side-buttons">
        <button v-if="showShare">
            <img src="~/static/pics/global/svg/mail.svg">
        </button>
        <button v-if="showShare">
            <img src="~/static/pics/global/svg/telegram-side.svg">
        </button>
        <button
            class="bg-orange"
            v-if="showShare"
            @click="showShare = !showShare"
        >
            <img src="~/static/pics/global/svg/cross.svg">
        </button>
        <button
            class="bg-orange"
            v-if="!showShare"
            @click="showShare = !showShare"
        >
            <img src="~/static/pics/global/svg/share.svg">
        </button>

        <button
            class="bg-blue"
            v-if="!showPave"
            @click="showPave = !showPave"
        >
            <img src="~/static/pics/global/svg/pave_way.svg">
        </button>
        <button
            class="bg-blue"
            v-if="showPave"
            @click="showPave = !showPave"
        >
            <img src="~/static/pics/global/svg/cross.svg">
        </button>
        <button v-if="ymaps && showPave">
            <img src="~/static/pics/global/svg/ymaps.svg">
        </button>
        <button v-if="yandex && showPave">
            <img src="~/static/pics/global/svg/yandex.svg">
        </button>
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
