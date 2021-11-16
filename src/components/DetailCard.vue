<template>
    <div class="detail-content ">
      <div class="input-Task">
        <el-row>
          <el-col :span="16">
            <input ref="titleCard" type="text" v-model="detailCard.title" @change="updateDetailCard" @blur="changeCard(detailCard.id)">
          </el-col>
          <el-col class="action-task action-alone" :span="8">
            <el-tooltip v-if="detailCard.status === 3" class="item" @click.native="doneTask(0)" effect="dark" content="Chưa hoàn thành" placement="bottom">
              <i  class="el-icon-success icon-done-custom done-task"></i>
            </el-tooltip>
            <el-tooltip v-else class="item" effect="dark" @click.native="doneTask(3)" content="Hoàn thành" placement="bottom">
              <i class="el-icon-circle-check icon-done-custom"></i>
            </el-tooltip>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i class="el-icon-setting icon-setting"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-s-flag" @click.native="loadSticker">Nhãn</el-dropdown-item>
                <el-dropdown-item icon="el-icon-date" @click.native="HandleAddList">Việc cần làm</el-dropdown-item>
                <el-dropdown-item icon="el-icon-s-order" @click.native="displayDate">Ngày hết hạn</el-dropdown-item>
                <el-dropdown-item icon="el-icon-paperclip"  @click.native="HandleUpload">Đính kèm</el-dropdown-item>
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
                <i class="el-icon-date" @click="displayDate"></i>
                <el-date-picker
                    class="block"
                    ref="openDatePicker"
                    v-model="detailCard.deadline"
                    type="date"
                    @change="updateDeadline(detailCard)">
                </el-date-picker>
                <span v-if="detailCard.deadline !==null">
                  {{formatDate(detailCard.deadline)}} <i class="el-icon-close iconDeadline" @click="removeDeadline(detailCard)"></i>
                </span>
                <span v-else>
                  Chưa cập nhật
                </span>
                <span class="check-deadline" :style="'color:'+warningTime" v-if="detailCard.status !== 3">{{differenceTime()}}</span>
                <span class="check-deadline" style="color: #30e166" v-if="detailCard.status === 3">Đã hoàn thành</span>
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
            <div class="sticker-add">
              <el-row>
                <el-col class="col-sticker" :span="5" v-for="(stickers,indexSticker) in detailCard.labels" :key="indexSticker">
                  <p class="sticker-custom" :style="{background:stickers.color}">{{stickers.name}}</p>
                </el-col>
                <el-col :span="5">
                  <i @click="loadSticker" class="el-icon-edit-outline sticker-icon-custom"></i>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </el-card>
        <el-card>
        <div class="description">
          <el-row style="margin-bottom: 0">
            <el-col :span="12" >
              <p><i class="el-icon-s-unfold"> | </i> Mô tả <i @click="flag = false" class="item-custom el-icon-edit-outline"></i></p>
            </el-col>
            <el-col :span="12" style="text-align: right">
              <p class="description-ver" v-if="!flag">
                <i class="el-icon-close icon-custom" @click="HandleExit"></i>
                <i class="el-icon-check icon-custom" @click="changeCard(detailCard.id)"></i>
              </p>
            </el-col>
          </el-row>
          <p v-if="flag" class="description-custom">{{detailCard.description}}</p>
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
                <el-col :span="24">
                  <el-progress v-if="list.check_list_childs.length > 0" :percentage="checkPercentComplete(list.check_list_childs)" style="margin-top: 15px"></el-progress>
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
            <input type="file" ref="uploadFile" style="display: none" @change="uploadFile">
            <button class="delete-todo" @click="HandleUpload">Thêm tệp đính kèm</button>
            <div class="file-uploaded" v-for="(srcCards,indexSrc) in filesCard" :key="indexSrc">
              <div class="demo-image__preview">
                <el-image
                    style="width: 100px; height: 100px"
                    :src="srcCards.src"
                    :preview-src-list="srcCard"
                    v-if="checkTypeFile(srcCards.src)"
                >
                </el-image>
                <div class="file-doc" v-else>
                  <i class="el-icon-document"></i>
                </div>
                <div class="content-file">
                  <p>{{srcCards.name}}</p>
                  <p><i class="date-upload">{{timeDiffUpload(srcCards.updated_at)}}</i></p>
                  <div class="option-file">
                    <a :href="srcCards.src" target="_blank" :download="srcCards.name"><i class="el-icon-download"></i></a>
                    <i class="el-icon-edit-outline sticker-icon-custom" @click="editFileCard(srcCards)"></i>
                    <i class="el-icon-delete delete-icon-custom" @click="deleteFile(srcCards.id)"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
    </div>
    <el-dialog
        title="Warning"
        :visible.sync="dialogSticker"
        width="33%"
        center
        class="custom-dialog">
      <div class="sticker-option">
        <p><b>Nhãn dãn</b></p>
        <div class="sticker-default">
          <div class="list-todo-child" v-for="(sticker,indexSt) in stickerDefault" :key="indexSt">
            <el-row :class="sticker.active?'activeSticker':''"
                    :style="'background-image: linear-gradient(100deg,'+ sticker.color+', #00000000);'">
              <el-col @click.native="HandleChangeSticker(sticker)" class="sticker-name" :span="18">
                <b><i class="el-icon-success" v-if="sticker.active"></i> {{sticker.name}} </b>
              </el-col>
              <el-col class="action-task" :span="6">
                <button class="task-child-del">
                  <i class="el-icon-edit-outline" @click="HandleUpdateSticker(sticker)"></i>
                </button>
                <button class="task-child-del">
                  <i class="el-icon-delete-solid" @click="HandleDeleteStickerCard(sticker.id)"></i>
                </button>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="addSticker">
          <div class="input-sticker">
            <input type="text" v-model="stickerTitle" placeholder="Tên nhãn">
            <span class="bottom"></span>
            <span class="right"></span>
            <span class="top"></span>
            <span class="left"></span>
          </div>
        </div>
        <div class="color-pick">
          <b>Màu nhãn :</b>
          <el-color-picker v-model="color1"></el-color-picker>
        </div>
        <div class="button-add">
          <button class="delete-todo" @click="addSticker">Tạo mới</button>
        </div>
      </div>
    </el-dialog>
    <el-dialog
        title="Warning"
        :visible.sync="dialogEditFile"
        width="30%"
        center
        class="edit-file-wrap">
      <div class="sticker-option">
        <p><b>Tên file</b></p>
        <div class="addSticker">
          <div class="input-sticker">
            <input ref="updateFileCard" type="text" v-model="editFileName" placeholder="Tên file">
            <span class="bottom"></span>
            <span class="right"></span>
            <span class="top"></span>
            <span class="left"></span>
          </div>
        </div>
        <div class="button-add">
          <button class="delete-todo" @click="updateFile">Cập nhật</button>
        </div>
      </div>
  </el-dialog>
  <el-dialog
      title="Warning"
      :visible.sync="dialogThingsTodo"
      width="30%"
      center
      class="edit-file-wrap">
    <div class="sticker-option">
      <p><b>Việc cần làm</b></p>
      <div class="addSticker">
        <div class="input-sticker">
          <input ref="addThingTodo" type="text" v-model="thingTodo" placeholder="Tên việc cần làm">
          <span class="bottom"></span>
          <span class="right"></span>
          <span class="top"></span>
          <span class="left"></span>
        </div>
      </div>
      <div class="button-add">
        <button class="delete-todo" @click="addTodoCard">Tạo mới</button>
      </div>
    </div>
  </el-dialog>
  <el-dialog
      title="Warning"
      :visible.sync="dialogEditSticker"
      width="30%"
      center
      class="edit-file-wrap">
    <div class="addSticker">
      <div class="input-sticker">
        <input ref="stickerUpdate" type="text" v-model="stickerTitleEdit" placeholder="Tên nhãn">
        <span class="bottom"></span>
        <span class="right"></span>
        <span class="top"></span>
        <span class="left"></span>
      </div>
    </div>
    <div class="color-pick">
      <b>Màu nhãn :</b>
      <el-color-picker v-model="colorEdit"></el-color-picker>
    </div>
    <div class="button-add">
      <button class="delete-todo" @click="updateSticker">Cập nhật</button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import {mapMutations, mapState} from "vuex";
import api from '../api'
// import _ from "lodash";
export default {
  name: "DetailCard",
  data(){
    return{
      color1:'#000000',
      flag:true,
      description:'',
      titleChild:'',
      dialogSticker:false,
      dialogEditFile:false,
      dialogThingsTodo:false,
      dialogEditSticker:false,
      stickerTitle:'',
      errorSticker:'',
      stickerDefault:'',
      typeImages:[
          'jpg',
          'jpeg',
          'PNG'
      ],
      editFileName:'',
      fileId:'',
      thingTodo:'',
      idStickerEdit:'',
      colorEdit:'',
      stickerTitleEdit:'',
      warningTime:''
    }
  },
  computed:{
    ...mapState('detailTask',[
        'detailCard',
        'filesCard',
        'srcCard'
    ])
  },
  methods: {
    ...mapMutations('detailTask',[
        'setDetailCard',
        'setFilesCard',
        'setSrcCard'
    ]),
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
      });
    },
    updateDeadline(data){
      api.updateDeadlineCard({
        deadline:moment(data.deadline).format('YYYY/MM/DD 00:00:00')
      },data.id).then(()=>{
        this.refreshDetail()
        this.updateDetailCard()
        this.$message({
          type: 'success',
          message: 'Cập nhật deadline thành công !'
        });
      }).catch(()=>{
        this.refreshDetail()
        this.updateDetailCard()
        this.$message({
          type: 'error',
          message: 'Cập nhật deadline thất bại !'
        });
      })
    },
    removeDeadline(data){
      api.updateDeadlineCard({
        deadline:null
      },data.id).then(()=>{
        this.refreshDetail()
        this.updateDetailCard()
        this.$message({
          type: 'success',
          message: 'Xóa deadline thành công !'
        });
      }).catch(()=>{
        this.refreshDetail()
        this.updateDetailCard()
        this.$message({
          type: 'error',
          message: 'Xóa deadline thất bại !'
        });
      })
    },
    HandleAddList(){
      this.dialogThingsTodo = true
      this.thingTodo=''
    },
    addTodoCard(){
      if (this.thingTodo.length > 0){
        api.addThingsToDo({
          title:this.thingTodo,
          card_id: this.detailCard.id
        }).then(()=>{
          this.refreshDetail()
          this.dialogThingsTodo = false
          this.$message({
            type: 'success',
            message: 'Thêm việc cần làm thành công !'
          });
        }).catch(()=>{
          this.$message({
            type: 'error',
            message: 'Thêm việc cần làm thành công !'
          });
        })
      }else {
        this.$refs.addThingTodo.focus()
      }
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
        this.updateDetailCard()
        this.$message({
          type: 'success',
          message: 'Cập nhật trạng thái thành công !'
        });
      }).catch(()=>{
        this.refreshDetail()
        this.updateDetailCard()
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
          this.updateDetailCard()
          this.refreshDetail()
          data.addTaskChild = false
          this.titleChild = ''
        }).catch(()=>{
          this.refreshDetail()
          this.updateDetailCard()
          this.$message({
            type: 'error',
            message: 'Cập nhật thất bại !'
          });
        })
      }
    },
    //Upload
    HandleUpload(){
      this.$refs.uploadFile.click()
    },
    uploadFile(e){
      let data = new FormData();
      data.append('file',e.target.files[0])
      api.uploadFileCard(data,this.detailCard.id).then(()=>{
        this.refreshDetail();
        this.updateDetailCard()
        this.$message({
          type: 'success',
          message: 'Upload thành công !'
        });
      }).catch(()=>{
        this.refreshDetail()
        this.$message({
          type: 'error',
          message: 'Upload không thành công !'
        });
      })
    },
    //Sticker
    addSticker(){
      if (this.stickerTitle.length > 0){
        api.addStickerCard({
          name:this.stickerTitle,
          color:this.color1
        },this.detailCard.id).then(()=>{
          this.updateDetailCard()
          this.refreshDetail()
          this.loadSticker()
          this.stickerTitle = ''
          this.$message({
            type: 'success',
            message: 'Thêm nhãn thành công !'
          });
        }).catch(()=>{
          this.refreshDetail()
          this.updateDetailCard()
          this.loadSticker()
          this.$message({
            type: 'success',
            message: 'Thêm nhãn thất bại !'
          });
        })
      }else {
        this.errorSticker = 'Tên nhãn dán không được để trống'
      }
    },
    updateSticker(){
      if (this.stickerTitleEdit.length > 0){
        api.updateStickerCard({
          name:this.stickerTitleEdit,
          color:this.colorEdit
        },this.idStickerEdit).then(()=>{
          this.loadSticker()
          this.updateDetailCard()
          this.refreshDetail()
          this.dialogEditSticker = false
          this.$message({
            type: 'success',
            message: 'Cập nhật nhãn thành công !'
          });
        }).catch(()=>{
          this.loadSticker()
          this.updateDetailCard()
          this.refreshDetail()
          this.$message({
            type: 'error',
            message: 'Cập nhật nhãn thất bại !'
          });
        })
      }else {
        this.$refs.stickerUpdate.focus()
      }
    },
    HandleDeleteStickerCard(id){
      this.$confirm('Bạn có chắc chắn xóa nhãn dán này ?', 'Cảnh báo', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        api.deleteStickerCard(id).then(()=>{
          this.updateDetailCard()
          this.refreshDetail()
          this.loadSticker()
          this.$message({
            type: 'success',
            message: 'Xóa nhãn thành công !'
          });
        }).catch(()=>{
          this.updateDetailCard()
          this.refreshDetail()
          this.loadSticker()
          this.$message({
            type: 'success',
            message: 'Xóa nhãn thất bại !'
          });
        })
      })
    },
    HandleUpdateSticker(data){
      this.dialogEditSticker = true
      this.colorEdit = data.color
      this.stickerTitleEdit = data.name
      this.idStickerEdit = data.id
    },
    HandleChangeSticker(data){
      this.refreshDetail()
      this.loadSticker()
      data.active ? data.active = false : data.active = true
      if (data.active === true){
        api.addStickerAvailable({
          label_id:data.id
        },this.detailCard.id).then(()=>{
          this.refreshDetail()
          this.updateDetailCard()
          this.loadSticker()
          this.$message({
            type: 'success',
            message: 'Cập nhật nhãn thành công !'
          });
        }).catch(()=>{
          this.$message({
            type: 'error',
            message: 'Cập nhật nhãn thất bại !'
          });
        })
      }else{
        api.removeStickerInCard({
          label_id:data.id
        },this.detailCard.id).then(()=>{
          this.refreshDetail()
          this.updateDetailCard()
          this.loadSticker()
          this.$message({
            type: 'success',
            message: 'Cập nhật nhãn thành công !'
          });
        }).catch(()=>{
          this.$message({
            type: 'error',
            message: 'Cập nhật nhãn thất bại !'
          });
        })
      }

    },
    disableTodo(data){
      data.addTaskChild = false
      this.titleChild = ''
    },
    displayDate(){
      this.$refs.openDatePicker.showPicker()
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
        let dataFile = []
        let srcCardPreview = []
        data.files.forEach((elm)=>{
          let file = {
            id:elm.id,
            name:elm.name,
            thumbnail:'http://vuecourse.zent.edu.vn/storage/'+elm.path,
            src:'http://vuecourse.zent.edu.vn/storage/'+elm.path,
            updated_at:elm.updated_at
          }
          if (this.checkTypeFile(file.thumbnail)){
            srcCardPreview.push(file.thumbnail)
          }
          dataFile.push(file)
        })
        this.setSrcCard(srcCardPreview)
        this.setFilesCard(dataFile)
        this.setDetailCard(data)
      })
    },
    loadSticker(){
      this.refreshDetail()
      api.getListSticker().then((res)=>{
        this.detailCard.labels.forEach((el)=>{
          res.data.data.forEach((o)=>{
            if (el.id === o.id){
              o.active = true
            }
          })
        })
        this.stickerDefault = ''
        this.stickerDefault = res.data.data
      })
      this.dialogSticker = true
    },
    // File Uploaded
    checkTypeFile(path) {
      let isCheckType = false
      let index = path.lastIndexOf('.')
      let type = path.substring(index + 1)
      this.typeImages.forEach((item) =>{
        if (item === type) {
          isCheckType = true
        }
      })
      return isCheckType
    },
    deleteFile(id){
      this.$confirm('Bạn có chắc chắn file này ?', 'Cảnh báo', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        api.deleteFileCard(id).then(()=>{
          this.refreshDetail()
          this.$message({
            type: 'success',
            message: 'Xóa file thành công !'
          });
        }).catch(()=>{
          this.$message({
            type: 'success',
            message: 'Xóa file thất bại !'
          });
        })
      })
    },
    editFileCard(data){
      this.dialogEditFile = true
      this.editFileName = data.name
      this.fileId = data.id
    },
    updateFile(){
      if (this.editFileName.length > 0){
        api.updateFileCard({
          name:this.editFileName
        },this.fileId).then(()=>{
          this.refreshDetail()
          this.editFileName = ''
          this.dialogEditFile = false
          this.$message({
            type: 'success',
            message: 'Cập nhật file thành công !'
          });
        }).catch(()=>{
          this.refreshDetail()
          this.$message({
            type: 'error',
            message: 'Cập nhật file thành công !'
          });
        })
      }else {
        this.$refs.updateFileCard.focus()
      }
    },
    doneTask(data){
      api.changeStatusCard({
        status:data
      },this.detailCard.id).then(()=>{
        this.refreshDetail()
        this.updateDetailCard()
        this.$message({
          type: 'success',
          message: 'Cập nhật trạng thái thành công !'
        });
      }).catch(()=>{
        this.refreshDetail()
        this.$message({
          type: 'error',
          message: 'Cập nhật trạng thái thất bại !'
        });
      })
    },
    timeDiffUpload(date){
      return moment(date).locale('vi').fromNow();
    },
    differenceTime() {
      let textLog = ''
      let now = new Date();
      let time = moment(this.detailCard.deadline)
      if (moment(now).isSame(time,'day')){
        textLog = 'Gần hết hạn'
        this.warningTime = '#e16116'
      } else if (time.diff(now,'days') < 0){
        textLog = 'Quá hạn'
        this.warningTime = '#ed145b'
      }
      return textLog
    },
    checkPercentComplete(arr) {
      let totalChildrenWork = arr.length;
      let a = 0;
      if(arr.length !== 0) {
        arr.forEach((item) => {
          if(item.status == 1) {
            a = a + 1;
          }
        })
        return Math.ceil(a / totalChildrenWork * 100)
      } else {
        return 0
      }
    },
  },
  mounted() {
    this.refreshDetail()
    this.differenceTime()
  },
  destroyed() {
    this.flag = true
  },
  watch:{
    errorSticker(){
      if (this.errorSticker.length > 0){
        this.errorSticker = ''
      }
    }
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
.action-task{
  text-align: right;
}
.action-alone{
  display: flex;
  justify-content: end;
  align-items: center;
  .icon-done-custom{
    font-size: 23px;
    margin-right: 10px;
    cursor: pointer;
  }
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
  p{
    margin: 0;
  }
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
    cursor: pointer;
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
.col-sticker{

  text-align: center;
  margin: 0 !important;
  padding-right: 5px;
  padding-bottom: 3px;

}
.sticker-custom{
  width: 100%;
  border-radius: 4px;
  margin: 0;
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
.due-date{
  position: relative;
  .block{
    position: absolute;
    top: 0;
    display: none;
    z-index: -5;
  }
}
.el-icon-date{
  cursor: pointer;
}
.custom-dialog{
  padding-top: 25px;
}
.sticker-option{
  text-align: center;
}

//Input Sticker
.sticker-option{
  p{
    margin-bottom: 20px;
    margin-top: 0;
  }
}
.input-sticker {
  position: relative;
  input {
    width: 95%;
    color: white;
    font-size: inherit;
    font-family: inherit;
    background-color: #0f0f0f;
    padding: 0.75em 0.45em;
    border: 1px solid transparent;
    transition: background-color 0.3s ease-in-out;
  }

  input:focus {
    outline: none;
  }

  input::placeholder {
    color: hsla(0, 0%, 100%, 0.6);
  }

  span {
    position: absolute;
    background-color: #fc2f70;
    transform-origin: center;
    transition: transform 0.5s ease;
  }

  .bottom,
  .top {
    height: 1px;
    left: 0;
    right: 0;
    transform: scaleX(0);
  }

  .left,
  .right {
    width: 1px;
    top: 0;
    bottom: 0;
    transform: scaleY(0);
  }

  .top {
    top: 0;
  }

  .bottom {
    bottom: 0;
  }

  .left {
    left: 0;
  }

  .right {
    right: 0;
  }

  input:focus ~ .top, input:focus ~ .bottom {
    transform: scaleX(1);
  }

  input:focus ~ .left, input:focus ~ .right {
    transform: scaleY(1);
  }
}
.button-add{
  text-align: right;
  margin-top: 20px;
}
.color-pick{
  display: flex;
  align-items: center;
  justify-content: end;
  padding-top: 15px;
  b{
    margin-right: 10px;
  }
}
.sticker-name{
  text-align: left;
}
.activeSticker{
  border-left: 5px solid white;
}
.sticker-default{
  max-height: 287px;
  overflow-y: scroll;
}
.addSticker{
  margin-top: 20px;
}
.demo-image__preview::v-deep{
  display: flex;
  align-items: center;
  padding: 10px;
}
.demo-image__preview:hover::v-deep{
  background-color: #212121c7;
}
.file-doc{
  width: 100px;
  height: 100px;
  background-color: #ed145b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 35px;
}
.content-file{
  margin-left: 30px;
  p{
    margin-top: 0;
  }
}
.option-file{
  i{
    margin-right: 10px;
    cursor: pointer;
  }
  a{
    color: white;
  }
  a:hover{
    color: #0093e9;
  }
}
.date-upload{
  color: gray;
  font-size: 13px;
}
.file-uploaded{
  padding-top: 15px;
}
.delete-icon-custom:hover{
  color: #ed145b;
}
.description-custom{
  margin-top: 10px !important;
  margin-left: 30px !important;
}
.description-ver{
  margin-top: 0 !important;
  text-align: right;
  margin-bottom: 5px !important;
  margin-right: 1px !important;
}
.edit-file-wrap{
  padding-top: 185px;
}
.sticker-icon-custom{
  margin-top: 3px;
}
.sticker-icon-custom:hover{
  color: #EF7E51FF;
  cursor: pointer;
}
.iconDeadline{
  font-weight: bold;
  cursor: pointer;
}
.done-task{
  color: #30e166;
}
.el-image::v-deep{
  img{
    object-fit: cover;
  }
}
.check-deadline{
  margin-left: 25px;
}
</style>