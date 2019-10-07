<template>
  <div class="address-manage">
    <top-bar title="地址管理" hasBack></top-bar>
    
    <section class="address-container">
      <div v-if="!loadingStatus && !addressList.length" class="empty-address-list">
        暂无收货地址 ~~
      </div>
      <b-scroll class="content-scroll" v-if="addressList.length">
        <van-address-list
          v-model="chosenAddressId"
          :list="addressList"
          @edit="editAddress"
          @select="selectAddress"
          @add="$router.push({ name: 'AddressEdit' })"
        />
      </b-scroll>

      <!-- 加载状态 -->
      <loading :loadingStatus="loadingStatus" type="spinner" />
    </section>
    <!-- 底部新增按钮 -->
    <section class="add-address" v-if="!loadingStatus && !addressList.length" @click="$router.push({ name: 'AddressEdit' })">新增地址</section>
  </div>
</template>

<script>
  import TopBar from '@/components/TopBar';
  import BScroll from '@/components/BScroll';
  import { GoodsMixin } from '@/mixins/goodsMixin';
  import ajax from '@/api';

  export default {
    name: 'AddressManage',
    mixins: [ GoodsMixin ],
    components: { TopBar, BScroll },
    data() {
      return {
        addressList: [], // 地址列表
        chosenAddressId: '1', // 当前选中地址的 id
      }
    },
    created() {
      this._getAddressList();
    },
    methods: {
      /**
       * 获取地址列表
       */
      async _getAddressList() {
        try {
           const res = await ajax.getAddressList();

           if (res.code === 200) {
             let defAddress;
             // 反转数组
             this.addressList = res.addressList.reverse();
             for (let i = 0; i < this.addressList.length; i++) {
               if (this.addressList[i].isDefault) {
                 defAddress = this.addressList[i];
                 defAddress.id = '1';
                 this.addressList.splice(i, 1); // 删除它
                 this.addressList.unshift(defAddress); // 将元素添加到数组的开头
               } else {
                 this.addressList[i].id = String(i + 2);
               }
             }

             this.loadingStatus = false;
           }
        } catch(error) {
          this.loadingStatus = false;
          if (error.response && error.response.status === 401 || 403) this.$toast(error.response.data.msg);
          console.log(error);
        }
      },
      /**
       * 编辑地址
       */
      editAddress(item) {
        this.setAddressInfo(item);
        this.$router.push({ name: 'AddressEdit' });
      },
      /**
       * 选中地址
       */
      selectAddress(item) {
        
        console.log('选择')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>

<style lang="scss">
  $color:#b532e9;
  // 强行改变 vant 中默认样式
  .van-address-item {
    .van-radio__icon--checked {
      .van-icon {
        background: $color;
        border-color: $color;
      }
    }
  }
</style>
