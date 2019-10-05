<template>
  <div class="address-manage">
    <top-bar title="地址管理" hasBack></top-bar>
    
    <section class="address-container">
      <b-scroll class="content-scroll">
        <div v-if="!addressList.length" class="empty-address-list">
          暂无收货地址 ~~
        </div>
      </b-scroll>

      <!-- 加载状态 -->
      <!-- <loading :loadingStatus="loadingStatus" type="spinner" /> -->
    </section>

    <!-- 底部新增地址按钮 -->
    <section class="add-address" @click="$router.push({ name: 'AddressEdit' })">新增地址</section>
  </div>
</template>

<script>
  import TopBar from '@/components/TopBar';
  import BScroll from '@/components/BScroll';
  import { GoodsMixin } from '@/mixins/goodsMixin';

  export default {
    name: 'AddressManage',
    mixins: [ GoodsMixin ],
    components: { TopBar, BScroll },
    data() {
      return {
        addressList: []
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>