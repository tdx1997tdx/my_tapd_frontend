import {createStore} from "vuex";

export default createStore({
    state: {
        user: undefined
    },
    getters: {
        getUser(state) {
            return state.user;
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {},
    modules: {}
});
