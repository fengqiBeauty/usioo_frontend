<template>
<div class="bg record">
  <!-- 我的养老记录 -->
  <mt-navbar v-model="selected">
    <mt-tab-item id="canceled" @click.native="getEvaluate('canceled')">已取消</mt-tab-item>
    <mt-tab-item id="wait_confirm" @click.native="getEvaluate('wait_confirm')">待确认</mt-tab-item>
    <mt-tab-item id="wait_start" @click.native="getEvaluate('wait_start')">待进行</mt-tab-item>
    <mt-tab-item id="wait_evaluate" @click.native="getEvaluate('wait_evaluate')">待评价</mt-tab-item>
    <mt-tab-item id="done" @click.native="getEvaluate('done')">已完成</mt-tab-item>
  </mt-navbar>
  <mt-tab-container v-model="selected" v-for='(item, index) in message.list' :key='item.id'>
    <div class="card" >
      <yd-accordion>
        <yd-accordion-item :title="item.pension_title">
            <div style="padding-bottom:10px;">
              <div class="eval_div" v-if="item.status == 'wait_evaluate'">
                <div class="eval" @click="toeva(item)">
                  <i class="iconfont icon-pingjia1 f-icon"></i><i class='eval_txt'>进入评价</i>
                </div>
                <div class="clear"></div>
              </div>
              <div class="xq">
                <p>预约时间</p>
                <p>{{item.create_time}}</p>
              </div>
              <div class="xq">
                <p>预约机构</p>
                <p>{{item.organ_name}}</p>
              </div>
              <div class="bz">
                <p>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</p>
                <p>{{item.remark | hex}}</p>
              </div>
            </div>
        </yd-accordion-item>
      </yd-accordion>
    </div> 
  </mt-tab-container>
  <div class="f-wu" v-if="!message.list.length">暂时没有内容~</div>
  <!-- <div class="tagging">技术支持 感识科技</div> -->
</div>
</template>

<script>
import { Navbar, TabItem } from 'mint-ui'
import {Accordion, AccordionItem} from 'vue-ydui/dist/lib.rem/accordion';
import { smartpension_record,weixin_login } from 'api/common'
export default {
  name: 'List',
  data () {
    return {
      selected: 'wait_confirm',
      show1: -1,
      show2: -1,
      datas: {}
    }
  },
  components: {
    'mt-navbar' : Navbar,
    'mt-tab-item' : TabItem,
    'yd-accordion':Accordion,
    'yd-accordion-item':AccordionItem,
  },
  props: ['message'],
  methods: {
    toeva: function (a) {
      if (this.selected === a.status) {
        this.$router.push({path: '/provideAged/evaluate#pid' + a.id})
      }
    },
    // 获取各个状态的评价
    getEvaluate: function(id){
      smartpension_record({
        params: {
          'status': id
        }
      }).then((res) => {
        if(res.code == 200){
          this.message.list = res.rows
        }else if(res.code == 401){
          weixin_login('#/provideAged/person');
        }else{
          this.message.list = [];
        }
      })
    },
    //点击进入项目详情页面
    toDetail(){
      
    }
  },
  created: function () {
    this.datas = this.$store.state.order
  }
}
</script>

<style scoped>
.clear{clear:both;}
.eval_div{border-bottom:1px solid #ededed;padding-bottom: 10px;}
.eval_txt{margin-left:6px;color:#8A8A8A;}
.eval{float:right;}
.f-icon{color:#f39e34;}
.tagging{position: absolute;bottom: 10px;font-size: 0.2rem;left:35%;color: #ccc;}
.f-wu{
  text-align: center;
  margin-top: 3rem;
  width:100%;
}
.selected {
  color: #5aa8e1;
  border-color: #5aa8e1;
}
.list {
  width: 100%;
  padding: 0 0 0.5rem;
}
.item {
  width: 100%;
  border-bottom: 3px solid #eee;
  box-sizing: border-box;
  padding: 0 2%;
  font-size: 0.16rem;
  white-space: normal;
  word-break: normal;
}
.item-title, .item-cj {
  display: inline-block;
  white-space:nowrap;
  overflow: hidden;
  line-height: 0.5rem;
}
.item-main {
  display: block;
  white-space:nowrap;
  overflow: hidden;
  line-height: 0.5rem;
}
.item-title {
  max-width: 70%;
}
.item-cj {
  max-width: 20%;
  float: right;
  color: #5aa8e1;
}
.sd {
  display: block;
  padding: 0.1rem 0;
  font-size: 0.17rem;
}
.im-in {
  color: #4cacf0;
}
.f-card{
  background:#EAEAEA;
  padding: 15px;
}
.card{background: #fff;width: 100%;border:1px solid #ededed;}
.card_title{
  height: 1rem;
  background-image: url(../../common/images/yljl.jpg);
  background-size:100% 100%;
  color:#fff;
  font-size: 0.4rem;
  line-height: 1rem;
  padding-left: 20px;}
.bz{border-top:1px solid #ededed;padding-top:5px; }
.bz,.xq,.eval_div{margin: 10px 20px 0;}
.xq,.bz{display: flex;}
.xq p:nth-child(2){margin-left: 20px;flex:3;font-size: 0.24rem;}
.bz p:nth-child(2){margin-left: 20px;flex:3;text-overflow: ellipsis;overflow: hidden;}
.bz p:nth-child(1),.xq p:nth-child(1){color:#8A8A8A;flex:1}
.toEval{font-size: 0.25rem;float: right;margin-right: 15px;}
</style>
