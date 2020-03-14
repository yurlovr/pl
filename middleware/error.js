export default function ({ app, redirect }) {
	if (app.router.history.current.matched.length == 0)
		redirect('/404');
}