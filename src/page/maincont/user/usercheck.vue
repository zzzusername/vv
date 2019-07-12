<template>
	<div id="usercheck" class="mRight">
		<div class="usercheckList">
			<div class="zForm">
				<span class="paddingLeft">姓名或手机号： </span><input class="zInput" type="text" placeholder="" />
				<span class="paddingLeft">地区： </span><input class="zInput" type="text" placeholder="" />
				<span class="paddingLeft">工作单位： </span><input class="zInput" type="text" placeholder="" />
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
							<el-table-column prop="name" label="工作单位"></el-table-column>
							<el-table-column prop="name" label="职务"></el-table-column>
							<el-table-column prop="name" label="审核类型"></el-table-column>
							<el-table-column prop="name" label="申请时间"></el-table-column>
							<el-table-column prop="name" label="审核状态"></el-table-column>
							<el-table-column prop="" label="操作" >
								<template slot-scope="scope">
									<span class="spanBtn" @click="passPop = true">通过</span>
									<span class="spanBtn" @click="rejectPop = true">驳回</span>
									<span class="spanBtn" @click="detailPop = true">详情</span>
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
                        class="zPage">
                    </el-pagination>
				</div>
			</div>
		</div>
        <!-- 详情弹窗 -->
		<el-dialog  title="申请详情" 
			:visible.sync="detailPop"
			id="zDialogtext"
		 	width="30%">
			<div class="block">
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
        <!-- 通过弹窗 -->
        <div id="userAddModel2">
            <el-dialog  title="通过申请" 
                :visible.sync="passPop"
                :close-on-click-modal="false"
                width="40%">
                <el-form :model="passForm" ref="edit" label-width="38%" class="demo-ruleForm">
                    <div class="formTable">
                        <div class="block">
                            <el-form-item label="设置为管理员" prop="name">
                                <div class="checkboxBg">
                                    <el-checkbox name="type" v-model="passForm.radio">
                                        </el-checkbox>&nbsp;{{ passForm.radio==true ? '是' : '否' }}
                                </div>
                            </el-form-item>
                            <div class="infoMsg">
                                <img src="../../../assets/info.png">
                            </div>
                        </div>
                        <div class="block">
                            <el-form-item label="权限分组" prop="name">
                                <el-select v-model="passForm.mediaServerName"  placeholder="--请选择--">
                                    <el-option v-for="item in options" :key="item.index" :label="item.value" :value="item"></el-option>
                                </el-select>
                            </el-form-item>
                            <div class="infoMsg">
                                <img src="../../../assets/info.png">
                            </div>
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
        <!-- 驳回弹窗 -->
        <el-dialog  title="申请详情" 
			:visible.sync="rejectPop"
			id="zDialogtext"
		 	width="30%">
            <div class="block" style="margin-top: 20px;">
                <textarea class="textarea" placeholder="请输入驳回原因"></textarea>
			</div>
			<div class="userBtn">
				<el-button size="small" @click="detailPop = false">关闭</el-button>
			</div>
		</el-dialog>
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
                /* 审核搜索数据 */
                checkValue : '1',
                checkData : [
                    {
                        index : '1',
                        value : 'value',
                    }
                ],

				usercheckData : [
					{
						name : '测试经理',
					},
					{
						name : '研发经理',
					}
                ],
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
        updated() {
			/* var addmodHei = $("#userAddModel2 .el-dialog").height();
			$("#userAddModel2 .el-dialog").css("marginTop", -(addmodHei / 2));
			$("#userAddModel2 .el-dialog").css("marginBottom", 0);
			$("#distributionModel2 .el-dialog").css("marginTop", "-297px"); */
		}
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
.block{
	width: 100%;
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
					height: 34px;
					font-size: 14px;
					margin-left:10px;
					line-height: 35px;
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
				padding-top: 30px;
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
        width: 96%;
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
</style>