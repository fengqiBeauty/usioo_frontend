<template>
<div class="f-box"> 
  <div class="item1 f-item">
    <span class="left">头像</span>
    <div class="my-img">
      <img :src="img" alt="" @click="setAvatar" ref="img">
    </div>
    <input type="file" class="my-file" accept="image/JPG,jpg,gif,jpeg,png,PNG,bmp"  @change="changeImage($event)" ref="avatarInput">
    <span class="load">点击上传</span>
  </div>
  <div class="item1">
    <span class="left">姓名</span>
    <input type="text" class="io" placeholder="请输入姓名" v-model="e_info.real_name">
  </div>
  <div class="item1">
    <span class="left">性别</span>
    <span :class='{man: sex == 1}' @click='checkSex(1)' v-model="e_info.sex" class="f-sex1">男</span>
    <span class="f-sex" :class='{man: sex == 2}' @click='checkSex(2)' v-model="e_info.sex">女</span>
  </div>
  <div class="item1">
    <span class="left">身份证号码</span>
    <input type="text" class="io" placeholder="请输入身份证号码" v-model="e_info.id_card">
  </div>
  <div class="item1">
    <span class="left">手机号</span>
    <input type="text" class="io" placeholder="请输入手机号" v-model="e_info.phone">
  </div>
  <mt-button size="large" class="butt" @click='handleSubmit'>保存设置</mt-button>
</div>
</template>
<script>
import { Button,Toast } from 'mint-ui'
import { ucuser_update } from 'api/common'
import { ucuser_read , ucuser_edit_avatar , weixin_login } from 'api/common'
export default {
  data(){
    return {
      e_info:{},
      sex:'',
      img:''
    }
  },
  methods: {
    handleSubmit(){
      if(this.e_info.real_name == ''){
        Toast({
          message: '姓名不能为空',
          duration: 1000
        })
        return
      }
      if(this.e_info.id_card == ''){
        Toast({
          message: '身份证号码不能为空',
          duration: 1000
        })
        return
      }
      if(this.e_info.phone == ''){
        Toast({
          message: '手机号码不能为空',
          duration: 1000
        })
        return
      }
      ucuser_update({
        sex:this.e_info.sex,
        expand_info:this.e_info
      }).then((res) => {
        if(res.code == 200){
          Toast({
            message: '操作成功',
            duration: 1000
          })
        } 
      })
    },
    checkSex(sex_num){
      this.sex = sex_num;
      this.e_info.sex= sex_num;
      // console.log(this.e_info)
    },
    // 点击图片会触发setAvatar函数，该函数会触发input的click事件
    setAvatar() {
      this.$refs.avatarInput.click()
    },
    changeImage(e) {
      const refs = this.$refs;
      const elImg = refs.img
      var file = e.target.files[0]
      var reader = new FileReader()
      var that = this
      reader.readAsDataURL(file)
      reader.onload = function(e) {
        elImg.src = this.result;
        
      }
      if(that.$refs.avatarInput.files.length !== 0){
        var img = new FormData();
        img.append('avatar',that.$refs.avatarInput.files[0]);
        this.showLoad = true;
        //修改头像
        ucuser_edit_avatar(img).then((res) => {
          var data = res;
          if(data.code == 200){
            this.showLoad = false;
            Toast({
              message: data.message,
              iconClass: 'fa fa-check',
              duration: 1000
            })
          }else if(data.code == 401){
            weixin_login('#/user/alter')
          }else{
            Toast({
              message: data.message,
              iconClass: 'fa fa-close',
              duration: 1000
            })
          }
        })
      }
    }
  },
  mounted () {
    //读取性别
    ucuser_read().then((res) => {
      this.sex = res.data.sex;
    })
    this.e_info = JSON.parse(localStorage.getItem('expand_info'));
  }
}
</script>
<style scoped>
.f-box{padding:20px 15px;}
table{width:100%;}
.f-input{border: 1px solid #ccc;border-radius: 5px;width: 90%;height: 30px;font-size: 16px;padding-left: 15px;}
table tr{height: 50px;}
table .f-td{text-align: center;margin-left: 30px;}
.butt{margin-top: 100px;background: linear-gradient(to right, #4081CD,#4081CD,#4081CD,#76BAFB);
	box-shadow: none;}
.man {color: #4081CD;}
.f-sex{margin-left: 30px;}
.item1 {
  border-bottom: 1px solid #eee;
  background-color: #fff;
  padding:  0.3rem 0.4rem;
  box-sizing: border-box;
  position: relative;
}
.io {
  float: right;
  border: none;
  padding: 0;
  font-size: 0.26rem;
  border-radius: none;
  border: none;
  color: #ccc;
}
.f-item{padding:  0.5rem 0.4rem;}
.f-sex1{margin-left: 30%;}
.tagging{position: absolute;bottom: 10px;font-size: 0.2rem;left:35%;color: #ccc;}
.my-img{width:1.3rem;height:1.3rem;border:0.5px solid #ccc;position:absolute;left:2.4rem;top:0;}
.my-img img {width:1.3rem;height:1.3rem;}
.my-file{width: 3rem;z-index:1;position:absolute;right:0.3rem;top:0;height:1.4rem;opacity:0;}
.load{position: absolute;right:0.75rem;bottom:0rem;color:#666}
</style>

