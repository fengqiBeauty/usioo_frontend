<template>
<div class="par">
  <div class="info pa">以下是根据您提供的资料匹配的交友人选，选择感兴趣的对象。匹配成功后，我们会为你们提供双方联系方式。</div>
  <yd-pullrefresh :callback="loadList" ref="pullrefresh">
    <div class="item" v-for="e, key in list" :key="key" @click="viewDetails(e.id)">
      <div class="left"><img :src="e.user.expand_info.women_image" class="icon"></div>
      <div class="center">
        <p class="center-item name">{{e.user.expand_info.real_name | hex}}</p>
        <p class="center-item other">
          <span>{{e.user.birthday | age}}</span>|
          <span>{{e.user.expand_info.women_marita_status}}</span>|
          <span>{{e.user.occupation | hex}}</span>
        </p> 
      </div>
    </div>
  </yd-pullrefresh>
  <div class="demo-spin-container" v-if="loading">
    <mt-spinner type="fading-circle" color="#3891F7"></mt-spinner> 
  </div>
  <div class="demo-spin-container" v-if="no_content">
     暂时未匹配到人员~
  </div>
</div>
</template>
<script>
import { Button, Toast, Spinner } from 'mint-ui'
import { women_match_list,weixin_login } from 'api/common'
import {PullRefresh} from 'vue-ydui/dist/lib.rem/pullrefresh';
export default {
  name: 'succ',
  data () {
    return {
      choose: 0,
      page: 1,
      loading:true,
      no_content:false,
      list: []
    }
  },
  components: {
    'mt-button': Button,
    'yd-pullrefresh': PullRefresh,
    'mt-spinner': Spinner
  },
  computed: {
    
  },
  methods: {
    clickFn: function () {
      this.$router.push({path: '/women/success'})
    },
    person: function (a) {
      this.choose = a + 1
    },
    loadList() {
      if(this.total>this.page*this.size){
        this.page++;
        women_match_list({
          params: {
            page:this.page
          }
        }).then((res) => {
          this.list = res.rows;
          this.total = Number(res.total);
          this.size = Number(res.page_sort.size);
          this.$refs.pullrefresh.$emit('ydui.pullrefresh.finishLoad');
        })
      }else{
        Toast({
          message: '已经更新到最后一页',
          duration: 2000
        })
        this.$refs.pullrefresh.$emit('ydui.pullrefresh.finishLoad');
      } 
    },
    viewDetails(id){
      localStorage.setItem('invite_id',id)
      this.$router.push({path:'/women/invitation'})
    }
  },
  mounted: function () {
    women_match_list().then((res) => {
      if(res.code == 200){
        this.loading = false;
        this.list = res.rows;
        console.log(this.list)
        this.total = Number(res.total);
        this.size = Number(res.page_sort.size);
      }else if(res.code == 401){
        weixin_login('#/women/line');
      }else{
        this.loading = false;
        this.no_content = true;
      }
    })
  }
}
</script>

<style scoped>
.par {
  background-color: #fff;
  min-height: 100%;
  padding-bottom: 0.3rem;
  box-sizing: border-box;
}
.butt {
  margin: 0.5rem 5% 0 5%;
  width:90%;
}
.pa {
  padding-top: 0.14rem;
}

.info {
  color: #6c6c6c;
  width: 90%;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-all;
  text-align: center;
  margin: 0 auto;
}
.list {
  width: 90%;
  margin: 0.2rem 5% 0;
}
.item {
  height: 1.3rem;
  padding-top: 0.2rem;
  padding-left: 15px;
  border-bottom: 1px solid #e9e9e9;
}
.item:after {
  content: '';
  display: block;
  height: 0;
  clear: both;
}
.left {
  float: left;
}
.icon {
  display: inline-block;
  margin-top: 0.07rem;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
}
.cbut {
  padding: 0.02rem 0.1rem;
  font-size: 0.24rem;
  border-radius: 0.15rem;
  line-height: 0.6rem;
  border-width: 1px;
  border-style: solid;
}
.choose {
  color: #4cacf0;
  border-color: #4cacf0;
  transition: all 2s;
}
.unchoose {
  color: #b9b9b9;
  border-color: #b9b9b9;
  transition: all 2s;
}
.right {
  float: right;
  padding-top: 0.2rem;
}
.center-item {
  margin: 0;
  padding: 0;
  height: 0.3rem;
}
.center {
  float: left;
  margin-left: 0.05rem;
  padding-top: 0.2rem;
  max-width: calc(100% - 1.2rem);
  overflow: hidden;
}
.name {
  padding-left: 0.05rem;
  font-size: 0.26rem;
  line-height: 0.34rem;
}
.other {
  color: #8b8b8b;
  font-size: 0.24rem;
  line-height: 0.4rem;
}
.other span {
  display: inline-block;
  padding: 0 0.03rem;
}
/* 加载 */
.demo-spin-container{
  width: 100%;
  margin-top: 100px;
  display: flex;
  justify-content: center;
  position: relative;
}
</style>
