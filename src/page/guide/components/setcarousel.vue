<template>
  <div class="content" id="cont">
    <div class="app-cent">
      <div class="hd">
        <span>app轮播图设置</span>
        <span class="btnRight">
          <button class="Zbtn btn-rt" @click="addBannerclick(true)">新增轮播图</button>
        </span>
      </div>
      <div class="bd">
        <div class="bd table">
          <el-table :data="slideShowData">
            <el-table-column prop="order" label="顺序"></el-table-column>
            <el-table-column prop="name" label="轮播图名称"></el-table-column>
            <el-table-column prop label="预览图片">
              <template slot-scope="scope">
                <img
                  class="tableImg"
                  :src="scope.row.image_url"
                  alt
                  style="width:30px;height:30px;"
                />
              </template>
            </el-table-column>
            <el-table-column prop="state" label="禁用／启用">
              <template slot-scope="scope">
                <!-- <div id="changeState">
										<span class="spanBtn" v-if='scope.row.enabled' @click="stateCnageclidk(true,scope.row)">禁用</span>
										<span class="spanBtn qiyong" v-else @click="stateCnageclidk(false,scope.row)">启用</span>
                </div>-->
                <div id="changeState">
                  <el-switch
                    v-model="scope.row.enabled"
                    active-color="#13ce66"
                    inactive-color="#d6cdcd"
                    on-value="1"
                    off-value="0"
                    @change="changeSwitch(scope.row)"
                  ></el-switch>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop label="操作">
              <template slot-scope="scope">
                <span class="spanBtn" @click="addBannerclick(false,scope.row)">编辑</span>
                <span class="spanBtn" @click="bannersDeleteclick(scope.row)">删除</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="btnRight">
          <button class="Zbtn btn-submit" @click="saveTreedata(false)">上一步</button>
          <button class="Zbtn btn-submit" @click="saveTreedata(true)">保存并继续</button>
        </div>
      </div>
    </div>

    <!-- 新增-->
    <div id="commonPop">
      <el-dialog
        title="编辑内容"
        :visible.sync="addUserpop"
        :before-close="cancelNewdata"
        :close-on-click-modal="false"
        width="40%"
      >
        <el-form ref="edit" label-width="35%" class="demo-ruleForm">
          <div class="formTable">
            <div class="block">
              <el-form-item label="顺序：" prop="passworld" :rules="[{ required: true, message: ' '}]">
                <el-input v-model="addForm.order" maxlength="50"></el-input>
              </el-form-item>
            </div>
            <div class="block">
              <el-form-item
                label="轮播图名称："
                prop="resetpassworld"
                :rules="[{ required: true, message: ' '}]"
              >
                <el-input v-model="addForm.name" maxlength="50"></el-input>
              </el-form-item>
            </div>
            <!-- 头像上传 -->
            <div class="block upLoad" id="personal">
              <el-form-item
                label="轮播图片："
                prop="img"
                id="personalFormitem"
                :rules="[{ required: true, message: ' '}]"
              >
                <span id="upImgspan">（1080x700像素，png，jpg格式）</span>
                <div class="Inf-img">
                  <div class="imgCont">
                    <img :src="Initimgdata" alt />
                  </div>
                  <div class="upCont">
                    <input
                      type="file"
                      id="headPortrait"
                      name="files"
                      placeholder="file"
                      multiple
                      @change="getFile"
                    />
                    <div class="upLoadinp">选择图片</div>
                    <button class="submitImg" type="button" @click="getUploadVideo">上传图片</button>
                  </div>
                </div>
              </el-form-item>
            </div>
            <div class="block">
              <el-form-item label="状态：" prop="name" :rules="[{ required: true, message: ' '}]">
                <div class="checkboxBg">
                  <el-radio v-model="addForm.state" label="1">启用</el-radio>
                  <el-radio v-model="addForm.state" label="0">禁用</el-radio>
                </div>
              </el-form-item>
            </div>
            <div class="block">
              <el-form-item label="跳转链接：" prop="passworld">
                <el-input v-model="addForm.content" maxlength="50"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="userBtn">
            <el-form-item>
              <el-button type="primary" @click="saveNewdata">保存</el-button>
              <el-button @click="cancelNewdata()">取消</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
// js
import { heightAuto, getCaption } from "../../untils/heightAuto"; //注意路径

/* api */
// getBannerlist 获取列表
//  addBannerlist 添加
// 上传图片 bannersUploadimage
// 删除 getBannerlistDelete
// 启用 bannersSetenabled
// 修改 bannersModify
// 信息详情 bannersGetdata
import {
  getBannerlist,
  addBannerlist,
  bannersUploadimage,
  getBannerlistDelete,
  bannersSetenabled,
  bannersModify,
  bannersGetdata
} from "../../api/appmanagement";
export default {
  data() {
    return {
      // 新增／编辑弹窗状态
      addUserpop: false,
      popoverSavebuttonState: true, // 默认为新增
      /* 图片相关 */
      // 头像file
      filedata: "",
      fileName: "",
      // 编辑需要上传的图片参数
      app_banner_image_file_temp_path: "",
      // 预览图片地址
      Initimgdata: "",
      // 详细信息
      bannerListinformation: "",
      // 提交数据集合
      addForm: {
        // 状态   1 启用  2 禁用
        state: "1",
        // 内容
        content: "",
        // 姓名
        name: "",
        //  顺序
        order: "",
        //
        content: ""
      },
      // 表格数据
      slideShowData: [],

      /* 分页相关 */
      page_size: 8, //  请求多少条目
      page_total_items: 10, // 总条数
      page_total_pages: 1 //  当前条数
    };
  },
  mounted: function() {
    // 初始化数据
    this.getInitlistData();
  },
  methods: {
    // 初始化信息
    getInitlistData() {
      // getBannerlist
      let objData = {
        enterprise_id: localStorage.EnterpriseId,
        page_number: this.page_total_pages - 1,
        page_size: this.page_size
      };
      getBannerlist(objData).then(res => {
        if (res.status === 200 && res.data.result == "ok") {
          this.slideShowData = res.data.data.list;

          /* 总条数 */
          this.page_total_items = res.data.data.page_total_items;
          this.page_total_pages = res.data.data.page_number - 0 + 1;
        }
      });
    },
    //  新增／编辑按钮
    addBannerclick(type, scope) {
      // 弹窗保存按钮状态
      if (type) {
        this.popoverSavebuttonState = true;
        this.addUserpop = true;
        this.Initimgdata = "";
      } else {
        // 查询详情信息
        // bannersGetdata
        let objData = {
          id: scope.id
        };
        bannersGetdata(objData).then(res => {
          if (res.status === 200 && res.data.result == "ok") {
            let rD = res.data.data;
            this.bannerListinformation = res.data.data;
            // 信息赋值
            this.addForm.state = rD.enabled ? "1" : "0";
            this.addForm.name = rD.name;
            this.addForm.order = rD.order;
            // 按钮状态
            this.popoverSavebuttonState = false;
            // 预览图片
            this.Initimgdata = rD.image_url;
            // 弹窗显示
            this.addUserpop = true;
            // 链接 内容
            this.addForm.content = rD.content;
          } else {
            this.$message.error(res.data.error_description);
          }
        });
      }
    },
    // 弹窗 保存按钮 提交数据
    saveNewdata() {
      if (this.popoverSavebuttonState) {
        let objData = {
          app_banner_image_file_temp_path: this.app_banner_image_file_temp_path,
          content: this.addForm.content,
          enabled: (this.addForm.state = "1" ? true : false),
          enterprise_id: localStorage.EnterpriseId,
          event: this.addForm.content == "" ? "NULL" : "WEB",
          name: this.addForm.name,
          order: this.addForm.order
        };
        // 新增
        addBannerlist(objData).then(res => {
          if (res.status === 200 && res.data.result == "ok") {
            console.log(res);
            this.$message.success("新增成功");
            // 关闭弹窗
            this.addUserpop = false;
            // 清除缓存
            this.clearThecache();
            // 刷新 列表
            this.getInitlistData();
          } else {
            this.$message.error(res.data.error_description);
          }
        });
      } else {
        let objData = {
          app_banner_image_file_temp_path: this.app_banner_image_file_temp_path,
          content: this.addForm.content,
          enabled: this.addForm.state == "1" ? true : false,
          event: this.addForm.content == "" ? "NULL" : "WEB",
          id: this.bannerListinformation.id,
          name: this.addForm.name,
          order: this.addForm.order
        };
        // 编辑  bannersModify
        bannersModify(objData).then(res => {
          if (res.status === 200 && res.data.result == "ok") {
            this.$message.success("编辑成功");
            // 关闭弹窗
            this.addUserpop = false;
            // 清除缓存
            this.clearThecache();
            // 刷新 列表
            this.getInitlistData();
          } else {
            this.$message.error(res.data.error_description);
          }
        });
      }
    },
    // 取消
    cancelNewdata() {
      this.addUserpop = false;
      this.clearThecache();
    },
    // 清空
    clearThecache() {
      this.app_banner_image_file_temp_path = "";
      this.addForm.state = "1";
      this.addForm.name = "";
      this.addForm.order = "";
    },
    // 上传头像
    getFile(e) {
      let file = document.getElementById("headPortrait").files[0];
      this.filedata = file;
      this.fileName = file.name;
    },
    // 点击上传 bannersUploadimage
    getUploadVideo() {
      if (this.filedata == "") {
        this.$message({
          message: "文件不允许为空",
          type: "warning"
        });
      } else {
        var fileAjaxdata = this.filedata;
        var formData = new FormData();
        formData.append("file", fileAjaxdata);

        bannersUploadimage(formData).then(res => {
          if (res.status === 200 && res.data.result == "ok") {
            // 提示
            this.$message({
              message: "上传成功",
              type: "success"
            });
            this.app_banner_image_file_temp_path =
              res.data.data.app_banner_image_file_temp_path;
            // 预览图片
            let obj = res.data.data.app_banner_image_file_temp_path;
            let str = "/upload";
            let url = getCaption(obj, str);
            console.log(url);
            this.Initimgdata = window.ServerUrl + "/" + url;
          } else {
            // 错误提示信息
            this.$message.error(res.data.error_description);
          }
        });
      }
    },
    // 删除 getBannerlistDelete
    bannersDeleteclick(scope) {
      let objData = {
        id: scope.id
      };
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          getBannerlistDelete(objData).then(res => {
            if (res.status === 200 && res.data.result == "ok") {
              this.$message.success("删除成功");
              // 刷新 列表
              this.getInitlistData();
            } else {
              this.$message.error(res.data.error_description);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    changeSwitch(scope) {
      let type = scope.enabled;
      let objData = {
        id: scope.id
      };
      if (!type) {
        // 禁用
        objData.enabled = false;
      } else {
        // 启用
        objData.enabled = true;
      }
      this.stateCnageclidk(type, objData);
    },
    // 状态切换
    stateCnageclidk(type, obj) {
      let objData = obj;
      // ajax bannersSetenabled
      bannersSetenabled(objData).then(res => {
        if (res.status === 200 && res.data.result == "ok") {
          if (type) {
            this.$message.success("启用成功");
          } else {
            this.$message.success("禁用成功");
          }
          // 刷新 列表
          this.getInitlistData();
        } else {
          this.$message.error(res.data.error_description);
        }
      });
    },
    // 跳转
    saveTreedata(isNext) {
      if (isNext) {
        let val = "7";
        // 切换 tab
        this.$store.commit("moduleSkip", val);
        // 判断高位节点 和当前节点
        let Lastindex = this.$store.state.tabIndex;
        if (val >= Lastindex) {
          this.$store.commit("skip", val);
        }
      } else {
        let val = "4";
        this.$store.commit("moduleSkip", val);
      }
    }
  }
};
</script>
<style scoped>
</style>


