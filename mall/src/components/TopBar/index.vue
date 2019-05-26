<template>
  <div class="top-bar">
    {{ title }}
  </div>
</template>

<script>
  export default {
    name: 'TopBar',
    props: {
      title: { type: String, default: '' }
    }
  }
</script>

<style lang="scss" scoped>
  .top-bar {
    height: 11.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #eee;
    font-size: 4.5vw;
    box-sizing: border-box;
  }
</style>