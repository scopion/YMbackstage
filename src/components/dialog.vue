<template>
<div>
  <el-dialog :title="title" :visible.sync="dialogTableVisible" width="60%" center>
    <el-table :data.sync="childMsg">
      <el-table-column fixed="left" property="hash" label="哈希值" width="550"></el-table-column>
      <el-table-column property="wallet" label="钱包地址" width="350"></el-table-column>
      <el-table-column property="amount" label="金额" width="220"></el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogTableVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
export default {
  data() {
    return {
      title:"详情",
      formLabelWidth: '1200px'
    }
  },
  props: ['childMsg','dialogTableVisible'],
  watch: {}
}
</script>

<style lang="css">
</style>
