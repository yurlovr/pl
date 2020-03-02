export default async ({ app }) => {
	app.router.afterEach((to, from) => {
		// app.$bus.$emit('transitionEnd');
	});
}