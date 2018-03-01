<template>
  <div id="app">
    <div v-wechat-title="$route.meta.title"></div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" :key="key"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" :key="key"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    key() {
        return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date()
    }
 }
}
</script>

<style>
#app {
  font-size: 0.26rem;
  height: 100%; 
  width: 100%;
  overflow-x: hidden;
}
</style>
