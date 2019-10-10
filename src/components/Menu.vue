<template>
    <div>
        <el-menu :default-active="activeLink" mode="horizontal">
            <el-menu-item index="/">
                <router-link to="/">Счета</router-link>
            </el-menu-item>
            <el-menu-item index="/days">
                <router-link to="/days">Операционные дни</router-link>
            </el-menu-item>
            <el-menu-item index="/operations">
                <router-link to="/operations">Операции</router-link>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    computed: {
        activeLink() {
            return this.$route.path;
        }
    }
}
</script>
