<template>
  <div id="D3">
    <div v-for="item in button" @click.stop="jump(item.name)" class="nav">
      <b @click="jump(item.name)">{{item.name}}:</b>
      <p v-if="item.children" style="display:flex;align-items: center;flex-wrap: wrap">
        <button v-for="cItem in item.children" @click.stop="jump(cItem.name)">{{cItem.name}}</button>
      </p>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import router from '../router'

  function routerArrs (ra, n) {
    let routers = []
    for (let i = n; i < ra.length; i++) {
      routers.push({name: ra[i].name, id: ra[i].name + i, path: ra[i].path, children: ''})
      if (ra[i].children) {
        routers[i - n].children = routerArrs(ra[i].children, 0)
      }
    }
    return routers
  }

  let routerArr = routerArrs(router.options.routes, 1)
  export default {
    name: 'D3',
    data () {
      return {
        button: routerArr
      }
    },
    methods: {
      jump (name) {
        this.$router.push({name})
      }
    }
  }
</script>

<style scoped>
  /*#D3{*/
  /*  height: 100%;*/
  /*  width: 100%;*/
  /*}*/
  .nav {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: #666 1px solid;
  }

  button {
    margin-left: 10px;
  }
</style>
