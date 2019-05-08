<template>
  <div class="goods-list" @click="goGoodsInfo">
    <div class="goods-image">
      <img v-lazy="goodsImage" width="90%" />
    </div>
    <div class="goods-name">{{ goodsName }}</div>
    <div class="goods-price">￥{{ goodsPrice }}</div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsList',
    props: [ 'goodsImage', 'goodsName', 'goodsPrice', 'goodsId' ],
    methods: {
      goGoodsInfo() {
        this.$router.push({
          name: 'GoodsInfo',
          params: {
            goodsId: this.goodsId
          }
        })
      }
    }
  }
</script>

<style scoped>
  .goods-name {
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>