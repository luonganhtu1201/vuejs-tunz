export default {
    namespaced: true,
    state: {
        // Khai báo state
        detailCard: {}
    },
    getters: {
        // Khai báo getters
    },
    mutations: {
        // Khai báo mutations
        setDetailCard(state,data){
            state.detailCard = data
        },
    },
}