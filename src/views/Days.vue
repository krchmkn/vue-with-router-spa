<template>
    <div>
        <h1>Операционные дни</h1>

        <el-table
          :data="rawDays"
          @current-change="selectDay"
          style="width: 100%">
          <el-table-column
            prop="OpDate"
            label="Операционный день">
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
          title="Проводки операционного дня"
          :visible.sync="dialogVisible" width="90%">
          <el-table
            :data="dayOperations"
            style="width: 100%">
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
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
      data() {
          return {
              loading: false,
              selectedDay: null,
              dialogVisible: false
          }
      },
      computed: {
          ...mapGetters(['rawDays', 'operations']),
          dayOperations() {
              return this.operations.filter((operation) => operation.OpDate === this.selectedDay);
          }
      },
      methods: {
          ...mapActions(['requestDays', 'requestOperations', 'removeDay']),
          selectDay(val) {
              if (!val) {
                return;
              }
              this.selectedDay = val.OpDate;
          },
          remove(index, row) {
            this.removeDay(row.OpDate);
          }
      },
      created() {
          (async () => {
              this.loading = true;
              await this.requestDays();
              await this.requestOperations();
              this.loading = false;
          })();
      },
  }
</script>

<style>

</style>
