<template>
<div style="width: 70%;margin:0 auto">
  <el-table ref="table" :data="tableData" style="width: 180rem" height="300" @selection-change="SelectionChange">
    <el-table-column fixed type="index" :index="indexMethod">
    </el-table-column>
    <el-table-column fixed type="selection" width="55">
    </el-table-column>
    <el-table-column fixed prop="hash" label="打款信息hash值" width="520">
    </el-table-column>
    <el-table-column prop="wallet" label="打款钱包地址" width="340">
    </el-table-column>
    <el-table-column prop="amount" label="打款金额" width="120">
    </el-table-column>
    <el-table-column prop="status" label="打款是否成功(成功:successd,失败:faild)" width="350" :filters="[{ text: '成功', value: 'successd' }, { text: '失败', value: 'faild' }]" :filter-method="filterTag" filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.status === 'successd' ? 'success' : 'danger'"
          disable-transitions>{{scope.row.status}}</el-tag>
      </template>>
    </el-table-column>
  </el-table>
  <div class="block margin">
    <el-button class="pull-left" size="small" type="danger" @click="toggleSelection()">取消选择</el-button>
    <span class="demonstration"></span>
    <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
    </el-pagination>
  </div>
  <!-- <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
  </div> -->
  <el-row :gutter="20">
    <el-col :span="10">
      <div class="grid-content bg-purple">
        <el-input placeholder="请输入gas" v-model="gas" suffix-icon="el-icon-menu" size="large" clearable>
          <template slot="prepend">gas</template>
        </el-input>
      </div>
    </el-col>
    <el-col :span="10">
      <div class="grid-content bg-purple">
        <el-input placeholder="请输入gasprice" v-model="gasprice" suffix-icon="el-icon-menu" size="large" clearable>
          <template slot="prepend">gasprice</template>
        </el-input>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="grid-content bg-purple">
        <el-button type="primary" size="medium" style="width:100%" @click.native="send()">发送</el-button>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="grid-content bg-purple">123</div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content bg-purple">123</div>
    </el-col>
  </el-row>
</div>
</template>

<script>
import Dialog from 'dialog'
export default {
  data() {
    return {
      tableData: [],
      selection: [],
      gas: '',
      gasprice: '',
      currentPage: 10,
    }
  },
  methods: {
    getData: function() {
      let that = this
      that.axios.get('http://172.10.2.7/public/home/index/wal_al') //赋值可以用箭头函数 或者是然后在内部方法中使用该属性(let that = this)
        .then((res) => {
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].amount = res.data[i].amount / 1000000000
          }
          that.tableData = res.data
          console.log(that.tableData)
        }).catch((res) => {})
    },
    indexMethod(index) {
      return index * 1;
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.status === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.table.toggleRowSelection(row);
        });
      } else {
        this.$refs.table.clearSelection();
      }
    },
    SelectionChange(val) {
      this.selection = val;
      console.log(this.selection)
      this.$message({
        type: 'success',
        showClose: true,
        message: '已选择' + this.selection.length + '项',
      })
    },
    //---------------------------------------------------------------------分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //---------------------------------------------------------------------发送信息
    send() {
      if (this.gas == '' || this.gasprice == '') {
        this.gas = ''
        this.gasprice = ''
        this.$message({
          type: 'error',
          showClose: true,
          message: '失败,输入内容不能为空!',
        })
      } else {
        this.$message({
          type: 'success',
          showClose: true,
          message: '成功!',
        })
      }
    }
  },
  computed: {},
  mounted: function() {
    this.getData()
  }
}
</script>

<style lang="less">
td {
    text-align: left;
}
.margin {
    margin-top: 2rem;
}
.pull-right {
    float: right;
}
.pull-left {
    float: left;
}
.el-row {
    margin: 2rem 0;
    &:last-child {
        margin-bottom: 0;
    }
    .el-col {
        border-radius: 4px;
    }
}
.bg-purple-dark {
    background: #99a9bf;
}
.bg-purple {
    background: #d3dce6;
}
.bg-purple-light {
    background: #e5e9f2;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

::-webkit-scrollbar-track-piece {
    background-color: #ebebeb;
}

::-webkit-scrollbar-thumb {
    transition: background-color 0.5s;
}

::-webkit-scrollbar-thumb:vertical {
    transition: background-color 0.5s;
    height: 32px;
    background-color: #a9a9a9;
    border-radius: 15px;
}

::-webkit-scrollbar-thumb:hover {
    transition: background-color 0.5s;
    height: 32px;
    background-color: #888;
}

::-webkit-scrollbar-thumb:horizontal {
    width: 32px;
    background-color: #a9a9a9;
    border-radius: 15px;
}
</style>
