<template>
<div>
  <el-dialog :title="title" :visible="visible" width="60%" center>
    <el-tag type="danger" hit>gas:{{gas}}</el-tag>
    <el-tag type="danger" hit>gasprice:{{gasprice}}</el-tag>
    <el-table :data="gridData">
      <el-table-column fixed="left" property="hash" label="哈希值" width="550"></el-table-column>
      <el-table-column property="wallet" label="钱包地址" width="350"></el-table-column>
      <el-table-column property="amount" label="金额" width="220"></el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="haha">取 消</el-button>
      <el-button type="primary"  @click="haha">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: 'http://172.10.2.7/public/index.php/home/index',
      title: "已选条目详情",
      formLabelWidth: '1200px',
      infoArray: []
    }
  },
  props: ['gridData', 'visible', 'gas', 'gasprice', 'info'],
  methods: {
    haha: function() {
      let data = {
        show: false
      }
      this.$emit('show', data)
      this.info.data.forEach((item) => {
        this.infoArray.push(item.hash + ":" + item.wallet + ":" + item.amount)
      })
      console.log(this.infoArray)
      const shotData = { //构建发送的json数据
        gas: this.gas,
        gasprice: this.gasprice,
        // info: this.infoArray
        info: ["0xee05ac226d4b0e0d9b6b3a51915fc3f63d47d363a372d35eb46ec5ac30d69efd:0x3d975872c210b1e47c657264db3f0b6652dbe5df:1090902367"]
      }
      console.log(shotData)
      this.axios.post(this.baseUrl + '/afresh', shotData).then((res) => {
        console.log(res)
      }).catch((res) => {

      })
    }
  },
  watch: {

  }
}
</script>

<style lang="css">
</style>
