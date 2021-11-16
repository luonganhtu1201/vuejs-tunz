export default {
    namespaced: true,
    state: {
        // Khai báo state
        detailCard: {},
        filesCard:[],
        srcCard:[],
        logTime:''
    },
    getters: {
        // Khai báo getters
    },
    mutations: {
        // Khai báo mutations
        setDetailCard(state,data){
            state.detailCard = data
        },
        setFilesCard(state,data){
            state.filesCard = data
        },
        setSrcCard(state,data){
            state.srcCard = data
        },
        warningTime(state,data){
            state.logTime = data
        }
    },
}