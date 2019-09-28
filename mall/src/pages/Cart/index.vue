<template>
  <div>
    <top-bar title="购物车"></top-bar>
    <div class="dev">{{ msg }}</div>
  </div>
</template>

<script>
  import TopBar from '@/components/TopBar';

  export default {
    name: 'Cart',
    components: { TopBar },
    data() {
      return {
        msg: '开发中...'
      }
    },
    created() {
      console.log('购物车创建')
    }
  }
</script>

<style lang="scss" scoped>
  .dev {
    text-align: center;
    margin-top: 50px;
  }
</style>