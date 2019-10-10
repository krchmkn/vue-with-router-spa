import Api from '@/api/';

export default {
    strict: true,
    state: {
        days: [],
        bills: [],
        operations: []
    },
    getters: {
        days: state => {
            let result = [...state.days].map((val) => val.OpDate);
            result.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
            return result;
        },
        rawDays: state => [...state.days],
        bills: state => [...state.bills],
        operations: state => [...state.operations]
    },
    mutations: {
        setDays: (state, payload) => state.days = [...payload.data],
        setBills: (state, payload) => state.bills = [...payload.data],
        setOperations: (state, payload) => state.operations = [...payload.data]
    },
    actions: {
        async requestDays({ commit }) {
            let result = await Api.request('OpDate');
            commit('setDays', { data: result });
        },
        async requestBills({ commit }) {
            commit('setBills', { data: await Api.request('AcctPos') });
        },
        async requestOperations({ commit }) {
            commit('setOperations', { data: await Api.request('OpEntry') });
        },
        async removeDay({ commit, state }, payload) {
            commit('setDays', { 
                data: state.days.filter((day) => (day.OpDate === payload ? false : true))
            });
            Api.removeDay(payload);
        },
        async removeBill({ commit, state }, payload) {
            commit('setBills', { 
                data: state.bills.filter((bill) => (bill.AcctNum === payload ? false : true))
            });
            Api.removeBill(payload);
        },
        async removeOperation({ commit, state }, payload) {
            commit('setOperations', {
                data: state.operations.filter((operation) => {
                    if (operation.OpDate === payload.OpDate
                        && operation.AcctNumCr === payload.AcctNumCr
                        && operation.AcctNumDB === payload.AcctNumDB) {
                        return false;
                    }
                    return true;
                })
            });
            Api.removeOperation(payload);
        }
    }
}
