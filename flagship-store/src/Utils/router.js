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
        }
    ]
});

export default router;
