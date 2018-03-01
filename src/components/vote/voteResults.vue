<template>
	<div class="cont">
		<img class="cont-imgs" src="../../common/images/tou-5.png" />
		<div class="cont-box">
			<div class="box-scroll">
				<li class="li-cont" v-for="(li,index) in list">
					<div class="li-park">
						<div></div>
					</div>
					<div class="li-left">
						{{ li.id }}
						<span>{{ li.title }}</span>
					</div>
					<div class="li-right">
						{{ li.votes }}票
					</div>
				</li>
			</div>
		</div>
		<mt-button class="mt-btn" @click="ReturnPage">返 回</mt-button>
		<footer class="footer">
			<span>技术支持·感识科技</span>
		</footer>
	</div>
</template>

<script>
import { Button } from "mint-ui"
import { voting_details } from 'api/common'
export default {
	name:"voteResults",
	data(){
		return {
			status:'',
			id:null,
			list:[]
		}
	},
	components:{
		"mt-button": Button,
	},
	methods:{
		ReturnPage(){//返回
			this.$router.go(-1)
		},
		voting(){//根据传递的id获取列表
			voting_details({
				params:{
		          id: this.id
		        }
			}).then((res) => {
	 			if (res.code == 200) {
	 				this.list = res.data.options
	 			}
			})
		},
		query(){
			this.status = this.$route.query.status
			this.id = this.$route.query.id
		}
	},
	mounted(){
		this.query();
		this.voting()
		
	}
}
</script>

<style scoped>
.cont{
	position: relative;
	width: 100%;
	padding: 10% 5% 0 5%;
	background-color: #EDEDED;
	min-height: 100%;
}
.cont-imgs{
	position: absolute;
	left: 0;
	right: 0;
	top: 3%;
	margin-left: auto;
	margin-right: auto;
	width: 2.8rem;
}
.cont-box{
	height: 7.6rem;
	width: 100%;
	margin-bottom: 0.2rem;
	box-sizing: border-box;
	border: 3px #4CACF0 solid;
	border-radius: 0.2rem;
	overflow: scroll;
	padding-top: 0.7rem;
}
.box-scroll{
	height: 6.4rem;
	box-sizing: border-box;
	overflow: scroll;
}
.li-cont{
	box-sizing: border-box;
	width: 90%;
	margin: 0 5%;
	height: 0.8rem;
	line-height: 1rem;
	border-bottom: 1px solid #ccc;
	font-size: 0.3rem;
}	
.li-park{
	float: left;
	margin-top: 0.3rem;
	margin-right: 0.2rem;
	position: relative;
	display: inline-block;
	position: relative;
	width: 0.35rem;
	height: 0.35rem;
	background-color: #4CACF0;
	box-sizing: border-box;
	border-radius: 100%;
}
.li-left{
	width: 2.5rem;
	height: 0.8rem;
	display: inline-block;
}
.li-right{
	color: #D7455C;
	width: 1.5rem;
	height: 0.8rem;
	display: inline-block;
}
.mt-btn{
	width: 100%;
	margin-bottom: 0.1rem;
}
footer{
	width: 90%;
	margin-left: 5%;
	text-align: center;
	font-size: 0.18rem;
	color: #666;
	bottom: 0.1rem;	
}

</style>