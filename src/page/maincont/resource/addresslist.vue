<template>
	<div id="address" class="mRight">
		<div class="addressList">
			<div class="zForm">
				<span class="paddingLeft">查询方式：</span><input class="zInput" type="text" placeholder="" />
				<span class="paddingLeft">名称： </span><input class="zInput" type="text" placeholder="" />
                <button class="buttonradius">查询</button>
                <button class="buttonradius">清空</button>
                <button class="buttonradius" @click="addPermissiondata(false)">编辑</button>
                
			</div>
		</div>
        <!-- 新增权限分组 -->
		<div id="userAddModel3">
			<el-dialog
					class="permissionForm"
					title="新增权限分组"
					:visible.sync="editPermission"
					:before-close="closePermission"
					width="50%"
					>
					<el-form ref="perForm" :model="perForm" label-width="120px">
						<div class="formTable">
							<div class="block block-line">
								<el-form-item label="企业名称："  prop="name">
									<el-input v-model="perForm.name" maxlength="50"></el-input>
								</el-form-item>
							</div>
							<div class="block">
								<el-form-item label="联系人："  prop="name">
									<el-input v-model="perForm.contact" maxlength="50"></el-input>
								</el-form-item>
							</div>
							<div class="block">
								<el-form-item label="手机号："  prop="name">
									<el-input v-model="perForm.phone" maxlength="50"></el-input>
								</el-form-item>
							</div>
							<div class="block block-line">
								 <!-- 平台多选 -->
								<el-form-item id="platClass" label="报警接收平台:">
								<el-select
									v-model="perForm.platValue"
									multiple
									collapse-tags
									style="height: 40px;"
									placeholder="请选择"
								>
									<el-option
									v-for="item in perForm.addressData"
									:key="item.index"
									:value="item.value"
									></el-option>
								</el-select>
								</el-form-item>
							</div>

							<div class="block" style="width:96.5%;">
							<!-- 监控 ／ 终端 tab切换-->
							<el-tabs v-model="activeName" @tab-click="handleClick" id="tabCard" style="padding:0 10px;">
							<el-tab-pane label="监控资源分配：" name="first">
								<div class="tabCont">
								<div class="hd">
									<span>已添加资源目录</span>
									<el-button size="small" class="clear">清空</el-button>
								</div>
								<div class="bd">
									<div class="hd-l">
										<!-- 默认勾选 数据 -->
										<!-- 
											:load="loadNode"
											node-key="id"
  											:default-checked-keys=this.efaultCheckedkeys
											lazy
										-->
										<el-tree
											ref="treeRef"
											:props="defaultProps"
											:data="monitoringData"
											node-key="name"
											:default-checked-keys="['西城区']"
											@check-change="handleCheckChange"
											show-checkbox>
										</el-tree>
									</div>
									<div class="hd-r">
										<li v-for="item in presentationSubmitteddata" :key="item.key">{{item.name}}</li>
									</div>
								</div>
								</div>
							</el-tab-pane>
							<el-tab-pane label="终端通讯录分配：" name="second">终端通讯录分配：</el-tab-pane>
							</el-tabs>
							</div>
							<span slot="footer" class="dialog-footer">
								<el-button >取 消</el-button>
								<el-button type="primary">确 定</el-button>
							</span>
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
    
    // 获取行政区详情	getRegiondetail
	// 获取下级行政区域  getRegionsbyPid
	import { getRegiondetail, getRegionsbyPid} from '@/page/api/commonapi';
	/* 编辑接口 */
	import { modifyEnterprise, getEnterprisinfo} from '@/page/api/commonapi';

	export default {
        data() {
			return {
                /* 权限分组弹窗 */
				editPermission : false,
				perForm : {
					name: "企业名称",
					phone: "15116965192",
					contact : '联系人',
					// 报警平台需选择
					addressData: [
						{
							index: "1",
							value: "海淀GIS平台（负责人：张珊，13811112222）"
						},
						{
							index: "2",
							value: "东城GIS平台（负责人：张珊，13811112222）"
						}
					],
					platValue: "1",
				},
				// tab 切换
				activeName: "first",
				// tree 初始化数据
				monitoringData: [
					{
						id: "110000000000",
						name: "北京市",
						pid: "1",
						children : [
								{
									id: "110100000000",
									name: "市辖区",
									pid: "2",
									children : [
										{
											id: "110101000000",
											name: "东城区",
											pid: "3",
										},
										{
											id: "110102000000",
											name: "西城区",
											pid: "4",
										},
									]
								}
						],
					},
				],
				defaultProps: {
					children: 'children',
          			label: 'name'
				},
				/* 默认勾选数据数组 */
				efaultCheckedkeys : [110102000000],
				// 右侧展示的提交数据
				presentationSubmitteddata : [],
			}
		},
		mounted: function() {
			let row = '.addressList'
            heightAuto(row)
            // 获取 tree 数据
			//this.getTreedata();
			// 循环获取tree 数据
			this.cyclicLoadingdata();
		},
		methods:{
            /* 权限组弹窗 */
			// 新增 true ／ 编辑 false
			addPermissiondata(type,data){
				if(type){
					console.log('新增')
				}else{
					console.log('编辑')
					// ajax getEnterprisinfo 查询企业信息
                       let objData = {
                            "enterprise_id": "f940dc43-b8d8-4232-b2a2-09b5086ece97"
                        }
					// 编辑 查询企业信息
					getEnterprisinfo(objData).then(res => { 
                        console.log(res.data.data.monitor_resource_organizations);
						//console.log('选中树枝名称')
						//console.log(res.data.data.monitor_resource_organizations[0].region_name);
					});	
				}
				
				this.editPermission = true;
            },            
			closePermission(){
				console.log('关闭权限弹窗')
				this.editPermission = false;
			},
			//  权限组弹窗 tab 切换
			handleClick(tab, event) {
				console.log(tab, event);
            },
            
			// tree 结构解析 点击下拉加载数据
			loadNode(node, resolve) {
				let treeRootstate = node.checked;
				if (node.level === 0) {
					return resolve(this.monitoringData);
				}

				let obj = {
					"pid": node.data.id,
					"timestamp": 0
				}
				// 异步函数加载当前id 下子节点
				getRegionsbyPid(obj).then(res => {
					// 数据处理
					// 判断当前的是否选中
					// true 选中  false 未选中
					// 注入数据
					resolve(res.data.data.regions)
				});
			},
			// 节点选中状态发生变化时的回调
			handleCheckChange(data, checked, indeterminate){
				let _this = this;
				// 获取所有变动数据
				let res = this.$refs.treeRef.getCheckedNodes()
				let checkedArray = []
				// data  复制
				res.forEach((item) => {
					checkedArray.push(item)
				})
				// 赋值函数
				this.assignment(checkedArray);
			},
			// 赋值函数
			assignment(data){
				this.presentationSubmitteddata = data;
			},
			 // 监控数据点击
			handleNodeClick(){
				console.log('111')
			},
			// 获取 tree 初始化数据 已经选中的数据
			getTreedata(){
				// 获取行政区详情
				let obj = {
					"pid": "000000000000",
					"timestamp": 0
				}
				getRegionsbyPid(obj).then(res => {
					console.log(res.data.data.regions)
					this.monitoringData = res.data.data.regions
				})
			},
			// 循环 tree 根数据判断
			// 根据  父亲节点 循环查找数据
			// 获取根节点信息  默认为北京
			// 子节点数据默认为西城区
			cyclicLoadingdata(){
				let treeBranches = {
						id: "110102000000",
						name: "西城区",
						pid: "110100000000",
					}
				// 根据  父亲节点 循环查找数据
				let tree = {
						"pid": "110000000000",
						"timestamp": 0,
					}

				getRegionsbyPid(tree).then(res => {
					console.log(res) 
				})
				
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
.tabCont .hd-l, .tabCont .hd-r{
	height: 200px;
	max-height: 200px;
	overflow-y: auto
}
.tabCont .hd-r{
	width: 30%;
}   
</style>

<style lang="scss">
	#address {
		.addressList {
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
		#address {
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
		#address .mRightTwo .el-dialog .el-dialog__body{
			padding: 24px 24px 10px;
		}
		#address {
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
    
    /* 测试删除样式 */

	#userAddModel3 .el-form-item {
		margin: 0;
		padding: 0;
		width: 91%;
		float: left;
	}
	#userAddModel3 .block-line .el-form-item{
		width: 95.5%;
	}
	#userAddModel3 .el-input__inner{
		height: 36px;
		margin: 2px 0;
		line-height: 36px;
		border: 1px solid #3b4872;
	}
	#userAddModel3  .el-form-item__label{
		height: 36px;
		margin: 2px 0;
		line-height: 36px;
		background: #1b274c;
		border: 1px solid #3b4872;
	}
	#userAddModel3 .el-tag--info, #platClass .el-select .el-tag{
		background-color: #9093991a;
		border-color: #90939933;
	}
	#userAddModel3 .dialog-footer{
		padding: 10px 20px 20px;
		display: block;
		margin:10px 0;
		text-align: right;
	}
</style>