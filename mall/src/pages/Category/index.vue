<template>
  <div class="category">
    <top-bar title="商品分类"></top-bar>
    <!-- 内容区 -->
    <section class="content">
      内容
    </section>
    <!-- 底部导航 -->
    <footer-nav></footer-nav>
  </div>
</template>

<script>
  import TopBar from '@/components/TopBar';
  import FooterNav from '@/components/FooterNav';

  export default {
    name: 'Category',
    components: { TopBar, FooterNav },
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>