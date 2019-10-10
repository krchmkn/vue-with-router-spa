<template>
    <div>
      <h1>Счета с остатками на дату</h1>
      <div v-loading="loading">
        <div class="select-box">
          <div>Выберите день</div>
          <el-select v-model="selectedDay" placeholder="Выберите дату">
            <el-option
              v-for="(day, index) in days"
              :key="index"
              :label="day"
              :value="day">
            </el-option>
          </el-select>
        </div>

        <el-table
          :data="dayBills"
          @current-change="selectBill"
          style="width: 100%">
          <el-table-column
            prop="AcctNum"
            label="Номер счета">
          </el-table-column>
          <el-table-column
            prop="Balance"
            label="Остаток"
            width="150">
          </el-table-column>
          <el-table-column
            fixed="right"
            label=""
            width="100">
            <template>
              <el-button @click="dialogVisible = true" 
                type="text" 
                size="small">Проводки</el-button>
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
          title="Проводки"
          :visible.sync="dialogVisible" width="90%">
          <el-table
            :data="billOperations"
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
          </el-table>
          <span slot="footer">
            <el-button @click="dialogVisible = false">Закрыть</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    data() {
      return {
        loading: false,
        selectedDay: null,
        selectedBill: null,
        dialogVisible: false
      }
    },
    computed: {
      ...mapGetters(['days', 'bills', 'operations']),
      dayBills() {
        return this.bills.filter((bill) => bill.OpDate === this.selectedDay);
      },
      billOperations() {
        if (!this.selectedBill || !this.selectedDay) {
          return [];
        }
        return this.operations.filter((operation) => {
          return (operation.OpDate === this.selectedDay 
            && (operation.AcctNumCr === this.selectedBill.AcctNum 
                || operation.AcctNumDB === this.selectedBill.AcctNum)
          );
        });
      }
    },
    methods: {
      ...mapActions([
        'requestDays', 
        'requestBills', 
        'requestOperations',
        'removeBill'
      ]),
      selectBill(val) {
        if (!val) {
          return;
        }
        this.selectedBill = val;
      },
      remove(index, row) {
        this.removeBill(row.AcctNum);
      }
    },
    created() {
      (async () => {
        this.loading = true;
        await this.requestDays();
        this.selectedDay = this.days[0];
        await this.requestBills(this.selectedDay);
        await this.requestOperations();
        this.loading = false;
      })();
    },
  }
</script>

<style>
  .select-box {
    padding: 20px 0;
    line-height: 30px;
    color: #606266;
  }
</style>
