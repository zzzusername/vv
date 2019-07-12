<template>
	<div id="duty" class="mRight">
		<div class="dutyList">
			<div class="zForm">
				<span class="paddingLeft">职位名称： </span>
				<input class="zInput" type="text" placeholder="" />
				<button class="buttonradius">查询</button>
				<button class="buttonradius">清空</button>
				<button class="buttonradius" style="float:right;" @click="addDatalist(true)">新增</button>
			</div>
			<!-- table  -->
			<div class="zTable">
				<div class="elTable">
					<div class="scrollbox">
						<el-table
						:data="dutyData"
						>
							<el-table-column prop="name" label="职位名称"></el-table-column>
							<el-table-column prop="" label="操作">
								<template slot-scope="scope">
									<span class="spanBtn" @click="addDatalist(false,scope.row)">
										<img src="../../../assets/edit2.png" alt="" style="margin-top:1px;">
									</span>
									<span class="spanBtn" @click="deleteClick">删除</span>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
				<!-- page -->
				<el-pagination
					@size-change="handleSizeChange" 
					@current-change="handleCurrentChange" 
					:current-page.sync="currentPage" 
					:page-size="pagesize" 
					layout="total, prev, pager, next, jumper" 
					:total="total">
				</el-pagination>
			</div>
		</div>
		<!-- 编辑弹窗 -->
		<el-dialog class="Zdialog" title="编辑内容" :visible.sync="editVisible" :before-close="cancelClick" width="30%">
			<input type="text" v-model="editText" placeholder="请输入内容" class="popInput">
			<span slot="footer" class="dialog-footer">
				<el-button @click="cancelClick">取 消</el-button>
				<el-button type="primary" @click="saveClick">保 存</el-button>
			</span>
    	</el-dialog>
	</div>
</template>
<script>
	import $ from "jquery";
	import axios from "axios";
	// js
	import {heightAuto} from '../../untils/heightAuto' //注意路径

	export default {
        data() {
			return {
				dutyData : [
					{
						name : '测试经理',
					},
					{
						name : '研发经理',
					}
				],
				/* 编辑 pop */
				editVisible : false,
				editText : '',
				/* 分页相关 */
				currentPage: 10,
				pagesize: 10,
				total : 0,
			}
		},
		mounted: function() {
			let row = '.dutyList'
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
</style>

<style lang="scss">
	#duty {
		.dutyList {
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
		#duty {
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
		#duty .mRightTwo .el-dialog .el-dialog__body{
			padding: 24px 24px 10px;
		}
		#duty {
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
</style>