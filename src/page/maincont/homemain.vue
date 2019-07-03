<template>
  <div class="content">
    <h1>首页</h1>
  </div>
</template>
<script>

import $ from "jquery";

export default {
  data() {
    return {

    };
  }
};
</script>
<style>
#homeapp{
  padding: 20px;
}
#cont{
    width: 93%;
    padding: 30px;
    margin: 20px;
    background: #354166;
    -webkit-box-shadow: 0px 0px 26px #01060e;
    box-shadow: 0px 0px 26px #01060e;
}
#cont .hd{
  margin-bottom: 20px;
  line-height: 38px;
  padding-bottom: 20px;
  border-bottom: 2px solid #4a567c;
}
#cont .bd{
  padding: 20px;
  margin-bottom: 20px;
  border: 2px solid #4a567c;
}
#cont .table{
  padding: 0;
  border: none;
}
#cont .Zbtn{
    color: #eee;
    height: 38px;
    font-size: 14px;
    margin-left: 11px;
    text-align: center;
    line-height: 38px;
    padding: 0px 15px;
    background: #1b274c;
    border: 1px #3b4872 solid;
}
#cont .btn-rt{
  float: right;
}
.tabCont{
  padding: 20px;
}
.guide{
  display: flex;
  justify-content: space-around;
  align-content: center;
}
.guide li{
  flex: 1;
  margin-right: 10px;
  line-height: 35px;
  border: 1px solid #fff;
  border-radius: 5px;
  text-align: center;
}
.guide li:last-child{
  margin-right: 0;
}
.guide .active{
  background: #57e29b;
  border: 1px solid #57e29b;
}
#cont .tree .el-button span{
  color: #fff;
}
#cont .btnRight{
  margin-top: 10px;
  text-align: center;
}
/* 弹窗中   输入框 */
.Zdialog input{
  height: 36px;
  line-height: 36px;
}
/* 弹窗中 表单from  输入框 */
.Zdialog-form input{
  height: 40px;
  line-height: 40px;
}
.spanBtn{
  cursor: pointer
}
#upload #upload .el-upload{
  float: inherit;
}
.Zdialog-form .spanBtn{
  margin-left: 10px;
  padding: 10px 30px;
  font-size: 14px;
  border-radius: 3px;
  background: -webkit-gradient(linear,left top, right top,from(#31f394), to(#31e4c1));
  background: linear-gradient(to right,#31f394, #31e4c1);
}
</style>


