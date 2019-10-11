<template>
  <div class="container">
    <el-container>
      <el-header>
        <Menu />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Menu from '@/components/Menu';

export default {
  components: { Menu }
}
</script>

<style lang="scss">
  .container {
    min-width: 600px;
    
    & h1 {
        padding: 30px 0;
        font-size: 28px;
    }

    & .el-menu-item {
        display: flex;
        align-items: stretch;
        padding: 0;

        & a {
            text-decoration: none;
            padding: 0 20px;
        }
    }

    & .el-table {
      & .cell {
        white-space: nowrap;
      }
    }
  }
</style>