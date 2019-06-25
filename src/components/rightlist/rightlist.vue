<template>
  <div>
      <!-- 面包屑导航 -->
    <mybread one="权限管理" two="权限列表"></mybread>
    <!-- 表格 -->
    <el-table  style="width: 100%" :data="tableData" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column  label="权限名称" width="200" prop="authName"></el-table-column>
      <el-table-column label="路径" width="200" prop="path"></el-table-column>
      <el-table-column  label="层级" prop="level" width="200">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import mybread from '@/components/layout/mybread.vue'
export default {
  components: {
    mybread
  },
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    getRightList () {
      this.$http({
        method: 'GET',
        url: 'rights/list'
      }).then(res => {
        if (res.data.meta.status === 200) {
          res.data.data.forEach(element => {
            switch (element.level) {
              case '0':
                element.level = '一级'
                break
              case '1':
                element.level = '二级'
                break
              case '2':
                element.level = '三级'
                break
            }
          })
          this.tableData = res.data.data
        }
      })
    }
  },
  mounted () {
    this.getRightList()
  }
}
</script>

<style>
</style>
