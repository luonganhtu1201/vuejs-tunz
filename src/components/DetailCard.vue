<template>
    <div class="detail-content ">
      <div class="input-Task">
        <el-row>
          <el-col :span="18">
            <input type="text" value="Task">
          </el-col>
          <el-col class="action-task" :span="6">
            <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-setting icon-setting"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-s-flag">Nhãn</el-dropdown-item>
                <el-dropdown-item icon="el-icon-date">Việc cần làm</el-dropdown-item>
                <el-dropdown-item icon="el-icon-s-order">Ngày</el-dropdown-item>
                <el-dropdown-item icon="el-icon-paperclip">Đính kèm</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </div>
      <div class="max-custom">
        <el-card>
          <div class="paperclip">
            <p><i class="el-icon-paperclip"> | </i> Đính kèm</p>
            <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url" alt="">
                <span class="el-upload-list__item-actions">
                <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)">
                  <i class="el-icon-download"></i>
                </span>
                <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </el-card>
        <el-card class="sticker">
          <el-row>
            <el-col :span="8">
              <b><i class="el-icon-s-flag"> | </i> Nhãn dán </b>
            </el-col>
            <el-col :span="16">
              <div class="due-date">
                <span class="sticker-custom" style="background-color: #ed145b">Quan trọng</span>
                <span class="sticker-custom" style="background-color: #E3760FFF">Thấp</span>
                <span class="edit-custom"><i class="el-icon-edit"></i></span>
              </div>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="detail-task">
          <el-row>
            <el-col :span="8">
              <b><i class="el-icon-alarm-clock"> | </i> Ngày hết hạn </b>
            </el-col>
            <el-col :span="16">
              <div class="due-date">
                <i class="el-icon-date"></i>
                30 tháng 10
              </div>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="todoList">
          <el-row>
            <el-col class="todo-wrap" :span="8">
              <i class="el-icon-s-order"> | </i><input type="text" value=" Việc cần làm">
            </el-col>
            <el-col class="action-task" :span="16">
              <button class="delete-todo">Xóa</button>
            </el-col>
          </el-row>
          <div class="list-todo-child">
            <el-row>
              <el-col :span="18">
                <el-checkbox>Option</el-checkbox>
              </el-col>
              <el-col class="action-task" :span="6">
                <button class="task-child-del"><i class="el-icon-delete-solid"></i></button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-checkbox>Option</el-checkbox>
              </el-col>
              <el-col class="action-task" :span="6">
                <button class="task-child-del"><i class="el-icon-delete-solid"></i></button>
              </el-col>
            </el-row>
          </div>
          <button class="btn-add-todo"><i class="el-icon-plus"></i> Thêm một mục</button>
        </el-card>
    </div>
    <div class="description">
      <el-row style="margin-bottom: 0">
        <el-col :span="12" >
          <p><i class="el-icon-s-unfold"> | </i> Mô tả</p>
        </el-col>
        <el-col :span="12" style="text-align: right">
          <p v-if="!flag" style="margin-right: 10px">
            <i class="el-icon-close icon-custom" @click="flag=true"></i>
            <i class="el-icon-check icon-custom"></i>
          </p>
        </el-col>
      </el-row>

      <p v-if="flag" >Đây là mô tả : Task <i @click="flag = false" class="item-custom el-icon-edit"></i></p>
      <textarea v-else id="" style="width: 99%;height: 40px"></textarea>
<!--      <el-input-->
<!--          type="textarea"-->
<!--          :rows="2"-->
<!--          placeholder="Please input"-->
<!--          v-model="value1"-->
<!--          >-->
<!--      </el-input>-->
    </div>
  </div>

</template>

<script>
export default {
  name: "DetailCard",
  data(){
    return{
      value1: '',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      flag:true
    }
  },
  methods: {
    handleRemove(file) {
      this.dialogImageUrl = ''
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    }
  }
}
</script>

<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.row-bg {
  background-color: #f9fafc;
}
.detail-content{
  text-align: left;
  .input-Task{
    margin-bottom: 20px;
    input{
      width: 100%;
      border: none;
      font-weight: bold;
      font-size: 22px;
      background-color: #00000000;
      color: white;
    }
  }
}
.todoList{

}
.action-task{
  text-align: right;
}
.icon-setting{
  font-size: 23px;
  cursor: pointer;
  color: white;
}
.el-card::v-deep .el-card__body{
  background-color: black;
  color: white;
}
.el-card{
  margin-bottom: 15px;
  border: none;
  border-left: 1px solid white;
  border-right: 1px solid white;
  border-radius: 10px;
}
.description{
  margin-bottom: 20px;
}
.todo-wrap{
  input{
    color: white;
    background-color: #00000000;
    border: none;
    font-weight: bold;
    font-size: 14px;
  }

}
.list-todo-child{
    margin-bottom: 25px;
  .el-row{
    background-image: linear-gradient(100deg, #80808038, #00000000);
    border-radius: 10px;
    padding: 10px;
  }
 }
.btn-add-todo{
  padding: 5px;
  background-color: #00000000;
  color: white;
  border: 2px dotted white;
  border-radius: 10px;
}
.btn-add-todo:hover{
  background-color: #808080CA;
  cursor: pointer;
}
.max-custom{
  overflow-y: scroll;
  max-height: 370px;
  margin-bottom: 10px;
}
::-webkit-scrollbar{
  width: 10px;
  height: 8px;
}
::-webkit-scrollbar-thumb{
  background-color: gray;
  border-radius: 5px;
}
.el-checkbox{
  color: white;
}
.is-checked::v-deep .el-checkbox__label{
  color: gray;
}

//button-custom
.delete-todo {
  z-index: 1;
  position: relative;
  font-size: inherit;
  font-family: inherit;
  color: white;
  padding: 0.5em 1em;
  outline: none;
  border: none;
  background-color: hsl(240, 3%, 20%);
  border-radius: 5px;
}

.delete-todo::before {
  content: '';
  z-index: -1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fc2f70;
  transform-origin: center right;
  transform: scaleX(0);
  transition: transform 0.25s ease-in-out;
  border-radius: 5px;
}

.delete-todo:hover {
  cursor: pointer;
}

.delete-todo:hover::before {
  transform-origin: center left;
  transform: scaleX(1);
  border-radius: 5px;
}

.task-child-del{
  background-color: #00000000;
  color: white;
  border: none;
  cursor: pointer;
}
.task-child-del:hover{
  color: #ee336e;
}
.sticker-custom{
  padding: 2px;
  border-radius: 4px;
  margin-right: 5px;
}
.edit-custom{
  padding: 3px 4px;
  cursor: pointer;
}
.edit-custom:hover{
  background-color: gray;
  border-radius: 50%;
}
.el-dropdown-menu{
  left: 1003px !important;
}
.item-custom{
  margin-left: 12px;
  cursor: pointer;
}
.icon-custom{
  cursor: pointer;
  padding: 3px;
  background-color: gray;
  margin-left: 5px;
}
.el-icon-close:hover{
  background-color: #ed145b;
}
.el-icon-check:hover{
  background-color: #30e166;
}
</style>