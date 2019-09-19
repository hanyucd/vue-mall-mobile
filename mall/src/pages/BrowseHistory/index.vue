<template>
  <div>
    <top-bar title="浏览历史" hasBack></top-bar>
    <b-scroll class="content-scroll">
      <div></div>
    </b-scroll>
  </div>
</template>

<script>
  import TopBar from '@/components/TopBar';
  import BScroll from '@/components/BScroll';

  export default {
    name: "BrowseHistory",
    components: { TopBar, BScroll },
    data() {
      return {
        msg: '浏览'
      };
    }
  }
</script>

<style lang="sass" scoped>

</style>