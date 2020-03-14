import Vue from 'vue';
import VueRouter from 'vue-router';

const eventBus = {};

eventBus.install = function (Vue) {
	Vue.prototype.$bus = new Vue();
	Vue.prototype.$bus.isMobile = false;
	Vue.prototype.$bus.goTo = (link, router, transition) => {
		if (link != '/') {
			Vue.prototype.$bus.$emit('showHeaderBgAndBar');
			Vue.prototype.$bus.$emit('tempHideHeaderBgAndBar');
		}
		if (transition != false && link.replace('/', '') != router.currentRoute.fullPath.replace('/', ''))
			Vue.prototype.$bus.$emit('transition');
		Vue.prototype.$bus.$emit('hideParams');
		setTimeout(() => {
			if (link.split('/')[0] != '')
				link = `/${link}`;
			router.push(link)
		}, 500);
	};
	// Vue.prototype.$bus.initRouter = (router) => {
	// 	router.beforeEach((to, from, next) => {
	// 		Vue.prototype.$bus.$emit('transition');
	// 		setTimeout(() => { next() }, 500);
	// 	})
	// }
}

Vue.use(eventBus);
