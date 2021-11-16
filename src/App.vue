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
//Date Picker
.el-date-picker{
  top: 208px !important;
  left: 616px !important;
  background-color: #1e1e1e !important;
  color: white !important;
}
.el-date-picker__header-label{
  color: white !important;
}
.el-picker-panel__icon-btn{
  color: white !important;
}
.el-date-table th{
  color: white !important;
}
.el-date-table td.available:hover span{
  color: #ed145b !important;
  background-color: white;
}
.el-date-table td.today span{
  color: #ed145b !important;
}
.el-date-table td.current:not(.disabled) span{
  color: #ed145b !important;
  background-color: white !important;
}
.v-modal{
  z-index: -8 !important;
}
.el-message-box__wrapper{
  background-color: #0b0b0b85;
}
.el-dialog__wrapper{
  background-color: #0b0b0b85;
}
.el-color-picker__trigger{
  border: none !important;
  width: 135px !important;
}
.el-color-picker__panel{
  background-color: #00000082 !important;
  border: none !important;
  border-radius: 10px !important;
  border-right: 3px solid white !important;
  border-left: 3px solid white !important;
}
.el-input__inner{
  background-color: #00000000 !important;
  color: white !important;
}
.el-input__inner:focus{
  border-color: #ed145b !important;
}
.el-button--text{
  display: none !important;
}
.is-plain{
  background-color: #ed145b !important;
  color: white !important;
}
.is-plain:hover{
  border-color: #00000000 !important;
}
.el-progress-bar__inner{
  background-color: #ed145b !important;
}
</style>
<script>
export default {
  name:'App'
}
</script>