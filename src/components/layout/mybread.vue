<template>
     <el-breadcrumb separator=">" class="mybread">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ one }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ two }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
  name: 'mybread',
  props: ['one', 'two']
}
</script>

<style>

</style>
