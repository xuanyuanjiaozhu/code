<template>
  <div id="4-keep-alive">
    <!--      方式1: 缓存匹配名称的组件-->
    <!--          <keep-alive  include="Keep-alive-1">-->
    <!--            <router-view></router-view>-->
    <!--          </keep-alive>-->
    <!--    方式2：不缓存匹配名称的组件-->
    <!--    <keep-alive exclude="Keep-alive-1">-->
    <!--      <router-view></router-view>-->
    <!--    </keep-alive>-->
    <!--    方式3：通过meta中配置是否缓存-->
    <!--    <keep-alive>-->
    <!--      <router-view v-if="$route.meta.keepAlive"></router-view>-->
    <!--    </keep-alive>-->
    <!--    <router-view v-if="!$route.meta.keepAlive"></router-view>-->
    <!--    方式4：通过路由守卫中配置是否缓存-->
    <!--    <keep-alive>-->
    <!--      <router-view v-if="$route.meta.keepAlive"></router-view>-->
    <!--    </keep-alive>-->
    <!--    <router-view v-if="!$route.meta.keepAlive"></router-view>-->
    <!--    方式5：通过store判断是否缓存也可以修改-->
    <keep-alive :include="getKeepAliveInclude">
      <router-view></router-view>
    </keep-alive>
    <p>{{getSum}}</p>
    <p>rrr{{getKeepAliveInclude}}</p>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "4-keep-alive",
    computed:{
      ...mapGetters(['getKeepAliveInclude','getSum'])
    },
    mounted() {
      setTimeout(()=>{

      },1000)
    }
  }
</script>

<style scoped>

</style>
