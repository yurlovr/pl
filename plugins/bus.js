import Vue from 'vue';

const eventBus = {};

eventBus.install = function (Vue) {
	Vue.prototype.$bus = new Vue();
	Vue.prototype.$bus.isMobile = false;
	Vue.prototype.$bus.goTo = (link, router, transition) => {
		if (link != '/') {
			Vue.prototype.$bus.$emit('showHeaderBgAndBar');
			Vue.prototype.$bus.$emit('tempHideHeaderBgAndBar');
		}
		if (transition != false)
			Vue.prototype.$bus.$emit('transition');
		Vue.prototype.$bus.$emit('hideParams');
		setTimeout(() => {
			if (link.split('/')[0] != '')
				link = `/${link}`;
			router.push(link)
		}, 500);
	};
}

Vue.use(eventBus);
