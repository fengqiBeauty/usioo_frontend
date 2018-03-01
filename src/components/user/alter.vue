<template>
<div class="bg bg2">
<!-- 修改资料 -->
<div v-show="posarea === 1"> 
  <div class="item" @click="setAvatar">
    <span>头像</span>
    <!-- <img :src="person.image_url" class="imgs"> -->
    <img :src="person.image_url" class="imgs"  ref="img">
    <input type="file" placeholder="从相册选择" accept="image/JPG,jpg,gif,jpeg,png,PNG,bmp" class="but but1 but4" @change="changeImage($event)" ref="avatarInput">
  </div>
  <div class="item" @click='posarea = 4, flag = 1'>
    <span>昵称</span><span class="right tochange">></span>
    <span class="right">{{person.nickname}}</span>
  </div>
  <div class="item">
    <span>性别</span><span class="right sex" :class='{man: person.sex === 2}' @click='person.sex = 2'>女</span>
    <span class="right sex" :class='{man: person.sex === 1}' @click='person.sex = 1'>男</span>
  </div>
  <div class="item" @click='posarea = 3, flag = 1'>
    <span>手机</span><span class="right tochange">></span>
    <span class="right">{{phone}}</span>
  </div>
  <!-- <mt-button size="large" class="butt" @click='tohome'>确认</mt-button> -->
  <mt-button size="large" class="butt" @click='saveInfo'>确认</mt-button>
</div>
<div v-show="posarea === 2">
  <div class="item1">
    <span class="left">新密码</span>
    <input type="password" class="io" placeholder="请输入新密码" v-model="password">
  </div>
  <div class="item1">
    <span class="left">确认密码</span>
    <input type="password" class="io" placeholder="请输入新密码" v-model="repassword">
  </div>
  <mt-button size="large" class="butt" @click='save'>保存设置</mt-button>
</div>
<div v-show="posarea === 3">
  <div class="item1">
    <span class="left">手机号</span>
    <input type="text" class="io" placeholder="请输入手机号" v-model="phone">
  </div>
  <mt-button size="large" class="butt" @click='save'>保存设置</mt-button>
</div>
<div v-show="posarea === 4">
  <div class="item1">
    <span class="left">昵称</span>
    <input type="text" class="io" placeholder="请输入昵称" v-model="person.nickname">
  </div>
  <mt-button size="large" class="butt" @click='save'>保存设置</mt-button>
</div>
<div v-show="posarea === 5" class="photosc">
  <img :src="person.image_url" class="touxi" @click="setAvatar" ref="img">
  <input type="file" placeholder="从相册选择" accept="image/JPG,jpg,gif,jpeg,png,PNG,bmp" class="but but1 but4" @change="changeImage($event)" ref="avatarInput">
  <div class="but but1 but3">从相册选择</div>
</div>
</div>
</template>

<script>
import { Button, Toast } from 'mint-ui'
import { ucuser_update, ucuser_read, ucuser_edit_avatar,upload_picture, weixin_login } from 'api/common'
export default {
  name: 'toorder',
  data () {
    return {
      first: 1,
      posarea: 1,
      flag: 0,
      password: '',
      repassword: '',
      person: {
				expand_info:{
					phone:''
				}
			},
      showLoad:false,
      img_id:''
    }
  },
  components: {
    'mt-button': Button
  },
  computed: {
    phone:{
      get(){
        return this.person.expand_info.phone;   
      },
      set(newValue){
        this.person.expand_info.phone = newValue;
      }
    }
  },
  mounted: function () {
    var that = this
    window.addEventListener('popstate', function (e) {
      if (that.posarea > 1 && that.flag === 1) {
        that.posarea = 1
        history.go(1)
      } else {
        return
      }
    }, false)
  },
  methods: {
    tohome: function () {
      this.$router.push({path: '/user/home'})
    },
    // 修改个人信息后点击确认
    saveInfo(){
      var obj = {'phone': this.phone};
      //修改用户资料
      ucuser_update({
        'nickname' : this.person.nickname,
        'sex' : this.person.sex,
        'head_pic' : this.img_id,
        'expand_info' : obj
      }).then((res) => {
        if(res.code == 200){
          Toast({
            message: '操作成功',
            iconClass: 'fa fa-check',
            duration: 1000
          })
          // 清除个人信息缓存
          localStorage.removeItem('person')
        }else if(res.code == 401){
          weixin_login('#/user/alter');
        }else{}
      })
    },
    // 点击图片会触发setAvatar函数，该函数会触发input的click事件
    setAvatar() {
      this.$refs.avatarInput.click()
    },
    changeImage(e) {
      const refs = this.$refs;
      const elImg = refs.img;
      var file = e.target.files[0];
      var reader = new FileReader();
      var that = this;
      reader.readAsDataURL(file)
      reader.onload = function(e) {
        elImg.src = this.result;
      }
      if(that.$refs.avatarInput.files.length !== 0){
        var img = new FormData();
        img.append('file',that.$refs.avatarInput.files[0]);
        this.showLoad = true;
        //修改头像
        upload_picture(img).then((res) => {
          var data = res;
          if(data.code == 200){
            this.showLoad = false;
            this.img_id = data.data.id;
            this.person.image_url = data.data.path;
            Toast({
              message: data.message,
              iconClass: 'fa fa-check',
              duration: 1000
            })
          }else if(data.code == 401){
            weixin_login('#/user/alter');
          }else{
            Toast({
              message: data.message,
              iconClass: 'fa fa-close',
              duration: 1000
            })
          }
        })
      }

    },
    save: function () {
      if (this.first === 1) {
        this.posarea = 1
      } else {
        this.$router.push({path: '/user/home'})
      }
      
    }
  },
  created: function () {
    this.posarea = parseInt(window.location.href.slice(-1)) || 1
    this.first = parseInt(window.location.href.slice(-1)) || 1

    if (localStorage.getItem('person')) {
      this.person = JSON.parse(localStorage.getItem('person'))
    } else {
      ucuser_read().then((res) => {
        if(res.code == 200){
          this.person = res.data;
          localStorage.setItem('person', JSON.stringify(res.data))
        }else if(res.code == 401){
          weixin_login('#/user/alter');
        }
      })
    }
  },
  destroyed: function () {
    localStorage.removeItem('person')
  }
}
</script>

<style scoped>
.item {
  border-bottom: 1px solid #eee;
  background-color: #fff;
  line-height: 0.8rem;
  padding: 0 0.1rem;
  box-sizing: border-box;
}
.item1 {
  border-bottom: 1px solid #eee;
  background-color: #fff;
  line-height: 0.6rem;
  padding:  0.3rem 0.4rem;
  margin-bottom: 0.2rem;
  box-sizing: border-box;
}
.left {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
}
.right {
  float: right;
  color: #808080;
}
.empty {
  height: 0.2rem;
  width: 100%;
}
.imgs {
  float: right;
  display: inline-block;
  margin-top: 0.05rem;
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 50%;
}
.man {
  color: #4CACF0;
}
.butt {
  margin: 1rem 5% 0 5%;
  width:90%;
}
.but {
  position: absolute;
  left: 10%;
  width:80%;
  padding: 0.1rem 0;
  background-color: #fff;
  letter-spacing: 1px;
  border-radius: 0.3rem;
  border: 1px solid #d4d4d4;
  text-align: center;
  font-size: 0.26rem;
}
.but1 {
  top: 6rem;
}
.but2 {
  top: 7rem;
}
.but4 {
  opacity: 0;
  z-index: 1;
}
.tochange {
  margin-left: 0.05rem;
  color: #c4c4c4;
  font-size: 0.25rem;
  transform: scaleX(0.5) translateY(-2.5%);
}
.bg {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 0.1rem;
  background-color: #F5F5F5;
  overflow: hidden;
}
.bg1 {
  z-index: -1;
}
.sex {
  margin-left: 0.2rem;
}

.io {
  float: right;
  border: none;
  padding: 0;
  font-size: 0.26rem;
  line-height: 0.58rem;
  height: 0.58rem;
  border-radius: none;
  border: none;
  width: calc(95% - 0.8rem);
  color: #ccc;
}
.touxi {
  display: block;
  width: 100%;
  height: 4.8rem;
}
.photosc {
  position: relative;
}
/* 修改头像时的加载 */
.demo-spin-icon-load{
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from { transform: rotate(0deg);}
  50%  { transform: rotate(180deg);}
  to   { transform: rotate(360deg);}
}
.demo-spin-col{
  height: 30px;
  position: relative;
  border: 1px solid #eee;
  
}

</style>
