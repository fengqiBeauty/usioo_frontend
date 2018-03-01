<template>
  <div class='bg'>
		<mt-navbar v-model="selected">
			<mt-tab-item id="1">报名详情</mt-tab-item>
			<mt-tab-item id="2">评价</mt-tab-item>
		</mt-navbar>
		<mt-tab-container v-model="selected">
    	<mt-tab-container-item id="1">
				<div class="header">
					<div class="header_txt">
							<p class='header_name'>爱情寄语</p>
							<p class='love_msg'>{{love_message}}</p>
					</div>
				</div>
				<div class="want want_time"><span class='header_name'>希望举办时间：</span>{{hope_time}}</div>
				<div class="want header_name">希望他/她：</div>
				<div class="info">
					<div>
						<p>{{hope_info.age | hex}}岁</p>
						<p>年龄</p>
					</div>
					<div>
						<p>{{hope_info.height | hex}}cm</p>
						<p>身高</p>
					</div>
					<div>
						<p>{{hope_info.weight | hex}}kg</p>
						<p>体重</p>
					</div>
					<div>
						<p>{{hope_info.education | hex}}</p>
						<p>学历</p>
					</div>
				</div>
				<div class="detail">
					<div class='item'>
						<p>性格</p>
						<p class='content'>{{hope_info.women_character | hex}}</p>
					</div>
					<div class='item'>
						<p>收入</p>
						<p class='content'>{{hope_info.women_income | hex}}</p>
					</div>
					<div class='item'>
						<p>毕业院校</p>
						<p class='content'>{{hope_info.graduate | hex}}</p>
					</div>
					<div class='item'>
						<p>通讯地址</p>
						<p class='content'>{{hope_info.location | hex}}</p>
					</div>
					<div class='item'>
						<p>住房情况</p>
						<p class='content'>{{hope_info.women_house | hex}}</p>
					</div>
					<div class='item'>
						<p>婚姻状况</p>
						<p class='content'>{{hope_info.women_marita_status | hex}}</p>
					</div>
					<div class='item'>
						<p>工作地址</p>
						<p class='content'>{{hope_info.work_address | hex}}</p>
					</div>
				</div>
			</mt-tab-container-item>
			<mt-tab-container-item id="2">
				<div class="eva" v-if="!no_content">
					<p class="eva-title">用户评论</p>
					<div class="eva-item" v-for="(e,index) in pj_list" :key="index">
						<div class="f-right">
							<p><span class="user"><img :src="e.user.expand_info.women_image" class="f-left">{{e.user.expand_info.real_name}}</span><span class="time">{{e.create_time}}</span></p>
							<!-- <p class="star f-star"><input type="radio" class="plstar" v-for="(e, i) in 6" :value="i" v-model="e.star" readonly></p> -->
							<yd-rate slot="left" v-model="e.star" :readonly="true" active-color="#f39e34" size="0.42rem"></yd-rate>
							<p class="sb wrap">{{e.content}}</p>
						</div>
					</div>
					<p class="more" @click='morepls' v-if="isClick">{{morepl}}</p>
					<p class="more" v-else>{{morepl}}</p>
				</div>
				<div class="no_content" v-if="no_content">
					暂时没有评价~~
				</div>
			</mt-tab-container-item>
		</mt-tab-container>
		
		<div class="buttons">
			<mt-button size="normal" class="butt butt1" @click="yq_list">邀请列表</mt-button>
			<mt-button size="normal" class="butt butt2" @click="back">返回</mt-button>
		</div>
  </div>
</template>
<script>
import { Button, Navbar, TabItem, Toast } from 'mint-ui'
import {Rate} from 'vue-ydui/dist/lib.rem/rate';
import { women_enter_read,zd_women_evaluate,enter_name_info } from 'api/common'
export default {
  data(){
    return {
      selected:'1',
      hope_time:'',
      love_message:'',
      no_content:false,
      isClick:false,
      morepl:'获取更多评论',
      pj_list:[],
      hope_info:{}
    }
  },
  components: {
    'mt-button': Button,
    'mt-navbar': Navbar,
    'mt-tab-item': TabItem,
    'yd-rate': Rate
  },
  methods: {
    //返回
    back(){
      this.$router.go(-1)
    },
    //查看邀请记录
    yq_list(){
      this.$router.push({path:'/women/invite_list'});
    }
  },
  mounted () {
    var that = this;
    if(!window.location.href.split('#person')[1]){
      // 获取个人报名详情
      women_enter_read().then((res) => {
        if(res.code == 200){
					this.me = res.data;
          that.id = this.me.id;
          this.hope_info = res.data.hope_info;
          this.hope_time = res.data.hope_time;
          this.love_message = res.data.love_message;
          zd_women_evaluate({
            params:{
              id: that.id
            }
          }).then((res) => {
            this.pl = res.rows;
            var page = res.page_sort.page;
            var size =  res.page_sort.size;
            var more = Number(page) * Number(size);
            var total = res.total;
            //判断初始时是否有更多评论
            if(total > more){
              this.morepl = '查看更多评论';
              //是否可以点击
              this.isClick = true;
            }else{
              this.morepl = '没有更多评论了';
              //是否可以点击
              this.isClick = false;
            }
              
            if(res.code == 200){
              this.pj_list = res.rows;
            }
            if(res.total == 0){
              this.no_content = true;
            }
          })
        }
      })
    }else{
      that.id = window.location.href.split('#person')[1];
      enter_name_info({
        params:{
          id: that.id
        }
      }).then((res) => {
        if(res.code == 200){
          this.me = res.data;
          this.hope_info = res.data.hope_info;
          this.hope_time = res.data.hope_time;
          this.love_message = res.data.love_message;
        }
      })
      zd_women_evaluate({
        params:{
          id: that.id
        }
      }).then((res) => {
        this.pl = res.rows;
        var page = res.page_sort.page;
        var size =  res.page_sort.size;
        var more = Number(page) * Number(size);
        var total = res.total;
        //判断初始时是否有更多评论
        if(total > more){
          this.morepl = '查看更多评论';
          //是否可以点击
          this.isClick = true;
        }else{
          this.morepl = '没有更多评论了';
          //是否可以点击
          this.isClick = false;
        }
        console.log(this.pj_list)  
        if(res.code == 200){
          this.pj_list = res.rows; 
            
        }
        if(res.total == 0){
          this.no_content = true;
        }
      })
    }
    
  }
}
</script>

<style scoped>
.bg {
  min-height: 100%;
  background-color: #ededed;
}
.header{
	background-color: #fff;
	min-height: 100px;
	border-bottom: 1px solid #ededed;
	display: flex;
	align-items: center;
	padding:10px 15px;
}
.header img{
	width: 60px;
	height: 60px;
	border-radius: 50%;
}
.header_txt{
	flex:1;
	flex-flow: nowrap;
	margin-left: 10px;
}
.header_name{
	font-weight: 700;
}
.love_msg{
	overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box; 
	display:flex;
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2; 
	font-size: 0.22rem;
	color:#ccc;
}
.want{
	padding:5px 15px;
	font-size: 0.22rem;
}
.want_time{
	background: #fff;
}
.info{
	min-height: 60px;
	background-color: #fff;
	display: flex;
	padding:5px 0;
}
.info div{
	flex:1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-left:1px solid #ededed;
}
.info div:nth-child(1){
	border:none;
}
.detail{
	background-color: #fff;
	margin-top: 5px;
}
.item{
	height: 50px;
	padding:0 15px;
	border:1px solid #ededed;
	display: flex;
	align-items: center;
}
.content{
	flex:1;
	text-align: right;
}
.buttons {
  font-size: 0;
  width: 100%;
  margin-top: 0.2rem;
  box-sizing: border-box;
  padding: 0.2rem 10% 0.2rem;
  text-align: center;
}
.butt {
  display: inline-block;
  width:45%;
  font-weight: 500;
}
.butt2 {
  margin-left: 10%;
}
.butt1{
  background-color: #f77239;
}
.mint-navbar .mint-tab-item.is-selected{
	margin-bottom: 0;
}
.left {
  position: absolute;
  top: 0;
  left: 0.2rem;
  text-align: left;
  color: #9d9d9d;
}
.right {
  display: inline-block;
  width: 100%;
  text-align: center;
}
.eva {
  padding: 0 0 0.3rem;
}
.eva-title {
  margin-left: 2.5%;
  font-size: 0.26rem;
  color: #808080;
  padding: 0.2rem 0;
}
.eva-title:after {
  display: block;
  content: "clear";
  height: 0;
  clear: both;
  visibility: hidden;
}
.eva-item {
  width: 100%;
  padding: 2.5%;
	background-color: #fff;
  border-bottom: 1px solid #e9e9e9;
}
.more {
  text-align: center;
  color: #808080;
  margin: 0;
  font-size: 0.22rem;
  line-height: 0.4rem;
}
.mores {
  display: inline-block;
  margin-left: 0.04rem;
  transform: rotate(90deg) scaleY(1.5) scaleX(0.8);
  font-weight: 600;
}
.no_content{
  text-align: center;
  width:100%;
  margin: 100px 0;
}
.time {
  float: right;
  color: #808080;
  font-size: 0.22rem;
}
.f-left {
  float: left;
  width: 0.36rem;
  height: 0.36rem;
  border-radius: 50%;
  margin-right: 0.08rem;
}
</style>

