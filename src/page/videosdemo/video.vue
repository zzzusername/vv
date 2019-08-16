<template>
  <div class="wrapper">
    <h1>视频播放</h1>
    <div class="" id="cont">
        <video id="roomVideo" class="video-js vjs-default-skin" controls preload="auto">
          <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4">
        </video>
    </div>
    <el-button @click="play">播放</el-button>
    <el-button @click="setTimeoutclick">异步获取</el-button>
  </div>
</template>
<script>
import $ from 'jquery'
var myPlayer;
import videojs from 'video.js'
import 'videojs-contrib-hls'
export default {
  data: function() {
    return {
    };
  },
  components: {
  },
  mounted() {
    this.Initvide("roomVideo");
  },
  methods:{
    setTimeoutclick(){

      let _this = this;
      // 延迟 5s 播放
      // 清空所有数据 
      $('#cont').html('');
      // 延时2s
      setTimeout(function(){
        // 动态渲染
        let ajaxUrl = 'http://vjs.zencdn.net/v/oceans.mp4';

        let text = '<video id="roomVideo" class="video-js vjs-default-skin" controls preload="auto"><source src='+ ajaxUrl +' type="application/x-mpegURL"></video>'

        $('#cont').html(text);

        // 初始化 video
        _this.Initvide("roomVideo");
      },2000)
    },
    play(){
      console.log('播放');
      myPlayer.play();
    },
    //初始化
    Initvide(id) {
      let pid = id;
      this.$nextTick(() => {
        this.getInitvideo(pid);
      });
    },
    getInitvideo(id) {
      myPlayer = videojs(
        id,
        {
          bigPlayButton: false,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: false
        },
        function() {
          this.on("loadedmetadata", function() {
            console.log("loadedmetadata");
            //加载到元数据后开始播放视频
            //startVideo();
          });

          this.on("ended", function() {
            console.log("ended");
          });
          this.on("firstplay", function() {
            console.log("firstplay");
          });
          this.on("loadstart", function() {
            //开始加载
            console.log("loadstart");
          });
          this.on("loadeddata", function() {
            console.log("loadeddata");
          });
          this.on("seeking", function() {
            //正在去拿视频流的路上
            console.log("seeking");
          });
          this.on("seeked", function() {
            //已经拿到视频流,可以播放
            console.log("seeked");
          });
          this.on("waiting", function() {
            console.log("waiting");
          });
          this.on("pause", function() {
            console.log("pause");
          });
          this.on("play", function() {
            console.log("play");
          });
        }
      );
    },
  }
};
</script>

