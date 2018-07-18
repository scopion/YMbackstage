<template>
<div>
我是B组件
<button type="button" name="button" @click="send()">发射数据给A组件</button>
{{msg}}
{{cityname}}
</div>
</template>

<script>
export default {
  name:'B',
  data(){
    return{
      cityname:"武汉"
    }
  },
  props:['msg'],
  methods:{
    send:function(){
      let data = {
        cityname:this.cityname
      }
      console.log(data)
      this.$emit('show',data)
      console.log(1)
    }
  },
  mounted(){}
}
</script>

<style lang="css" scoped>
div{
  border:1px solid red
}
</style>
