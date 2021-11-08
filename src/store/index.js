import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import work from './modules/work'
import detailTask from './modules/detailTask'
import auth from './modules/auth'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        user,
        work,
        detailTask,
        auth
    },
    plugins: [createPersistedState({paths: ['auth']})],
    state: {},
    getters: {},
    mutations: {},
})
export default store