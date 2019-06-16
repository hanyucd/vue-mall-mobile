<template>
  <div>
    <top-bar title="会员中心"></top-bar>
    <div class="dev">{{ msg }}</div>
    <!-- 底部导航 -->
    <footer-nav></footer-nav>
  </div>
</template>

<script>
  import TopBar from '@/components/TopBar';
  import FooterNav from '@/components/FooterNav';

  export default {
    name: 'Me',
    components: { TopBar, FooterNav },
    data() {
      return {
        msg: '开发中...'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dev {
    text-align: center;
    margin-top: 50px;
  }
</style>