import createPersistedState from 'vuex-persistedstate'
import Cookies from "js-cookie";

export default ({ store, isHMR }) => {
  if (isHMR) return;

  const cookieStorage = {
    getItem: (key) => Cookies.getJSON(key),
    setItem: (key, value) => {
      return Cookies.set(key, value, { expires: 3, secure: false });
    },
    removeItem: (key) => Cookies.remove(key),
    fetchBeforeUse: true,
  };

  if (process.browser) {
    window.onNuxtReady(nuxt => {
      createPersistedState({
        key: 'store',
        paths: [
          'favorites.events',
          'favorites.beaches',
          'favorites.visited',
          'isModalViewed',
        ],
        // filter(mutation) {
        //   return [
        //     'favorites/addBeach',
        //     'favorites/addEvent',
        //     'favorites/addVisited',
        //     'favorites/removeBeach',
        //     'favorites/removeEvent',
        //     'favorites/removeVisited',
        //   ].includes(mutation.type)
        // },
        storage:  cookieStorage,
        getState: cookieStorage.getItem,
        setState: cookieStorage.setItem,
      })(store)
    })
  }
}
