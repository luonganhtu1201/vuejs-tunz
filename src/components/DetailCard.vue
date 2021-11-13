<template>
    <div class="detail-content ">
      <div class="input-Task">
        <el-row>
          <el-col :span="18">
            <input ref="titleCard" type="text" v-model="detailCard.title" @change="updateDetailCard" @blur="changeCard(detailCard.id)">
          </el-col>
          <el-col class="action-task" :span="6">
            <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-setting icon-setting"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-s-flag">Nhãn</el-dropdown-item>
                <el-dropdown-item icon="el-icon-date" @click.native="HandleAddList(detailCard.id)">Việc cần làm</el-dropdown-item>
                <el-dropdown-item icon="el-icon-s-order">Ngày</el-dropdown-item>
                <el-dropdown-item icon="el-icon-paperclip">Đính kèm</el-dropdown-item>
                <el-dropdown-item icon="el-icon-delete-solid" @click.native="HandleDelete(detailCard.id)"><b class="deleteCard">Xóa thẻ</b></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </div>
      <div class="max-custom">
        <el-card class="detail-task">
          <el-row>
            <el-col :span="8">
              <b><i class="el-icon-alarm-clock"> | </i> Ngày hết hạn </b>
            </el-col>
            <el-col :span="16">
              <div class="due-date">
                <i class="el-icon-date"></i>
                <span v-if="detailCard.deadline">
                  {{formatDate(detailCard.deadline)}}
                </span>
                <span v-else>
                  Chưa cập nhật
                </span>
              </div>
            </el-col>
          </el-row>
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
        <el-card>
        <div class="description">
          <el-row style="margin-bottom: 0">
            <el-col :span="12" >
              <p><i class="el-icon-s-unfold"> | </i> Mô tả</p>
            </el-col>
            <el-col :span="12" style="text-align: right">
              <p v-if="!flag" style="margin-right: 10px">
                <i class="el-icon-close icon-custom" @click="HandleExit"></i>
                <i class="el-icon-check icon-custom" @click="changeCard(detailCard.id)"></i>
              </p>
            </el-col>
          </el-row>
          <p v-if="flag" >Đây là mô tả : {{detailCard.description}} <i @click="flag = false" class="item-custom el-icon-edit"></i></p>
          <textarea v-else id="" style="width: 99%;height: 40px" v-model="detailCard.description"></textarea>
        </div>
      </el-card>
        <el-card v-if="detailCard.check_lists.length > 0" class="todoList">
          <div class="check-lists" v-for="(list,index) in detailCard.check_lists" :key="index">
            <div>
              <el-row>
                <el-col class="todo-wrap" :span="8">
                  <i class="el-icon-s-order"> | </i><input ref="task" @blur="HandleUpdateTodo(list)" type="text" v-model="list.title">
                </el-col>
                <el-col class="action-task" :span="16">
                  <button class="delete-todo" @click="HandleDeleteTodo(list.id)">Xóa</button>
                </el-col>
              </el-row>
              <div class="list-todo-child" v-for="(listChild,indexChild) in list.check_list_childs" :key="indexChild">
                <el-row>
                  <el-col :span="18">
                    <el-checkbox @change="HandleUpdateStatus(listChild.id,$event)" :checked="listChild.status === 1">
                      <input type="text" class="custom-input-child" @blur="HandleUpdateTodoChild(listChild)" v-model="listChild.title">
                    </el-checkbox>
                  </el-col>
                  <el-col class="action-task" :span="6">
                    <button class="task-child-del"><i @click="HandleTodoChild(listChild.id)" class="el-icon-delete-solid"></i></button>
                  </el-col>
                </el-row>
              </div>
              <el-row>
                <el-col v-if="list.addTaskChild" :span="5" @click.native="addNewChildTodo(list)">
                  <button class="btn-add-todo"><i class="el-icon-plus" ></i>Thêm một mục</button>
                </el-col>
                <el-col v-else :span="6" @click.native="list.addTaskChild = true">
                  <button class="btn-add-todo"><i class="el-icon-plus" ></i>Thêm một mục</button>
                </el-col>
                <el-col v-if="list.addTaskChild" class="top-child" :span="19">
                  <el-row>
                    <el-col :span="10">
                      <div class="input-add-child">
                        <input type="text" v-model="titleChild" placeholder="Tiêu đề ">
                        <span></span>
                      </div>
                    </el-col>
                    <el-col class="disableTodo" :span="1" @click.native="disableTodo(list)">
                      <b >X</b>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>

          </div>
        </el-card>
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
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import {mapMutations, mapState} from "vuex";
import api from '../api'
export default {
  name: "DetailCard",
  data(){
    return{
      value1: '',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      flag:true,
      description:'',
      titleChild:''
    }
  },
  computed:{
    ...mapState('detailTask',[
        'detailCard'
    ])
  },
  methods: {
    ...mapMutations('detailTask',[
        'setDetailCard',
    ]),
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
    },
    changeCard(id){
      if (this.detailCard.title.length > 0 ){
        api.updateCard({
          title:this.detailCard.title,
          description:this.detailCard.description
        },id).then(()=>{
          this.refreshDetail()
          this.updateDetailCard();
          this.flag = true
        })
      }else{
        this.$refs.titleCard.focus()
      }
    },
    HandleExit(){
      this.refreshDetail()
      this.flag = true
    },
    updateDetailCard(){
      this.$emit('changeDetail','')
    },
    HandleDelete(id){
      this.$confirm('Bạn có chắc chắn muốn xóa thẻ này ?', 'Warning', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        api.deleteCard(id).then(()=>{
          this.updateDetailCard()
          this.$emit('HandleDeleteCard','')
          this.$message({
            type: 'success',
            message: 'Xóa thẻ thành công'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Xóa thẻ thất bại'
        });
      });
    },

    HandleAddList(id){
      this.$prompt('Nhập vào tên việc cần làm : ', 'Việc cần làm', {
        confirmButtonText: 'Tạo',
        cancelButtonText: 'Hủy',
        inputPattern: '',
      }).then(({ value }) => {
        if (value.length > 0){
          api.addThingsToDo({
            title:value,
            card_id:id
          }).then(()=>{
            this.refreshDetail()
            this.$message({
              type: 'success',
              message: 'Tạo công việc thành công'
            });
          })
        }
      }).catch(() => {

      });
    },
    HandleUpdateTodo(data){
      if (data.title.length > 0){
        api.updateThingsTodo({
          title:data.title
        },data.id).then(()=>{
          this.refreshDetail()
        }).catch(()=>{
          this.$refs.task.focus()
        })
      }else{
        this.refreshDetail()
        this.$message({
          type: 'error',
          message: 'Cập nhật thất bại !'
        });
      }
    },
    HandleDeleteTodo(id){
      this.$confirm('Bạn có chắc chắn xóa công việc này ?', 'Cảnh báo', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        api.deleteThingsTodo(id).then(()=>{
          this.refreshDetail()
          this.$message({
            type: 'success',
            message: 'Xóa việc cần làm thành công !'
          });
        }).catch(()=>{
          this.$message({
            type: 'success',
            message: 'Xóa việc cần làm thất bại !'
          });
        })
      })
    },
    HandleTodoChild(id){
      this.$confirm('Bạn có chắc chắn xóa công việc con này ?', 'Cảnh báo', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        api.deleteTodoChild(id).then(()=>{
          this.refreshDetail()
          this.$message({
            type: 'success',
            message: 'Xóa công việc con thành công !'
          });
        }).catch(()=>{
          this.$message({
            type: 'success',
            message: 'Xóa công việc con thất bại !'
          });
        })
      })
    },
    HandleUpdateTodoChild(data){
      if (data.title.length > 0){
        api.updateTodoChild({
          title:data.title
        },data.id).then(()=>{
          this.refreshDetail()
        }).catch(()=>{

        })
      }else{
        this.refreshDetail()
        this.$message({
          type: 'error',
          message: 'Cập nhật thất bại !'
        });
      }
    },
    HandleUpdateStatus(id,event){
      let status = event ? 1 : 0;
      api.changeStatusTodoChild({
        status: status
      },id).then(()=>{
        this.refreshDetail()
        this.$message({
          type: 'success',
          message: 'Cập nhật trạng thái thành công !'
        });
      }).catch(()=>{
        this.refreshDetail()
        this.$message({
          type: 'error',
          message: 'Cập nhật thất bại !'
        });
      })
    },
    addNewChildTodo(data){
      if (this.titleChild.length > 0){
        api.addTodoChild({
          title:this.titleChild,
          check_list_id:data.id
        }).then(()=>{
          this.refreshDetail()
          data.addTaskChild = false
          this.titleChild = ''
        }).catch(()=>{
          this.refreshDetail()
          this.$message({
            type: 'error',
            message: 'Cập nhật thất bại !'
          });
        })
      }
    },
    disableTodo(data){
      data.addTaskChild = false
      this.titleChild = ''
    },
    formatDate(dateString){
      return moment(dateString).format('DD/MM/YYYY')
    },
    refreshDetail(){
      api.getDetailCard(this.detailCard.id).then((res)=>{
        let data = res.data.data;
        if (data.check_lists.length > 0){
          data.check_lists.forEach((el) => {
            el.addTaskChild = false
          })
        }
        this.setDetailCard(data)
      })
    }
  },
  mounted() {
    this.refreshDetail()
  },
  destroyed() {
    this.flag = true
  }
}
</script>

<style scoped lang="scss">
.el-dropdown-menu__item::v-deep .el-icon-delete-solid{
  color: #ed145b;
}
.deleteCard{
  color: #ed145b;
}
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
  margin-bottom: 20px;
}
.btn-add-todo:hover{
  background-color: #808080CA;
  cursor: pointer;
}
.max-custom{
  overflow-y: scroll;
  max-height: 485px;
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

.el-dropdown-menu{
  background-color: #131313 !important;
}
.el-dropdown-menu__item::v-deep{
  color: white;
}
.el-dropdown-menu__item:hover::v-deep{
  background-color: black !important;
  color: white !important;
}
.custom-input-child{
  background-color: #00000000;
  border: none;
  color: white;
}
.is-checked::v-deep .el-checkbox__inner{
  background-color: #ed145b !important;
  border: #ed145b !important;
}

.input-add-child {
  position: relative;
  input {
    width: 95%;
    color: white;
    font-size: inherit;
    font-family: inherit;
    background-color: transparent;
    border: 1px solid transparent;
    border-bottom-color: white;
  }

  input:focus {
    outline: none;
  }

  input::placeholder {
    color: hsla(0, 0%, 100%, 0.6);
  }

  span {
    width: 97.3%;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #ed145b;
    transform-origin: bottom right;
    transform: scaleX(0);
    transition: transform 0.5s ease;
  }

  input:focus ~ span {
    transform-origin: bottom left;
    transform: scaleX(1);
  }
}
.top-child{
  margin-top: 5px;
}
.disableTodo{
  margin-top: 4px;
  text-align: center;
  b:hover{
    cursor: pointer;
    color: #ed145b;
  }
}
.check-lists{
  margin-bottom: 30px;
}
</style>