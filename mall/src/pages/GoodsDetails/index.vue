<template>
  <div>
  风
  </div>
</template>

<script>
  import ajax from '@/api';

  export default {
    name: "GoodsDetails",
    props: [ 'goodsId' ],
    data() {
      return {}
    },
    created() {
      this._goodsDetails(this.goodsId);
    },
    methods: {
      /**
       * 商品详情
       */
      async _goodsDetails(goodsId) {
        try {
          let res = await ajax.getGoodsDetails(goodsId);
          console.log(res);
        } catch (error) {
          console.log(errro);
        }
        console.log('id:', goodsId)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>