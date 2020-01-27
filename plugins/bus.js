import Vue from 'vue';

const eventBus = {};

eventBus.install = function (Vue) {
	Vue.prototype.$bus = new Vue();
	Vue.prototype.$bus.isMobile = false;
	Vue.prototype.$bus.goTo = (link, router) => {
		Vue.prototype.$bus.$emit('showHeaderBgAndBar');
		Vue.prototype.$bus.$emit('tempHideHeaderBgAndBar');
		router.push(link);
	};
}

Vue.use(eventBus);
