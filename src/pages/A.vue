<template>
<div>
  我是A组件
    {{msg}}
  <B @show="show" :msg="msg"></B>
</div>
</template>

<script>
import B from '../components/B'
export default {
  name: 'A',
  data() {
    return {
      msg: "我是A组件里面的数据"
    }
  },
  methods: {
    show(data) {
      console.log(2)
      this.msg = data.cityname
    }
  },
  components: {
    B
  }
}
</script>

<style lang="css" scoped>
div{
  border: 1px solid blue;
  padding: 1rem;
}
</style>
