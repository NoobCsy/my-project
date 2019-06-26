<template>
  <el-card>
    <!-- 面包屑 -->
    <mybread one="商品管理" two="商品分类"></mybread>
    <!-- 添加分类 -->
    <el-button class="mybtn" type="success" @click="openAdd">添加分类</el-button>
    <!-- 表格 -->
    <el-table :data="pageList" width="100%" v-loading= "loading">
      <el-table-tree-column
        label="分类名称"
        width="220"
        prop="cat_name"
        file-icon="icon icon-file"
        folder-icon="icon icon-folder"
        parentKey="cat_pid"
        levelKey="cat_level"
        treeKey="cat_id"
      ></el-table-tree-column>
      <el-table-column prop="description" label="级别" width="180">
        <template
          slot-scope="scope"
        >{{ scope.row.cat_level === 0 ? '一级': scope.row.cat_level === 1? '二级': '三级'}}</template>
      </el-table-column>
      <el-table-column label="是否有效" width="180">
        <template slot-scope="scope">{{ scope.row.cat_deleted === false ? '有效': '无效'}}</template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
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
    <!-- 添加分类框 -->
    <el-dialog title="新增分类" :visible.sync="openAddVisible">
      <el-form>
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="cateName"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-cascader
            clearable
            v-model="selValue"
            :options="selData"
            :props="{ expandTrigger: 'hover', checkStrictly: true, label: 'cat_name', value: 'cat_id'}"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="openAddVisible=false">取 消</el-button>
        <el-button type="primary" @click="addFn">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import mybread from "../layout/mybread.vue"
export default {
  data() {
    return {
      loading: true,
      pageList: [],
      categoriesList: [],
      pageList: [],
      pagenum: 1,
      pagesizes: [5, 10, 15],
      pagesize: 5,
      total: 0,
      cateName: "",
      openAddVisible: false,
      formLabelWidth: "80px",
      selValue: [],
      selData: []
    }
  },
  components: {
    mybread
  },
  methods: {
    //获取分页数据
    getcategoriesList() {
      this.$http({
        method: "GET",
        url: "categories"
      }).then(res => {
        let { data, meta } = res.data
        if (meta.status === 200) {
          this.categoriesList = data
          this.total = this.categoriesList.length
          this.getPageList()
          this.loading = false
        }
      })
    },
    //分页
    getPageList() {
      let begin = this.pagesize * (this.pagenum - 1)
      let end = this.pagesize * this.pagenum - 1
      this.pageList = this.categoriesList.slice(begin, end)
    },
    //当前页改变
    currChange(currentPage) {
      this.pagenum = currentPage
      this.getPageList()
    },
    //页容量改变
    sizeChange(pagesize) {
      this.pagesize = pagesize
      this.getPageList()
    },
    //打开添加分类框
    openAdd() {
      this.openAddVisible = true
      this.getTwoData()
    },
    //获取二级数据
    getTwoData() {
        this.$http({
            method: 'GET',
            url: 'categories?type=2'
        }).then( res => {
            let {meta, data} = res.data
            if (meta.status === 200) {
                this.selData = data
            } else {
                this.$message.error(meta.msg)
            }
        })
    },
    //新增分类
    addFn() {
        let level = this.selValue.length
        let pid = this.selValue.length === 0 ? 0 : this.selValue[this.selValue.length-1] 
        this.$http({
            method: 'POST',
            url: 'categories',
            data: {
                cat_name: this.cateName,
                cat_level: level,
                cat_pid: pid 
            }
        }).then( res => {
                if (res.data.meta.status === 201) {
                    this.$message.success(res.data.meta.msg)
                } else {
                    this.$message.error(res.data.meta.msg)
                }
                this.openAddVisible = false
            })
    }
  },
  mounted() {
    this.getcategoriesList()
  }
}
</script>

<style scoped>
.mybtn {
  margin-top: 20px
}
</style>
