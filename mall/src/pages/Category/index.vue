<template>
  <div class="category">
    <top-bar title="商品分类"></top-bar>
    <!-- 内容区 -->
    <div class="content">
      <!-- 侧边栏导航 -->
      <section class="left">
        <ul>
          <li v-for="(item, index) in categoryList" :key="item.mallCategoryId" :class="{ active: sidebarIndex === index }" @click="switchSideNav(index)">
            {{ item.mallCategoryName }}
          </li>
          <!-- 侧边栏导航标记 -->
          <article class="sidebar-tag" ref="sideTagRef"></article>
        </ul>
      </section>
    </div>
    <!-- 底部导航 -->
    <footer-nav></footer-nav>
  </div>
</template>

<script>
  import TopBar from '@/components/TopBar';
  import FooterNav from '@/components/FooterNav';
  import { GoodsMixin } from '@/mixins/goodsMixin';
  import ajax from '@/api';

  export default {
    name: 'Category',
    mixins: [ GoodsMixin ],
    components: { TopBar, FooterNav },
    data() {
      return {
        sidebarIndex: 0, // 侧边栏导航下标
      };
    },
    created() {
      this._getCategoryList();
    },
    methods: {
      /**
       * 获取分类列表 & 存到 Vuex 中
       */
      async _getCategoryList() {
        // 调用 Vuex 中的 Getters | 值在 GoodsMixin 中
        if (!this.categoryList.length) {
          try {
            let res = await ajax.getHomeData();
            if (res.code === 200) {
              // 调用 Vuex 中的 Actions | 方法在 GoodsMixin 中
              this.setCategoryList(res.result.category);
            }
          } catch (error) {
            console.log(error);
          }
        }
      },
      /**
       * 切换侧边导航
       */
      switchSideNav(index) {
        if (this.sidebarIndex === index) return;
        this.sidebarIndex = index;
        // 计算侧边导航标签距离顶部距离
        let top = 100 / (this.categoryList.length) * index;
        this.$refs.sideTagRef.style.top = `${ top }%`;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>