<template>
  <ul>
    <li v-for="item of goodsList" :key="item._id || item.id" class="goods-item" @click="goGoodsDetails(item)">
      <!-- 左侧图片 -->
      <section class="left-img">
        <img v-lazy="item.image" :onerror="defImg" />
      </section>
      <!-- 右侧文本 -->
      <section class="right-txt">
        <p class="goods-name" v-html="keyWordLight(item.name, searchKeyword)"></p>
        <p class="goods-num">
          <span class="pic">￥{{ item.present_price }}</span>
          <span class="orl-pic">{{ item.orl_price }}</span>
        </p>
      </section>
      <!-- 删除按钮 -->
      <section class="delete-btn" v-if="isBrowseHistory">
        <van-icon name="close" class="delete-icon" @click.stop="$emit('deleteOneHistory', item)" />
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
    },
    data() {
      return {
        defImg: 'this.src="' + require('../../assets/imgs/error-img.png') + '"',
      }
    },
    methods: {
      keyWordLight(goodsName, searchKeyword) {
        // 若是搜索的话则执行
        if (searchKeyword) {
          // 创建一个正则表达式
          let regExp = new RegExp(searchKeyword, 'g');
          let replaceText = `<span style="color: red">${ searchKeyword }</span>`;
          
          return goodsName.replace(regExp, replaceText); // 返回替换后的字符串
        }

        return goodsName;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>