<template>
    <el-menu class="el-menu-vertical-demo my-menu" :unique-opened="true" :router="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="user"><i class="el-icon-menu"></i>用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
           <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="rolelist"><i class="el-icon-menu"></i>角色列表</el-menu-item>
              <el-menu-item index="rightlist"><i class="el-icon-menu"></i>权限列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
           <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="productlist"><i class="el-icon-menu"></i>商品列表</el-menu-item>
              <el-menu-item index="3-2"><i class="el-icon-menu"></i>分类参数</el-menu-item>
              <el-menu-item index="category"><i class="el-icon-menu"></i>商品分类</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
           <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1"><i class="el-icon-menu"></i>订单列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
           <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1"><i class="el-icon-menu"></i>数据报表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
</template>

<script>
export default {

}
</script>

<style>

</style>
