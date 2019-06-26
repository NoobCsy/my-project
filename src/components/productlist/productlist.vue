<template>
    <el-card>
        <!-- 面包屑导航 -->
        <mybread one="商品管理" two="商品列表"></mybread>
        <!-- 搜索框 -->
    <el-row class="myrow">
      <el-col :span="8">
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="success" plain @click="toAddPage">添加商品</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格" width="180"></el-table-column>
      <el-table-column prop="goods_number" label="商品数量" width="180"></el-table-column>
      <el-table-column label="创建时间" width="180">
          <template slot-scope="scope">
              {{scope.row.add_time | dataForm}}
          </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
        <el-row>
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini" ></el-button>
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
    </el-card>
</template>

<script>
import mybread from '../layout/mybread'
export default {
    components: {
        mybread
    },
    data() {
        return {
            tableData: [],
            pagenum: 1,
            pagesizes: [5,10,15],
            pagesize: 5,
            total: 10,
            loading: true
        }
    },
    methods: {
        // 获取全部商品数据
        getProduct() {
            this.$http({
                method: 'GET',
                url: `goods?query=&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
            }).then( res => {
                let {meta, data} = res.data
                if (meta.status === 200) {
                    this.tableData = data.goods
                    this.total = data.total
                    this.loading = false
                }
            })

        },
        //页码改变
        currChange(currentPage) {
            this.pagenum = currentPage
            this.getProduct()
        },
        //页容量改变
        sizeChange(pagesize) {
            this.pagesize = pagesize
            this.getProduct()
        },
        //跳转去添加商品
        toAddPage() {
            this.$router.push('/productlist/add')
        }
    },
    mounted() {
        this.getProduct()
    }
}
</script>

<style scoped>
    .myrow {
        margin-top: 10px;
    }
</style>
