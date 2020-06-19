import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Index from '@/modules/moduleIndex/Index'
import Template from '@/modules/moduleTemplate/Template'
import ChessBoardCavansTest from '@/modules/moduleChessBoardCavansTest/ChessBoardCavansTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/template',
      name: 'Template',
      component: Template
    },
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/chessboardtest',
      name: 'ChessBoardCavansTest',
      component: ChessBoardCavansTest
    }
    
  ]
})
