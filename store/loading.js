export const state = () => ({
  loading: false,
});

export const actions = {
  setLoading: ({ commit }, loading) => {
    commit('SET_LOADING', loading);
  },
};

export const mutations = {
  SET_LOADING: (state, loading) => {
    state.loading = loading;
  },
};
