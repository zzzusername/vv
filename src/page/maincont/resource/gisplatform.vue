<template>
	<div id="platform" class="mRight">
		<div class="platformList">
			<div class="zForm">
				<span class="paddingLeft">GIS名称：</span><input class="zInput" type="text" placeholder="" />
				<span class="paddingLeft">GIS负责人： </span><input class="zInput" type="text" placeholder="" />
                <button class="buttonradius">查询</button>
                <button class="buttonradius">清空</button>
			</div>
			<!-- table  -->
			<div class="zTable">
				<div class="elTable">
					<div class="scrollbox">
						<el-table
						:data="platformData"
						>
							<el-table-column prop="name" label="名称"></el-table-column>
							<el-table-column prop="name" label="IP和端口"></el-table-column>
							<el-table-column prop="name" label="GIS负责人"></el-table-column>
							<el-table-column prop="name" label="掌上通用户"></el-table-column>
							<el-table-column prop="name" label="接入的流媒体"></el-table-column>
							<el-table-column prop="name" label="所属区域"></el-table-column>
							<el-table-column prop="" label="操作" >
								<template slot-scope="scope">
									<span class="spanBtn" @click="addDatalist">编辑</span>
									<span class="spanBtn">删除</span>
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
        <!-- 新增／ 编辑 -->
        <div id="userAddModel2">
            <el-dialog  title="编辑内容" 
                :visible.sync="editVisible"
                :close-on-click-modal="false"
                width="50%">
                <el-form :model="passForm" ref="edit" label-width="38%" class="demo-ruleForm">
                    <div class="formTable">
						<div class="block">
							<el-form-item label="所属区域："  prop="name">
								<el-input v-model="addForm.name" maxlength="50"></el-input>
							</el-form-item>
                        </div>
						<div class="block">
							<el-form-item label="GIS名称："  prop="phone">
								<el-input v-model="addForm.phone" maxlength="50"></el-input>
							</el-form-item>
                        </div>
						<div class="block">
							<el-form-item label="GIS负责人："  prop="passworld">
								<el-input v-model="addForm.passworld" maxlength="50"></el-input>
							</el-form-item>
                        </div>
						<div class="block">
							<el-form-item label="负责人手机号："  prop="resetpassworld">
								<el-input v-model="addForm.resetpassworld" maxlength="50"></el-input>
							</el-form-item>
                        </div>
                        <div class="block">
							<el-form-item label="IP和端口："  prop="resetpassworld">
								<el-input v-model="addForm.resetpassworld" maxlength="50"></el-input>
							</el-form-item>
                        </div>
                        <div class="block">
							<el-form-item label="接入的流媒体："  prop="resetpassworld">
								<el-input v-model="addForm.resetpassworld" maxlength="50"></el-input>
							</el-form-item>
                        </div>
                        <div class="block">
							<el-form-item label="GIS账号："  prop="resetpassworld">
								<el-input v-model="addForm.resetpassworld" maxlength="50"></el-input>
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
				platformData : [
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
				/* 新增／编辑 弹窗 */
				editVisible : false,
				addForm : {
					name : '姓名',
					phone : '手机',
					passworld : '1',
					resetpassworld : '2',
					headportrait : '头像',
					introduction : '简介',
				},
				/* 分页相关 */
				currentPage: 10,
				pagesize: 10,
				total : 0,
			}
		},
		mounted: function() {
			let row = '.platformList'
			heightAuto(row)
		},
		methods:{
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
	#platform {
		.platformList {
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
		#platform {
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
		#platform .mRightTwo .el-dialog .el-dialog__body{
			padding: 24px 24px 10px;
		}
		#platform {
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