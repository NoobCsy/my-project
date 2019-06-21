<template>
  <el-card>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="myrow">
      <el-col :span="6">
        <el-input placeholder="请输入内容" class="input-with-select" v-model="query">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="success" plain  @click="openDialog">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch active-color="#13ce66" inactive-color="#ff4949" v-model="scope.row.msg"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-row>
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
        </el-row>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="pagenum"
      :page-sizes="[2, 3, 5]"
      :page-size="pagesize"
      :total="5"
      @current-change="currChange"
      @size-change="sizeChange"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <!-- 新增框 -->
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
    <el-form :model="addUser">
    <el-form-item label="用户名" :label-width="formLabelWidth">
      <el-input autocomplete="off" v-model="addUser.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth" >
      <el-input autocomplete="off" v-model="addUser.password"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" :label-width="formLabelWidth" >
      <el-input autocomplete="off" v-model="addUser.email" ></el-input>
    </el-form-item>
    <el-form-item label="电话" :label-width="formLabelWidth" >
      <el-input autocomplete="off" v-model="addUser.mobile" ></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancelDialog">取 消</el-button>
    <el-button type="primary" @click="addUseFn">确 定</el-button>
  </div>
  </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      query: '',
      pagenum: 1,
      pagesize: 2,
      total: 0,
      dialogFormVisible: false,
      formLabelWidth: '80px',
      addUser: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    getTableData () {
      this.$http({
        method: 'GET',
        url: `http://localhost:8888/api/private/v1/users?query=${
          this.query
        }&pagenum=${this.pagenum}&pagesize=${this.pagesize}`,
        headers: { Authorization: localStorage.getItem('token') }
      }).then(res => {
        let { data, meta } = res.data
        if (meta.status === 200) {
          this.tableData = data.users
          this.total = data.total
        }
      })
    },
    currChange (currentPage) {
      this.pagenum = currentPage
      this.getTableData()
    },
    sizeChange (pagesize) {
      this.pagesize = pagesize
      this.getTableData()
    },
    search () {
      this.getTableData()
    },
    openDialog () {
      this.dialogFormVisible = true
    },
    cancelDialog () {
      this.dialogFormVisible = false
    },
    addUseFn () {
      this.$http({
        method: 'POST',
        url: 'http://localhost:8888/api/private/v1/users',
        data: this.addUser,
        headers: { Authorization: localStorage.getItem('token') }
      }).then(res => {
        if (res.data.meta.status === 201) {
          this.$message({
            message: res.data.meta.msg,
            type: 'success'
          })
          this.getTableData()
        } else {
          this.$message.error(res.data.meta.msg)
        }
        // 清空新增
        for (const key in this.addUser) {
          this.addUser[key] = ''
        }
        this.dialogFormVisible = false
      })
      this.dialogFormVisible = false
    }

  },
  mounted () {
    this.getTableData()
  }
}
</script>

<style>
.myrow {
  margin-top: 20px;
}
</style>
