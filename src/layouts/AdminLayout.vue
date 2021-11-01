<template>
  <div class="container">
  <div class="header">
    <div class="logo">
      <a href="/">
        <img src="../assets/Untitled-2.png" alt="">
      </a>
    </div>
    <div class="user">
      <el-dropdown trigger="click">
        <img src="https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-avatar-nam-1.jpg" alt="">
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div class="item-mng" @click="handlePush('user')">
              <i class="el-icon-setting"></i>
              Tài khoản
            </div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div class="item-mng" @click="handlePush('login')">
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
export default {
  name: "AdminLayout",
  methods:{
    handlePush(value){
      this.$router.push({ path: `/${value}` });
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  //background-image: url("../assets/Untitled-3.png");
  //background-size: cover;
  //background-repeat: no-repeat;
  //background-color: black;
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

      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }

  .content {
    height: 94vh;
    //background-color: #1c1c1c;
    background-image: url("https://wallpaperaccess.com/full/5139456.jpg");
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
  .el-dropdown-menu__item {
    width: 150px;
    padding: 0;

    .item-mng {
      padding: 0 15px;
    }
  }
}
</style>