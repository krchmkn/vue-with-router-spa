import mockData from './mockData';

export default {
    async request(dataKey) {
        if (!dataKey || !mockData.hasOwnProperty(dataKey)) {
            return [];
        }
        return mockData[dataKey];
    },
    async removeDay(payload) {
        mockData.OpDate = mockData.OpDate.filter((day) => (day.OpDate === payload ? false : true));
    },
    async removeBill(payload) {
        mockData.AcctPos = mockData.AcctPos.filter((bill) => (bill.AcctNum === payload ? false : true));
    },
    async removeOperation(payload) {
        mockData.OpEntry = mockData.OpEntry.filter((operation) => {
            if (operation.OpDate === payload.OpDate
                && operation.AcctNumCr === payload.AcctNumCr
                && operation.AcctNumDB === payload.AcctNumDB) {
                return false;
            }
            return true;
        });
    }
}
