<template>
    <div id="sass">
      <p class="title">sass</p>
      <div class="section">
        <p class="name">sass</p>
      </div>

    </div>
</template>

<script>
    export default {
        name: "Sass-1"
    }
</script>

<style scoped lang="scss">
  #sass{
  color: #00bcd4;
    .title{
      font-size: 16px;
    }
    .section{
      border: 1px solid #1e88e5;
      border-radius: 4px;
      padding-left: 20px;
      .name{
        color: #ccc;
      }
    }
  }


</style>
