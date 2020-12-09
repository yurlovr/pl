let currentPath = null;

export default function ({ from, store, route }) {
  if (!from || route.query.page === 1) return;
  // console.log(from)
  // console.log('route', route)
  // console.log('from.name', from.name)
  // console.log('currentPath', currentPath)
  if (from.name !== route.name) {
    currentPath = route.name;
    store.dispatch('catalog/setPage', 1);
  }
}
