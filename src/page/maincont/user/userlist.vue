<template>
	<div id="usercheck" class="mRight">
		<div class="usercheckList">
			<div class="zForm">
				<span class="paddingLeft">姓名或手机号： </span><input class="zInput" type="text" placeholder="" />
				<span class="paddingLeft">地区： </span><input class="zInput" type="text" placeholder="" />
				<span class="paddingLeft">工作单位： </span><input class="zInput" type="text" placeholder="" />
				<span class="paddingLeft">职务：</span>
                    <div class="zSelect">
                        <el-select v-model="checkValue" class="zgroup" placeholder="--请选择--">
                            <el-option v-for="item1 in checkData" 
                            :key="item1.index" :label="item1.value" :value="item1.key"></el-option>
                        </el-select>
                    </div>
				<div class="onlyLine">
                    <span class="paddingLeft">审核类型：</span>
                    <div class="zSelect">
                        <el-select v-model="checkValue" class="zgroup" placeholder="--请选择--">
                            <el-option v-for="item1 in checkData" 
                            :key="item1.index" :label="item1.value" :value="item1.key"></el-option>
                        </el-select>
                    </div>
                    <span class="paddingLeft">审核状态：</span>
                    <div class="zSelect">
                        <el-select v-model="checkValue" class="zgroup" placeholder="--请选择--">
                            <el-option v-for="item1 in checkData" 
                            :key="item1.index" :label="item1.value" :value="item1.key"></el-option>
                        </el-select>
                    </div>
                    <button class="buttonradius">查询</button>
				    <button class="buttonradius">清空</button>
				    <button class="buttonradius">导出</button>
				    <button class="buttonradius" @click="addUserlist">新增</button>
                </div>
			</div>
			<!-- table  -->
			<div class="zTable">
				<div class="elTable">
					<div class="scrollbox">
						<el-table
						:data="usercheckData"
						>
							<el-table-column prop="name" label="用户姓名"></el-table-column>
							<el-table-column prop="name" label="手机号"></el-table-column>
							<el-table-column prop="name" label="头像"></el-table-column>
							<el-table-column prop="name" label="性别"></el-table-column>
							<el-table-column prop="name" label="地区"></el-table-column>
							<el-table-column prop="name" label="部门"></el-table-column>
							<el-table-column prop="name" label="职务"></el-table-column>
							<el-table-column prop="name" label="注册方式"></el-table-column>
							<el-table-column prop="name" label="用户状态"></el-table-column>
							<el-table-column prop="" label="操作" >
								<template slot-scope="scope">
									<span class="spanBtn" @click="detailPop = true">详情</span>
									<span class="spanBtn" @click="rejectPop = true">编辑</span>
									<span class="spanBtn" @click="detailPop = true">删除</span>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<!-- page -->
					<el-pagination
						@size-change="handleSizeChange" 
						@current-change="handleCurrentChange" 
						:current-page.sync="currentPage" 
						:page-size="pagesize" 
						layout="total, prev, pager, next, jumper" 
						:total="total"
						class="zPage"
						>
					</el-pagination>
				</div>
			</div>
		</div>
        <!-- 详情弹窗 -->
		<el-dialog  title="详情" 
			:visible.sync="detailPop"
			id="zDialogtext"
		 	width="50%">
			<div class="block block-inline" id="detailW2">
				<li>
					<span class="liL">用户姓名</span>
					<span class="liR">张焕</span>
				</li>
				<li>
					<span class="liL">手机号</span>
					<span class="liR">13800003333</span>
				</li>
				<li>
					<span class="liL">头像</span>
					<span class="liR">头像</span>
				</li>
                <li>
					<span class="liL">性别</span>
					<span class="liR">男</span>
				</li>
                <li>
					<span class="liL">审核类型</span>
					<span class="liR">审核类型</span>
				</li>
				<li>
					<span class="liL">审核状态</span>
					<span class="liR">13800003333</span>
				</li>
				<li>
					<span class="liL">驳回原因</span>
					<span class="liR">头像</span>
				</li>
			</div>
			<div class="userBtn">
				<el-button size="small" @click="detailPop = false">关闭</el-button>
			</div>
		</el-dialog>
        <!-- 新增／ 编辑 -->
        <div id="userAddModel2">
            <el-dialog  title="编辑内容" 
                :visible.sync="addUserpop"
                :close-on-click-modal="false"
                width="50%">
                <el-form :model="passForm" ref="edit" label-width="38%" class="demo-ruleForm">
                    <div class="formTable">
						<div class="block">
							<el-form-item label="账号："  prop="name">
								<el-input v-model="addForm.name" maxlength="50"></el-input>
							</el-form-item>
                        </div>
						<div class="block">
							<el-form-item label="手机号："  prop="phone">
								<el-input v-model="addForm.phone" maxlength="50"></el-input>
							</el-form-item>
                        </div>
						<div class="block">
							<el-form-item label="密码："  prop="passworld">
								<el-input v-model="addForm.passworld" maxlength="50"></el-input>
							</el-form-item>
                        </div>
						<div class="block">
							<el-form-item label="重置密码："  prop="resetpassworld">
								<el-input v-model="addForm.resetpassworld" maxlength="50"></el-input>
							</el-form-item>
                        </div>
						<!-- 头像上传 -->
						<div class="upload" id="upLoadpop">
							<el-form-item label="头像：" prop="headportrait">
								<div class="uploadBg">
									<div class="filegroup">
										<div class="iptvImg"><img src="" alt=""></div>
										<form id="uploadForm" class="uploadForm4" enctype="multipart/form-data">
											<div class="formLeft">
												<input type="file" accept="image/*" id="files" 
												name="files" @change="getFile" placeholder="file" multiple>
												<span class="filebtn">请选择文件</span>
												<input type="text" id="file" name="file" readonly multiple>
											</div>
											<div class="formRight">
												<span class="fileUpbtn">上传</span>
											</div>
										</form>
									</div>
								</div>
							</el-form-item>
						</div>
						 <div class="block">
                            <el-form-item label="性别" prop="name">
                                <div class="checkboxBg">
                                    <el-checkbox name="type" v-model="addForm.radio">
                                        </el-checkbox>&nbsp;{{ addForm.radio==true ? '男' : '女' }}
                                </div>
                            </el-form-item>
                        </div>
						<div class="block">
							<el-form-item label="地区："  prop="name">
								<el-input v-model="addForm.name" maxlength="50"></el-input>
							</el-form-item>
                        </div>
						<div class="block">
							<el-form-item label="工作单位："  prop="name">
								<el-input v-model="addForm.name" maxlength="50"></el-input>
							</el-form-item>
                        </div>
						<div class="block">
                            <el-form-item label="职务：" prop="name">
                                <el-select v-model="addForm.mediaServerName"  placeholder="--请选择--">
                                    <el-option v-for="item in options" :key="item.index" :label="item.value" :value="item"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
						 <div class="block">
                            <el-form-item label="管理员" prop="name">
                                <div class="checkboxBg">
                                    <el-checkbox name="type" v-model="addForm.radio">
                                        </el-checkbox>&nbsp;{{ addForm.radio==true ? '是' : '否' }}
                                </div>
                            </el-form-item>
                        </div>
                        <div class="block">
                            <el-form-item label="权限分组" prop="name">
                                <el-select v-model="addForm.mediaServerName"  placeholder="--请选择--">
                                    <el-option v-for="item in options" :key="item.index" :label="item.value" :value="item"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
						<div class="textarea" id='reason'>
							<el-form-item label="简介：">
								<el-input type="textarea" v-model="addForm.introduction" resize="none" maxlength="300"></el-input>
							</el-form-item>
						</div>
                    </div>
                    <div class="userBtn">
                        <el-form-item>
                            <el-button type="primary">保存</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </el-dialog>
        </div>
	</div>
</template>
<script>
	import $ from "jquery";
    import axios from "axios";
    /* 展示弹窗样式文件 */
    import '../../style/common.css' /*引入公共样式*/
	// js
	import {heightAuto} from '../../untils/heightAuto' //注意路径

	export default {
        data() {
			return {
				usercheckData : [
					{
						name : '测试经理',
					},
					{
						name : '研发经理',
					}
				],
				checkData : [
					{
						name : '测试经理',
					},
					{
						name : '研发经理',
					}
				],
				checkValue : '1',
                /* 详情 */
                detailPop : false,
                /* 通过 */
                passPop : false,
                passForm : {
                    mediaServerName: "请选择",
                    radio : false,
                },
                options: [
                    {
                        index : '1',
                        value : '测试组',
                    },
                    {
                        index : '2',
                        value : '研发组',
                    }
                ],
                /* 驳回弹窗 */
                rejectPop : false,
				rejectRemark : '111',
				/* 新增／编辑 弹窗 */
				addUserpop : false,
				addForm : {
					name : '姓名',
					phone : '手机',
					passworld : '1',
					resetpassworld : '2',
					headportrait : '头像',
					introduction : '简介',



					mediaServerName: "请选择",
                    radio : false,
				},
				/* 分页相关 */
				currentPage: 10,
				pagesize: 10,
				total : 0,
			}
		},
		mounted: function() {
			let row = '.usercheckList'
			heightAuto(row)
		},
		methods:{
			addUserlist(){
				this.addUserpop = true;
			},
			// 弹窗显示
			addDatalist(isAdd,scope){
				this.editVisible = true;
				if(!isAdd){
					this.editText = scope.name;
				}else{
					this.editText = '';
				}
			},
			// 数据删除
			deleteClick(){
				console.log('删除')
			},
			// 关闭弹窗 清空数据
			cancelClick(){
				this.editVisible = false;
				this.editText = '';
			},
			// 弹窗保存
			saveClick(){
				alert(this.editText)
            },
            // 详情
            detailClick(){
                this.detailPop = true;
			},
			// 新增弹窗头像上传事件
			getFile(){
				console.log('上传')
			},
			// page
			handleSizeChange(size) {
				this.pagesize = size;
			},
			handleCurrentChange(currentPage) {
				this.currentPage = currentPage;
				console.log("我是页码" + this.currentPage);
				Page = this.currentPage;
				console.log(Page);
			},
        },
	}
	
</script>
<style scoped>
.popInput{
	width: 100%;
    height: 36px;
    font-size: 14px;
    margin-left: 10px;
    line-height: 36px;
    padding-left: 4px !important;
    margin-right: 20px;
    background: #2a3558;
    border: 1px #3b4872 solid;
	text-indent: 1em;
}
.spanBtn{
	cursor: pointer;
	margin: 0 5px;
}
.onlyLine{
    display: inline-block;
    margin-top: 20px;
}
.zPage{
	margin-top: 50px;
}
</style>

<style lang="scss">
	#usercheck {
		.usercheckList {
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
					width: 200px;
					height: 36px;
					font-size: 14px;
					margin-left:10px;
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
	}
	@media screen and (max-width: 1440px) {
		#usercheck {
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
		}
	}
	@media screen and (max-width: 1366px) {
		#usercheck .mRightTwo .el-dialog .el-dialog__body{
			padding: 24px 24px 10px;
		}
		#usercheck {
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
					}
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
			}
		}
    }
	/* 弹窗样式重置 */
	.block{
		width: 50%;
		float: left;
	}
	.block-inline{
		width: 100%;
	}
	.block .el-input__inner{
		height: 36px;
		margin: 2px 0;
		line-height: 36px;
		border: 1px solid #3b4872;
	}
    .block, .formTable, .el-dialog__body{
        overflow: hidden;
	}
	.block .el-input__inner{
		-webkit-appearance: none;
		background-color: #2a3558;
		background-image: none;
		box-sizing: border-box;
		color: #eee;
		display: inline-block;
		font-size: inherit;
		outline: 0;
		padding: 0 15px;
		transition: border-color .2s cubic-bezier(.645,.045,.355,1);
		width: 100%;
	}
    .formTable{
        padding: 2px 4px;
        background: #4a567c;
        margin-bottom: 20px;
    }
    .block .el-form-item__label{
        height: 36px;
        margin: 2px 0;
        line-height: 36px;
        border: 1px solid #3b4872;
    }
    #userAddModel2 .el-form-item {
		margin: 0;
		padding: 0;
		width: 91%;
		float: left;
    }
    .infoMsg{
        padding-left: 9px;
        display: inline-block;
        margin-top: 10px;
    }
    .checkboxBg{
        width: 94%;
        height: 34px;
        margin: 2px 0;
        line-height: 34px;
        padding-left: 12px;
        background: #2a3558;
        border: 1px solid #3b4872;
        text-align: left;
    }
    .el-dialog .textarea .el-form-item__label{
        height: 160px;
    }
    .textarea{
        clear: both;   
        width: 100%;
        height: 70px;
        background: #4a567c;
        font-size: 14px;
        padding: 10px;
	}
	/* 弹窗 上传文件 */
	#upLoadpop .el-form-item__label{
		width: 19%!important;
		margin: 2px 0;
		line-height: 80px;
		background: #1b274c;
		border: 1px solid #3b4872;
	}
	#upLoadpop .filebtn{
		float: left;
		color: #fff;
		width: 90px;
		height: 36px;
		background: #4a567c;
		border-radius: 3px;
		position: absolute;
		z-index: 19;
		line-height: 36px;
		text-align: center;
		left: 0;
		top: 0;
	}
	#upLoadpop .el-form-item__content{
		width: 84%;
    	margin-left: 19%!important;
	}
	#upLoadpop .uploadBg{
		width: 100%;
    	height: 80px;
		margin: 2px 0;
		text-align: left;
		line-height: 44px;
		padding-left: 10px;
		background: #2a3558;
		border: 1px solid #3b4872;
	}
	#upLoadpop .filegroup{
		overflow: hidden;
	}
	#upLoadpop .iptvImg{
		margin-right: 10px;
		margin-top: 15px;
		float: left;
		width: 100px;
		height: 60px;
		overflow: hidden;
	}
	#uploadForm{
		float: left;
		width: 60%;
		margin-top: 7px;
		display: block;
		overflow: hidden;
	}
	#uploadForm .formLeft{
		float: left;
		width: 60%;
		height: 36px;
		overflow: hidden;
		margin-top: 16px;
		position: relative;
	}
	#uploadForm .formRight{
		float: left;
		overflow: hidden;
		margin-top: 16px;
	}
	#upLoadpop .fileUpbtn{
		float: left;
		color: #fff;
		width: 80px;
		height: 36px;
		cursor: pointer;
		background: #4a567c;
		border-radius: 3px;
		line-height: 36px;	
		text-align: center;
	}
	#files{
		position: relative;
		top: -4px;
		left: 29px;
	}
	#reason{
		height: 60px;
		overflow: hidden;
		padding: 0;
	}
	#reason .el-form-item{
		width: 100%;
		height: 60px;
		line-height: 60px;
	}
	#reason .el-form-item__content{
		margin-left: 17%!important;
	}
	#reason .el-form-item__label{
		width: 17%!important;
		height: 100%;
		margin: 2px 0;
	}
	#reason .el-textarea{
		margin-left:2px;
		width: 60%!important;
		float: left;
		height: 100%;
	}
	/* 弹窗详情 左右 */
	#zDialogtex #detailW2{
		overflow: hidden;
	}
	#detailW2 li{
		width: 47%!important;
		margin: 0;
	}
	#detailW2 li:nth-child(2n){
		margin-left: 6%;
	}
</style>