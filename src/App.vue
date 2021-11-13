<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  margin: 0;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.el-message-box{
  background-color: #1e1e1e !important;
  border-radius: 10px;
  border: none !important;
  border-right: 3.5px solid white !important;
  border-left: 3.5px solid white !important;
}
.el-message-box__close{
  color: white !important;
  font-weight: bold !important;
}
.el-message-box__status{
  color: #ed145b !important;
}
.el-message-box__title,.el-message-box__message{
  color: white !important;
}
.el-button--primary{
  background-color: #ed145b !important;
  border-color: #ed145b !important;
  font-weight: bold !important;
}
</style>
<script>
export default {
  name:'App'
}
</script>