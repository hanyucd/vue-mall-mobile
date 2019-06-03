<template>
  <div>
    <van-nav-bar title="城市列表" left-arrow @click-left="back"/>
  </div>
</template>

<script>
  import BScroll from '@/components/BScroll';
  import { GoodsMixin } from '@/mixins/goodsMixin';
  import cityData from '@/assets/js/city';

  export default {
    name: 'City',
    mixins: [ GoodsMixin ],
    components: { BScroll },
    data() {
      return {
        cities: cityData
      };
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>