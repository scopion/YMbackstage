import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import table from '@/pages/table' //引入table组件

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    { //配置table页面的路由到根目录
      path: '/',
      name: 'table',
      component: table
    }
  ]
})
