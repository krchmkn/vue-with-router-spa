<template>
    <div>
        <h1>Операции</h1>

        <el-table
            :data="operations"
            @current-change="selectOperation"
            style="width: 100%">
            <el-table-column
                prop="OpDate"
                label="Дата"
                width="100">
            </el-table-column>
            <el-table-column
                prop="AcctNumDB"
                label="Счет дебета">
            </el-table-column>
            <el-table-column
                prop="AcctNumCr"
                label="Счет кредита">
            </el-table-column>
            <el-table-column
                prop="Amount"
                label="Сумма"
                width="100">
            </el-table-column>
            <el-table-column
                fixed="right"
                label=""
                width="100">
                <template>
                    <el-button @click="dialogVisible = true" 
                        type="text" 
                        size="small">Счета</el-button>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label=""
                width="100">
                <template slot-scope="scope">
                    <el-button type="primary" 
                        icon="el-icon-delete" 
                        @click="remove(scope.$index, scope.row)">
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
          title="Счета проводок"
          :visible.sync="dialogVisible" width="90%">
            <el-table
                :data="operationBills"
                style="width: 100%">
                <el-table-column
                    prop="AcctNum"
                    label="Номер счета">
                </el-table-column>
                <el-table-column
                    prop="Balance"
                    label="Остаток"
                    width="100">
                </el-table-column>
            </el-table>
            <span slot="footer">
                <el-button @click="dialogVisible = false">Закрыть</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
      data() {
          return {
              loading: false,
              selectedOperation: null,
              dialogVisible: false
          }
      },
      computed: {
          ...mapGetters(['operations', 'bills']),
          operationBills() {
            if (!this.selectedOperation) {
                return [];
            }
            return this.bills.filter((bill) => {
                return (bill.OpDate === this.selectedOperation.OpDate
                    && (bill.AcctNum === this.selectedOperation.AcctNumCr 
                        || bill.AcctNum === this.selectedOperation.AcctNumDB)
                );
            });
          }
      },
      methods: {
        ...mapActions(['requestOperations', 'requestBills', 'removeOperation']),
        selectOperation(val) {
            if (!val) {
                return;
            }
            this.selectedOperation = val;
        },
        remove(index, row) {
            this.removeOperation(row);
        }
      },
      created() {
          (async () => {
              this.loading = true;
              await this.requestOperations();
              await this.requestBills();
              this.loading = false;
          })();
      },
  }
</script>
