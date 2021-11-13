<template>
<div class="work-component">
  <div class="row">
    <div class="" style="display: flex">
      <draggable
          v-model="directories"
          :disabled="!enabled"
          class="list-group"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
          @change="changeIndex">
        <transition-group style="display: flex" type="transition" :name="!drag ? 'flip-list' : null">
            <div
                class="list-group-item"
                v-for="(element,index) in directories"
                :key="index">
              <div class="section-custom">
                <el-row>
                  <el-col :span="16">
                    <div class="title-section">
                      <input type="text" class="custom-title" @blur="updateDirectory(element)" v-model="element.title">
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="action-section">
                      <div class="option-section" @click="deleteSection(element.id)">
                        <i class="el-icon-delete"></i>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div class="row">
                      <div class="col-6">
                        <draggable
                            :list="element.cards"
                            :disabled="!enabled"
                            class="list-group-child"
                            group="itemChildren"
                            @start="dragging = true"
                            @end="dragging = false"
                            @change="changeIndexChild">
                          <transition-group type="transition" :name="!dragging ? 'flip-list' : null">
                          <div
                              class="list-group-item-child"
                              v-for="(item,indexChild) in element.cards"
                              :key="indexChild"
                              @click="infoCard(item.id)">
                            <div class="item-child">
                              <div class="tag-sort">
                                <span class="danger">Quan trọng</span>
                              </div>
                              {{ item.title }}
                              <div class="deadline">
                                <i class="el-icon-alarm-clock"></i>
                                <span v-if="item.deadline">
                                  {{formatDate(item.deadline)}}
                                </span>
                                <span v-else>
                                  Chưa cập nhật
                                </span>
                              </div>
                            </div>
                          </div>
                          </transition-group>
                        </draggable>
                        <div class="add-task">
                          <div v-if="!element.addNewTask" class="add-new" @click="addTask(index)">
                            <p><i class="el-icon-plus"></i> Thêm thẻ</p>
                          </div>
                          <div class="inputAdd focus-add" v-else>
                            <input v-focus type="text" placeholder="Nhập tên thẻ" v-model="task" @blur="resetTask(element)" @keyup.enter="addListTask(element)">
                            <span class="bottom"></span>
                            <span class="right"></span>
                            <span class="top"></span>
                            <span class="left"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>

        </transition-group>
      </draggable>
      <div id="todo" class="list-group-item add-section-click">
        <div v-if="checkAdd" class="section-custom-btn" @click="addList()">
          <button><i class="el-icon-circle-plus"></i> <i> Thêm danh sách</i></button>
        </div>
        <div class="focus-add" v-else>
          <input v-focus type="text" placeholder="Nhập tên danh sách" v-model="title" @blur="reset()" @keyup.enter="addListSection()">
          <span class="bottom"></span>
          <span class="right"></span>
          <span class="top"></span>
          <span class="left"></span>
        </div>
      </div>
    </div>
  </div>
  <el-dialog type="info" :show-close="false" :visible.sync="dialogTableVisible">
    <DetailCard @changeDetail="getListTasks()" @HandleDeleteCard="handleDelete()"></DetailCard>
  </el-dialog>
</div>
</template>

<script>
import moment from 'moment'
import draggable from 'vuedraggable';
import DetailCard from "../components/DetailCard";
import api from '../api';
import {mapMutations, mapState} from 'vuex'
// let id = 1;
export default {
  name: "Work",
  order: 0,
  components: {
    DetailCard,
    draggable
  },
  data() {
    return {
      title:'',
      task : '',
      enabled: true,
      dialogTableVisible:false,
      dragging: false,
      drag: false,
      checkAdd : true,
      directories:[]
    };
  },
  computed: {
    ...mapState('detailTask',[
        'detailCard',
    ]),
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  methods: {
    ...mapMutations('detailTask',[
        'setDetailCard',
    ]),
    changeIndexChild(evt){
      api.changeIndexCard({
        index:evt.moved.newIndex,
        directory_id:evt.moved.element.directory_id
      },evt.moved.element.id).then(()=>{
        this.getListTasks()
      }).catch(()=>{
        this.$message({
          message: 'Di chuyển thẻ con thất bại ! ',
          type: 'error'
        });
      })
    },
    changeIndex(evt){
      api.changeIndexDirectory({
        index:evt.moved.newIndex
      },evt.moved.element.id).then(()=>{
      }).catch(()=>{
        this.$message({
          message: 'Di chuyển thất bại ! ',
          type: 'error'
        });
      })
    },
    refresh(){
      this.directories.push([])
      this.directories.pop()
    },
    getListTasks() {
      api.getListDirectory().then((res)=>{
        this.directories = res.data.data
        this.directories.forEach((el) => {
          el.addNewTask = false
        })
        this.refresh()
      });
    },
    handleDelete(){
      this.getListTasks()
      this.dialogTableVisible = false
    },
    addList() {
      this.checkAdd = false
    },
    addTask(index){
      this.directories[index].addNewTask = true
      this.refresh()
    },
    updateDirectory(el){
      if (el.title.length > 0){
        api.updateDirectory({
          id:el.id,
          title:el.title
        }).then(()=>{
          this.getListTasks()
        }).catch(()=>{
          this.$message({
            message: 'Cập nhật thất bại ! ',
            type: 'error'
          });
        })
      }else{
        this.getListTasks()
        this.$message({
          message: 'Cập nhật thất bại ! ',
          type: 'error'
        });
      }
    },
    addListSection(){
      if (this.title.length > 0 ){
        api.addlistDirectory({
          title: this.title,
          index: this.directories.length + 1
        }).then(()=>{
          this.getListTasks()
          this.checkAdd = true;
          this.title =''
          this.scrollEnd();
          this.$message({
            message: 'Thêm mới thành công ! ',
            type: 'success'
          });
        }).catch(()=>{
          this.$message({
            message: 'Thêm mới thất bại ! ',
            type: 'error'
          });
        })

      }
    },
    addListTask(directory){
      api.addCard({
        title:this.task,
        index:directory.cards.length + 1,
        directory_id: directory.id
      }).then(()=>{
        this.task = ''
          this.getListTasks()
      }).catch(()=>{
        this.$message({
          message: 'Thêm mới thẻ thất bại ! ',
          type: 'error'
        });
      })
    },
    reset(){
      if (this.title.length>0){
        this.addListSection()
      }else{
        this.checkAdd = true
        this.title =''
      }
    },
    resetTask(value){
      if (this.task.length>0){
        this.addListTask(value)
      }else{
        this.task = ''
        value.addNewTask = false
        this.getListTasks()
      }
      this.refresh()
    },
    scrollEnd() {
      setTimeout( function () {
        document.getElementById('todo').scrollIntoView()
      }, 100)
    },
    deleteSection(index){
      this.$confirm(`Bạn có chắc chắn muốn xóa danh sách hay không?`, 'Xóa danh sách', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Đóng',
        type: 'warning'
      }).then(() => {
        api.deleteDirectory({id:index}).then(()=>{
          this.getListTasks()
          this.$message({
            type: 'success',
            message: 'Xóa danh sách thành công'
          });
        }).catch(()=>{
          this.$message({
            type: 'error',
            message: 'Xóa danh sách thất bại'
          });
        })
      }).catch(()=>{
        this.$message({
          type: 'info',
          message: 'Hủy bỏ xóa danh sách '
        });
      });
    },
    // Detail Card
    infoCard(id){
      api.getDetailCard(id).then((res)=>{
        let data  = res.data.data;
        if (data.check_lists.length > 0){
          data.check_lists.forEach((el) => {
            el.addTaskChild = false
          })
        }
        this.setDetailCard(data)
        this.dialogTableVisible = true
      }).catch(()=>{
        this.$message({
          type: 'error',
          message: 'Xem chi tiết thẻ thất bại'
        });
      })
    },
    formatDate(dateString){
      return moment(dateString).format('DD/MM/YYYY')
    },
  },
  directives: {
    focus: {
      // directive definition
      inserted: function (el) {
        el.focus()
      }
    }
  },
  mounted() {
    this.getListTasks();
  }
}
</script>

<style scoped lang="scss">
.el-dialog__wrapper::v-deep .el-dialog{
  background-color: #212121;
  border-left: 4px solid #ed145b;
  border-right: 4px solid #ed145b;
  border-radius: 10px;
}
.el-dialog__wrapper::v-deep .el-dialog .el-dialog__header {
  display: none;
}
.el-dialog__wrapper::v-deep .el-dialog .el-dialog__body {
  padding: 15px;
  color: white;
}
.work-component{
  height: 94vh;
  overflow-x : scroll;
}
.list-group-item{
  margin: 0 10.7px;
  border-radius: 5px;
  height: max-content;
  width: 282px;
}
.buttons {
  margin-top: 35px;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group{
  display: flex;
  color: white;
  padding: 50px 10px 10px 10px;
}
.section-custom{
  background-image: linear-gradient(160deg, #2c2c2c, #00000000);
  padding: 15px;
  border-radius: 5px;
  border-left: 1px solid white;
  border-right: 1px solid white;
}
.list-group-item{
  .section-custom-btn{
    width: 282px;
    background-image: linear-gradient(160deg, #2c2c2c, #00000000);
    transition: transform 1s ease;
    button{
      background-color: #00000000;
      border: none;
      padding: 9px;
      cursor: pointer;
      color: white;
    }
  }
}
.form-group{
  padding-bottom: 30px;
}
.title-section{
  text-align: left;
}
.action-section{
  display: flex;
  width: 100%;
  justify-content: right;
}
.add-section{
  padding-right: 5px;
}
.add-section-click{
  cursor: pointer;
  padding-top: 50px;
  //position: fixed;
  //left: 83%;
  //top: 7%;
}

//Child
.item-child{
  text-align: left;
  padding: 10px;
  background-color: #171717;
  border-radius: 8px;
  border-left: 3px solid #464646;
  margin-bottom: 10px;
  cursor: pointer;
}
.list-group-child{
  margin-top: 20px;
  max-height: 500px;
  overflow-y: scroll;
}
::-webkit-scrollbar{
  width: 10px;
  height: 8px;
}
::-webkit-scrollbar-thumb{
  background-color: gray;
  border-radius: 5px;
}
.list-group-item-child{
  height: max-content;
  border-radius: 8px;
}
//.section-custom:hover{
//  background-color: #656565;
//}
.tag-sort{
  margin-bottom: 15px;
  .danger{
    max-width: 30px;
    height: 8px;
    padding: 2px 7px;
    font-size: 12px;
    border-radius: 10px;
    background-color: #ed145b;
  }
}
.deadline{
  font-size: 12px;
  padding-top: 20px;
}
.option-section{
  cursor: pointer;
}
.el-message-box{
  background-color: black !important;
}
//Input thêm danh sách
.focus-add {
  position: relative;
  background-image: linear-gradient(160deg, #2c2c2c, #00000000);
  padding: 1px;
  input {
    width: 250px;
    padding: 7px;
    color: white;
    font-size: inherit;
    font-family: inherit;
    background-color: transparent;
    border: 1px solid transparent;
    border-bottom-color: #ec2549;
    transition: transform 1s ease;
  }

  input:focus {
    outline: none;
  }

  input::placeholder {
    color: hsla(0, 0%, 100%, 0.6);
  }

  span {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #49d1e4;
    transform-origin: bottom right;
    transform: scaleX(0);
    transition: transform 0.5s ease;
  }

  input:focus ~ span {
    transform-origin: bottom left;
    transform: scaleX(1);
  }
}

.add-task{
  cursor: pointer;
  height: 20px;
  margin: 10px 0;
}
.inputAdd{
  padding: 0;
  background-image: linear-gradient(160deg, #00000000, #00000000);
  input{
    padding : 2px !important;
  }
}
.add-new{
  p{
    margin: 0px;
  }
}
.custom-title{
  width: 100%;
  color: white;
  background-color: #FFFFFF00;
  border: none;
  font-weight: 400;
  font-size: 16px;
}
</style>