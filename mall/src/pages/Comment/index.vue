<template>
  <div class="comment">
    <top-bar title="评价中心" hasBack></top-bar>
    <!-- 顶部图片 -->
    <section class="top-img">
      <img :src="commentImg" alt="">
    </section>
    <section></section>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar';

export default {
  name: 'Comment',
  components: { TopBar },
  data() {
    return {
      commentImg: require('@/assets/imgs/comment.jpg'),
    }
  }
};
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>