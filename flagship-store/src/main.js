import Vue from 'vue'
import App from './App.vue'
import router from "./Utils/router"
import "./assets/css/reset.css"
import "./Utils/rem"
import echartsGL from "echarts-gl"

Vue.config.productionTip = false;
Vue.prototype.$echartsGL = echartsGL;
new Vue({
    render: h => h(App),
    router,
    // echartsGL,
}).$mount('#app')
