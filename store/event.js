export const state = () => ({
    event: [],
    api: 'https://crimea.air-dev.agency'
})

export const mutations = {
    SET_EVENT: (state, payload) => {
        state.event = payload;
    }
}

export const actions = {
    async getEvent({commit}, id) {
        commit('SET_EVENT', await this.$axios.$get(`/event/item?id=${id}`));
    }
}

export const getters = {
    eventData: (state) => {
        if (!state.event.data) return {};

        let ret = {
        	hugeSliderData: {
        		title: state.event.data.item.NAME,
                pics: state.event.data.item.PHOTOS.map((s) => { return state.api + s }),
                goldMedal: null,
                blueMedal: null
        	},

        	// mainData: {
         //        title: state.event.data.item.NAME,
         //        likes: 0,
         //        location: state.event.data.item.BEACH.CITY.NAME,
         //        beachLength: state.event.data.item.BEACH.PARAMETERS.P_LINE_LENGTH,
         //        price: state.event.data.item.BEACH.PARAMETERS.P_PRICE,
         //        beachType: state.event.data.item.BEACH.PARAMETERS.P_BEACH_TYPE.NAME,
         //        beachSeabedType: state.event.data.item.BEACH.PARAMETERS.P_BOTTOM,
         //        time: state.event.data.item.BEACH.PARAMETERS.P_MODE.NAME
         //    }
    	}

    	return ret;
    }
}