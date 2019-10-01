<template>
  <div id="app">
    <!-- main 内容 -->
    <transition :name="mainName">
      <keep-alive v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件 -->
        <router-view id="view" v-if="$route.meta.keepAlive" />
      </keep-alive>
      <!-- 这里是不被缓存的视图组件 -->
      <router-view v-if="!$route.meta.keepAlive && isRouterAlive" id="view" />
    </transition>

    <!-- 底部导航 -->
    <transition :name="navName">
      <footer-nav v-if="isShowNav" :activeNavIndex="activeNavIndex"></footer-nav>
    </transition>
  </div>
</template>

<script>
  import FooterNav from '@/components/FooterNav';
  
  export default {
    name: 'App',
    provide () {
      return {
        reload: this.reload
      }
    },
  components: { FooterNav },
    data() {
      return {
        mainName: '', // 内容区域动画名
        navName: '', // 导航动画名
        isShowNav: false, // 是否显示底部导航 Tab
        activeNavIndex: 0, // 底部导航激活下标
        isRouterAlive: true, // 用于刷新页面用
        navTabs: ['Home', 'Category', 'Cart', 'Me'] // 底部导航
      };
    },
    watch: {
      $route(to, from) {
        const { navTabs } = this.$data;
        const toName = to.name;
        const fromName = from.name;
        // 如果是在 navTab 页面内刷新浏览器，则显示导航栏
        if (navTabs.includes(toName) && !fromName) this.isShowNav = true;

        switch (toName) {
          case 'Home': this.activeNavIndex = 0; break;
          case 'Category': this.activeNavIndex = 1; break;
          case 'Cart': this.activeNavIndex = 2; break;
          case 'Me': this.activeNavIndex = 3; break;
        }

        // 判断是否是底部导航之间相互切换
        if (navTabs.includes(toName) && navTabs.includes(fromName)) {
          this.mainName = 'fade';
        // 如果 to 索引大于 from 索引, 判断为前进状态, 反之则为后退状态
        } else if (to.meta.index > from.meta.index) {
          this.mainName = 'slide-left';
          this.navName = 'nav-slide';
          (navTabs.includes(fromName) || !navTabs.includes(fromName)) && (this.isShowNav = false);
        } else if (to.meta.index < from.meta.index) {
          this.mainName = 'slide-right';
          this.navName = 'nav-slide';
          (navTabs.includes(toName)) && (this.isShowNav = true);
        }
      }
    },
    methods: {
      /**
       * 用于刷新组件
       */
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(() => {
          this.isRouterAlive = true;
        });
      }
    }
  }
</script>

<style lang="scss">
  // 底部导航点进其他页面 导航 tab 动画
  .nav-slide-enter,
  .nav-slide-leave-to {
    transform: translate3d(-100%, 0, 0);
  }
  .nav-slide-enter-active,
  .nav-slide-leave-active {
    transition: all .5s;
  }

  // 底部导航之间相互切换 内容区域动画
  .fade-enter { opacity: 0; }
  .fade-leave { opacity: 1; }
  .fade-enter-active { transition: opacity .5s; }
  .fade-leave-active { opacity: 0; transition: opacity 0s; }

  // 前进：右边页面进入的同时，同时左边页面在消失
  .slide-left-enter {
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-leave-active {
    transform: translate3d(-100%, 0, 0);
  }
  // 后退：左边页面进入的同时，同时右边页面在消失
  .slide-right-enter {
    transform: translate3d(-100%, 0, 0);
  }
  .slide-right-leave-active {
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    will-change: transform;
    transition: all .5s;
    position: absolute; // 解决：页面切换时空白闪屏的问题
  }
  
  #app {
    width: 100%;
    height: 100%;
    #view {
      width: 100%;
      height: 100%;
    }
  }
</style>
