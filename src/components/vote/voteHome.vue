<template>
	<div class="cont">
		<div>
		    <mt-swipe :auto="0" class="swipepar">
		        <mt-swipe-item><img src="../../common/images/tou-3.png" class="swimg"/></mt-swipe-item>
		        <mt-swipe-item><img src="../../common/images/tou-3.png" class="swimg"></mt-swipe-item>
		    </mt-swipe>
	    </div>
	    <div class="contbox">
	    	<div class="show" v-if="list.length == 0">
	    		暂无投票活动~
	    	</div>
	    	<ul>
	    		<li class="list-li" v-for="(li,index) in list" :key="li.id" @click="onvote($event,li.status,li.id)">
	    			<div class="list-left">
	    				<div class="time-line" :class="{borderleft:index==0,borderbottom:index==list.length-1}"></div>
	    				<div class="time-park">
	    					<div class="time-park-box"></div>
	    				</div>
	    			</div>
	    			<div class="list-right">
	    				<div class="arrow" :class="{borderB:li.status === 'start'}"></div>
	    				<div class="list-cont" :class="{bgcolor:li.status === 'start'}">
	    					<div class="list-cont-pa" :class="{borderA,colorA:li.status === 'stop',colorB:li.status !== 'stop'}">
	    						<div :class="{box:li.status === 'stop'}"><img src="../../common/images/tou-1.png"/></div>
	    						{{ li.title }}
	    					</div>
	    					<div class="list-box" :class="{colorC:li.status === 'start'}">
	    						<img src="../../common/images/tou-2.png" />
	    						{{ li.end_time }}
	    					</div>
	    					<div class="list-bottom" :class="{colorC:li.status === 'start'}" v-if="li.status === 'start'">进行中</div>
	    					<div class="list-bottom" :class="{colorC:li.status === 'stop'}" v-if="li.status === 'stop'">已结束</div>
	    				</div>
	    			</div>
	    		</li>
	    	</ul>
	    	<mt-button style="margin-left: 10%;" @click="load(-1)" class="bnt" v-if="list.length != 0">上一页</mt-button>
	    	<mt-button class="bnt" @click="load(1)" v-if="list.length != 0">下一页</mt-button>
	    </div>
	    <footer :class="{footer:list.length == 0}">
	    	<p>技术支持·感识科技</p>
	    </footer>
	</div>
</template>

<script>
import { Button, Swipe, SwipeItem,Indicator,Toast } from "mint-ui"
import { voting_home_title } from 'api/common'
export default {
	name:"voteResults",
	data(){
		return{
			page:1,
			list:[],
			borderA:'borderA'
		}
	},
	components: {
    "mt-button": Button,
    "mt-swipe": Swipe,
    "mt-swipe-item": SwipeItem,
 },
 methods:{
 	onvote($event,status,id){
		if (status === 'start') {
			this.$router.push({path: '/vote/voteAnd',query:{status:status,id:id}})//跳转到投票页面
		} else{
			this.$router.push({path: '/vote/voteResults',query:{status:status,id:id}})//跳转到投票结果页面
		}
 	},
 	load(n){
  		if (n == 1) {
   			Indicator.open();
 			this.page = this.page+1
			this.load_home(1)
			return
   		}
   		if (n == -1 && this.page > 1) {
   			Indicator.open();
   			this.page = this.page-1
   			this.home()
   			return
   		} else {
   			Toast('没有上一页了~');
   			return
   		}
 		
 	},
 	load_home(n){
 		voting_home_title({
 			params:{
				page:this.page
			}
 		}).then((res) => {
   			if (res.code == 200) {
   				Indicator.close();
   				this.list = res.rows
   			} else {
   				Indicator.close();
   				Toast('没有下一页了~');
   				this.page = this.page-n
   			}
		})
 	},
 	home(){//获取列表信息
 		voting_home_title({
			params:{
				page:this.page
			}
   		}).then((res) => {
   			if (res.code == 200) {
   				Indicator.close();
   				this.list = res.rows
   			}
		})
 	}
 },
 mounted(){
   	this.home()

 }
 
}
</script>

<style scoped>
.cont{
	/*position: relative;*/
	background-color: #EDEDED;
	min-height: 100%;
}
.swipepar{
	height: 3.8rem;
}
.swimg{
	width: 100%;
	height: 3.8rem;
}
.contbox{
	margin-top: 0.3rem;
}
.contbox>ul{
	padding-bottom: 0.2rem;
}
.list-li{
	width: 100%;
	height: 2rem;
	box-sizing: border-box;
	/*border-bottom: 1px solid red;*/
	position: relative;
}
.list-left{
	float: left;
	width: 0.5rem;
	box-sizing: border-box;
	height: 100%;
	position: relative;
}
.time-line{
	position: absolute;
	width: 0.1rem;
	height: 100%;
	background-color: #4CACF0;
	left: 0.2rem;
}
.time-park{
	position: absolute;
	top: 0.5rem;
	left: 0.04rem;
	width: 0.4rem;
	height: 0.4rem;
	background-color: white;
	border-radius: 100%;
}
.time-park-box{
	margin: 0.1rem;
	width: 0.2rem;
	height: 0.2rem;
	background-color: red;
	border-radius: 100%;
}
.list-right{
	padding-top: 0.1rem;
	float: left;
	position: relative;
	height: 100%;
	width: 90%;
}
.arrow{
	position: absolute;
	top: 0.56rem;
	width: 0;
    height: 0;
    border-top: 0.17rem solid transparent;
    border-right: 0.3rem solid white;
    border-bottom: 0.17rem solid transparent;
}
.list-cont{
	z-index: 10;
	border-radius: 0.2rem;
	margin-left: 0.29rem;
	background-color: white;
	width: 95%;
	height: 90%;
	box-sizing: border-box;
}
.list-cont-pa{
	position: relative;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	max-width: 95%;
	height: 0.7rem;
	margin: 0 0.15rem;
	line-height: 0.7rem;
	padding-left: 0.6rem;
}
.list-cont-pa>div{
	position: absolute;
	display: inline-block;
	left: 0.01rem;
	width: 0.5rem;
	height: 0.5rem;
	background-color: white;
	border-radius: 100%;
	margin-top: 0.05rem;
}
.show{
	margin-top: 1rem;
	text-align: center;
}
.colorA{
	color: #4CACF0;
}
.colorB{
	color: white;
}
.colorC{
	color: black !important;
}
.borderA{
	border-bottom: #ccc 1px dashed;
}
.borderB{
	border-right: 0.3rem solid #4CACF0;
}
.borderleft{
	border-top-left-radius: 0.05rem;
	border-top-right-radius: 0.05rem;
}
.borderbottom{
	border-bottom-left-radius: 0.05rem;
	border-bottom-right-radius: 0.05rem;
}
.box{
	box-shadow: 0 0.05rem 0.04rem rgba(22,55,55,.4);
}
.bgcolor{
	background-color: #4CACF0;
}
.list-cont-pa>div>img{
	text-align: center;
	margin: 0.1rem 0.03rem 0.08rem 0.1rem;
	width: 0.3rem;
}
.list-box{
	width: 100%;
	height: 0.7rem;
	line-height: 0.7rem;
	box-sizing: border-box;
	font-weight: 500;
	color: #666;
	font-size: 0.24rem;
}
.list-box>img{
	float: left;
	width: 0.5rem;
	margin: 0.1rem 0.2rem;
}
.list-bottom{
	text-align: right;
	padding-right: 0.3rem;
	font-size: 0.18rem;
	color: #666;
}
.bnt{
	width: 40%;
	font-weight: bolder;
	margin-bottom: 0.2rem;
}
footer{
	width: 100%;
	text-align: center;
	font-size: 0.22rem;
	color: #666;
	padding-bottom: 0.05rem;
}
.footer{
	position: absolute;
	bottom: 0.1rem;
}
</style>
