<template>
  <el-card>
    <!-- 面包屑导航 -->
    <mybread one="商品管理" two="商品列表"></mybread>
    <!-- 提示 -->
    <el-alert title="添加商品信息" type="info" center show-icon class="myalert"></el-alert>
    <!-- 步骤条 -->
    <el-steps :active="active" finish-status="success" :space="200" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- 侧栏标签 -->
    <el-tabs :tab-position="tabPosition" >
      <el-tab-pane label="基本信息">
        <el-form label-width="100px" class="demo-ruleForm" labelPosition="top" :rules="rules" ref="ruleForm" :model="productMes">
          <el-form-item label="商品名称" prop="name">
            <el-input type="text" v-model="productMes.name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input type="text" v-model="productMes.price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="weight">
            <el-input type="text" v-model="productMes.weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="number">
            <el-input type="text" v-model="productMes.number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="category">
            <el-cascader
            clearable
            :props="{ expandTrigger: 'hover', checkStrictly: true}"
          ></el-cascader>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数">配置管理</el-tab-pane>
      <el-tab-pane label="商品属性">角色管理</el-tab-pane>
      <el-tab-pane label="商品图片">定时任务补偿</el-tab-pane>
      <el-tab-pane label="商品内容">定时任务补偿</el-tab-pane>
    </el-tabs>
  </el-card>
</template>
 
<script>
import mybread from "../layout/mybread";
export default {
  components: {
    mybread
  },
  data() {
    return {
      active: 0,
      tabPosition: "left",
      productMes: {

      },
      rules: {

      }
    }
  }
}
</script>

<style scoped>
.myalert {
  margin-top: 20px;
}
</style>
