export default function (to, from, savedPosition) {
  if (to.hash) {
  	if (document.querySelector(to.hash))
    	return window.scrollTo({ top: document.querySelector(to.hash).offsetTop - 100, behavior: 'smooth' });
   	else return window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}