import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Template from '@/modules/moduleTemplate/Template'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Template',
      component: Template
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
    }
  ]
})
