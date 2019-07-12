<template>
	<div id="UserList" class="mRight">
		<div class="childeList">
			<div class="zForm">
				<span class="paddingLeft">企业名称：</span><input class="zInput" type="text" placeholder="" />
				<span>管理员姓名或手机号：</span><input class="zInput" type="text" placeholder="" />
				<button class="buttonradius">查询</button>
				<button class="buttonradius">清空</button>
				<button class="buttonradius" style="float:right;" @click="addDatalist">新增</button>
			</div>
			<!-- table  -->
			<div class="zTable">
				<div class="elTable">
					<div class="scrollbox">
						<el-table
						:data="userdate"
						>
							<el-table-column prop="index" label="企业名称" width="180"></el-table-column>
							<el-table-column prop="userId" label="地区"></el-table-column>
							<el-table-column prop="userId" label="联系人"></el-table-column>
							<el-table-column prop="userId" label="联系人手机号"></el-table-column>
							<el-table-column prop="userId" label="添加时间"></el-table-column>
							<el-table-column prop="" label="操作">
								<template>
									<a href="javascript:;"><img src="../../../assets/edit2.png" alt="" style="margin-top:1px;"></a>
									<span class="spanBtn" @click="shortTime">临时账号</span>
									<span class="spanBtn" @click="logoutClick">注销</span>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
			</div>
		</div>
		<!-- 临时账号弹窗 -->
		<el-dialog  title="临时账号" 
			:visible.sync="shortTimepop"
			id="zDialogtext"
		 	width="30%">
			<div class="block">
				<li>
					<span class="liL">用户名：</span>
					<span class="liR">123</span>
				</li>
				<li>
					<span class="liL">密码：</span>
					<span class="liR">123</span>
				</li>
				<li>
					<span class="liL">有效期：</span>
					<span class="liR">1天</span>
				</li>
			</div>
			<div class="userBtn">
				<el-button size="small">关闭</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import $ from "jquery";
	import axios from "axios";
	import '../../style/common.css' /*引入公共样式*/
	// js
	import {heightAuto} from '../../untils/heightAuto' //注意路径

	export default {
        data() {
			return {
				userdate : [
					{
						index : '1',
						userId : '用户编号',
					}
				],
				// 临时账号弹窗
				shortTimepop : false,
			}
		},
		mounted: function() {
			/* 高度自适应 */
		/* 	var hei = document.documentElement.clientHeight;
			$(".childeList").css("height", hei - 178);
			$(window).resize(function() {
				var wid = document.documentElement.clientWidth,
					hei = document.documentElement.clientHeight;
				$(".childeList").css("height", hei - 178);
			}); */
			let row = '.childeList'
			heightAuto(row)
		},
		methods:{
			addDatalist(){
				console.log('新增')
			},
			/* 临时账号 */
			shortTime(){
				this.shortTimepop = true;
			},
			/* 注销 */
			logoutClick(){
				this.$confirm("是否执行禁用操作?", "消息", {
							confirmButtonText: "确定",
							cancelButtonText: "取消",
							type: "warning"
						})
						.then(() => {
							console.log('注销')
							/* 
							let cheklist = [];
							var _this = this;
							var URL = window.ServerUrl;
							for(let i = 0; i < cheklength.length; i++) {
								cheklist.push(cheklength[i].userId);
							}
							let params = {
								IdList: cheklist,
								isEnable: false,
								clientKey: localStorage.clientKey,
								token: localStorage.token
							};
							console.log(params);
							axios
								.put(URL + "/api/Provider/ThirdPartyUser/UserEnable", params)
								.then(function(res) {
									console.log(res);
									_this.reLogin(res.data.code); //提示帐号登陆
									_this.getUseList();

									if(res.data.code === 0) {
										_this.$message({
											message: "禁用成功",
											type: "success"
										});
									} else {
										if(res.data.code==window.code ) return;
										_this.$message({
											message: res.data.message,
											type: "info"
										});
									}
								})
								.catch(function(error) {
									console.log(error);
								}); */
						})
						.catch(() => {
							this.$message({
								type: "info",
								message: "已取消注销"
							});
						});
			}
		}
	}
	
</script>
<style scoped>
.spanBtn{
  cursor: pointer;
  margin-left: 5px;
}
</style>

<style lang="scss">
	#UserList {
		.childeList {
			padding: 34px 42px;
			margin: 15px 27px 15px 15px;
			background: #354166;
			box-shadow: 0 0 26px #01060e;
			.zForm {
				span {
					float: left;
					color: #eee;
					display: block;
					font-size: 14px;
					overflow: hidden;
					line-height: 36px;
				}
				button {
					float: left;
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
				button:hover {
					background: #57e29b;
				}
				span.btnRight {
					float: right;
					display: inline-block;
				}
				.zSelect {
					float: left;
					width: 148px;
				}
				.paddingLeft {
					padding-left: 20px;
				}
				.zInput {
					float: left;
					width: 120px;
					height: 36px;
					font-size: 14px;
					margin-left: 10px;
					line-height: 36px;
					padding-left: 4px !important;
					margin-right: 20px;
					background: #2a3558;
					border: 1px #3b4872 solid;
				}
			}
			.zTable {
				clear: both;
				height: 94%;
				overflow: hidden;
				padding-top: 26px;
				.elTable {
					height: 91.7%;
					overflow: hidden;
					.el-table .warning-row td {
						color: oldlace;
						background-color: transparent;
					}
					.el-table .warning-row {
						background: -webkit-linear-gradient(#3f7984, #485b7d, #3f7984);
						background: -o-linear-gradient(#3f7984, #485b7d, #3f7984);
						background: -moz-linear-gradient(#3f7984, #485b7d, #3f7984);
						background: linear-gradient(#3f7984, #485b7d, #3f7984);
						filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3f7984', endColorstr='#485b7d', GradientType=0);
						border-top: 2px #57e29b solid;
						border-bottom: 2px #57e29b solid;
					}
					.el-table .success-row {
						background-color: #6ee2c1;
						color: #f0f9eb;
					}
					.el-table .warning-row td {
						color: oldlace;
					}
					.el-table .success-row td {
						color: #f0f9eb;
					}
					.el-table .warning-row td div {
						color: oldlace;
					}
					.el-table .success-row td div {
						color: #f0f9eb;
					}
				}
			}
			#userEditModel .el-dialog{
				width: 1100px;
				top: 50%;
				.el-dialog__body {
					padding: 24px 24px 18px;
					.el-checkbox {
						float: left;
					}
					.textarea {
						clear: both;
						height: 70px;
						overflow: hidden;
						.el-form-item__label {
							height: 70;
							background: #1b274c;
							line-height:70px;
						}
						.el-form-item__label {
							margin: 2px 0;
							background: #1b274c;
							border: 1px #3b4872 solid;
						}
					}
					.textarea2 {
						clear: both;
						height: 44px;
						overflow: hidden;
						.el-form-item__label {
							float: left;
							height: 44px !important;
							line-height: 44px;
							background: #1b274c;
							border: 1px #3b4872 solid;
						}
					}
					.textareatree {
						height: 38px;
						position: relative;
						overflow: visible !important;
						.el-form-item__label {
							height: 36px;
							line-height: 36px;
						}
						.checkboxBg2 {
							width: 104.7%;
							height: 34px;
							margin: 2px 0;
							text-align: left;
							overflow: hidden;
							padding-left: 10px;
							background: #2a3558;
							border: 1px #3b4872 solid;
							.framework {
								height: 32px;
								line-height: 32px;
							}
						}
					}
					.el-form-item {
						margin: 0;
						padding: 0;
						width: 91%;
						float: left;
					}
					.el-textarea {
						width: 106.2%;
					}
					#uploadForm {
						margin-top: 18px;
						width: 8px;
					}
					.uploadbg {
						width: 804px;
						height: 66px;
						margin: 2px 0;
						padding-left: 10px;
						background: #2a3558;
						border: 1px #3b4872 solid;
					}
					.filegroup {
						height: 70px;
						overflow: hidden;
						position: relative;
						padding-top: 10px;
						text-align: left;
					}
					.iptvImg {
						float: left;
						width: 100px;
						height: 50px;
						overflow: hidden;
						margin-top: 6px;
						text-align: left;
					}
					.iptvImg img {
						max-height: 50px;
						max-width: 100px;
					}
					#uploadForm {
						float: left;
						width: 80%;
						height: 32px;
						margin-top: 16px;
						display: block;
						overflow: hidden;
					}
					.uploadbg .formLeft {
						float: left;
						width: 300px;
						height: 38px;
						overflow: hidden;
						margin-top: 16px;
						position: relative;
					}
					.uploadbg .formRight {
						float: left;
						overflow: hidden;
						margin-top: 16px;
					}
					.uploadbg .formRight .fileUpbtn {
						float: left;
						color: #fff;
						width: 80px;
						height: 36px;
						background: #4a567c;
						border-radius: 3px;
						line-height: 36px;
						text-align: center;
						cursor: pointer;
					}
					#file {
						float: left;
						width: 260px;
						color: #fff;
						height: 30px;
						border: none;
						overflow: hidden;
						line-height: 30px;
						margin-left: 120px;
						background: none;
					}
					span.filebtn {
						float: left;
						color: #fff;
						width: 90px;
						height: 30px;
						background: #4a567c !important;
						border-radius: 3px;
						position: absolute;
						z-index: 19;
						line-height: 30px;
						text-align: center;
						padding: 3px 10px;
						margin: 0;
						left: 0;
						top: 0;
					}
					#files {
						width: 110px;
						height: 30px;
						position: absolute;
						opacity: 0;
						z-index: 20;
						left: 0;
						top: 0;
						input {
							float: left;
						}
					}
					.uploadbg {
						width: 804px;
						height: 66px;
						margin: 2px 0;
						padding-left: 10px;
						background: #2a3558;
						border: 1px #3b4872 solid;
					}
					.block {
						float: left;
						width: 100%;
						height: 40px;
						overflow: hidden;
						/* border:2px #4a567c solid; */
						.el-input__inner {
							height: 36px;
							margin: 2px 0;
							line-height: 36px;
							border: 1px #3b4872 solid;
						}
						.el-form-item__label {
							height: 36px;
							margin: 2px 0;
							line-height: 36px;
							background: #1b274c;
						}
					}
					.blockTree {
						position: relative;
						overflow: visible !important;
					}
					.formTable {
						//   overflow: hidden;
						padding: 2px 4px;
						background: #4a567c;
					}
					.infoMsg {
						float: left;
						line-height: 36px;
						padding-left: 9px;
					}
					.checkboxBg {
						width: 96%;
						height: 34px;
						margin: 2px 0;
						text-align: left;
						line-height: 34px;
						padding-left: 10px;
						background: #2a3558;
						border: 1px #3b4872 solid;
					}
					.userBtn {
						overflow: hidden;
						padding-top: 24px;
						text-align: right;
						.el-form-item {
							width: 100%;
						}
					}
				}
			
			}
			// #userEditModel .el-dialog,
			#userLookModel .el-dialog,
			#userMoreAddModel .el-dialog,
			#userAddModel .el-dialog {
				width: 1100px;
				top: 50%;
				.el-dialog__body {
					padding: 24px 24px 18px;
					.el-checkbox {
						float: left;
					}
					.textarea {
						clear: both;
						height: 120px;
						overflow: hidden;
						.el-form-item__label {
							height: 120 important;
							background: #1b274c;
							line-height: 120px;
						}
						.el-form-item__label {
							margin: 2px 0;
							background: #1b274c;
							border: 1px #3b4872 solid;
						}
					}
					.textarea2 {
						clear: both;
						height: 44px;
						overflow: hidden;
						.el-form-item__label {
							float: left;
							height: 44px !important;
							line-height: 44px;
							background: #1b274c;
							border: 1px #3b4872 solid;
						}
					}
					.textareatree {
						height: 38px;
						position: relative;
						overflow: visible !important;
						.el-form-item__label {
							height: 36px;
							line-height: 36px;
						}
						.checkboxBg2 {
							width: 104.7%;
							height: 34px;
							margin: 2px 0;
							text-align: left;
							overflow: hidden;
							padding-left: 10px;
							background: #2a3558;
							border: 1px #3b4872 solid;
							.framework {
								height: 32px;
								line-height: 32px;
							}
						}
					}
					.el-form-item {
						margin: 0;
						padding: 0;
						width: 91%;
						float: left;
					}
					.el-textarea {
						width: 106.2%;
					}
					#uploadForm {
						margin-top: 18px;
						width: 8px;
					}
					.uploadbg {
						width: 804px;
						height: 66px;
						margin: 2px 0;
						padding-left: 10px;
						background: #2a3558;
						border: 1px #3b4872 solid;
					}
					.filegroup {
						height: 70px;
						overflow: hidden;
						position: relative;
						padding-top: 10px;
						text-align: left;
					}
					.iptvImg {
						float: left;
						width: 100px;
						height: 50px;
						overflow: hidden;
						margin-top: 6px;
						text-align: left;
					}
					.iptvImg img {
						max-height: 50px;
						max-width: 100px;
					}
					#uploadForm {
						float: left;
						width: 80%;
						height: 32px;
						margin-top: 16px;
						display: block;
						overflow: hidden;
					}
					.uploadbg .formLeft {
						float: left;
						width: 300px;
						height: 38px;
						overflow: hidden;
						margin-top: 16px;
						position: relative;
					}
					.uploadbg .formRight {
						float: left;
						overflow: hidden;
						margin-top: 16px;
					}
					.uploadbg .formRight .fileUpbtn {
						float: left;
						color: #fff;
						width: 80px;
						height: 36px;
						background: #4a567c;
						border-radius: 3px;
						line-height: 36px;
						text-align: center;
						cursor: pointer;
					}
					#file {
						float: left;
						width: 260px;
						color: #fff;
						height: 30px;
						border: none;
						overflow: hidden;
						line-height: 30px;
						margin-left: 120px;
						background: none;
					}
					span.filebtn {
						float: left;
						color: #fff;
						width: 90px;
						height: 30px;
						background: #4a567c !important;
						border-radius: 3px;
						position: absolute;
						z-index: 19;
						line-height: 30px;
						text-align: center;
						padding: 3px 10px;
						margin: 0;
						left: 0;
						top: 0;
					}
					#files {
						width: 110px;
						height: 30px;
						position: absolute;
						opacity: 0;
						z-index: 20;
						left: 0;
						top: 0;
						input {
							float: left;
						}
					}
					.uploadbg {
						width: 804px;
						height: 66px;
						margin: 2px 0;
						padding-left: 10px;
						background: #2a3558;
						border: 1px #3b4872 solid;
					}
					.block {
						float: left;
						width: 50%;
						height: 40px;
						overflow: hidden;
						/* border:2px #4a567c solid; */
						.el-input__inner {
							height: 36px;
							margin: 2px 0;
							line-height: 36px;
							border: 1px #3b4872 solid;
						}
						.el-form-item__label {
							height: 36px;
							margin: 2px 0;
							line-height: 36px;
							background: #1b274c;
						}
					}
					.blockTree {
						position: relative;
						overflow: visible !important;
					}
					.formTable {
						//   overflow: hidden;
						padding: 2px 4px;
						background: #4a567c;
					}
					.infoMsg {
						float: left;
						line-height: 36px;
						padding-left: 9px;
					}
					.checkboxBg {
						width: 96%;
						height: 34px;
						margin: 2px 0;
						text-align: left;
						line-height: 34px;
						padding-left: 10px;
						background: #2a3558;
						border: 1px #3b4872 solid;
					}
					.userBtn {
						overflow: hidden;
						padding-top: 24px;
						text-align: right;
						.el-form-item {
							width: 100%;
						}
					}
				}
			}
			#distributionModel .el-dialog {
				width: 730px;
				height: 594px;
				top: 50%;
				overflow: hidden;
				.el-dialog__body {
					height: 490px;
				}
			}
		}
		input.el-input__inner:hover {
			border: 1px #3b4872 solid;
		}
		.el-input__icon {
			width: 37px;
		}
		.el-input--prefix .el-input__inner {
			padding-left: 38px;
		}
		/* .scrollbox {
			width: 1563px;
		} */
	}
	.vuescroll-horizontal-scrollbar {
		display: block !important;
	}
	 ::-webkit-scrollbar {
		width: 12px;
		/*滚动条宽度*/
		height: 12px;
		/*滚动条高度*/
	}
	 ::-webkit-scrollbar-track {
		border-radius: 5px;
		/*滚动条的背景区域的圆角*/
		background-color: #222d50;
		/*滚动条的背景颜色*/
	}
	 ::-webkit-scrollbar-thumb {
		border-radius: 5px;
		/*滚动条的圆角*/
		background-color: #4f5c84;
		/*滚动条的背景颜色*/
	}
	@media screen and (max-width: 1440px) {
		#UserList {
			.mRightTwo {
				.paddingLeft {
					padding-left: 10px;
				}
				.zForm {
					button {
						height: 30px;
						font-size: 12px !important;
						line-height: 30px;
						padding-left: 8px;
						padding-right: 8px;
					}
					span {
						font-size: 12px !important;
					}
					span.btnRight {
						float: left;
						/*margin-top: 10px;*/
					}
					.zInput {
						width: 100px !important;
						height: 28px;
						line-height: 28px;
					}
					.zgroup {
						height: 30px;
					}
					.zSelect {
						float: left;
						width: 106px;
					}
				}
				.el-select-dropdown__item {
					font-size: 12px;
				}
				.zTable {
					clear: both;
					height: 94%;
					overflow: hidden;
					padding-top: 26px;
					.elTable {
						height: 82%;
						.el-table td {
							padding: 4px 0;
						}
					}
				}
			}
			/* .scrollbox {
				width: 1563px;
			} */
		}
	}
	@media screen and (max-width: 1366px) {
		#UserList .mRightTwo #userEditModel .el-dialog .el-dialog__body, #UserList .mRightTwo #userLookModel .el-dialog .el-dialog__body, #UserList .mRightTwo #userMoreAddModel .el-dialog .el-dialog__body, #UserList .mRightTwo #userAddModel .el-dialog .el-dialog__body {
    padding: 24px 24px 10px;
}
		#UserList {
			.mRightTwo {
				.paddingLeft {
					padding-left: 10px;
				}
				.zForm {
					button {
						height: 30px;
						font-size: 12px !important;
						line-height: 30px;
						padding-left: 5px;
						padding-right: 5px;
					}
					span {
						font-size: 12px !important;
					}
					span.btnRight {
						float: left;
						/*margin-top: 10px;*/
					} // button {
					// 	float: left;
					// 	color: #eee;
					// 	height: 30px;
					// 	font-size: 11px;
					// 	margin-left: 8px;
					// 	text-align: center;
					// 	line-height: 30px;
					// 	padding: 0px 6px;
					// }
					.zInput {
						width: 80px !important;
						height: 28px;
						line-height: 28px;
					}
					.zgroup {
						height: 30px;
					}
					.zSelect {
						float: left;
						width: 104px;
					}
				}
				.el-select-dropdown__item {
					font-size: 12px;
				}
				.zTable {
					clear: both;
					height: 94%;
					overflow: hidden;
					padding-top: 0;
					.elTable {
						height: 87%;
						.el-table td {
							padding: 2px 0;
						}
					}
				}
				#userEditModel .el-dialog,
				#userLookModel .el-dialog,
				#userMoreAddModel .el-dialog,
				#userAddModel .el-dialog {
					.block .el-input__inner {
						height: 30px;
						margin: 2px 0;
						line-height: 36px;
						border: 1px #3b4872 solid;
					}
					.block {
						float: left;
						width: 50%;
						height: 32px !important;
						overflow: hidden;
						/* border: 2px #4a567c solid; */
						.el-form-item__label,
						.el-input__inner {
							float: left;
							height: 30px !important;
							line-height: 30px;
							border: 1px #3b4872 solid;
						}
					}
					.el-form-item__content {
						height: 30px;
					}
					.el-input {
						position: relative;
						font-size: 14px;
						display: inline-block;
						height: 30px !important;
						width: 100%;
					}
					.checkboxBg {
						width: 96%;
						height: 28px !important;
						margin: 2px 0;
						text-align: left;
						line-height: 34px;
						padding-left: 10px;
						background: #2a3558;
						border: 1px #3b4872 solid;
					}
					.userBtn {
						overflow: hidden;
						padding-top: 5px;
						text-align: right;
					}
					.el-form-item__content {
						line-height: 32px;
					}
				}
				#showtreebox,
				#showtreebox2,
				#showtreebox3 {
					display: none;
					top: 36px;
					left: 181px;
					position: absolute;
					width: 290px;
					height: 175px;
					z-index: 99;
					background-color: #354166;
					border: 2px #3b4872 solid;
				}
				#showtreebox4,
				#showtreebox5,
				#showtreebox6 {
					display: none;
					top: 37px;
					left: 181px;
					position: absolute;
					width: 290px;
					height: 110px;
					z-index: 999;
					background-color: #354166;
					border: 2px #3b4872 solid;
				}
				#showtreebox {
					height: 155px;
				}
			}
			/* .scrollbox {
				width: 1563px;
			} */
		}
	}
</style>