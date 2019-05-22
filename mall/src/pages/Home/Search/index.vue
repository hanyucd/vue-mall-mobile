<template>
  <transition name="bounce">
    <div id="search-result">
      搜索结果
    </div>
  </transition>
</template>

<script>
  export default {
    name: "Search",
    data() {
      return {};
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/bounceAnim.scss';

  #search-result {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background: #fff;
  }
</style>