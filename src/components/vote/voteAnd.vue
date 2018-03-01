<template>
	<div class="cont">
		<header>
			<img src="../../common/images/tou-4.png" />
		</header>
		<div class="list-cont">
			<div class="show" v-if="list.length == 0">
	    		暂无投票活动~
	    	</div>
			<ul>
				<li v-for="(li,index) in list" :class="{border: index != list.length-1}">
					<div class="list-left">
						<img :src="li.image_url" />
					</div>
					<div class="list-right">
						<p>编号: {{ li.id }}</p>
						<p>{{ li.title }}</p>
						<p>已获得:<span>{{ li.votes }}</span>票 </p>
						<mt-button class="bnt" @click="increase(li.id,index,li.tos)">投TA一票</mt-button>
					</div>
				</li>
			</ul>
			<mt-button class="mt-bnt" v-if="list.length != 0" @click="ViewResults">查看结果</mt-button>
		</div>
		<footer :class="{footer:list.length == 0}">
			<p>技术支持·感识科技</p>
		</footer>
	</div>
</template>

<script>
import { Button,Toast } from "mint-ui"
import { voting_details,to_vote,weixin_login } from 'api/common'
export default{
	name:"voteAnd",
	data(){
		return{
			imgUrl:'',
			id:null,
			status:'',
			list:''
		}
	},
	components:{
		"mt-button": Button,
	},
	methods:{
		increase(id,index,tos){//投票
			var that = this;
			to_vote({
				params:{
					project_id:this.id,	
					option_id:id
				}
			}).then((res) => {	
				console.log(res)
				if (res.code == 200) {
					Toast(res.message)
					that.details()
				} else if (res.code == 400) {
					Toast(res.message)
				} else if (res.code == 401) {
   					weixin_login("#/vote/voteAnd")
   				} else {}
			})	
		},
		ViewResults(){
			this.$router.push({path: '/vote/voteResults',query:{status:this.status,id:this.id}})//跳转到投票结果页面
		},
		sta_list(){//获取路由传递的参数
			this.status = this.$route.query.status
			this.id = this.$route.query.id
		},
		details(){//根据传递的id获取列表
			voting_details({
				params:{
		          id: this.id
		        }
			}).then((res) => {
 			if (res.code == 200) {
 				this.list = res.data.options
 				}
			})
		}
	},
	computed:{//计算属性
		
	},
	mounted(){//生命周期钩子
		this.sta_list();
		this.details()

	}
}
</script>

<style scoped>
.cont{
	background-color: #EDEDED;
	min-height: 100%;
	/*position: relative;*/
}
.footer{
	position: absolute;
	bottom: 0.1rem;
}
footer{
	width: 100%;
	text-align: center;
	font-size: 0.18rem;
	padding-bottom: 0.05rem;
	color: #666;
}
.border{
	border-bottom: #ccc 1px dashed;
}
.show{
	margin-top: 1rem;
	text-align: center;
}
.list-cont{
	width: 100%;
}
.list-cont>ul>li{
	box-sizing: border-box;
	width: 90%;
	height: 2.2rem;
	padding: 0.3rem 0;
	margin: 0 5%;
}
.list-left{
	position: relative;
	box-sizing: border-box;
	float: left;
	width: 40%;
	height: 1.6rem;
	margin-right: 5%;
	border-radius: 0.2rem;
	border: 1px solid #4CACF0;
}
.list-left img{
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	width: 1.2rem;
	height: 1.2rem;
	border-radius: 100%;
}
.list-right{
	box-sizing: border-box;
	float: left;
	width: 55%;
	height: 1.6rem;
	/*margin-left: 5%;*/
}
.list-right p{
	line-height: 0.35rem;
	font-weight: 500;
}
.list-right p:nth-child(3) span{
	padding: 0 0.05rem;
	color: #D7455C;
}
.bnt{
	margin-top: 0.05rem;
	width: 1.7rem;
	height: 0.5rem;
	border-radius: 0.1rem;
	background-color: #D7455C;
}
.mt-bnt{
	width: 80%;
	margin-left: 10%;
	font-weight: bolder;
	margin-bottom: 0.2rem;
}
header img{
	width: 100%;
	height: 3.8rem;
}
</style>