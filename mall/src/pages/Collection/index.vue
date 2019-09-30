<template>
  <div>
    <top-bar title="我的收藏" hasBack outBrowse></top-bar>
  </div>
</template>

<script>
  import TopBar from '@/components/TopBar';
  import BScroll from '@/components/BScroll';
  import GoodsList from '@/components/GoodsList';

  export default {
    name: 'Collection',
    components: { TopBar, BScroll, GoodsList },
    data() {
      return {
        msg: '收藏'
      };
    }
  }
</script>

<style lang="scss">

</style>
