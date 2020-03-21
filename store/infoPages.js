export const state = () => ({
    pageData: null,
    allBeaches: null
})

export const mutations = {
    SET_PAGE_DATA: (state, payload) => {
        state.pageData = payload;
    },

    SET_ALL_PAGES: (state, payload) => {
        state.allPages = payload;
    }
}

export const actions = {
	async getPageData({commit, state}, page) {
		commit('SET_ALL_PAGES', await this.$axios.$get('https://crimea.air-dev.agency/api/app/page/list?count=9999'));
        if (!state.allPages || !state.allPages.data || !state.allPages.data.list)
            return 404;
        let pageData = state.allPages.data.list.find(v => v.CODE == page);
        if (pageData) {
            commit('SET_PAGE_DATA', pageData);
            return 200;
        } else {
            return 404;
        }
	}
}

export const getters = {
    data: (state) => {
        if (!state.pageData) return null;

        let ret = {
            title: state.pageData.NAME,
            text: state.pageData.DESCRIPTION
        }

        return ret;
    }
}
