<template>
	<div class="cont" style="min-height: 100%;">
		<header><img src="../../common/images/choujiang.png"/></header>
		<div class="fre"><p>您还有<span>{{ num }}</span>次机会</p></div>
		<div class="turn">
			<div class="turn-img" >
				<div class="cont-set">
					<div class="cont-set-con">
						<div v-for="(listset,index) in list">
							<p style="overflow: hidden;">{{ listset.title }}</p>
							<img :src="listset.image_url" />
						</div>
					</div>
				</div>
				<img class="pack" src="../../common/images/cj-3.png" />
				<div class="pack-cj" @click="on_click">
					<div>
						<img class="pack-pa" src="../../common/images/cj-6.png" />
						<img class="pack-papo" src="../../common/images/cj-5.png" />
					</div>
				</div>
			</div>
			<div class="turn-bottom">
				<div>
					<img class="turn-btm" src="../../common/images/cj-4.png" />
				</div>
			</div>
		</div>
		<div class="cont-btm">
			<div class="cont-list">
				<p @click="show_fi">查看历史抽奖>></p>
			</div>
			<div class="cont-po">
				<p>活动规则:</p>
				<p class="cont-po-p" v-for="(le,i) in rule">{{ le.rule }}</p>
			</div>
		</div>
		<div class="cont-dip" v-show="showfs">
			<div>
				<div class="hist" v-if="histA">
					<p class="history-title-sy">{{ Roli }}</p>
					<p>{{ Rolist }}</p>
					<p v-show="histAsy && histBsy">领取方式:街道领取</p>
					<mt-button class="history-bnt" @click="show_fg">我知道了</mt-button>
				</div>
				<div class="history" v-if="histB">
					<p class="history-title">我的历史抽奖</p>
					<div class="history-cont">
						<div class="history-list" style="background-color: #D4B37D;border-radius: 0.1rem;">
							<div>抽奖时间</div>
							<div>抽奖结果</div>
						</div>
						<div style="overflow: scroll;height: 3.5rem;margin-top: 0.2rem;">
							<div class="history-list" v-for="(lis,index) in contli">
								<div>{{ lis.create_time }}</div>
								<div>{{ lis.prize_title }}</div>
							</div>
						</div>
					</div>
					<mt-button class="history-bnt" @click="show_fs">我知道了</mt-button>
				</div>
			</div>
		</div>
		<footer><p>技术支持·感识科技</p></footer>
	</div>
</template>

<script>
	import { Button,Toast } from 'mint-ui'
	import { free_prizes_list,free_prizes,free_prizes_record,weixin_login } from 'api/common'
	export default{
		name:'lotterty',
		data(){
			return{
				rule:'',//规则
				id:'',
				num:0,
				histA:false,
				histAsy:false,
				histBsy:false,
				histB:false,
				showfs:false,
				tuz:true,
				contli:'',//抽奖记录
				list:'',//奖品列表 
				Roli:'',
				Rolist:''
			}
		},
		methods:{
			on_click(){
				if (this.tuz){
					this.tuz = false
					if (this.num > 0){
						this.click_lottery()
					} else {
						Toast('您已经没有抽奖次数了!');
						this.tuz = true
			
					}
				}
			},
			lottery(deg,id,res){	
				var that = this;
				var visw = document.querySelector(".pack-cj")
				var i = 0;
				var stu = setInterval(function(){
					visw.style.transform = 'rotate('+i+'deg)'
					i += 9
					if (i >= 1440 + deg + 8) {
						clearInterval(stu)
						setTimeout(function(){
							that.show_fy(1);
						},500)
					}
				},5)
			},
			chou(res){
				console.log(res)
				var prize_id = res.data.prize_id
				for (let j = 0; j < this.list.length; j++) {
					if (prize_id == this.list[j].id) {
						this.lottery(this.list[j].deg,this.list[j].id,res)
						return
					}
				}
			},
			deg(){
				var angle = 0
				for (let i = 0; i < this.list.length; i++) {
					this.list[i].deg = angle
					angle += 45
				}
			},
			show_fy(n){//抽奖结果显示
				this.showfs = true
				if (n) {
					this.histAsy = true
				}
				this.histA = true
				this.tuz = true
			},
			show_fg(){//抽奖结果隐藏
				this.showfs = false
				this.histA = false
				this.histAsy = false
				this.histBsy = false
			},
			show_fi(){//抽奖历史显示	
				this.showfs = true
				this.histB = true
				this.lott_record()
			},
			show_fs(){//抽奖历史隐藏
				this.showfs = false
				this.histB = false
			},
			cont(){//动态改变大小
				var a = document.querySelector(".cont-dip");
				a.style.width = document.body.clientWidth + 'px'
				a.style.height = document.body.clientHeight + 'px'
			},
			listid(){//获取路由传递的参数
				this.id = this.$route.query.id
				this.num = this.$route.query.lotto
				var rule = this.$route.query.rule
					rule = rule.split(' ')
				var rulest = []
				for (let i = 0; i < rule.length; i++) {
					rulest[i] = {'rule':rule[i]}
				}
					this.rule = rulest
			},
			lottbox(){//奖品列表
				free_prizes_list({
					params:{
						'askpaper_id':this.id
					}
				}).then((res)=>{
					if (res.code == 200){
						this.list = res.rows
						this.deg()
						console.log(res)
					} else if (res.code == 401){
						weixin_login("#/free/lottery")
					} else {
						console.log(res)
					}
				})
			},
			click_lottery(){//点击抽奖
				free_prizes({
					params:{
						'askpaper_id':this.id
					}
				}).then((res)=>{
					if (res.code == 200) {
						this.chou(res)
						this.num = res.data.remain_lotto_count
						if(res.message.substring(0,3)=='好可惜'){
							this.Roli = res.message.substring(0,3)
							this.Rolist = res.message.substring(4)
							this.histBsy = false
						} else {
							this.Roli = res.message.substring(0,3)
							this.Rolist = res.message.substring(4)
							this.histBsy = true
						}
					} else if (res.code == 401){
						weixin_login("#/free/lottery")
					} else {
						console.log(res)
					}
				})
			},
			lott_record(){//抽奖记录
				free_prizes_record({
					params:{
						'askpaper_id':this.id
					}
				}).then((res)=>{
					if (res.code == 200) {
						this.contli = res.rows
					} else if (res.code == 401){
						weixin_login("#/free/lottery")
					} else {
						console.log(res)
					}
				})
			}
		},
		mounted(){
			this.cont()
			this.listid()
			this.lottbox()
			
		}
	}
</script>

<style scoped>
.cont{
	position: relative;
}
img{
	border: none;
}
header{
	width: 100%;
	height: 2.8rem;
}
header img{
	width: 100%;
	height: 100%;
}
.fre{
	width: 100%;
	background-color: #FCD727;
	padding-top: 0.3rem;
	padding-bottom: 0.3rem;
}
.fre p{
	margin-left: 15%;
	width: 70%;
	height: 0.8rem;
	line-height: 0.8rem;
	box-sizing: border-box;
	border: 2px solid #ccc;
	border-radius: 0.2rem;
	font-size: 0.35rem;
	text-align: center;
	background-color: #FBF0D2;
}
.fre span{
	padding: 0 0.05rem;
	color: red;
}	
.turn{
	box-sizing: border-box;
	position: relative;
	width: 100%;
	height: 7.2rem;
	/*content: url(../../common/images/chou-2.png);*/
	background: url(../../common/images/chou-2.png);
	background-size: cover;
}
.turn-img{
	position: relative;
	margin-left: auto;
	margin-right: auto;
	z-index: 10;
	width: 5.8rem;
	height: 5.8rem;
}
.cont-set{
	left: 0;right: 0;bottom: 0;top: 0;
	margin: auto;
	position: absolute;
	width: 5rem;
	height: 5rem;
	box-sizing: border-box;
}
.cont-set-con{
	position: relative;
	width: 5rem;
	height: 5rem;
	/*border: 1px red solid;*/
}
.cont-set-con>div>p{
	line-height: 0.5rem;
	text-align: center;
}
.cont-set-con>div>img{
	width: 60%;
	margin-left: 20%;
}
.cont-set-con>div{
	transform-origin: 50% 2.4rem;
	position: absolute;
	height: 1.2rem;
	width: 26%;
	margin-top: 0.1rem;
	margin-left: 37%;
	/*border: 1px red solid;*/
}
.cont-set-con>div:nth-child(1){
	transform: rotate(0deg);
}
.cont-set-con>div:nth-child(2){
	transform: rotate(45deg);
}
.cont-set-con>div:nth-child(3){
	transform: rotate(90deg);
}
.cont-set-con>div:nth-child(4){
	transform: rotate(135deg);
}
.cont-set-con>div:nth-child(5){
	transform: rotate(180deg);
}
.cont-set-con>div:nth-child(6){
	transform: rotate(225deg);
}
.cont-set-con>div:nth-child(7){
	transform: rotate(270deg);
}
.cont-set-con>div:nth-child(8){
	transform: rotate(315deg);
}






.turn-img .pack{
	width: 100%;
	height: 100%;
}
.pack-cj{
	transform-origin: 50% 49.5%;
	transform: rotate(0deg);
	top: 0;left: 0;right: 0;bottom: 0;
	margin: auto;
	position: absolute;
	width: 2.4rem;
	height: 2.4rem;
	box-sizing: border-box;
}
.pack-cj>div{
	position: relative;
	height: 2.4rem;
	width: 2.4rem;
}
.pack-papo{
	top: 0;left: 0;right: 0;bottom: 0;
	margin: auto;
	position: absolute;
	width: 1.6rem;
	height: 1.6rem;
}
.pack-pa{
	position: absolute;
	left: 0;right: 0;
	margin-left: auto;margin-right: auto;
	width: 0.8rem;
}
.turn-bottom{
	bottom: 0;
	position: absolute;
	width: 100%;
	height: 2.6rem;
}
.turn-bottom>div{
	text-align: center;
	position: relative;
	width: 100%;
	height: 2.6rem;
}
.turn-btm{
	width: 3rem;
	height: 2.6rem;
}
.turn-btmve{
	position: absolute;
	height: 1.6rem;
	width: 90%;
	bottom: 0;left: 0;right: 0;
	margin-left: auto;margin-right: auto;
}
.cont-btm{
	padding-top: 0.3rem;
	width: 100%;
	box-sizing: border-box;
	background-color: #FCD727;
}
.cont-list{
	width: 100%;
	height: 0.8rem;
	box-sizing: border-box;
}
.cont-list>p{
	margin-left: 10%;
	width: 80%;
	height: 0.8rem;
	font-size: 0.3rem;
	line-height: 0.8rem;
	text-align: center;
	border-radius: 0.2rem;
	text-decoration: underline;
	color: #463e3e;
}
.cont-po{
	width: 100%;
	box-sizing: border-box;
	padding: 5% 10%;
	line-height: 0.4rem;
	font-size: 0.3rem;
	color: #463e3e;
}
.cont-po-p{
	text-indent: 1em;
	line-height: 0.35rem;
	font-size: 0.26rem;
}
.cont-dip{
	z-index: 99;
	left: 0;right: 0;
	top: 0rem;
	margin-left: auto;margin-right: auto;
	box-sizing: border-box;
	position: fixed;
}
.cont-dip>div{
	position: relative;
	background-color: rgba(176,196,222,0.7);
	width: 100%;
	height: 100%;
}
.history{
	position: absolute;
	left: 0;right: 0;top: 1.8rem;
	background-color: white;
	border-radius: 0.2rem;
	margin-left: auto;margin-right: auto;
	background-color: #F8E8C7;
	width: 80%;
	height: 6rem;
	overflow: hidden;
	box-sizing: border-box;
}
.history-title{
	color: #666;
	text-align: center;
	line-height: 0.8rem;
	height: 0.8rem;
	font-size: 0.3rem;
}
.history-bnt{
	height: 0.5rem;
	border-radius: 0.15rem;
	background-color: #D4B37D;
	width: 50%;
	font-weight: 600;
	color: #666;
	margin-left: 25%;
}
.history-cont{
	box-sizing: border-box;
	padding: 0 0.3rem 0.2rem 0.3rem ;
	width: 100%;
	height: 4.5rem;
}
.history-list{
	width: 100%;
	height: 0.5rem;
}
.history-list>div{
	display: inline-block;
	text-align: center;
	line-height: 0.5rem;
	font-size: 0.28rem;
	color: #666;
}
.history-list>div:nth-child(1){
	width: 65%;
}
.history-list>div:nth-child(2){
	width: 33%;
}
.hist{
	position: absolute;
	left: 0;right: 0;top: 1.8rem;
	background-color: white;
	border-radius: 0.2rem;
	margin-left: auto;margin-right: auto;
	background-color: #F8E8C7;
	width: 60%;
	height: 3rem;
	overflow: hidden;
	box-sizing: border-box;
}
.history-title-sy{
	color: white;
	text-align: center;
	line-height: 1.2rem;
	height: 1.2rem;
	font-size: 0.6rem;
	background-color: #FF6F00;
}
.hist>p:nth-child(2){
	text-align: center;
	line-height: 0.6rem;
	font-size: 0.3rem;
}
.hist>p:nth-child(3){
	text-align: center;
	height: 0.5rem;
}






footer{
	width: 100%;
	text-align: center;
	background-color: #FCD727;
	font-size: 0.22rem;
	color: #666;
	padding-bottom: 0.05rem;
}
</style>