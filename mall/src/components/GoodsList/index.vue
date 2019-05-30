<template>
  <ul>
    <li v-for="item of goodsList" :key="item._id || item.id" class="goods-item" @click="goGoodsDetails(item)">
      <!-- 左侧图片 -->
      <section class="left-img">
        <img v-lazy="item.image" />
      </section>
      <!-- 右侧文本 -->
      <section class="right-txt">
        <p class="goods-name" v-html="keyWordLight(item.name)"></p>
        <p class="goods-num">
          <span class="pic">￥{{ item.present_price }}</span>
          <span class="orl-pic">{{ item.orl_price }}</span>
        </p>
      </section>
    </li>
  </ul>
</template>

<script>
  import { GoodsMixin } from '@/mixins/goodsMixin';
  
  export default {
    name: 'GoodsList',
    mixins: [ GoodsMixin ],
    props: {
      goodsList: { type: Array, default: () => [] }
    },
    methods: {
      keyWordLight(textStr) {
        return textStr;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>