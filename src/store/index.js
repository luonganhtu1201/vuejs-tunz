import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import work from './modules/work'
import detailTask from './modules/detailTask'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    modules: {
        user,
        work,
        detailTask
    }
})
export default store