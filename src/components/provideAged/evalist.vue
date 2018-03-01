<template>
<div>
  <!-- 我的养老评价 -->
  <ul class="list">
    <li class="item" v-for="e in list" v-if="e.pension_id === 1">
      <span>pension_id:{{e.pension_id}}</span>
      <span>pension_record_id:{{e.pension_record_id}}</span>
      <span>organ_id:{{e.organ_id}}</span>
      <span>organ_star:{{e.organ_star}}</span>
      <span>content:{{e.content}}</span>
    </li>
  </ul>
</div>
</template>

<script>
import { Toast } from 'mint-ui'
import { pension_evaluate_self } from 'api/common'
export default {
  name: 'endorder',
  data () {
    return {
      list: [],
      id: localStorage.getItem('orid')
    }
  },
  mounted: function () {
    pension_evaluate_self().then((res)=>{
      console.log(res);
    })
  }
}
</script>

<style scoped>
.list {
  margin: 0;
  padding: 0;
}
.item {
  border-bottom: 1px solid #000;
}
.item span {
  display: block;
  line-height: 0.36rem;
}
</style>
