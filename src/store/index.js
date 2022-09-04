import { createStore } from 'vuex';
import router from './../router.js';

const store = createStore({
    state() {
        return {
            isLoggedIn: false,
        };
    },
    getters: {
        isLogged(state) {
            return state.isLoggedIn;
        },
    },
    mutations: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        },
    },
    actions: {
        login(context) {
            context.commit('login');
        },
        logout(context) {
            context.commit('logout');
            if (router.currentRoute._value.meta.needsAuth) router.push('/');
        },
    },
});

export default store;
