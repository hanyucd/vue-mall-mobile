<template>
  <div>
    <!-- 顶部搜素 -->
    <header class="header">
      <section class="city">杭州 ▼</section>
      <section class="search-box">
        <van-icon name="search" class="search-icon"/>
        <input class="box" type="text" placeholder="请输入搜索关键词" v-model="inputValue" />
        <van-icon name="clear" class="clear" @click="inputValue = ''" v-show="inputValue" />
      </section>
    </header>

    <section class="content" v-if="homeData">
      <banner :slides="homeData.slides"></banner>
      <category v-if="homeData.advertesPicture" :category="homeData.category" :advertesPicture="homeData.advertesPicture.PICTURE_ADDRESS"></category>
      <recommend :recommend="homeData.recommend"></recommend>
      <floor v-if="homeData.floor1" :floorName="homeData.floorName.floor1" :floor="homeData.floor1" :num="1"></floor>
      <floor v-if="homeData.floor2" :floorName="homeData.floorName.floor2" :floor="homeData.floor2" :num="2"></floor>
      <floor v-if="homeData.floor3" :floorName="homeData.floorName.floor3" :floor="homeData.floor3" :num="3"></floor>
    </section>
    <!-- <footer-nav></footer-nav> -->
  </div>
</template>

<script>
  import Banner from './Banner';
  import Category from './Category';
  import Recommend from './Recommend';
  import Floor from './Floor';
  import FooterNav from '@/components/FooterNav';
  import ajax from '@/api';

  export default {
    name: 'Home',
    components: {
      Banner,
      Category,
      Recommend,
      Floor,
      FooterNav
    },
    data() {
      return {
        inputValue: '', // 搜素框
        homeData: {}, // 首页数据
        floorName: {} // 楼层名称
      };
    },
    created() {
      this._getHome();
    },
    methods: {
      async _getHome() {
        try {
          let res = await ajax.getHomeData();
          if (res.code === 200) {
            this.homeData = res.result
            this.floorName = res.result.floorName;
            console.log(res)
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    height: 44px;
    line-height: 44px;
    background: #eee;
    display: flex;
    // position: relative;
    // z-index: 10;
    .city {
      flex-basis: 20%;
      font-size: 12px;
      text-align: center;
    }
    .search-box {
      flex: 1;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      position: relative;
      .search-icon {
        color: #222;
        font-size: 12px;
        position: absolute;
        left: 10px;
      }
      .box {
        flex: 1;
        box-sizing: border-box;
        line-height: 18px;
        background: #fff;
        color: #333;
        font-size: 14px;
        outline: 0;
        padding: 7px;
        padding-left: 32px;
        margin-right: 5px;
        border-radius: 5px;
      }
      .clear {
        position: absolute;
        right: 12px;
        color: #999;
      }
    }
  }
</style>