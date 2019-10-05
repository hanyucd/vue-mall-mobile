<template>
  <ul>
    <li v-for="(item, index) in goodsList" :key="item._id || item.id" class="goods-item" @click="goGoodsDetails(item)">
      <!-- 左侧图片 -->
      <section class="left-img">
        <img v-lazy="item.image || item.image_path" :onerror="defImg" />
      </section>
      <!-- 右侧文本 -->
      <section class="right-txt">
        <p class="goods-name" v-html="keyWordLight(item.name || item.goods_name, searchKeyword)"></p>
        <p class="goods-num">
          <span class="price" v-if="isOrderPaymentList">￥{{ (item.present_price * item.buy_count).toFixed(2) }}</span>
          <span class="price" v-else>￥{{ item.present_price }}</span>
          <span class="orl-price">{{ item.orl_price }}</span>
        </p>
      </section>
      <!-- 单个商品订单数量 -->
      <section class="order-goods-count" v-if="isOrderPaymentList">x {{ item.buy_count }}</section>
      <!-- 删除按钮 -->
      <section class="delete-btn" v-if="isBrowseHistory || isCollectionList">
        <van-icon name="close" class="delete-icon" @click.stop="handleRemove(item, index)" />
      </section>
    </li>
    <p class="load-more" v-if="isloadMore">- 加载更多 -</p>
    <p class="load-more" v-else>- 我们是有底线的 -</p>
  </ul>
</template>

<script>
  import { GoodsMixin } from '@/mixins/goodsMixin';
  
  export default {
    name: 'GoodsList',
    mixins: [ GoodsMixin ],
    props: {
      goodsList: { type: Array, default: () => [] },
      searchKeyword: { type: String, default: '' }, // 搜索关键字
      isloadMore: { type: Boolean, default: false }, // 是否加载更多
      isBrowseHistory: { type: Boolean, default: false }, // 是否为浏览历史
      isCollectionList: { type: Boolean, default: false }, // 是否为收藏列表
      isOrderPaymentList: { type: Boolean, default: false }, // 是否订单支付列表
    },
    data() {
      return {
        defImg: 'this.src="' + require('../../assets/imgs/error-img.png') + '"',
      }
    },
    methods: {
      /**
       * 关键字高亮处理
       */
      keyWordLight(goodsName, searchKeyword) {
        // 若是搜索的话则执行
        if (searchKeyword) {
          // 创建一个正则表达式
          let regExp = new RegExp(searchKeyword, 'g');
          let replaceText = `<span style="color: red">${ searchKeyword }</span>`;
          
          return goodsName.replace(regExp, replaceText); // 返回替换后的字符串
        }

        return goodsName;
      },
      /**
       * 处理移除
       */
      handleRemove(item, index){
        if (this.isBrowseHistory) {
          this.$emit('deleteOneHistory', item);
        } else if (this.isCollectionList) {
          this.$emit('cancelOneCollection', item, index);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>