<template>
  <div class="content" id="cont">
    <div class="app-cent">
      <div class="hd">
        <span>新增职务</span>
        <span class="btnRight">
          <button class="Zbtn btn-rt" @click="addDatalist(true)">新增职务</button>
        </span>
      </div>
      <div class="bd table" style="color:#fff;">
            <el-table
						:data="dutyData"
						>
							<el-table-column prop="fixedSort" label="序号"></el-table-column>
							<el-table-column prop="name" label="职位名称"></el-table-column>
							<el-table-column prop="comments" label="备注信息"></el-table-column>
							<el-table-column prop="" label="操作">
								<template slot-scope="scope">
									<span class="spanBtn" @click="addDatalist(false,scope.row)">编辑</span>
									<span class="spanBtn" @click="deleteClick(scope.row)">删除</span>
								</template>
							</el-table-column>
						</el-table>
      </div>
      <div class="btnRight">
        <button class="Zbtn btn-submit" @click="saveTreedata(false)">上一步</button>
        <button class="Zbtn btn-submit" @click="saveTreedata(true)">保存并继续</button>
      </div>
    </div>
		<!-- 编辑弹窗 -->
		<div id="userAddModel2" >
			<el-dialog  :title="Titpop" 
				:visible.sync="editVisible"
				:before-close="cancelClick"
				:close-on-click-modal='false'
				width="40%"
				id="commonPop"
				>
				<el-form ref="edit" label-width="20%" class="demo-ruleForm">
					<div class="formTable">
						<div class="block">
							<el-form-item label="职位名称："  prop="" :rules="[{ required: true, message: ' '}]">
								<el-input v-model="editName" maxlength="50"></el-input>
							</el-form-item>
						</div>
						<div class="block">
							<el-form-item label="备注信息："  prop="" :rules="[{ required: true, message: ' '}]">
								<el-input v-model="editComments" maxlength="50"></el-input>
							</el-form-item>
						</div>
					</div>
					<div class="userBtn">
						<el-form-item>
							<el-button type="primary" @click="saveClick">保存</el-button>
							<el-button @click="cancelClick">取消</el-button>
						</el-form-item>
					</div>
				</el-form>
			</el-dialog>
		</div>
  </div>
</template>
<script>
/* api */
// jobTitlelist 查询列表
import {jobTitleadd, jobTitledelete, jobTitleget, jobTitlelist, jobTitlemodify} from '../../api/duty'
export default {
  data() {
    return {
				// 查询数据
				name : '',
				dutyData : [],
				/* 编辑 pop */
				editVisible : false,
				/* 编辑数据 */
				editName : '',
				editComments : '',
				enterprise_job_title_id : '',
				// 弹窗保存按钮全局状态  1 新增  0 保存
				popButtonstate : true,
				Titpop : '',
        activeIndex : '2',
        
    };
  },
  mounted: function() {
    this.getInitdata();
  },
  methods:{
    // 初始化列表数据
    getInitdata(){
      // ajax
      let objData = {
        "enterprise_id": localStorage.EnterpriseId,
        "page_number": this.page_total_pages - 1,
        "page_size": 10
      }
      if(this.name != ''){
        objData.name = this.name;
      }
      jobTitlelist(objData).then(res => {
        if (res.status === 200 && res.data.result == "ok") {
          this.dutyData = res.data.data.list;

          this.dutyData.map(function(item,index){
            item.fixedSort = index - 0 + 1;
          })

          // 添加 序号 
          console.log(this.dutyData);
          
          /* 总条数 */
          this.page_total_items = res.data.data.page_total_items; 
          this.page_total_pages = res.data.data.page_number - 0 + 1;
        }
      });	
    },	
    // 弹窗显示 编辑／新增
    addDatalist(isAdd,scope){
      this.editVisible = true;
      if(isAdd){
        this.Titpop = '新增'
        this.popButtonstate = true;
      }else{
        this.Titpop = '编辑';
        let objData = {
          "enterprise_job_title_id": scope.id
        }
        jobTitleget(objData).then(res => {
          if (res.status === 200 && res.data.result == "ok") {
            this.editName = res.data.data.name;
            this.editComments = res.data.data.comments;
            this.enterprise_job_title_id = res.data.data.id;
            this.popButtonstate = false;
          }else{
            // 错误提示信息
            this.$message.error(res.data.error_description);
          }
        });	
      }
    },
    // 数据删除
    deleteClick(scope){
      console.log(scope)
      // 删除
      let objData = {
        "enterprise_job_title_id": scope.id
      }
      this.$confirm('是否删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            jobTitledelete(objData).then(res => {
              if (res.status === 200 && res.data.result == "ok") {
                this.$message.success('删除成功');
                this.getInitdata();
              }else{
                // 错误提示信息
                this.$message.error(res.data.error_description);
              }
            });		
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    
    },
    // 关闭弹窗 清空数据
    cancelClick(){
      this.editVisible = false;
      this.clearCacheddata();
    },
    // 弹窗保存
    saveClick(){
      if(this.popButtonstate){
        // 新增
        let objData = {
          "enterprise_id": localStorage.EnterpriseId,
          "comments": this.editComments,
          "name": this.editName
        }
        jobTitleadd(objData).then(res => {
          if (res.status === 200 && res.data.result == "ok") {
            this.$message.success('新增成功');
            this.cancelClick();
            this.getInitdata();
          }else{
            // 错误提示信息
            this.$message.error(res.data.error_description);
          }
        });	
      }else{
        // 保存编辑数据
        let objData = {
          "comments": this.editComments,	
          "enterprise_job_title_id": this.enterprise_job_title_id,
          "name": this.editName,
        }
        jobTitlemodify(objData).then(res => {
          if (res.status === 200 && res.data.result == "ok") {
            this.$message.success('编辑成功');
            this.cancelClick();
            this.getInitdata();
          }else{
            // 错误提示信息
            this.$message.error(res.data.error_description);
          }
        });	

      
      }
    },
    // 清空缓存数据
    clearCacheddata(){
      this.editName = '';
      this.editComments = '';
      this.enterprise_job_title_id = '';
    },	
    saveTreedata(isNext){
      if(isNext){
        // 下一步
        let val = '3'
        // 切换 tab
        this.$store.commit('moduleSkip',val);
        // 判断高位节点 和当前节点  
        let Lastindex = this.$store.state.tabIndex;
        if(val >= Lastindex){
          this.$store.commit("skip", val);
        }
      }else{
        // 上一步
        let val = '1'
        this.$store.commit('moduleSkip',val);
      }
    }
  }
};
</script>
<style scoped>
#Ztable button span{
  color: #fff!important;
}
</style>

