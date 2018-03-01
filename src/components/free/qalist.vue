<template>
	<div style="position: relative;min-height: 100%;">
		<img src="../../common/images/choujiang.png" alt="" class="imgs">
		<div class="nav qalistnav">
			<span :class='{ selected: choose }' @click='tapA()'>正在进行</span>
			<span :class='{ selected: !choose }' @click='tapB()'>已结束</span>
		</div>
		<div class="new" v-if='choose'>
			<div class="newchild">
				<p>{{title}}</p>
				<button class="butt" @click='clickFn'>去参加</button>
			</div>
		</div>
		<div class="list">
			<div class="show" v-if="list.length == 0">暂无活动~</div>
			<div class="item" v-for='item in list' @click="clickFn($event,item.id,item.start,item.remain_lotto_count,item.lotto_rule)">
				<!--<div class="item-title">
    			{{ item.title }}
    		</div>-->
				<div class="item-cont">
					{{ item.title }}
				</div>
				<div class="item-cj" :class="{contRed:item.start==='进行中',contGray:item.start==='已结束'}">
					<span v-if="item.remain_lotto_count == -1">{{ item.start }}</span>
					<span v-else style="color: #666;">已完成</span>
				</div>
			</div>
		</div>
		<footer>
			<p>技术支持·感识科技</p>
		</footer>
	</div>
</template>

<script>
	import { Toast } from "mint-ui"
	import { free_list } from 'api/common'
	export default {
		name: 'endorder',
		data() {
			return {
				title: '“清风福保”纪检条例法规有奖问答',
				choose: true,
				list: []
			}
		},
		methods: {
			tapA() { //进行中
				this.choose = true
				this.topic_list_start()
			},
			tapB() { //已完成
				this.choose = false
				this.topic_list_finish()
			},
			clickFn(event, id, start,lotto,rule) {
				if(start == '进行中') {
					if (lotto == -1) {
						this.$router.push({path: '/free/qa',query: {id:id,rule:rule}})
					} else {
						this.$router.push({path: '/free/lottery',query: {id:id,lotto:lotto,rule:rule}})
					}
					
				} else {
					Toast('该活动已结束!')
				}
			},
			topic_list_start() { //进行中数据
				free_list({
					params: {
						type: 'start'
					}
				}).then((res) => {
					if(res.code == 200) {
						for(var i = 0; i < res.rows.length; i++) {
							res.rows[i].start = '进行中'
						}
						this.list = res.rows//列表
						console.log(res)
					}
				})
			},
			topic_list_finish() { //已完成数据
				free_list({
					params: {
						type: 'finish'
					}
				}).then((res) => {
					if(res.code == 200) {
						for(var i = 0; i < res.rows.length; i++) {
							res.rows[i].start = '已结束'
						}
						this.list = res.rows
					}
				})
			}

		},
		mounted() {
			this.topic_list_start()
		}
	}
</script>

<style scoped>
	.imgs {
		width: 100%;
		display: block;
	}
	
	.show {
		margin-top: 2rem;
		width: 100%;
		text-align: center;
		color: #666;
	}
	
	.qalistnav {
		border-top: 0.12rem solid #E9E9E9;
		font-weight: bold;
	}
	
	.nav span {
		border-bottom: 2px solid #4CACF0;
	}
	
	.new {
		width: 100%;
		background-color: #E9E9E9;
		padding-bottom: 0.1rem;
	}
	
	.butt {
		margin: 0.2rem 30%;
		width: 40%;
		border: none;
		border-radius: 0.5rem;
		font-size: 0.18rem;
		line-height: 0.4rem;
		height: 0.4rem;
		color: #5aa8e1;
		background-color: #e3f7fe;
	}
	
	.newchild {
		position: relative;
		width: 94%;
		margin-left: 3%;
		border-radius: 0.1rem;
		background-color: #5aa8e1;
		text-align: center;
		color: #fff;
		padding: 0.1rem 0 0.05rem 0;
	}
	
	.list {
		width: 100%;
		padding-bottom: 0.6rem;
	}
	
	.item {
		width: 100%;
		border-bottom: 1px solid #eee;
		box-sizing: border-box;
		padding: 0 3%;
	}
	
	.item-title {
		text-indent: 0.1rem;
		font-size: 0.3rem;
		line-height: 0.4rem;
		height: 0.5rem;
		box-sizing: border-box;
	}
	
	.item-cont {
		font-size: 0.28rem;
		/*padding-left: 0.3rem;*/
		box-sizing: border-box;
		/*height: 0.8rem;*/
		text-indent: 0.2rem;
		line-height: 0.5rem;
		overflow: hidden;
		color: #666;
	}
	
	.contRed {
		color: red;
	}
	
	.contGray {
		color: #666;
	}
	
	.item-cj {
		text-align: right;
		font-size: 0.25rem;
		line-height: 0.3rem;
		height: 0.3rem;
		padding-right: 0.2rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	footer {
		height: 0.5rem;
		line-height: 0.5rem;
		text-align: center;
		font-size: 0.18rem;
		color: #666;
		width: 100%;
		position: absolute;
		bottom: 0;
	}
</style>