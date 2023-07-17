const routes = [
    {
        path: '/home',
        name: "Home",
        component: () => import("@/View/Home")
    },
    {
        path: "/news",
        name: "News",
        component: () => import("@/View/News")
    },
    {
        path: "/ref",
        name: "Ref",
        component: () => import("@/View/Ref")
    },{
        path: "/reactive",
        name: "Reactive",
        component: () => import("@/View/Reactive")
    },{
        path: "/vue_proxy",
        name: "Vue_proxy",
        component: () => import("@/View/Vue_proxy")
    },{
        path: "/setup",
        name: "Setup",
        component: () => import("@/View/Setup")
    },{
        path: "/computed",
        name: "Computed",
        component: () => import("@/View/Computed")
    },{
        path: "/watch",
        name: "Watch",
        component: () => import("@/View/Watch")
    },{
        path: "/watch_erf",
        name: "Watch_ref",
        component: () => import("@/View/Watch_ref")
    },{
        path: "/watch_effect",
        name: "Watch_effect",
        component: () => import("@/View/Watch_effect")
    },{
        path: "/lifecycle",
        name: "Lifecycle",
        component: () => import("@/View/Lifecycle")
    },{
        path: "/hook",
        name: "Hook",
        component: () => import("@/View/Hook")
    },{
        path: "/toRef_toRefs",
        name: "toRef_toRefs",
        component: () => import("@/View/toRef_toRefs")
    },

]
export default routes;