<template>
  <div>
  风
  </div>
</template>

<script>
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
      _goodsDetails(goodsId) {
        console.log('id:', goodsId)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>