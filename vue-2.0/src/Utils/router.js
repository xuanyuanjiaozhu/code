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
      path: "/",
      redirect: "/mixin"
    },
    {
      path: '/mixin',
      name: 'Mixin',
      component: () => import("../View/1-mixin"),
      children: [
        {
          path: "mixin-1",
          name: "Mixin-1",
          component: () => import("../components/Mixin/Mixin-1")
        }
      ]
    },
    {
      path: "/store",
      name: "Store",
      component: () => import("../View/2-store"),
      children: [
        {
          path: "store-1",
          name: "Store-1",
          component: () => import("../components/Store/Store-1")
        },
        {
          path: "store-2",
          name: "Store-2",
          component: () => import("../components/Store/Store-2")
        },
      ]
    },
    {
      path: '/sass',
      name: "Sass",
      component: () => import("../View/3-sass"),
      children: [
        {
          path: 'sass-1',
          name: "Sass-1",
          component: () => import('../components/Sass/Sass-1')
        }
      ]
    },
    {
      path: "/keep-alive",
      name: "Keep-alive",
      component: () => import('../View/4-keep-alive'),
      children: [
        {
          path: 'keep-alive-1',
          name: 'Keep-alive-1',
          component: () => import('../components/Keep-alive/Keep-alive-1'),
          meta: {
            // keepAlive: true,
          }
        },
        {
          path: 'keep-alive-2',
          name: 'Keep-alive-2',
          component: () => import('../components/Keep-alive/Keep-alive-2'),
          meta: {
            // keepAlive: true,
          }
        },
        {
          path: 'keep-alive-3',
          name: 'Keep-alive-3',
          component: () => import('../components/Keep-alive/Keep-alive-3'),
          meta: {
            // keepAlive: true,
          }
        },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  if (to.fullPath !== from.fullPath) {
    // if (to.name == "Keep-alive-1"){
    //   to.meta.keepAlive = true;
    // }else {
    //   to.meta.keepAlive = false;
    // }
    next()
  }
})
router.afterEach((to, from) => {
  // console.log(to, from)
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = "敲代码的猪"
  }
});

export default router;
