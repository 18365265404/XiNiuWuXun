<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
.size{

  width: 100%;
  // height: 100%;
  // overflow:auto;
}
html,body{
  .size;
  margin: 0;
  padding: 0;

}
#app {
  .size;
}
</style>
