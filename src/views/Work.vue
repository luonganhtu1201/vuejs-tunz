<template>
<div class="work-component">
  <div class="row">
    <div class="" style="display: flex">
      <draggable
          v-model="list"
          :disabled="!enabled"
          class="list-group"
          :move="checkMove"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false">
        <transition-group style="display: flex" type="transition" :name="!drag ? 'flip-list' : null">
            <div
                class="list-group-item"
                v-for="(element,index) in list"
                :key="index">
              <div class="section-custom">
                <el-row>
                  <el-col :span="12">
                    <div class="title-section">
                      {{ element.name }}
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="action-section">
<!--                      <div class="add-section">-->
<!--                        <i class="el-icon-circle-plus-outline"></i>-->
<!--                      </div>-->
                      <div class="option-section" @click="deleteSection(index)">
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
                            :list="element.data"
                            :disabled="!enabled"
                            class="list-group-child"
                            :move="checkMove"
                            group="itemChildren"
                            @start="dragging = true"
                            @end="dragging = false"
                            >
                          <div
                              class="list-group-item-child"
                              v-for="item in element.data"
                              :key="item.name"
                              @click="dialogTableVisible = true">
                            <div class="item-child">
                              <div class="tag-sort">
                                <span class="danger">Quan trọng</span>
                              </div>
                              {{ item.name }}
                              <div class="deadline">
                                <i class="el-icon-alarm-clock"></i> 30 tháng 10
                              </div>
                            </div>
                          </div>
                        </draggable>
                        <div class="add-task">
                          <div v-if="!element.addNewTask" class="add-new" @click="addTask(index)">
                            <p><i class="el-icon-plus"></i> Thêm thẻ</p>
                          </div>
                          <div class="inputAdd focus-add" v-else>
                            <input v-focus type="text" placeholder="Nhập tên thẻ" v-model="task" @blur="resetTask(index)" @keyup.enter="addListTask(index)">
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
    <DetailCard/>
  </el-dialog>
</div>
</template>

<script>
import draggable from 'vuedraggable';
import DetailCard from "../components/DetailCard";
let id = 1;
export default {
  name: "WorkLayout",
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
      list: [
        {
          name: "Đang Làm",
          id: 0 ,
          addNewTask : false,
          data:[
            {
              name : "Ricky",
              id : 0
            },
            {
              name : "Ricky 01",
              id : 1
            },
            {
              name : "Ricky 02",
              id : 1
            },
            {
              name : "Ricky 03",
              id : 1
            },
            {
              name : "Ricky 04",
              id : 1
            },
          ]
        },
        {
          name: "Hoàn thiện",
          id: 1 ,
          addNewTask : false,
          data:[
            {
              name : "Ricky",
              id : 0
            },
            {
              name : "Ricky 01",
              id : 1
            },
            {
              name : "Ricky 02",
              id : 1
            }
          ]
        },
        { name: "Kết thúc", id: 2 , addNewTask : false,data:[]}
      ],
      dragging: false,
      drag: false,
      checkAdd : true,
    };
  },
  computed: {
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    },
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
    addList() {
      this.checkAdd = false
    },
    addTask(index){
      this.list[index].addNewTask = true
    },
    addListSection(){
      if (this.title.length > 0 ){
        this.list.push({ name: this.title , id: id++ , data: []});
        this.checkAdd = true;
        this.title =''
        this.scrollEnd();
      }
    },
    addListTask(value){
      this.list.forEach((el, index) => {
        if (this.task.length > 0 && index === value) {
          el.data.push({
            name: this.task,
          })
        }
      })
      this.list[value].addNewTask = false
      this.task = ''
    },
    reset(){
      this.checkAdd = true
      this.title =''
    },
    resetTask(value){
      this.list[value].addNewTask = false
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
        this.list.splice(index, 1)
        this.$message({
          type: 'success',
          message: 'Xóa danh sách thành công'
        });
      });
    },
    checkMove: function(e) {
      window.console.log("Future index: " + e.draggedContext.futureIndex);
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
  border-radius: 10px 0 0 0;
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
</style>