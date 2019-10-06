<template>
  <div class="address-edit">
    <top-bar title="编辑地址" hasBack></top-bar>

    <!-- Vant AddressEdit 地址编辑 -->
    <van-address-edit
      show-set-default
      show-search-result
      :area-list="areaList"
      :show-delete="showDelete"
      @save="saveHandle"
      @delete="deleteHandle"
    />
  </div>
</template>

<script>
  import TopBar from '@/components/TopBar';
  import { GoodsMixin } from '@/mixins/goodsMixin';
  import ajax from '@/api';

  export default {
    name: 'AddressEdit',
    mixins: [ GoodsMixin ],
    components: { TopBar },
    data() {
      return {
        showDelete: true, // 是否显示删除按钮
        areaList: require('@/assets/js/area').default, // 地区列表
      }
    },
    methods: {
      /**
       * 点击保存按钮
       * @param {Object} 表单内容
       */
      async saveHandle(content) {
        if (!this.userToken) {
          this.$router.push({ name: 'Login' });
          return;
        }

        try {
          const res = await ajax.editAddress({
            name: content.name, // 收货人姓名
            tel: content.tel, // 收货人电话
            province: content.province, // 省份
            city: content.city, // 城市
            county: content.county, // 区县
            address_detail: content.addressDetail, // 详细地址
            area_code: content.areaCode, // 地区编码
            is_default: content.isDefault, // 是否为默认地址
            total_address: content.province + content.city + content.county + content.addressDetail, // 总地址
          });
          console.log(res);
        } catch(error) {
          (error.response && error.response.status === 401 || 400) && (this.$router.push({ name: 'Login' }));
          console.log(error);
        }
      },
      /**
       * 点击删除按钮
       * @param {Object} 表单内容
       */
      deleteHandle(content) {
        console.log(content)
      }
    }
  }
</script>

<style lang="scss">
  $color: #b532e9;

  // 强行改变 vant 中默认样式
  .address-edit {
    .van-switch--on {
      background: $color;
    }

    .van-address-edit__buttons {
      .van-button--danger {
        background: $color;
        border: 1px solid $color;
      }
      .van-button--default {
        border: 1px solid $color;
        color: $color;
      }
    }
  }

  .van-picker__cancel, .van-picker__confirm {
      color: $color;
  }
  .van-dialog__confirm {
    color: $color;
  }
</style>