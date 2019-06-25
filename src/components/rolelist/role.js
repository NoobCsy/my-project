import mybread from '@/components/layout/mybread.vue'
export default {
  data () {
    return {
      tableData: [],
      roleDialog: false,
      rightlist: [],
      defaultProps: {
        label: 'authName',
        children: 'children'
      },
      defaultChecked: [],
      addDialogVisible: false,
      addRole: {
        roleName: '',
        roleDesc: ''
      },
      formLabelWidth: '80px',
      editDialogVisible: false,
      editRole: {
        roleName: '',
        roleDesc: '',
        roleId: ''
      }
    }
  },
  components: {
    mybread
  },
  methods: {
    // 获取权限数据
    loadData () {
      this.$http({
        method: 'GET',
        url: 'roles'
      }).then(res => {
        let {data, meta} = res.data
        if (meta.status === 200) {
          this.tableData = data
        } else {
          this.$message.error = meta.msg
        }
      })
    },
    // 删除权限
    del (role, rightId) {
      let roleId = role.id
      this.$http({
        method: 'DELETE',
        url: `roles/${roleId}/rights/${rightId}`
      }).then(res => {
        let {data, meta} = res.data
        if (meta.status === 200) {
          this.$message.success(meta.msg)
          role.children = data
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    // 打开角色权限分配对话框
    openDialog (rightData) {
      this.$http({
        method: 'GET',
        url: 'rights/tree'
      }).then(res => {
        let {data, meta} = res.data
        if (meta.status === 200) {
          this.rightlist = data
          this.roleDialog = true
          rightData.forEach(ele => {
            ele.children.forEach(ele => {
              ele.children.forEach(ele => {
                this.defaultChecked.push(ele.id)
              })
            })
          })
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    //打开新增角色框
    addDialog () {
      this.addDialogVisible = true
    },
    //新增角色
    addRoleFn () {
      this.$http({
        method: 'POST',
        url: 'roles',
        data: this.addRole
      }).then( res => {
        if (res.data.meta.status === 201) {
          this.$message.success(res.data.meta.msg)
          this.loadData()
        } else {
          this.$message.error(res.data.meta.msg)
        }
        for (const key in this.addRole) {
          this.addRole[key] = ''
        }
        this.addDialogVisible = false
      })
    },
    //删除角色
    delRole (id) {
      this.$http({
        method: 'DELETE',
        url: `roles/${id}`,
      }).then( res => {
        let meta = res.data.meta
        if (meta.status === 200) {
          this.$message.success(meta.msg)
        } else {
          this.$message.error(meta.msg)
        }
        this.loadData()
      })
    },
    //打开编辑角色
    editDialog(id) {
      this.$http({
        method: 'GET',
        url: `roles/${id}`
      }).then( res => {
        let {meta, data} = res.data
        if (meta.status === 200) {
          this.editRole = data
          this.editDialogVisible = true
        }
      })
    },
    //编辑角色
    editRoleFn() {
      this.$http({
        method: 'PUT',
        url: `roles/${this.editRole.roleId}`,
        data: this.editRole
      }).then( res => {
        let  meta = res.data.meta
        if (meta.status === 200) {
          this.$message.success(meta.msg)
        } else {
          this.$message.error(meta.msg)
        }
        this.editDialogVisible = false
        this.loadData()
      })
    }
  },
  mounted () {
    this.loadData()
  }
}
