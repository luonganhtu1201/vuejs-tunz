<template>
  <el-row :gutter="20">
    <el-col :span="16"><div class="grid-content bg-purple">
      <img class="backgroud" src="../assets/Untitled-3.png" alt="">
    </div></el-col>
    <el-col :span="8">
      <div class="grid-content white-T">
        <div class="form">
          <div class="logo">
            <img src="../assets/Untitled-1.png" alt="">
            <hr class="hr-custom">
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
              <p>Xác nhận mật khẩu</p>
            </div>
            <input type="password" v-model="passwordCheck">
            <div class="error">
              <span>{{errorPassCheck}}</span>
            </div>
          </div>
          <div class="login-button">
            <button @click="registerSs()" class="loginButton">Đăng kí</button>
          </div>
          <p>Đã có tài khoản ? <span class="registerUser" @click="login()">Đăng nhập ngay !</span></p>
        </div>
      </div>
      <div class="backop"></div>
    </el-col>
  </el-row>
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
    validEmail: function (email) {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
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
    },
    login(){
      this.$router.push({ path: `/login`})
    }
  }
}
</script>

<style scoped lang="scss">
.el-row {
  margin: 0 !important;
  &:last-child {
    margin-bottom: 0;
  }
  .backgroud{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .white-T{
    position: relative;
  }
  .backop{
    position: absolute;
    width: 80px;
    height: 80px;
    top: 45%;
    background-color: white;
    left: 64%;
    border-radius: 50%;
  }
}
.el-col {
  border-radius: 4px;
  padding: 0px !important;
}
.bg-purple {
  background: black;
}
.grid-content {
  border-radius: 4px;
  height: 100vh;
  .form{
    padding: 65px;
    .logo{
      padding-bottom: 10px;
      img{
        width: 80%;
      }
      .hr-custom{
        width: 50%;
        border: 0;
        height: 2px;
        background-image: linear-gradient(to right, #ccc, #333, #ccc);
      }
    }
    .inputWrap{
      .inputLabel{
        p{
          text-align: left;
          font-weight: bold;
        }
      }
      input{
        border-radius: 10px;
        background-color: #e3e3e3;
        border: 1px solid #d9d9d9;
        display: block;
        outline: none ;
        margin: 0 auto;
        width: 85%;
        height:25px;
        padding: 10px;
      }
      input:focus,input:hover{
        background-color: #bebebe;
      }
    }
    .icon-check{
      margin: 40px 0;
      i{
        color: #ed145b;
        font-size: 30px;
      }
    }
    .login-button{
      button {
        width: 80%;
        height: 50px;
        border-radius: 5px;
        background: #ed145b;
        color: #fff;
        border: unset;
        font-weight: bold;
        font-size: 16px;
        cursor: pointer;
        margin-top: 30px;
      }
    }
    .registerUser{
      color : #ed145b;
      cursor: pointer;
    }
    .registerUser:hover{
      color: #ee0350;
    }
    .register{
      background-color: #bcbcbc;
    }
  }
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.error{
  text-align: left;
  font-size: 12px;
  color: #ee0350;
  margin-top: 12px;
}
</style>