<template>
<div id="app">
  <!-- <img src="./assets/logo.png"> -->
  <h1>打款信息展示表格</h1>
  <h4>(注意:需要先把输入框内容填写完毕才可选择选择列表)</h4>
  <router-view/>
</div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h4 {
  color: red
}
</style>
