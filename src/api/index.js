import axios from 'axios'
import store from "../store";
import router from "../router";
import data from "bootstrap/js/src/dom/data";

const baseUrl = process.env.VUE_APP_BASE_URL;
export const apiAxios = axios.create({
    baseURL: `${baseUrl}/api`,
    headers: {
        post: {
            'Content-Type': 'application/json'
        }
    }
})

apiAxios.interceptors.request.use(config => {
    let token = store.state.auth.accessToken
    if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})
apiAxios.interceptors.response.use(undefined, (error) => {
    if (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry && router.currentRoute.name !== 'Login') {
            store.commit('auth/updateLoginStatus',false)
            store.commit('auth/updateAuthUser', {})
            store.commit('auth/updateAccessToken', '')
            return router.push({ name: 'Login' })
        }
    }
    return Promise.reject(error);
})
export default {
    register(data) {
        return apiAxios({
            method: 'post',
            url: '/auth/register',
            data: data
        })
    },
    login(data) {
        return apiAxios({
            method: 'post',
            url: '/auth/login',
            data: data
        })
    },
    getAuth(){
        return apiAxios({
            method:'get',
            url:'/auth/me'
        })
    },
    updateInfoUser(data){
        return apiAxios({
            method: 'post',
            url: '/users',
            data: data
        })
    },
    updatePassword(data){
        return apiAxios({
            method: 'put',
            url:'/users/password',
            data:data
        })
    },
    //Danh sách
    getListDirectory(){
        return apiAxios({
            method: 'get',
            url: '/directories',
            data:data
        })
    },
    addlistDirectory(data){
        return apiAxios({
            method:'post',
            url:'/directories',
            data:data
        })
    },
    updateDirectory(data) {
        return apiAxios({
            method:'put',
            url:'/directories/'+data.id,
            data:data
        })
    },
    deleteDirectory(id){
        return apiAxios({
            method:'delete',
            url:'/directories/'+id.id
        })
    },
    changeIndexDirectory(data,id){
        return apiAxios({
            method:'put',
            url:'/directories/'+id+'/index',
            data: data
        })
    },
    //Thẻ
    addCard(data){
        return apiAxios({
            method:'post',
            url:'/cards',
            data:data
        })
    },
    getDetailCard(id){
        return apiAxios({
            method:'get',
            url:'/cards/'+id
        })
    },
    updateCard(data,id){
        return apiAxios({
            method:'put',
            url:'/cards/'+id,
            data:data
        })
    },
    deleteCard(id){
        return apiAxios({
            method:'delete',
            url:'/cards/'+id
        })
    },
    changeIndexCard(data,id){
        return apiAxios({
            method:'put',
            url:'/cards/'+id+'/directory',
            data:data
        })
    },
    //Công việc cần làm
    addThingsToDo(data){
        return apiAxios({
            method:'post',
            url:'/check-lists',
            data:data
        })
    },
    updateThingsTodo(data,id){
        return apiAxios({
            method:'put',
            url:'/check-lists/'+id,
            data:data
        })
    },
    deleteThingsTodo(id){
        return apiAxios({
            method:'delete',
            url:'/check-lists/'+id
        })
    },
    //Công việc con:
    addTodoChild(data){
        return apiAxios({
            method:'post',
            url:'/check-list-childs',
            data:data
        })
    },
    deleteTodoChild(id){
        return apiAxios({
            method:'delete',
            url:'/check-list-childs/'+id
        })
    },
    updateTodoChild(data,id){
        return apiAxios({
            method:'put',
            url:'/check-list-childs/'+id,
            data:data
        })
    },
    changeStatusTodoChild(data,id){
        return apiAxios({
            method:'put',
            url:'/check-list-childs/'+id+'/change-status',
            data:data
        })
    }
}