<template>
	<div class="mRight" id="serverBoxZ">
		<div class="mRightTwo">
			<div class="zForm">
				<span>服务器名称：</span><input class="zInput" type="text" placeholder="" /><button class="buttonradius" @click="queryregister">查询</button><button class="buttonradius" @click="allregister">全部</button>
			</div>
			<div class="zTable">
				<div class="elTable">
					<vue-scroll :ops="ops" ref="vs">
						<div class="scrollbox">
					<el-table id="showsholl" ref="multipleTable" :data="registerData" tooltip-effect="dark">
						<el-table-column type="index" label="序号"></el-table-column>
						<el-table-column prop="orgName" label="区域"></el-table-column>
						<el-table-column prop="serverName" label="服务器名称"></el-table-column>
						<el-table-column prop="currentVersion" label="版本号"></el-table-column>
						<el-table-column prop="ip" label="IP地址"></el-table-column>
						<!-- <el-table-column prop="port" label="端口"></el-table-column> -->
						<el-table-column prop="visionStatus" label="状态">
							<template slot-scope="scope">
								<span v-if="scope.row.visionStatus =='正常'">{{ scope.row.visionStatus }}</span>
								<span v-else style="color: red">{{ scope.row.visionStatus }}</span>
							</template>

						</el-table-column>
						<el-table-column prop="boxNumberTotal" label="终端数"></el-table-column>
						<el-table-column prop="onlineUserNum" label="在线用户"></el-table-column>
						<el-table-column prop="cpuRate" label="CPU"></el-table-column>
						<el-table-column label="上行(Kb)">
							<template slot-scope="scope">
								<span v-if="scope.row.internetUpSpeed > 0">{{ scope.row.internetUpSpeed }}</span>
								<span v-else style="color: red">{{ scope.row.internetUpSpeed }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="internetDownSpeed" label="下行(Kb)">
							<template slot-scope="scope">
								<span v-if="scope.row.internetDownSpeed > 0">{{ scope.row.internetDownSpeed }}</span>
								<span v-else style="color: red">{{ scope.row.internetDownSpeed }}</span>
							</template>

						</el-table-column>
						<el-table-column prop="memoryRate" label="内存"></el-table-column>
						<el-table-column prop="threadCount" label="线程"></el-table-column>
						<el-table-column label="更新时间" width="150">
							<template slot-scope="scope">{{ scope.row.updateTime }}</template>
						</el-table-column>
					</el-table>
						</div>
					</vue-scroll>

				</div>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
	import $ from 'jquery'
	import axios from 'axios'
	var page = 1;
	export default {
		data() {
			return {

				registerData: [],
				currentPage: page,
				pagesize: scopes,
				total: 0,
				ops: {
					vuescroll: {
						mode: 'native'
					},
					scrollPanel: {}
				},
			}
		},
		mounted: function() {
			var wid = document.documentElement.clientWidth,
				hei = document.documentElement.clientHeight;
			$('.mRightTwo').css('height', hei - 178);
			this.getregister();
			$(window).resize(function () {
				var wid = document.documentElement.clientWidth,
				hei = document.documentElement.clientHeight;
				$('.mRightTwo').css('height', hei - 178);
			})
		},
		methods: {
			getregister() { //获取数据列表zxj
				let _this = this;
				let URL = ServerUrl;
				var pageSize = this.pagesize,
					currentPage = this.currentPage;
				this.$http.get(URL + '/api/Provider/ServerStatusDetail?ClientKey=' + localStorage.clientKey + '&Token=' + localStorage.token + '&ServerName=' + name + '&PageIndex=' + currentPage + '&PageSize=' + pageSize + '').then(function(res) {
					console.log(res.data);
					
					_this.reLogin(res.data.code);//提示帐号登陆

					let response = res.data.data;
					_this.registerData = response.serverStatusDetialList;

					let totalall = res.data.totalDataCount
					_this.total = totalall;
					console.log(res);
				}).catch(function(error) {
					console.log(error);
				});
			},
			allregister() { //获取全部数据列表zxj
				page = 1;
				this.currentPage = 1;
				let _this = this;
				let URL = ServerUrl;
				var pageSize = this.pagesize,
					currentPage = this.currentPage;
				this.$http.get(URL + '/api/Provider/ServerStatusDetail?ClientKey=' + localStorage.clientKey + '&Token=' + localStorage.token + '&ServerName=&PageIndex=' + currentPage + '&PageSize=' + pageSize + '').then(function(res) {
					console.log(res);
					_this.reLogin(res.data.code);//提示帐号登陆
					if(res.data.code === 0) {
						_this.$message({
							message: '全部数据',
							type: 'success'
						});
						let response = res.data.data;
						_this.registerData = response.serverStatusDetialList;
						let totalall = res.data.totalDataCount
						_this.total = totalall;
						$('.zForm input').val('')
					} else {
						if(res.data.code==window.code ) return;
						_this.$message({
							message: res.data.message,
							type: 'info'
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			queryregister() { //查询数据列表zxj
				page = 1;
				this.currentPage = 1;
				if($('.zInput').val() === '') {
					this.$message({
						message: '请填写查询项',
						type: 'warning'
					});
				} else {
					let _this = this;
					let URL = ServerUrl;
					var pageSize = this.pagesize,
						currentPage = this.currentPage;
					var name = $('.zInput').val();
					this.$http.get(URL + '/api/Provider/ServerStatusDetail?ClientKey=' + localStorage.clientKey + '&Token=' + localStorage.token + '&ServerName=' + name + '&PageIndex=' + currentPage + '&PageSize=' + pageSize + '').then(function(res) {
						console.log(res);

						_this.reLogin(res.data.code);//提示帐号登陆
						if(res.data.code === 0) {
							_this.$message({
								message: '查询成功',
								type: 'success'
							});
							let response = res.data.data;
							_this.registerData = response.serverStatusDetialList;
							let totalall = res.data.totalDataCount
							_this.total = totalall;
						} else {
							if(res.data.code==window.code ) return;
							_this.$message({
								message: res.data.message,
								type: 'info'
							});
						}
					}).catch(function(error) {
						console.log(error);
					});
				}
			},
			handleSizeChange: function(size) {
				this.pagesize = size;
			},
			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage;
				page = this.currentPage;
				this.getregister();
			},
		}
	}

	import Tools from '../media/Tools.js'
</script>
<style scoped>
	.mRightTwo {
		padding: 34px 42px;
		margin: 15px 27px 15px 15px;
		background: #354166;
		box-shadow: 0px 0px 26px #01060e;
	}
	
	.zForm span {
		float: left;
		color: #eee;
		display: block;
		font-size: 14px;
		overflow: hidden;
		line-height: 36px;
	}
	
	.zTable {
		clear: both;
		height: 94%;
		overflow: hidden;
		padding-top: 26px;
	}
	
	.zTable .el-table .cell2 {
		color: #f00;
	}
	
	.elTable {
		height: 91.7%;
		overflow-y: auto;
	}
	
	.zInput {
		float: left;
		width: 120px;
		height: 36px;
		font-size: 14px;
		margin-left: 3px;
		line-height: 36px;
		padding-left: 14px;
		margin-right: 20px;
		background: #2a3558;
		border: 1px #3b4872 solid;
	}
	
	.zForm button {
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
	
	.zSelect {
		float: left;
		width: 148px;
	}
	
	.zForm span.btnRight {
		float: right;
		display: inline-block;
	}
</style>
<style lang="scss">
	@import url("../media/lkjmedia.css");
	#showsholl {
		overflow: auto;
		overflow-y: hidden;
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
	@media screen and (max-width: 1366px) {
		#serverBoxZ {
			.zTable {
				height: 89%;
			}
			.scrollbox {
				width: 1160px;
			}
		}
	}
</style>