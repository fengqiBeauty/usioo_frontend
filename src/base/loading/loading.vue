<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped type="text/css">
.loading {
  width: 100%;
  text-align: center;
  .desc {
    line-height: 20px;
    font-size: 10px;
    color: #888;
  }
}
</style>
