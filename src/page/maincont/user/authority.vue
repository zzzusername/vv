<template>
	<div id="authority" class="mRight">
		<div class="authorityList">
			<div class="zForm">
                <span class="paddingLeft">权限组名称： </span><input class="zInput" type="text" placeholder="" />
				<span class="paddingLeft">姓名或手机号： </span><input class="zInput" type="text" placeholder="" />
                <button class="buttonradius">查询</button>
                <button class="buttonradius">清空</button>
                <button class="buttonradius" style="float:right;" @click="addPermissiondata(true)">新增</button>
			</div>
			<!-- table  -->
			<div class="zTable">
				<div class="elTable">
					<div class="scrollbox">
						<el-table
						:data="authorityData"
						>
							<el-table-column prop="name" label="权限组名称"></el-table-column>
							<el-table-column prop="name" label="创建人"></el-table-column>
							<el-table-column prop="name" label="创建人手机号"></el-table-column>
							<el-table-column prop="" label="操作" >
								<template slot-scope="scope">
									<span class="spanBtn" @click="addPermissiondata(false,scope.row)">编辑</span>
									<span class="spanBtn" @click="administrationPop = true">管理成员</span>
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
                        class="zPage">
                    </el-pagination>
				</div>
			</div>
		</div>
        <!-- 管理成员弹窗 -->
        <el-dialog
            title="测试组权限成员"
            :visible.sync="administrationPop"
            width="50%"
            :before-close="handleClose"
            id="adminPop"
            >
            <div class="adminContpop">
                <div class="adminInp">
                    <el-input v-model="adminInpcont"  placeholder="请输入内容"></el-input>
                    <el-button size="small" @click="claerAdmininp">清 空</el-button>
                </div>
                <div class="adminTable">
                    <el-table
                        :data="adminTabledata"
                        style="width: 100%">
                        <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="phone"
                            label="手机号码"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="duty"
                            label="职务">
                        </el-table-column>
                        <el-table-column prop="" label="操作">
                            <template slot-scope="scope">
                                <span class="spanBtn">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
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
									v-for="item in perForm.platformData"
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
											:load="loadNode"
											node-key="id"
											lazy
											:default-checked-keys="[110102000000,110101000000]"
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
	// js
    import {heightAuto} from '../../untils/heightAuto' //注意路径
	// api
	// 获取行政区详情	getRegiondetail
	// 获取下级行政区域  getRegionsbyPid
	import { getRegiondetail, getRegionsbyPid} from '@/page/api/commonapi';
	/* 编辑接口 */
	import { modifyEnterprise, getEnterprisinfo} from '@/page/api/commonapi';


	export default {
        data() {
			return {
                /* table 数据 */
				authorityData : [
					{
						name : '测试经理',
					},
					{
						name : '研发经理',
					}
                ],
                /* 管理成员弹窗 */
                administrationPop : false,
                adminInpcont : '搜索',
                adminTabledata: [
                    {
                        name: '姓名',
                        phone: '电话',
                        duty: '职务'
                    },
                    {
                        name: '姓名',
                        phone: '电话',
                        duty: '职务'
                    },
				],
				/* 权限分组弹窗 */
				editPermission : false,
				perForm : {
					name: "企业名称",
					phone: "15116965192",
					contact : '联系人',
					// 报警平台需选择
					platformData: [
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
									pid: "110000000000",
									children : [
										{
											id: "110101000000",
											name: "东城区",
											pid: "110100000000",
										},
										{
											id: "110102000000",
											name: "西城区",
											pid: "110100000000",
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
				/* 分页相关 */
				currentPage: 10,
				pagesize: 10,
				total : 0,
			}
		},
		methods:{
            // 清空 弹窗搜索
            claerAdmininp(){
                this.adminInpcont = '';
            },
            // 关闭弹窗
            handleClose(){
                this.administrationPop = false;
			},
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
					
					getEnterprisinfo(objData).then(res => {
						console.log('选中树枝名称')
						console.log(res.data.data.monitor_resource_organizations[0].region_name);
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
			// tree 结构解析 点击下拉加载数据
			loadNode(node, resolve) {
				let treeRootstate = node.checked;
				console.log(node.level);

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
					
					console.log(res.data.data.regions)
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
				console.log(checkedArray)
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
		},
		mounted: function() {
			let row = '.authorityList'
			heightAuto(row)
			// 获取 tree 数据
			//this.getTreedata();
			// 循环获取tree 数据
			this.cyclicLoadingdata();
		},
	}

</script>
<style scoped>
.spanBtn{
	cursor: pointer;
	margin: 0 5px;
}
/* zPage */
.zPage{
    margin-top: 50px;
}
.formTable{
	padding: 2px 4px;
	background: #4a567c;
	margin-bottom: 20px;
}
.formTable .block-line{
	width: 100%;
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
	#authority {
		.authorityList {
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
	/* tab 切换 tree */
	#tabCard .el-tabs__item {
		color: #fff;
	}
	#tabCard .is-active {
		color: #409eff;
	}
	#tabCard .tabCont .bd{
		padding: 0;
		width: 100%;
	}
	.tabCont .clear {
		float: right;
	}
	.tabCont .bd {
		overflow: hidden;
	}
	.tabCont .hd-l {
		padding: 20px;
		float: left;
		width: 55%;
		border-right: 1px solid #1b274c;
	}
	.tabCont .hd-r {
		padding: 20px;
		float: left;
		text-align: center;
	}
	.tabCont .hd-r li{
		font-size: 14px;
	}
	.tabCont .hd-r li span{
		margin-left: 10px;
	}

	@media screen and (max-width: 1440px) {
		#authority {
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
		#authority .mRightTwo .el-dialog .el-dialog__body{
			padding: 24px 24px 10px;
		}
		#authority {
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

	/* 弹窗重置样式 搜素 + table */
	#adminPop .el-dialog__header{
		padding: 11px 15px 3px;
		background: linear-gradient(#283357,#414d74);
	}
	#adminPop .adminInp{
		margin-bottom: 20px;
		overflow: hidden;
	}
	#adminPop .el-input{
		float: left;
		width: 80%;
	}
	#adminPop .adminInp .el-input__inner{
		width: 80%;
		height: 34px;
		font-size: 14px;
		margin-left: 10px;
		line-height: 35px;
		padding-left: 4px !important;
		margin-right: 20px;
		background: #2a3558;
		border: 1px #3b4872 solid;
		text-indent: 1em;
	}
		#adminPop .adminInp .el-button--small{
		float: left;
		height: 34px;
		padding: 0 15px;
	}
	#adminPop .adminTable{
		margin: 0 10px;
	}
	#adminPop .adminTable{
		color: #000;
	}
	/* 权限弹窗 */
	#adminPop .adminInp .el-input__inner{
		height: 34px;
		font-size: 14px;
		margin-left: 10px;
		line-height: 35px;
		padding-left: 4px !important;
		margin-right: 20px;
		background: #2a3558;
		border: 1px #3b4872 solid;
		text-indent: 1em;
	}
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
</style>
