<template>
  <div class="content" id="cont">
    <div class="app-cent">
      <div class="hd">
        <span>App二维码</span>
      </div>
      <div class="bd">
        <div id="upload">
          <div id="qrcode" ref="qrcode"></div>
          <div>
            <input disabled class="appLogoinp" type="text" value="掌上通APP安装二维码" />
          </div>
        </div>
      </div>
    </div>
    <div class="btnRight">
      <button class="Zbtn btn-submit" @click="downloadEwm">下载二维码</button>
      <button class="Zbtn btn-submit" @click="finishClick">完成</button>
    </div>
  </div>
</template>
<script>
import QRCode from '../../untils/qrcode'
import {
        getAppdownloadPageurl,

        } from '../../api/appmanagement'
export default {
  data() {
    return {
      // 二维码 地址
      appEwm : '',
    };
  },
  mounted: function() {
    // 二维码  url
    this.getInitermurl();
  },
  methods: {
    // 二维码 函数
    qrcode() {
      let qrcode = new QRCode("qrcode", {
        width: 200, // 设置宽度，单位像素
        height: 200, // 设置高度，单位像素
        border: 2,
        text: this.appEwm, // 设置二维码内容或跳转地址
        colorDark: "#000000", // 生成的二维码的深色部分
        colorLight: "#ffffff", //生成二维码的浅色部分
        correctLevel: QRCode.CorrectLevel.L // 容错值
      });
    },
    // 获取二维码url
    getInitermurl() {
      // 二维码 生成调用
      // getAppdownloadPageurl
      let objData = {
        enterprise_id: localStorage.EnterpriseId
      };
      getAppdownloadPageurl(objData).then(res => {
        if (res.status === 200 && res.data.result == "ok") {
          this.appEwm = res.data.data.app_download_page_url;

          // 二维码 生成调用
          this.$nextTick(() => {
            this.qrcode();
          });
        }
      });
    },
    // 下载二维码
    downloadEwm() {
      var imgs = document.getElementById("qrcode").getElementsByTagName("img");
      var a = document.createElement("a");
      a.download = "企业二维码";
      a.href = imgs[0].src;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    // 完成
    finishClick() {
      this.$router.push({
        path: "/Homemain/company",
        query: {}
      });
    }
  }
};
</script>
<style scoped>
.ewm {
  margin-bottom: 20px;
  padding: 0;
  width: 200px;
  height: 200px;
}
.contactsInput {
  margin-bottom: 20px;
  width: 120px;
  height: 36px;
  font-size: 14px;
  line-height: 36px;
  padding-left: 14px;
  background: #2a3558;
  border: 1px #3b4872 solid;
}
.el-upload__tip {
  margin: 0;
  margin-top: 10px;
  display: inline-block;
  width: 100%;
  color: #fff;
  line-height: 23px;
}
.appLogoinp{
    margin-bottom: 20px;
    width: 180px;
    height: 36px;
    font-size: 14px;
    line-height: 36px;
    padding-left: 20px;
    background: #2a3558;
    border: 1px solid #3b4872;
}
</style>


