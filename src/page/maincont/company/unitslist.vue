<template>
  <div id="units" class="mRight">
    <div class="unitsList">
		<div class="zForm">
			<span class="paddingLeft">工作单位名称：</span>
			<input class="zInput" type="text" v-model="searchInput" placeholder="请输入工作单位名称" />
			<button class="buttonradius" @click="searckClick">查询</button>
			<button class="buttonradius" @click="clearSearch">清空</button>
			<button class="buttonradius">导出Excel</button>
			<button class="buttonradius">导入Excel</button>
			<button class="buttonradius" style="float:right;" @click="addDatalist">新增</button>
		</div>
		<div class="tree">
			<div class="bd">
			<div class="title">
				<span>工作单位名称</span>
				<span class="tit-rt">操作</span>
			</div>
			<el-tree
				:data="treeData"
				:props="defaultProps"
				node-key="id"
				default-expand-all
				:expand-on-click-node="false"
				:render-content="renderContent"
			></el-tree>
			</div>
		</div>
    </div>
	<!-- 列表编辑 -->
	<el-dialog class="Zdialog" title="编辑内容" :visible.sync="editVisible" :before-close="cancelClick" width="30%">
		<el-input v-model="editText" placeholder="请输入内容"></el-input>
		<span slot="footer" class="dialog-footer">
			<el-button @click="cancelClick">取 消</el-button>
			<el-button type="primary" @click="saveClick">保 存</el-button>
		</span>
    </el-dialog>
	<!-- 新增字段 -->
  </div>
</template>
<script>
// js
import { heightAuto } from "../../untils/heightAuto"; //注意路径
// 总条数
let id = 10;
export default {
	data() {
		return {
			// 查询
			searchInput: "",
			// tree data
			treeData: [
				{
					id: 1,
					label: "北京",
					children: [
						{
							id: 2,
							label: "北京1"
						},
						{
							id: 3,
							label: "北京2",
							children: [
								{
									id: 4,
									label: "北京1"
								},
								{
									id: 5,
									label: "北京2"
								}
							]
						}
					]
				},
				{
					id: 3,
					label: "上海",
					children: [
						{
							id: 4,
							label: "上海1"
						}
					]
				}
			],
			defaultProps: {
				children: "children",
				label: "label"
			},
			// 修改弹窗
			editVisible: false,
			editText : '',
			editNode : {},
			editData : {},
			isEdit : true,  //  编辑
		};
	},
	mounted: function() {
		let row = ".unitsList";
		heightAuto(row);
	},
	methods: {
		addDatalist() {
			this.editVisible = true;

		},
		// 查询
		searckClick() {
			console.log(this.searchInput);
		},
		clearSearch() {
			this.searchInput = "";
		},
		// 添加
		append(data) {
			// 弹窗
			this.editVisible = true;
			this.isEdit = false;
			// 存下数据
			this.editData = data;
		},
		// 删除
		remove(node, data) {
			const parent = node.parent;
			const children = parent.data.children || parent.data;
			const index = children.findIndex(d => d.id === data.id);
			children.splice(index, 1);
		},
		// 编辑
		edit(node, data) {
			this.editVisible = true;
			this.isEdit = true;
			// 存下数据
			this.editNode = node;
			// 修改内容
			this.editText = node.data.label;
		},
		// 弹窗确认保存  编辑／修改 实时保存  ajax
		saveClick() {
			this.editVisible = false;

			if (this.isEdit) {
				// 编辑
				this.editNode.data.label = this.editText;
			} else {
				// 添加
				const newChild = { id: id++, label: this.editText, children: [] };

				if (!this.editData.children) {
					this.$set(this.editData, "children", []);
				}
				this.editData.children.push(newChild);
			}

			// 清空记录
			this.editText = "";
			this.editNode = null;
			this.editData = null;
		},
		// 弹窗 取消
		cancelClick() {
			this.editVisible = false;
			// 清空记录
			this.editText = "";
			this.editNode = null;
		},
		// 渲染函数
		renderContent(h, { node, data, store }) {
			return (
				<span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
				<span>
					<span>{node.label}</span>
				</span>
				<span>
					<el-button
					class="btn"
					style="font-size: 12px;"
					type="text"
					on-click={() => this.append(data)}
					>
					<span style="color:#fff;">添加</span>
					</el-button>
					<el-button
					class="btn"
					style="font-size: 12px;"
					type="text"
					on-click={() => this.remove(node, data)}
					>
					<span style="color:#fff;">删除</span>
					</el-button>
					<el-button
					class="btn"
					style="font-size: 12px;"
					type="text"
					on-click={() => this.edit(node, data)}
					>
					<span style="color:#fff;">编辑</span>
					</el-button>
				</span>
				</span>
			);
		}
  }
};
</script>
<style lang="scss">
	#units {
	.unitsList {
		padding: 34px 42px;
		margin: 15px 27px 15px 15px;
		background: #354166;
		box-shadow: 0 0 26px #01060e;
		.zForm {
		margin-bottom: 20px;
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
			margin-left: 10px;
			line-height: 36px;
			padding-left: 4px !important;
			margin-right: 20px;
			background: #2a3558;
			border: 1px #3b4872 solid;
		}
		}
	}
	.el-input__icon {
		width: 37px;
	}
	.el-input--prefix .el-input__inner {
		padding-left: 38px;
	}
	}
	@media screen and (max-width: 1440px) {
	#units {
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
		}
	}
	}
	@media screen and (max-width: 1366px) {
	#units .mRightTwo .el-dialog .el-dialog__body {
		padding: 24px 24px 10px;
	}
	#units {
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
	.Zdialog input{
		height: 36px;
		line-height: 36px;
	}
	.tree {
		padding: 20px;
		border: 1px solid #4a567c;
	}
	.tree .el-tree-node__content {
		height: 30px;
	}
	.tree .title {
		font-size: 16px;
		margin-bottom: 20px;
		padding-bottom: 20px;
		border-bottom: 1px solid #4a567c;
		overflow: hidden;
	}
	.tree .title .tit-rt {
		float: right;
		margin-right: 45px;
	}
</style>