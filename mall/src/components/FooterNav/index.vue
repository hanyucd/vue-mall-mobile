<template>
  <!-- 底部导航 -->
  <footer id="tabNav">
    <section v-for="(item, index) of NavList" :key="index" :class="{ active: navIndex === index }" @click="clickTab(index, item.name)">
      <van-icon :name="item.icon" />
      <div>{{ item.title }}</div>
    </section>
  </footer>
</template>

<script>
  export default {
    name: 'FooterNav',
    data() {
      return {
        NavList: [
          { title: '首页', name: 'Home', icon: 'wap-home' },
          { title: '分类', name: 'Category', icon: 'wap-nav' },
          { title: '购物车', name: 'Cart', icon: 'shopping-cart' },
          { title: '我的', name: 'Me', icon: 'contact' }
        ],
        navIndex: 0
      };
    },
    watch: {
      $route() {
        const name = this.$route.name;
        switch (name) {
          case 'Home': this.navIndex = 0; break;
          case 'Category': this.navIndex = 1; break;
          case 'Cart': this.navIndex = 2; break;
          case 'Me': this.navIndex = 3; break;
        }
      }
    },
    methods: {
      clickTab(index, name) {
        // if (this.navIndex === index) return;
        // this.navIndex = index;
        this.$router.push({ name });
      }
    }
  }
</script>

<style lang="scss" scoped>
  $color:#b532e9;

  #tabNav {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 13.5vw;
    display: flex;
    background: #fff;
    z-index: 100;
    section {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      color: #7d7e80;
    }
    .active {
      color: $color;
    }
  }
</style>