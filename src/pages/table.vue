<template>
<div style="width: 80%;margin:0 auto">
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="grid-content bg-purple">
        <el-input placeholder="请输入gas" v-model="gas" suffix-icon="el-icon-menu" size="large" clearable>
          <template slot="prepend">gas</template>
        </el-input>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content bg-purple">
        <el-input placeholder="请输入gasprice" v-model="gasprice" suffix-icon="el-icon-menu" size="large" clearable>
          <template slot="prepend">gasprice</template>
        </el-input>
      </div>
    </el-col>
  </el-row>
  <el-table ref="table" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 180rem" height="600" @selection-change="SelectionChange" @select="select" @select-all="selectAll">
    <el-table-column fixed type="index" label="编号" :index="indexMethod" width="40">
    </el-table-column>
    <el-table-column fixed type="selection" width="50">
    </el-table-column>
    <el-table-column fixed prop="hash" label="打款信息hash值" width="600">
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
  <!--分页 -->
  <div class="block margin">
    <el-button class="pull-right" size="small" type="info" @click="toggleSelection()">反选</el-button>
    <el-button class="pull-right" size="small" type="danger" style="margin-right:1rem" @click="faildSelection()">筛选打款失败项目</el-button>
    <span class="demonstration"></span>
    <el-pagination
    class="pull-left"
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[10, 20, 30, 50]"
    :page-size="pagesize"
    layout="total, sizes, prev, pager, next"
    :total="total">
    </el-pagination>
  </div>
  <div class="margin">
    <el-button type="primary" size="medium" style="width:100%" @click.native="send()">发送</el-button>
  </div>
  <!--分页 -->
  <!-- <el-row :gutter="20">
    <el-col :span="12">
      <div class="grid-content bg-purple">123</div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content bg-purple">123</div>
    </el-col>
  </el-row> -->
  <Dialog :child-msg="gridData" :dialogTableVisible.sync="childVisible"></Dialog>
</div>
</template>

<script>
import Dialog from '../components/dialog'
export default {
  data() {
    return {
      tableData: [],
      faildTableData:[],
      multipleSelection: [],//多选框的值
      gas: '',
      gasprice: '',
      currentPage: 1,
      pagesize:10,//初始表格每页展示数量
      total:5,//初始表格总数
      gridData: [],//初始表格每页展示数量
      childVisible:false,
      hashList:[],//post的哈希数组
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
          that.total = res.data.length
          console.log(that.tableData)
          console.log(that.total)
          console.log(that.currentPage)
          console.log(that.pagesize)
        }).catch((res) => {})
    },
    indexMethod(index) {
      return index * 1 +1;
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
          let i = 1
          i++
          console.log(i)
        });
      } else {
        this.$refs.table.clearSelection();
      }
    },
        //---------------------------------------------------------------------筛选所有的faild的项目
    faildSelection(){
        console.log(this.tableData)
        if(this.faildTableData.length == 0){
          this.tableData.forEach((item)=>{
            if(item.status == "faild"){
                this.faildTableData.push(item)
            }
            this.tableData = this.faildTableData
            this.currentPage = 1
            this.pagesize = this.faildTableData.length
          })
        }else{
          this.$message({
            type: 'error',
            showClose: true,
            message: '已选中所有的失败打款项目,请勿重复选择!',
          })
        }
    },
    select(selection){
      if (this.gas == '' || this.gasprice == '') {
        this.gas = ''
        this.gasprice = ''
        this.$refs.table.clearSelection();
        this.$message({
          type: 'error',
          showClose: true,
          message: '失败,输入内容不能为空!',
        })
      }
    },
    SelectionChange(selection, row) {
      this.multipleSelection = selection
      console.log(this.multipleSelection)
      this.$message({
        type: 'success',
        showClose: true,
        message: '已选择' + this.multipleSelection.length + '项',
      })
    },
    selectAll(selection){
        console.log(selection)
    },
    //---------------------------------------------------------------------分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val;
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
        this.childVisible = true
        this.gridData = this.multipleSelection
        this.gridData.forEach((item)=>{
          this.hashList.push(item.hash)
        })
        const hash =  this.hashList
        this.axios.post('http://172.10.2.7/public/home/index/afresh_info',hash).then((res)=>{
          console.log(res)
        }).catch((res)=>{

        }),
        console.log(this.gridData)
        console.log(this.hashList)
      }
    }
  },
  computed: {

  },
  components: {
    Dialog
  },
  mounted: function() {
    this.getData()
  }
}
</script>

<style lang="less">
td {
    text-align: left;
}
.block {
  overflow: hidden;
}
.margin {
    margin: 2rem 0;
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
