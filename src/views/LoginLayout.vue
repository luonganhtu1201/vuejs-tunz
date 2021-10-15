<template>
  <div class="container">
    <div class="loginWrap">
      <div class="logo">
        <h1>Tunz Task</h1>
      </div>
      <div class="inputWrap">
        <div class="inputLabel">
          <p>Email</p>
        </div>
        <input type="text" v-model="email">
        <div class="error">
          <span>{{errorEmail}}</span>
        </div>
      </div>
      <div class="inputWrap">
        <div class="inputLabel">
          <p>Mật khẩu</p>
        </div>
        <input type="password" v-model="password">
        <div class="error">
          <span>{{errorPass}}</span>
        </div>
      </div>
      <button @click="loginDs()" class="loginButton">Đăng nhập</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginLayout",
  data(){
    return{
      email:'',
      password:'',
      errorEmail:'',
      errorPass :'',
    }
  },
  watch:{
    email(value){
      if (value.length>0){
        this.errorEmail = ''
      }
    },
    password(value){
      if (value.length>0){
        this.errorPass = ''
      }
    }
  },
  methods:{
    loginDs(){
      let check = true
      if (this.email === ''){
        this.errorEmail = "Email không được để trống"
        check = false
      }else if (!this.validEmail(this.email)){
        check = false
        this.errorEmail = "Email sai định dạng, vui lòng nhập lại"
      }
      if (this.password === ''){
        check = false
        this.errorPass = "Mật khẩu không được để trống"
      }else if(this.password.length < 6){
        check = false
        this.errorPass = "Mật khẩu phải lớn hơn 6 ký tự"
      }
      if(check){
        this.$router.push({ path: `/admin`})
      }
    },
    validEmail: function (email) {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;

  .loginWrap {
    background: #ffffff;
    border: none;
    box-shadow: 0px 10px 20px -3px #bebebe;
    border-radius: 10px;
    padding: 24px;
    height: max-content;
    width: 300px;

    .inputWrap {
      margin-bottom: 12px;
      p{
        font-size: 13px;
      }
      .inputLabel {
        font-weight: bold;
        margin-bottom: 8px;
        text-align: left;
      }

      input {
        width: 292px;
        height: 30px;
      }
    }

    button {
      width: 100%;
      height: 40px;
      border-radius: 5px;
      margin-top: 20px;
      background: #0080dd;
      color: #fff;
      border: unset;
      font-weight: bold;
      font-size: 16px;
      cursor: pointer;
    }
  }

  .infoWrap {
    background: #fff;
    border: 1px solid #6E6E6E;
    padding: 24px;
    height: 250px;
    width: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 24px;

    .infoLabel {
      font-weight: bold;
      color: #00AAAA;
    }
  }
}
.error{
  text-align: left;
  font-size: 12px;
  color: red;
  margin-top: 8px;
}
input{
  height: 50px;
  border: 1px solid #d9d9d9;
  display: block;
  outline: none ;
}
input:focus,input:hover{
  outline: 1px solid #6cccff;
}
</style>