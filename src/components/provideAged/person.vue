<template>
<div>
  <!-- 我的养老记录 -->
  <list :message=data></list>
</div>
</template>

<script>
import list from '../public/list'
import { smartpension_record,weixin_login } from 'api/common'
export default {
  name: 'endorder',
  data () {
    return {
      data: {
        list: []
      }
    }
  },
  components: {
    'list': list
  },
  created: function () {
    smartpension_record({
      params: {
        'status': 'wait_confirm'
      }
    }).then((res) => {
      if(res.code == 200){
        this.data.list = res.rows;
        console.log(this.data.list);
      }else if(res.code == 401){
        weixin_login('#/provideAged/person');
      }else{}
    })
  }
}
</script>

<style scoped>
</style>
