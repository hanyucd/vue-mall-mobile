<template>
  <div>
    <top-bar title="购物车"></top-bar>
    <!-- 底部导航 -->
    <footer-nav></footer-nav>
  </div>
</template>

<script>
  import TopBar from '@/components/TopBar';
  import FooterNav from '@/components/FooterNav';

  export default {
    name: 'Cart',
    components: { TopBar, FooterNav },
  }
</script>

<style lang="scss" scoped>

</style>