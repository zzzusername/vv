// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import msgserver from './components/message/msgservers/msgservers'
import $ from 'jquery'
import videojs from 'video.js'
import 'videojs-contrib-hls'

import 'video.js/dist/video-js.css'

import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import vuescroll from 'vuescroll'

import 'videojs-contrib-hls'
import myserver from './script/servers'
// import treemenu from './script/jquerytreemenu'
// import iptvserver from './components/liveRadio/IPTVserver'
// import deviceServer from './components/equipment/equipmentServer/deviceServer'
// import Logserver from './components/journal/journalServer/logservers'
// import orgserver from './components/organization/groupserver'
// import userserver from './components/user/userServer/userserver'
// import ondemandserver from './components/onDemand/onDemandServer/ondemandserver'
// import sysserver from './components/system/SystemServer/sysserver'
// import monitorserver from './components/monitor/monitorServer'
// import meetingserver from './components/meeting/meetingserver'


import store from './store'

Vue.use(myserver)
// Vue.use(treemenu)
Vue.use(vuescroll)
Vue.use(ElementUI)
Vue.use(msgserver)
// Vue.use(iptvserver)
// Vue.use(deviceServer)
// Vue.use(Logserver)
// Vue.use(orgserver)
// Vue.use(userserver)
// Vue.use(ondemandserver)
// Vue.use(sysserver)
// Vue.use(monitorserver)
// Vue.use(meetingserver)

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios;
// Vue.prototype.msgserver=msgserver


Vue.prototype.reLogin = function (res){
	console.log("进入判断是否需要弹窗"+"window.IsTips="+window.IsTips);
	// if(window.IsTips){
		if(res == 999002){
		
			this.$message({
				message: '您的账号在其他地方登录了',
				type: 'warning'
			});
			console.log(this.$route.path);
		
			this.$router.push({
				path: "/"
			})
		}
	// }else{
	// 	console.log("您的账号已退出");
	// }
	
	
}
//处理时间戳方法
Vue.prototype.timestampToTime  = function (res){
	
	var date = new Date(res) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-'
	var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
	var D = date.getDate() + ' '
	var h = date.getHours() + ':'
	var m = date.getMinutes() + ':'
	var s = date.getSeconds()
	return Y+M+D+h+m+s
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

