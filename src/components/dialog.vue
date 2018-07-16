<template>
<el-dialog title="提示" :visible.sync="Visible" :show="show" width="30%" center @close="$emit('updata:show',false)">
  <span>需要注意的是内容是默认不居中的</span>
  <span slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
</el-dialog>
</template>

<script>
export default {
  data() {
    return {
      Visible: this.show
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show() {
      this.visible = this.show;
    }
  }
}
</script>

<style lang="css">
</style>
