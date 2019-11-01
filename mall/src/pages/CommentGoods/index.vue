<template>
  <div class="comment-goods">
    <top-bar title="评价商品" hasBack></top-bar>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar';
import ajax from '@/api';

export default {
  name: 'CommentGoods',
  components: { TopBar },
  props: [ 'orderId', 'orderNum' ],
  data() {
    return {
    }
  },
  created() {
  }
};
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>