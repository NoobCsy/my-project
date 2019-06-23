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
          <el-switch active-color="#13ce66" inactive-color="#ff4949" v-model="scope.row.mg_state" @change="switchChange(scope.row.mg_state,scope.row.id)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
        <el-row>
          <el-button type="primary" icon="el-icon-edit" plain size="mini" @click="update(scope.row.id)"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini" @click="delUser(scope.row.id)"></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini" @click="roles(scope.row.id)"></el-button>
        </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="pagenum"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      :total="total"
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
    <el-button type="primary" @click="addUserFn">确 定</el-button>
  </div>
  </el-dialog>
  <!-- 编辑框 -->
  <el-dialog title="修改用户" :visible.sync="updDialog">
    <el-form :model="updUser">
    <el-form-item label="用户名" :label-width="formLabelWidth" >
      <el-input autocomplete="off" v-model="updUser.username" disabled></el-input>
    </el-form-item>
    <el-form-item label="邮箱" :label-width="formLabelWidth" >
      <el-input autocomplete="off" v-model="updUser.email" ></el-input>
    </el-form-item>
    <el-form-item label="电话" :label-width="formLabelWidth" >
      <el-input autocomplete="off" v-model="updUser.mobile" ></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="updDialog=false">取 消</el-button>
    <el-button type="primary" @click="updUserFn">确 定</el-button>
  </div>
  </el-dialog>
  <!-- 角色分配框 -->
  <el-dialog title="分配角色" :visible.sync="roleDialog">
    <el-form :model="rolesObj">
    <el-form-item label="用户名" :label-width="formLabelWidth" >
      <el-input autocomplete="off" v-model="rolesObj.username" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item :label-width="formLabelWidth" label="角色">
     <el-select v-model="rolesObj.rid" placeholder="请选择">
       <el-option label="请选择" :value="-1">
    </el-option>
    <el-option
      v-for="item in selDataList"
      :key="item.id"
      :label="item.roleName"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="roleDialog=false">取 消</el-button>
    <el-button type="primary" @click="setRoleFn">确 定</el-button>
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
      pagesizes: [2, 5, 7, 10],
      dialogFormVisible: false,
      updDialog: false,
      roleDialog: false,
      formLabelWidth: '80px',
      addUser: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      updUser: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      rolesObj: {
        id: '',
        rid: '',
        roleName: '',
        username: ''
      },
      selDataList: []
    }
  },
  methods: {
    // 获取全部数据
    getTableData () {
      this.$http({
        method: 'GET',
        url: `users?query=${
          this.query
        }&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      }).then(res => {
        let { data, meta } = res.data
        if (meta.status === 200) {
          if (data.users.length === 0 && this.pagenum !== 1) {
            this.pagenum--
            this.getTableData()
            return
          }
          this.tableData = data.users
          this.total = data.total
        }
      })
    },
    // 当前页改变
    currChange (currentPage) {
      this.pagenum = currentPage
      this.getTableData()
    },
    // 页码容量改变
    sizeChange (pagesize) {
      this.pagesize = pagesize
      this.getTableData()
    },
    // 搜索
    search () {
      this.getTableData()
    },
    // 打开新增框
    openDialog () {
      this.dialogFormVisible = true
    },
    // 关闭新增框
    cancelDialog () {
      this.dialogFormVisible = false
    },
    // 新增用户
    addUserFn () {
      this.$http({
        method: 'POST',
        url: 'users',
        data: this.addUser
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
    },
    // 用户状态改变
    switchChange (state, id) {
      this.$http({
        method: 'PUT',
        url: `users/${id}/state/${state}`
      }).then(res => {
        if (res.data.meta.status === 200) {
          this.$message.success(res.data.meta.msg)
        } else {
          this.$message.error(res.data.meta.msg)
        }
      })
    },
    // 删除用户
    delUser (id) {
      this.$confirm('确定要删除该用户吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: `users/${id}`,
          method: 'DELETE'

        }).then(res => {
          if (res.data.meta.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getTableData()
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 打开修改框
    update (id) {
      this.$http({
        method: 'GET',
        url: `users/${id}`
      }).then(res => {
        let {data, meta} = res.data
        if (meta.status === 200) {
          this.updUser = data
          this.updDialog = true
        }
      })
    },
    // 修改用户信息
    updUserFn () {
      this.$http({
        method: 'PUT',
        url: `users/${this.updUser.id}`,
        data: {mobile: this.updUser.mobile, email: this.updUser.email}
      }).then(res => {
        if (res.data.meta.status === 200) {
          this.getTableData()
          this.$message.success(res.data.meta.msg)
        } else {
          this.$message.error(res.data.meta.msg)
        }
        this.updDialog = false
      })
    },
    // 打开角色分配面板
    roles (id) {
      this.$http({
        url: `users/${id}`,
        method: 'GET'
      }).then(res => {
        let {data, meta} = res.data
        if (meta.status === 200) {
          this.rolesObj = data
          this.roleDialog = true
          this.$http({
            method: 'GET',
            url: 'roles'

          }).then(res => {
            if (res.data.meta.status === 200) {
              this.selDataList = res.data.data
            }
          })
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    // 分配角色
    setRoleFn () {
      this.$http({
        method: 'PUT',
        url: `users/${this.rolesObj.id}/role`,
        data: {rid: this.rolesObj.rid}
      }).then(res => {
        if (res.data.meta.status === 200) {
          this.$message.success(res.data.meta.msg)
        } else {
          this.$message.error(res.data.meta.msg)
        }
        this.roleDialog = false
      })
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
