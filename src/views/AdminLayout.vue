<template>
  <div class="container">
    <div class="header">
      <el-row>
        <el-col :span="3">
          <div class="logo-space">
            <img src="../assets/Untitled-1.png" alt="">
          </div>
        </el-col>
        <el-col :span="18">
          <div class="header-tunz d-flex align-items-center">
            <b>
              Không gian quản lý công việc
            </b>
          </div>
        </el-col>
        <el-col :span="3">
          Avatar
        </el-col>
      </el-row>
    </div>
    <div class="content">
      <el-row>
        <el-col :span="24">
          <router-view/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminLayout"
}
</script>

<style scoped lang="scss">
.el-col{
  justify-content: center;
  align-items: center;
  .logo-space{
    img{
      width: 100%;
    }
  }
}
.clear{
  clear: both;
}
</style>