<template>
  <div>
    商品信息
  </div>
</template>

<script>
  import { fetchGoodsInfoData } from '@/api';
  import { Url } from '@/api/url';

  export default {
    name: 'GoodsInfo',
    data() {
      return {
        goodsDetail: {}
      };
    },
    created() {
      let goodsId = this.$route.params.goodsId;
      this._getGoodsInfo(goodsId);
    },
    methods: {
      async _getGoodsInfo(goodsId) {
        let method = 'post';
        let path = Url.goodsDetailInfoApi;
        try {
          await fetchGoodsInfoData(path, method, { goodsId });
        } catch (error) {
          
        }
      }
    }
  }
</script>

<style scoped>

</style>