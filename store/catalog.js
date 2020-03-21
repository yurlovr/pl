export const state = () => ({
    type: null
})

export const mutations = {
    setType: (state, payload) => {
        state.type = payload;
    }
}

export const getters = {
    data: (state, getters, rootState, rootGetters) => {
        if (!state.type) return null;

        let ret = {};

        if (state.type == 'beach') {
            ret.title = 'Каталог пляжей';
            ret.grid = rootGetters.beaches;
        } else if (state.type == 'event') {
            ret.title = 'Каталог мероприятий';
            ret.grid = rootGetters.events;
        }
        if (!ret.grid)
            ret.grid = [];

        return ret;
    }
}
