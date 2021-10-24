<template>
<div class="container">
  <div class="loginWrap">
    <div class="logo">
      <img src="../assets/Untitled-1.png" alt="">
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
    <div class="inputWrap">
      <div class="inputLabel">
        <p>Xác nhận lại mật khẩu</p>
      </div>
      <input type="password" v-model="passwordCheck">
      <div class="error">
        <span>{{errorPassCheck}}</span>
      </div>
    </div>
    <button @click="registerSs()" class="loginButton">Đăng Kí</button>
    <p>Đã có tài khoản ? <a href="/login">Đăng nhập ngay !</a></p>
  </div>
</div>
</template>

<script>
export default {
  name: "RegisterLayout",
  data(){
    return{
      email:'',
      password:'',
      passwordCheck:'',
      errorEmail:'',
      errorPass :'',
      errorPassCheck :'',
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
    registerSs(){
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
      if(this.passwordCheck === ''){
        check = false
        this.errorPassCheck = "Mật khẩu xác nhận không được để trống"
      }else if(this.password !== this.passwordCheck){
        check = false
        this.errorPassCheck = "Mật khẩu không khớp"
      }
      if(check){
        this.$message({
          message: 'Chúc mừng , Bạn đã đăng kí tài khoản thành công',
          type: 'success'
        });
        this.$router.push({ path: `/login`})
      }
    }
  }
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
    a{
      text-decoration: none;
      color : #ed145b;
    }
    .logo {
      width: 100%;

      img {
        width: 100%;
      }
    }

    .register {
      background-color: #bcbcbc;
    }

    .inputWrap {
      margin-bottom: 12px;

      p {
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
      background: #ed145b;
      color: #fff;
      border: unset;
      font-weight: bold;
      font-size: 16px;
      cursor: pointer;
    }
  }
}

.error {
  text-align: left;
  font-size: 12px;
  color: red;
  margin-top: 8px;
}

input {
  height: 50px;
  border: 1px solid #d9d9d9;
  display: block;
  outline: none;
}

input:focus, input:hover {
  outline: 1px solid #ed145b;
}
</style>