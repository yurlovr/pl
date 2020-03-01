export default function ({ app, redirect }) {
	if (app.nuxt.err != null || app.router.history.current.matched.length == 0)
		redirect('/404');
}