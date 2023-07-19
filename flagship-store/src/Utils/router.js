import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

const router = new VueRouter({
    routes:[
        {
            path:"/",
            redirect:"/home"
        },
        {
            path: "/home",
            name:"Home",
            component:()=>import("../components/Home.vue")
        },
        {
            path: "/homet",
            name:"HomeT",
            component:()=>import("../components/HomeT.vue")
        },
        {
            path: "/homets",
            name:"HomeTs",
            component:()=>import("../components/HomeTs.vue")
        }
    ]
});

export default router;
