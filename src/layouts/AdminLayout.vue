<template>
  <div class="container">
  <div class="header">
    <div class="logo">
      <a href="/">
        <img src="../assets/Untitled-2.png" alt="">
      </a>
    </div>
    <div class="user">
      <p><b>Hello</b>, {{authUser.name}}</p>
      <el-dropdown trigger="click">
        <img :src="authUser.avatar" alt="">
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div class="item-mng" @click="handlePush('user')">
              <i class="el-icon-setting"></i>
              Tài khoản
            </div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div class="item-mng" @click="logout">
              <i class="el-icon-switch-button"></i>
              Đăng xuất
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
  <div class="content">
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <router-view/>
        </div>
      </el-col>
    </el-row>
  </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import api from "../api";
export default {
  name: "AdminLayout",
  methods:{
    ...mapMutations('auth',[
        'updateLoginStatus',
        'updateAuthUser',
        'updateAccessToken'
    ]),
    handlePush(value){
      this.$router.push({ path: `/${value}` });
    },
    logout() {
      this.updateLoginStatus(false)
      this.updateAuthUser({})
      this.updateAccessToken('')
      this.$router.push('/login')
    }
  },
  computed:{
    ...mapState('auth',[
      'authUser'
    ])
  },
  mounted() {
    api.getAuth().then((res)=>{
      if (res.data.avatar !== null){
        res.data.avatar = `http://vuecourse.zent.edu.vn/storage/users/${res.data.avatar}`
      }else{
        res.data.avatar = 'https://i.pinimg.com/736x/59/18/d8/5918d8e9040516b65f93c75a9c5b8175.jpg'
      }
      this.updateAuthUser(res.data)
    })
  }
}
</script>

<style scoped lang="scss">
img{
  object-fit: cover;
}
.container {
  .header {
    height: 44.35px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-image: linear-gradient(160deg, #292929, black);
    padding: 0 15px;

    .logo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: white;
      height: 100%;
      a{
        height: 100%;
        img{
          height: 100%;
        }
      }
      i {
        font-size: 30px;
        margin-right: 10px;
      }

      span {
        font-family: 'Poppins', sans-serif;
        font-size: 20px;
      }
    }

    .user {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      p{
        color: white;
        margin-right: 10px;
        font-size: 14px;
      }
      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        object-fit: cover;
        cursor: pointer;
        border: 2px solid white;
      }
    }
  }

  .content {
    height: 94vh;
    background-image: url("../assets/Material-Design-High-Definition-Wallpaper-42260.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    .el-row{
      height: 100%;
      .el-col{
        height: 100%;
      }
    }
  }
}

.el-dropdown-menu {
  padding: 0;
  background-color: #131313;
  .el-dropdown-menu__item {
    width: 150px;
    padding: 0;
    color: white;
    .item-mng {
      padding: 0 15px;
    }
  }
  .el-dropdown-menu__item:hover{
    background-color: black;
    color: white;
  }
}
</style>