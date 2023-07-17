import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const originalPush = Router.prototype.push
// 修改 原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: 'antv'
    },
    {
      path: '/antv',
      name: 'AntV',
      component: () => import('../View/AntV'),
      children: [
        {
          path: 'g6-1',
          name: 'G6-1',
          component: () => import('../components/G6/G6-1')
        },
        {
          path: 'g6-2',
          name: 'G6-2',
          component: () => import('../components/G6/G6-2')
        },
        {
          path: 'g6-3',
          name: 'G6-3',
          component: () => import('../components/G6/G6-3')
        },
        {
          path: 'g6-4',
          name: 'G6-4',
          component: () => import('../components/G6/G6-4')
        },
        {
          path: 'g6-5',
          name: 'G6-5',
          component: () => import('../components/G6/G6-5')
        },{
          path: 'x6-1',
          name: 'X6-1',
          component: () => import('../components/X6/X6-1')
        },
      ]
    },
    {
      path: '/d3',
      name: 'D3',
      component: () => import('../View/D3'),
      children: [
        {
          path: 'base',
          name: 'Base',
          component: () => import('../components/D3/Base')
        },
        {
          path: 'chart',
          name: 'Chart',
          component: () => import('../components/D3/Chart')
        },
        {
          path: 'scale',
          name: 'Scale',
          component: () => import('../components/D3/Scale')
        },
        {
          path: 'force',
          name: 'Force',
          component: () => import('../components/D3/Force')
        },
        {
          path: 'force-1',
          name: 'Force-1',
          component: () => import('../components/D3/Force-1')
        },
        {
          path: 'force-2',
          name: 'Force-2',
          component: () => import('../components/D3/Force-2')
        },
        {
          path: 'force-3',
          name: 'Force-3',
          component: () => import('../components/D3/Force-3')
        },
        {
          path: 'force-4',
          name: 'Force-4',
          component: () => import('../components/D3/Force-4')
        },
        {
          path: 'force-5',
          name: 'Force-5',
          component: () => import('../components/D3/Force-5')
        },
        {
          path: 'force-6',
          name: 'Force-6',
          component: () => import('../components/D3/Force-6')
        },
        {
          path: 'force-7',
          name: 'Force-7',
          component: () => import('../components/D3/Force-7')
        }
      ]
    },
    {
      path: '/elementText',
      name: 'ElementText',
      component: () => import("../View/ElementText"),
      children: [
        {
          path: 'test1',
          name: 'Test1',
          component: () => import('../components/Element/Test1')
        }, {
          path: 'HeaderPage',
          name: 'HeaderPage',
          component: () => import('../components/Element/HeaderPage')
        },
      ]
    },
    {
      path: '/SVG',
      name: 'SVG',
      component: () => import('../View/SVG'),
      children: [
        {
          path: 'SVG-1',
          name: 'SVG-1',
          component: () => import("../components/SVG/SVG-1")
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  console.log(to, from, next)
  if (to.fullPath !== from.fullPath) {
    next()
  }
})
router.afterEach((to, from) => {
  console.log(to, from)
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = "敲代码的猪"
  }
});
export default router;
