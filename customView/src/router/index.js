import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const originalPush = Router.prototype.push
// 修改 原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err=>err)
}

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'view-box'
    },
    {
      path:'/view-box',
      name:'viewBox',
      component: () => import('../view/ViewBox'),
      children:[
        {
          path:'box-1',
          name:'Box-1',
          component: () => import('../components/Box/Box-1')
        },
        {
          path:'box-2',
          name:'Box-2',
          component: () => import('../components/Box/Box-2')
        }
      ]
    }
  ]
})
