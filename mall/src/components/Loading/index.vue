<template>
  <div class="loading-container" v-if="loadingStatus">
    <van-loading class="loading" :type="type" :color="color" />
  </div>
</template>

<script>
  export default {
    name: 'Loading',
    props: {
      loadingStatus: { type: Boolean, default: false },
      type: { type: String, default: 'circular' },
    },
    data() {
      return {
        color: '#b532e9',
      }
    }
  }
</script>

<style lang="scss" scoped>
  .loading-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #fff;
    z-index: 9999;
    .loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>