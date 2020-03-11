export default function (to, from, savedPosition) {
  if (to.hash) {
  	if (document.querySelector(to.hash))
    	return window.scrollTo({ top: document.querySelector(to.hash).offsetTop - (window.innerWidth <= 500 ? 50 : 120), behavior: 'smooth' });
   	else return window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}