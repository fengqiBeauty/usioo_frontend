<template>
<div class="par">
  <div class="delog">
    <div class="top">
      <p class="t1">确认提交?</p>
      <p class="t2">提交信息后不可更改，是否确认?</p>
    </div>
    <div class="bottom">
      <span class="bit" @click="yeah">是</span><span class="bit" @click="nope">再看看</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'succ',
  data () {
    return {
    }
  },
  methods: {
    yeah: function () {
      this.$emit('delog', 1)
    },
    nope: function () {
      this.$emit('delog', 0)
    }
  },
  mounted: function () {
  }
}
</script>

<style scoped>
.par {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(52, 52, 52, 0.5);
  height: 100%;
  z-index: 1
}
.delog {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  text-align: center;
  border-radius: 0.05rem;
}
.top {
  padding: 0.1rem 0.2rem;
  border-bottom: 1px solid #dbdcbd;
}
.bottom {
  display: table;
  width: 100%;
  color: #3891f7;
}
.bit {
  display: table-cell;
  width: 50%;
  line-height: 0.39rem;
}
.t1 {
  margin: 0.1rem 0;
}
.t2 {
  color: #999;
  font-size: 0.24rem;
  margin: 0;
}
</style>
