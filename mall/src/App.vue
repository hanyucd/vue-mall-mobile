<template>
  <div id="app">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view id="view" />
    </keep-alive>
    <router-view v-else id="view" />
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="scss">
  #app {
    width: 100%;
    height: 100%;
    #view {
      width: 100%;
      height: 100%;
      // transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    }
  }
</style>
