<template>
    <el-row>
        <el-col :span="4">
          <img src="../../assets/imgs/logo.png" alt>
        </el-col>
        <el-col :span="16">
          <h2>电商后台管理系统</h2>
        </el-col>
        <el-col :span="4">
          <a href="#" @click.prevent="logout">退出</a>
        </el-col>
      </el-row>
</template>

<script>
export default {
  methods: {
    logout () {
      // this.$router.push('/login')
      this.$confirm('是否退出系统', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({ name: 'login'})
        localStorage.removeItem('token')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      })
    }
  }
}
</script>

<style>

</style>
