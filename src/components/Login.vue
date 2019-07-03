<template>
	<div class="loginBody">
		<div id="content-lkj">
			<div class="wraper ">
				<div class="loginTitle">移动终端管理平台</div>
				<div class="loginBox">
					<div class="loginMain">
						<div class="loginForm">
							<div class="logo"><img src="../assets/loginlogo.png" alt=""></div>
							<div class="userName inputBg">
								<span><img src="../assets/password.png" alt=""></span>
								<input @click="blank()" class="username" name="login" type="text" value="" maxlength="20" autocomplete="off" placeholder="">
							</div>
							<div class="passWord inputBg inputchang">
								<span><img src="../assets/userName.png" alt=""></span>
								<input @click="blank()" class="password" name="pwd" type="password" v-model="loginpassword" maxlength="22" autocomplete="off" placeholder="密码">
							</div>
							<div class="verificationCode">
								<input @click="blank()" class="ValidateNum" name="code" type="text" maxlength="4" autocomplete="off" placeholder="验证码">
								<div class="code">
									 <img :src="item.src" alt=""  @click= postcode()>
									<canvas class="J_codeimg" id="myCanvas" @click="Code();">对不起，您的浏览器不支持canvas，请下载最新版浏览器!</canvas>
								</div>
								<!--<span class="refresh"><img src="../assets/refresh.png" alt=""></span>-->
							</div>
							<div class="errorInfo">

							</div>
							<div class="submit">
								<input type='button' @click="loginbut('signForm')" v-loading.fullscreen.lock="fullscreenLoading" value='登录'>
							</div>
						</div>
					</div>
					<div class="loginBg"><img src="../assets/loginBg.png" alt=""></div>
				</div>
			</div>

<!-- <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose"
  >
  <span>您的密码过于简单请及时修改</span>
  <span slot="footer" class="dialog-footer">
	  <div class="passWord inputBg inputchang">
								<span><img src="../assets/userName.png" alt=""></span>
								<input class="password" name="pwd" type="password" maxlength="16" autocomplete="off" placeholder="密码">
							</div>
    <el-button @click="loginSuccess">取 消</el-button>
    <el-button type="primary" @click="loginfail">确 定</el-button>
  </span>
</el-dialog> -->

<!-- 密码验证简单 -->
			<!--<el-button-->
			<!--type="primary"-->
			<!--@click="openFullScreen"-->
			<!--v-loading.fullscreen.lock="fullscreenLoading">-->
			<!--指令方式-->
			<!--</el-button>-->
			<!--<el-button-->
			<!--type="primary"-->
			<!--@click="openFullScreen2">-->
			<!--服务方式-->
			<!--</el-button>-->
			<div class="Copyright"><span class="myversion">11</span> ©2017北京视联动力国际信息技术有限公司</div>

		</div>


<el-dialog
  title="选择企业"
  :visible.sync="typedialogVisible"
  width="30%"
  :before-close="handleClosetype">
  
			<div  class="logintype">
					  <el-col :span="24" class="dataimg_height Live_page_list" id="homePage_Vod">
        <div class="listBox">
          <ul>
            <li class="fleft tll" v-for="(item, index) in logintypeData" :key="index">
							 <el-radio v-model="radio" :label="index">{{item.enterprise_name}}</el-radio>
						
							
            </li>
          </ul>
        </div>
      </el-col>

		</div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="typedialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="userlogin">确 定</el-button>
  </span>
</el-dialog>

	</div>
</template>

<script>
window.IsTips=false;
	import $ from 'jquery';
	import axios from 'axios';
	import crypto from 'crypto'
	var Codenumder = 1;
	var countdown = 250
	var CodeVal = 0;
	const canGetCookie = 1;
	//是否支持存储Cookie 0 不支持 1 支持
	const truelogin = ""; //账号
	const truepwd = ""; //密码
	var Mrcode = "";
	var messages = ""
	localStorage.removeItem('validCode')
	var nums = "";
	// var IsShowdialog=true;
	//  console.log(nums)
	//生成验证码
	$(document).keypress(function(e) {

		// 回车键事件
		if(e.which == 13) {
			// console.log("点击了回车")
			$('input[type="button"]').click();
		}
	});
	export default {
		data() {
			return {
				 radio: 0,
				 loginpassword:"",
		logintypeData:[],
		typedialogVisible:false,
		item:{
			src:'',
			cipher:''
		},
				fullscreenLoading: false,
				message: 'Hello World!',
			  dialogVisible: false
			}
		},
		mounted() {
			
			//      this.$http.get("http://10.1.7.134:9999/api/Provider/version").then(function(res) {
			//        console.log(res)
			//      }).catch(function(error) {
			//        console.log(error);
			//      });
			//      $.ajax({
			//        url: "http://10.1.7.134:9999/api/Provider/version",
			//        method: 'get',
			//        async: false,
			//        cache:false,
			//        dataType: 'json',
			//        error: function (data) {
			//          console.log("发送成功");
			//          console.log(data);
			//
			//        },
			//        success: function (data) {
			//
			//          console.log(data)
			//
			//        }
			//      });

			//      $.ajax({
			//        url:"http://10.1.7.134:10102/api/Provider/version",
			//        type:"GET",
			//        dataType:"json",
			//        processData:false,
			//        async: false,
			//        cache: false,
			//        contentType: "charset=utf-8",
			//        success: function(datas){
			//          console.log("发送成功");
			//          console.log(datas);
			//        },
			//        error: function (status) {
			//          console.log(status)
			//        }
			//      });
			this.version()
			this.loading()
			this.blank()
			this.Code()
			this.getNum()
			// this.fetchData();//获取导航
			this.postcode()

			//      this.login_put()

		},
		methods: {
		
userlogin(){
	console.log(this.radio)
		console.log(this.loginpassword)
		console.log($('.password').val())
		 let _this = this;
			 	let URL = ServerUrl;
	if(this.radio===0){
		 
		            var pwd =""
			 		var login = $('.username').val();
				//    var pwd = $('.password').val();
				  var code = $('.ValidateNum').val();
			 		let userparameter= {
 "account": login,
  "captcha": code,
  "cipher": _this.item.cipher,
  "is_encrypted_password": false,
  "password": _this.loginpassword,
  "purpose": "LOGIN"
}
console.log(userparameter)
			this.$http.post(URL + '/super/admin/api/v1/user/login', userparameter).then(function(res) {
				 console.log(res);
					// _this.reLogin(res.data.code); //提示帐号登陆、
					if(res.status===200&&res.data.result=="ok"){
						var personparse=res.data.data
							
						localStorage.gender = personparse.user.gender
					localStorage.userid = personparse.user.id;
					localStorage.phonenum = personparse.user.phonenum;
					localStorage.userName = personparse.user.realname;
					 _this.typedialogVisible = false;
					 
		    		 console.log(	localStorage.userName);
				_this.$router.push({
					path: "/Home"
				})
					}
		

				
		
			
				}).catch(function(error) {
					console.log(error);
				});
	}else{
			console.log("用户登录")
			var enterprise_id=""
			 		var login = $('.username').val();
				// var pwd = $('.password').val();
				var code = $('.ValidateNum').val();
				var logintype=this.logintypeData
				for (var index in logintype){
							console.log(parseInt(index))
					if(parseInt(index) ===this.radio){
				
						enterprise_id=logintype[index].enterprise_id

					}


				}

			 		let userparameter= {
 "account": login,
  "captcha": code,
  "cipher": _this.item.cipher,
	"enterprise_id": enterprise_id,
	  "is_encrypted_password": false,
	"password":  this.loginpassword,
  "purpose": "LOGIN"
}
			this.$http.post(URL + '/admin/api/v1/user/login', userparameter).then(function(res) {
					// _this.reLogin(res.data.code); //提示帐号登陆、
					if(res.status===200&&res.data.result=="ok"){
							 console.log(res);
							  var personparse = res.data.data;
							 					localStorage.gender = personparse.gender
					localStorage.userid = personparse.id;
					localStorage.phonenum = personparse.phonenum;
					localStorage.userName = personparse.realname;
		     	_this.typedialogVisible = false;
		    
				 _this.typedialogVisible = false;
				 // // 跳转到相应页面 Homeapp 
				_this.$router.push({
					path: "/Homeapp"
				})
					}
	

				
		
			
				}).catch(function(error) {
					console.log(error);
				});

	}

},
 //获取验证
			 postcode(){
		$('.errorInfo').html('');
					 let _this = this;
					 	_this.item.src="";
				let URL = ServerUrl;
				let param = {
			  "height": 40,
        "length": 4,
        "width": 95
				}
				this.$http.post(URL + '/common/api/v1/auth/get_login_captcha', param).then(function(res) {
					// _this.reLogin(res.data.code); //提示帐号登陆、
					if(res.status===200&&res.data.result=="ok"){
							 console.log(res);
						_this.item.src="data:image/jpeg;base64,"+res.data.data.image
							_this.item.cipher=res.data.data.cipher
					}

				
		
			
				}).catch(function(error) {
					console.log(error);
				});
			 },
		 loginbut(){

          console.log("开始登陆")
			 let _this = this;
				let URL = ServerUrl;
				var login = $('.username').val();
				var pwd = $('.password').val();
				var code = $('.ValidateNum').val();
        	if(code==""|| code==null ||code==undefined){
						$('.errorInfo').html('<span>*</span>输入验证码');
						return false;
					}
				if(login == '') {
					$('.errorInfo').html('<span>*</span>请输入您的账号');
					return false;
				} else if(pwd == '') {
					$('.errorInfo').html('<span>*</span>请输入密码');
					return false;
				} else if(localStorage.validCode !== "" && localStorage.validCode !== undefined) {
				
					
				
				
				} else {
					$('.errorInfo').html("")
				}	
				let loginbutparam = {
  "account": login,
  "captcha": code,
  "cipher": _this.item.cipher,
  "is_encrypted_password": false,
  "password":  this.loginpassword,
  "purpose": "LOGIN"
}
			console.log(loginbutparam);
				this.$http.post(URL + '/common/api/v1/auth/list_login_options', loginbutparam).then(function(res) {
					 console.log(res);
					// _this.reLogin(res.data.code); //提示帐号登陆、
					if(res.status===200&&res.data.result=="ok"){
							
							 var listtype=res.data.data.login_options
				
						for( var its in listtype){
							console.log(listtype[its])
							if(listtype[its].user_role==="ROLE_SUPER_ADMIN"){
							listtype[its].enterprise_name="超级管理员"
							}

						}
								_this.logintypeData=listtype
							 console.log(_this.logintypeData);
							_this.typedialogVisible=true
				
					}
					if(res.data.result=="error"){
						_this.$message({
				message: res.data.error_description,
				type: 'warning'
			});
						 console.log(res);
						 
					}

				
		
			
				}).catch(function(error) {
					console.log(error);
				});
			 },


			 handleClose(done) {
     	this.fullscreenLoading = false;
				this.$router.push({
					path: "/Home"
				})
      },
handleClosetype(done){
	this.typedialogVisible = false;
},
			getNum() {
				nums = "";
				var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

				for(var i = 0; i < 32; i++) {
					var id = parseInt(Math.random() * 61);
					nums += chars[id];
				}
			},
			version() {
				$('.myversion').html(version)
			},
			//			背景图适应屏幕
			loading() {
				this.clickSignIn('signForm')
			},
			// 输入验证非空
			clickSignIn(signForm) {
			
				var login = $('.username').val();
				var pwd = $('.password').val();
				var code = $('.ValidateNum').val();
        	if(code==""|| code==null ||code==undefined){
						$('.errorInfo').html('<span>*</span>输入验证码');
						return false;
					}
				if(login == '') {
					$('.errorInfo').html('<span>*</span>请输入您的账号');
					return false;
				} else if(pwd == '') {
					$('.errorInfo').html('<span>*</span>请输入密码');
					return false;
				} else if(localStorage.validCode !== "" && localStorage.validCode !== undefined) {
					// console.log("localStorage.validCode："+localStorage.validCode );
					// console.log("code："+code );
					// $('.verificationCode').show();
					
				
				
				} else {
					$('.errorInfo').html("")
				}
				// console.log("加载")

				this.fullscreenLoading = true;
				//			  登陆接口
				var login = $('.username').val();
				var pwd = $('.password').val();
				var codes = $('.ValidateNum').val();

				var md5 = crypto.createHash("md5")
md5.update(pwd)//this.pw2这是你要加密的密码
var md5pwd = md5.digest('hex')//this.pw这就是你加密完的密码，这个往后台传就行了
				
				localStorage.clientKey = 'a2530ec77e9513d'; ///clientKey
				localStorage.userName = login //账号
				localStorage.userPassword = pwd //密码
				// console.log(md5pwd)

				let param_log = {
					"clientKey": "a2530ec77e9513d",
					"tempCode": nums,
					"userName": login,
					"userPassword":md5pwd,
					"validCode": codes.toUpperCase(),
					"invokeTime": ""
				}
					// console.log(param_log)
				var that = this
				that.myserver.PutLogondata(param_log).then(function(res) {
		
					let logindata = res.data;
					var person = logindata.data
			
		
				

					localStorage.setItem("person", JSON.stringify(person));
					var personparse = JSON.parse(localStorage.person)
					var logincode = logindata.code 
					var loginPhone = logindata.data.phone 
						// console.log(loginPhone)
					localStorage.imgUrl = personparse.headPicUrl
					localStorage.userId = personparse.userId;
					localStorage.phone = personparse.phone;
			
					localStorage.roleLevel = personparse.roleLevel;
						messages = logindata.message
			     
					localStorage.token = personparse.token
					localStorage.remainderTimes = personparse.remainderTimes //登陆次数
					localStorage.validCode = personparse.validCode
					localStorage.tempCode = personparse.tempCode
					localStorage.token = personparse.token
					Mrcode = personparse.validCode;

					if(personparse.validCode=="" ||personparse.validCode==null){
						Mrcode=code.toUpperCase()	
					}else{
						Mrcode =personparse.validCode
					}

					that.Code()
					if(logincode === 0 ) {
					 window.IsTips=true      
							
						
	
						if(loginPhone!=""||logindata.data.account==="admin"){
						
							//  that.loginopen()
						}else {
					

							that.Loadingclose()
						$('.errorInfo').html('<span>*</span>' + "不允许登录，未填写手机号");
						}
							
					
					} 
				    else {
				
						that.Loadingclose()
						$('.errorInfo').html('<span>*</span>' + messages);
					}
				}).catch(function(error) {
					// console.log(error);
				});

			},

			loginopen() {
				// 	if(IsShowdialog){
				// 	this.dialogVisible=true;
					
				// }else{
	this.fullscreenLoading = false;
				this.$router.push({
					path: "/Home"
				})
				// 
			},
			loginSuccess(){
	this.fullscreenLoading = false;
				this.$router.push({
					path: "/Home"
				})
			
			},
			loginfail(){
					this.fullscreenLoading = false;
				this.$router.push({
					path: "/Home"
				})
			

			},
			Loadingclose() {
				this.fullscreenLoading = false;

			},
			loading() {
				var wid = document.documentElement.clientWidth,
					hei = document.documentElement.clientHeight;
				var fheight = $('.Copyright').height();
				$('.wraper').css('height', hei - fheight);
				$('#content-lkj').css('height', hei - fheight);
			},
			blank() {
				$('.errorInfo').html("")
			},
			Code() {
				this.showCheck()
			},
			showCheck(a) {
				a = Mrcode
				CodeVal = a;
				// console.log('我是验证码' + a)
				var c = document.getElementById("myCanvas");
				if(c != null) {
					var ctx = c.getContext("2d");
					ctx.clearRect(0, 0, 1000, 1000);
					ctx.font = "80px 'Hiragino Sans GB'";
					ctx.fillStyle = "#E8DFE8";
					ctx.fillText(a, 0, 100);
				}

			},

			fetchData() {
				//var personparse = JSON.parse(localStorage.person)
				let _this = this;
				var date = {
					"ClientKey": localStorage.clientKey,
					"Token": localStorage.token,
				}
				// console.log(date);
				this.myserver.getMenuModel(date).then(function(res) {
					var response = res.data;
					// console.log('登录时的导航');
					// console.log(res);
					window.navigationbar = response.data.items
					//          localStorage.setItem("Myitems",JSON.stringify( response.data.items));
					_this.items = response.data.items;

				}).catch(function(error) {

				});
			},

			openFullScreen() {
				this.fullscreenLoading = true;
				setTimeout(() => {
					this.fullscreenLoading = false;
				}, 2000);
			},
			openFullScreen2() {
				const loading = this.$loading({
					lock: true,
					text: 'Loading',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				setTimeout(() => {
					loading.close();
				}, 2000);
			}
		}
	}
</script>
<style>
/* .logintype{
    position: absolute;
    top: 50%;
    left: 50%;
} */
#content-lkj{
	 position: relative;
}
#content-lkj .logintype{
 position: absolute;
  width: 100%;
	height: 100%;
	background-color: rgba(73, 70, 70, 0.2);
	z-index: 50;
}
#content-lkj .dataimg_height{
 position: absolute;
    top: 50%;
    left: 50%;	
}
	input:-webkit-autofill {
		-webkit-box-shadow: 0 0 0px 1000px white inset;
		border: 1px solid #ffffff!important;
	}
	
	.myversion {
		color: #4a567c;
		position: absolute;
		left: 20px;
	}
</style>