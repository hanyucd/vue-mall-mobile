<template>
  <div id="app">
    <!-- <keep-alive>
    </keep-alive> -->
    <router-view />
    <!-- 底部导航 -->
    <nav id="tabBar">
      <section v-for="(item, index) of tabBarList" :key="index" :class="{ active: tableIndex === index }" @click="clickTab(index, item.name)">
        <van-icon :name="item.icon" />
        <div>{{ item.title }}</div>
      </section>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      tabBarList: [
        { title: '首页', name: 'Home', icon: 'wap-home' },
        { title: '分类', name: 'Category', icon: 'wap-nav' },
        { title: '购物车', name: 'Cart', icon: 'shopping-cart' },
        { title: '我的', name: 'Me', icon: 'contact' }
      ],
      tableIndex: 0
    }
  },
  watch: {
    $route() {
      let name = this.$route.name;
      switch (name) {
        case 'Home':
          this.tableIndex = 0;
          break;
        case 'Category':
          this.tableIndex = 1;
          break;
        case 'Cart':
          this.tableIndex = 2;
          break;
        case 'Me':
          this.tableIndex = 3;
          break;
      }
    }
  },
  methods: {
    clickTab(index, name) {
      if (this.tableIndex === index) return;
      this.$router.push({ name });
    }
  }
}
</script>

<style>
  #app {
    height: 100%;
  }
  #tabBar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height:  13.5vw;
    display: flex;
    background: #fff;
    z-index: 100;
  }
  #tabBar section {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: #7d7e80;
  }
  #tabBar .active {
    color: #b532e9;
  }
</style>
