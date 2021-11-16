<template>
  <div class="user-update">
    <div class="img-back">
    </div>
    <div class="upload-user">
      <div class="nav-change" @click="changeInfo(0)" :style="ActiveUS">
        <b>THÔNG TIN TÀI KHOẢN</b>
      </div>
      <div class="nav-change change-pass" @click="changeInfo(1)" :style="ActivePass">
        <b>ĐỔI MẬT KHẨU</b>
      </div>
      <el-row>
        <el-col :span="24">
          <div class="user">
            <div v-if="checkChange" class="info-user">
              <el-row>
                <el-col :span="24">
                  <div class="update-avt">
                    <input id="imgAv" type="file" style="display: none" @change="onFileChange"/>
                    <div id="preview" >
                      <img :src="url" @click="openUpload()"/>
                    </div>
                    <div class="update-avatar" @click="openUpload()">
                      <i class="el-icon-camera-solid"></i>
                    </div>
                  </div>
                </el-col>
                <el-col :span="24">
                  <div class="input-wrap">
                    <div class="form">
                      <input type="text" id="email" class="form__input email-disable" v-model="name" autocomplete="off" placeholder=" ">
                      <label class="form__label">Họ tên</label>
                    </div>
                    <p class="error">{{errorName}}</p>
                  </div>
                  <div class="input-wrap">
                    <div class="form">
                      <input type="text" id="email" class="form__input" disabled="" v-model="authUser.email" autocomplete="off" placeholder=" ">
                      <label class="form__label">Email</label>
                    </div>
                  </div>
                  <div class="login-button">
                    <button class="loginButton" @click="HandleInfo"><b>Cập nhật</b></button>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div v-else class="info-user pass-reset">
              <div class="input-wrap">
                <div class="form">
                  <input type="password" id="email" v-model="password" class="form__input email-disable" autocomplete="off" placeholder=" ">
                  <label class="form__label">Mật khẩu mới</label>
                </div>
                <p class="error">{{errorPass}}</p>
              </div>
              <div class="input-wrap">
                <div class="form">
                  <input type="password" id="email" v-model="confirmPass" class="form__input email-disable" autocomplete="off" placeholder=" ">
                  <label class="form__label">Xác nhận lại mật khẩu</label>
                </div>
                <p class="error">{{errorPassCheck}}</p>
              </div>
              <div class="login-button">
                <button class="loginButton" @click="HandleChangePass()"><b>Cập nhật</b></button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import api from "../api";
import {mapMutations,mapState} from "vuex";
export default {
  name: "UserUpdate",
  data(){
    return{
      avatar : '',
      url: null,
      ActiveUS : '',
      ActivePass :'',
      checkChange:true,
      name:'',
      password:'',
      confirmPass:'',
      errorPass :'',
      errorPassCheck :'',
      errorName :'',
    }
  },
  methods: {
    ...mapMutations('auth',[
      'updateAuthUser',
    ]),
    refresh(){
      this.name = ''
      this.errorName = ''
      this.errorPassCheck = ''
      this.errorPass = ''
      this.password = ''
      this.confirmPass = ''
    },
    openUpload(){
      document.getElementById('imgAv').click();
    },
    onFileChange(e) {
      this.avatar = e.target.files[0];
      this.url = URL.createObjectURL(this.avatar);
    },
    HandleInfo(){
      let check = true
      if (this.name === ''){
        check = false
        this.errorName = 'Họ tên không được để trống'
      }else if (this.name.length <= 5 ){
        check = false
        this.errorName = 'Họ tên ít nhất phải 5 kí tự'
      }
      if(check){
        let data = new FormData();
        data.append('name',this.name)
        if (typeof this.avatar === 'object'){
          data.append('avatar',this.avatar)
        }
        api.updateInfoUser(data).then(()=>{
          api.getAuth().then((res)=>{
            if (res.data.avatar !== null){
              res.data.avatar = `http://vuecourse.zent.edu.vn/storage/users/${res.data.avatar}`
            }else{
              res.data.avatar = 'https://i.pinimg.com/736x/59/18/d8/5918d8e9040516b65f93c75a9c5b8175.jpg'
            }
            this.updateAuthUser(res.data)
            this.$message({
              message: 'Cập nhật thông tin thành công ! ',
              type: 'success'
            });
          }).catch(()=>{
            this.$message({
              message: 'Cập nhật thông tin thất bại ! ',
              type: 'error'
            });
          })
        })
      }
    },
    HandleChangePass(){
      let check = true
      if (this.password === ''){
        check = false
        this.errorPass = "Mật khẩu không được để trống"
      }else if(this.password.length < 6){
        check = false
        this.errorPass = "Mật khẩu phải lớn hơn 6 ký tự"
      }
      if(this.confirmPass === ''){
        check = false
        this.errorPassCheck = "Mật khẩu xác nhận không được để trống"
      }else if(this.password !== this.confirmPass){
        check = false
        this.errorPassCheck = "Mật khẩu không khớp"
      }
      if (check){
        api.updatePassword({
          password : this.password,
          password_confirmation : this.confirmPass
        }).then(()=>{
          api.getAuth()
          this.refresh()
          this.$message({
            message: 'Cập nhật mật khẩu thành công',
            type: 'success'
          });
        }).catch(()=>{
          this.$message({
            message: 'Cập nhật mật khẩu thất bại',
            type: 'error'
          });
        })
      }
    },
    changeInfo(val){
      if (val === 0){
        this.ActiveUS = 'background-color:#141414';
        this.ActivePass = 'background-color:#1414148c';
        this.checkChange = true;
      }else {
        this.ActivePass = 'background-color:#141414';
        this.ActiveUS = 'background-color:#1414148c';
        this.checkChange = false;
      }
    }
  },
  computed:{
    ...mapState('auth',[
      'authUser'
    ])
  },
  mounted() {
    this.name = this.authUser.name
    this.url = this.authUser.avatar
  },
  watch:{
    name(){
      if (this.name.length > 0){
        this.errorName = ''
      }
    },
    passwordCheck(){
      if (this.passwordCheck.length > 0){
        this.errorOldPass = ''
      }
    },
    password(){
      if (this.password.length > 0 ){
        this.errorPass = ''
      }
    },
    confirmPass(){
      if (this.confirmPass.length > 0 ){
        this.errorPassCheck = ''
      }
    }
  }
}
</script>
<style scoped lang="scss">
.nav-change{
  cursor: pointer;
  position: absolute;
  top: -48px;
  left: 22px;
  background-color: #141414;
  color: white;
  padding: 15px;
  border-radius: 10px 10px 0px 0px;
}
.change-pass{
  left: 235px;
  background-color: #1414148c;
}
.update-avt{
  position: relative;
}
#preview {
  width: 160px;
  margin: 0 auto;
  height: 160px;
  cursor: pointer;
}

#preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 10px solid white;
}

.old-info{
  margin-top: 40px;
  color: white;
  p{
    margin-bottom: 10px;
  }
  .hr-custom{
    width: 50%;
    border: 0;
    height: 2px;
    background-image: linear-gradient(to right, #ccc, #333, #ccc);
    margin: 0 auto;
  }
}

//el-row
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.user-update{
  height: 94vh;
  .img-back{
    height: 350px;
    img{
      width: 100%;
      object-fit: cover;
      height: 100%;
    }
  }
}
.upload-user{
  position: relative;
  top: -250px;
  background-color: #141414;
  border-radius: 20px;
  width: 60%;
  margin: 0 auto;
  border-left: 1px solid white;
  border-right: 1px solid white;
}
.user{
  margin: 0 auto;

}

.info-user{
  height: 500px;
  padding-top: 30px;
  width: 50%;
  margin: 0 auto;
}
//Input
$clr-primary: #e55483;
$clr-primary-light: #e78faa;
$clr-primary-dark: #091034;
$clr-gray100: #f9fbff;
$clr-gray150: #f4f6fb;
$clr-gray200: #eef1f6;
$clr-gray300: #e1e5ee;
$clr-gray400: #767b91;
$clr-gray500: #4f546c;
$clr-gray600: #2a324b;
$clr-gray700: #161d34;
$clr-bg: #060b23;

/*   border radius */
$radius: 0.5rem;

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Convergence", sans-serif;
  height: 100vh;
  display: grid;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  background-color: $clr-bg;
}
.email-disable{
  background-image: linear-gradient(to right, #141414, #0000004d, #ff00007a) !important;
}
.pass-reset{
  padding-top: 110px;
  .input-wrap{
    margin-bottom: 30px;
  }
}
.input-wrap{
  margin: 25px 0;
  p{
    margin: 15px 0 0 15px;
    text-align: left;
    color: #ed145b;
    font-size: 14px;
  }
}
.form {
  position: relative;
  height: 3rem;
  &__input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid $clr-gray300;
    border-radius: $radius;
    font-family: inherit;
    font-size: inherit;
    color: #ffffff;
    outline: none;
    padding: 1.25rem;
    background: none;

    &:hover {
      border-color: $clr-primary-light;
    }

    /* Change border when input focus*/

    &:focus {
      border-color: $clr-primary;
    }
  }

  &__label {
    position: absolute;
    left: 1rem;
    top: 0.8rem;
    padding: 0 0.5rem;
    color: rgba(255, 255, 255, 0.99);
    cursor: text;
    transition: top 200ms ease-in, left 200ms ease-in, font-size 200ms ease-in;
    background-color: #141414;
  }
}

/*
1. When the input is in the focus state
reduce the size of the label and move upwards

2. Keep label state when content is in input field
*/

.form__input:focus ~ .form__label,
.form__input:not(:placeholder-shown).form__input:not(:focus) ~ .form__label {
  top: -0.5rem;
  font-size: 0.8rem;
  left: 0.8rem;
}

//bUTTON
.login-button{
  padding-top: 20px;
  button {
    width: 40%;
    height: 50px;
    border-radius: 5px;
    z-index: 1;
    position: relative;
    font-size: inherit;
    font-family: inherit;
    color: white;
    padding: 0.5em 1em;
    outline: none;
    border: none;
    background-color: #ed145b;
    overflow: hidden;
    cursor: pointer;
  }

  button::after {
    content: '';
    z-index: -1;
    background-color: hsla(0, 0%, 100%, 0.2);
    position: absolute;
    top: -50%;
    bottom: -50%;
    width: 4.25em;
    transform: translate3d(-1090%, 0, 0) rotate(35deg);
  }

  button:hover::after {
    transition: transform 0.65s ease-in-out;
    transform: translate3d(200%, 0, 0) rotate(35deg);
  }
}

//Upload Avatar
.update-avatar{
  position: absolute;
  left: 60%;
  font-size: 20px;
  top: 80%;
  background-color: white;
  padding: 3px 5px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0px 0px 6px 0px black;
}
</style>