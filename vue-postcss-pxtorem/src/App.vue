<template>
  <div id="app">
    <button @click="jmp">click</button>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      rs:false
    }
  },
  methods:{
    jmp(){
      if (this.rs){
        this.$router.push({name:'HelloWorld'})
      }else {
        this.$router.push({name:'Home'})
      }
      this.rs = !this.rs
    }
  }
}
</script>


