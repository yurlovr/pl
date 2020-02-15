export default function (to, from, savedPosition) {
  if (to.hash) {
    return window.scrollTo({ top: document.querySelector(to.hash).offsetTop - 100, behavior: 'smooth' });
  }
}