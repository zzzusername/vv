<template>
    <div class="mRight">
        <div class="appTab">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="启动图" name="first">
                    <div class="start">
                        <p>预览位置：</p>
                        <p>启动APP后，出现的闪屏画面：</p>
                    </div>
                    <div id="upload">
                        <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div class="reminder">1920x1080像素，jpg、png格式</div>
                    </div>
                    <div class="setFooter">
                        <el-button>取 消</el-button>
                        <el-button type="primary">保 存</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="H5版本" name="second">
                    <div class="h5">
                        <p>设置H5版本</p>
                    </div>
                    <el-upload
                        class="upload-h5"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-change="handleChange">
                        <el-button size="small" type="primary">选择</el-button>
                    </el-upload>
                    <div class="reminder">请上传您的H5压缩包文件</div>
                    <div class="explain">
                        <p>版本更新说明</p>
                        <textarea placeholder="请输入版本更新说明"></textarea>
                    </div>
                    <div class="setFooter">
                        <el-button>取 消</el-button>
                        <el-button type="primary">保 存</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="APP二维码" name="third">
                    <div class="appLogo">
                        <img class="appLogoimg" :src="appEwm" alt="#">
                        <div>
                            <input class="appLogoinp" type="text" placeholder="掌上通">
                        </div>
                        <el-upload
                            class="upload-app"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            list-type="picture">
                            <el-button size="small" type="primary">切换logo</el-button>
                        </el-upload>
                        <div class="reminder">256x256像素，jpg、png格式</div>
                    </div>
                    <div class="setFooter">
                        <el-button type="primary">下载二维码</el-button>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div> 
    </div>
     
</template>
<script>
import { heightAuto } from "../../untils/heightAuto"; //注意路径
  export default {
    data() {
        return {
            activeName: 'third',
            imageUrl: '',
            appEwm : 'http://img0.imgtn.bdimg.com/it/u=1133601823,1317112877&fm=26&gp=0.jpg',
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        /* app 上传 */
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        /* h5 上传 */
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        handleChange(file, fileList){
            console.log(file)
            console.log(fileList)
        },
        /* 更换二维码 */
        handlePreview(file) {
            console.log(file);
        }
    },
    mounted: function() {
		let row = ".appTab";
		heightAuto(row);
	},
  };
</script>
<style>
    .appTab {
        font-size: 14px;
        padding: 34px 42px;
        margin: 15px 27px 15px 15px;
        background: #354166;
        box-shadow: 0 0 26px #01060e;
    }
    .start, .reminder{
        margin-bottom: 20px;
    }
    .h5{
        margin-bottom: 50px;
    }
    .explain p{
        margin-bottom: 10px;
    }
    .explain textarea{
        width: 500px;
        height: 150px;
        display: block;
        resize: vertical;
        padding: 5px 15px;
        line-height: 1.5;
        box-sizing: border-box;
        font-size: inherit;
        color: #eee;
        background-color: #2a3558;
        background-image: none;
        border: 1px solid #3b4872;
        border-radius: 4px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    }
    /* app 二维码 */
    .upload-app{
        margin-bottom: 20px;
        overflow: hidden;
    }
    .appLogoimg{
        margin-bottom: 20px;
        width: 200px;
        height: 200px;
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
    .downEwm:hover{
        background: #57e29b;
    }
    .setFooter{
        margin-top: 20px;
        width: 100%;
        float: left;
    }
    .avatar-uploader, .upload-h5{
        margin-bottom: 20px;
        overflow: hidden;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>