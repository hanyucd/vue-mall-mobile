<template>
  <div id="title" v-show="floorName">
    <span class="num" v-show="num">{{ num }}F</span>
    <span class="name">{{ floorName }}</span>
  </div>
</template>

<script>
  export default {
    name: 'Title',
    props: [ 'floorName', 'num' ]
  }
</script>

<style lang="scss" scoped>
  $color:#b532e9;

  #title {
    background: #EDEDED;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: $color;
    font-size: 15px;
    .num {
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 50%;
      background: $color;
      color: #fff;
      font-size: 12px;
      margin-right: 5px;
    }
  }
</style>