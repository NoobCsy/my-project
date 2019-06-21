<template>
    <el-container>
        <el-header>
            <el-row>
                <el-col :span="4">
                    <img src="../../assets/imgs/logo.png" alt="">
                </el-col>
                <el-col :span="16">
                    <h2>电商后台管理系统</h2>
                </el-col>
                <el-col :span="4">
                    <a href="#">退出</a>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {

}
</script>

<style>
    .el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
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
      color: green
  }
</style>
