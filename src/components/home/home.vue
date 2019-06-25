<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <Tophead></Tophead>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <Sidebar></Sidebar>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Tophead from '@/components/layout/tophead.vue'
import Sidebar from '@/components/layout/sidebar.vue'
export default {
  // 注册组件
  components: {
    Tophead,
    Sidebar
  },
  mounted () {
    // let token = localStorage.getItem('token')
    // if (!token) {
    //   this.$router.push({name: 'login'})
    //   this.$message.error('您还没有登录,请先登录!')
    // }
  }
}
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
.el-container {
  width: 100%;
  height: 100%;
}
.el-header h2 {
  margin: 0;
}
.el-header a {
  text-decoration: none;
  float: right;
  color: green;
}
.el-aside .my-menu {
    height: 100%;
}
</style>
