export const state = () => ({
    announcementData: null,
    pageData: null,
    allBeaches: null
})

export const mutations = {
    SET_PAGE_DATA: (state, payload) => {
        state.pageData = payload;
    },

    SET_ALL_PAGES: (state, payload) => {
        state.allPages = payload;
    },

    SET_ANNOUNCEMENT_DATA: (state, payload) => {
        state.announcementData = payload;
    }
}

export const actions = {
	async getPageData({commit, state}, page) {
		commit('SET_ALL_PAGES', await this.$axios.$get('page/list?count=9999'));
        if (!state.allPages || !state.allPages.data || !state.allPages.data.list)
            return 404;
        let pageData = state.allPages.data.list.find(v => v.CODE == page);
        if (pageData) {
            commit('SET_PAGE_DATA', pageData);
            commit('SET_ANNOUNCEMENT_DATA', await this.$axios.$get(`/banner/list?page=/${page}`));
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
            text: state.pageData.DESCRIPTION,
            announcementData: {}
        }

        // adding formatted and random announcement
        if (state.announcementData && state.announcementData.data) {
            let announcement = state.announcementData.data.list[Math.floor(Math.random() * state.announcementData.data.list.length)]; // getting a random announcement
            if (announcement)
                ret.announcementData = {
                    link: announcement.LINK,
                    pic: announcement.PREVIEW_PICTURE ? state.api + announcement.PREVIEW_PICTURE : null,
                    title: announcement.NAME,
                    date: announcement.DATE,
                    description: announcement.DESCRIPTION,
                    color: announcement.COLOR
                }
        }

        return ret;
    }
}
