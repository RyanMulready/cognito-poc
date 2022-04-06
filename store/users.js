export const state = () => ({
    list: [],
});

export const mutations = {
    setUserList: (state, data) => {
        state.list = data;
    },
    // eslint-disable-next-line no-unused-vars
    setUser: (state, data) => {
        // TODO: Individual user update
    },
};

export const actions = {
    async fetchUserList({ commit }) {
        try {
            const users = await this.$api.profile.list();
            return commit('setUserList', users.data?.results || []);
        } catch (e) {
            return e;
        }
    },
};

export const getters = {};
