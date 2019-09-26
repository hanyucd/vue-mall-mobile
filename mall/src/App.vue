<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive v-if="$route.meta.keepAlive">
         <!-- 这里是会被缓存的视图组件 -->
        <router-view id="view" v-if="$route.meta.keepAlive" />
      </keep-alive>
      <!-- 这里是不被缓存的视图组件 -->
      <router-view v-if="!$route.meta.keepAlive && isRouterAlive" id="view" />
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    provide () {
      return {
        reload: this.reload
      }
    },
    data() {
      return { 
        transitionName: '',
        isRouterAlive: true // 用于刷新页面用
      };
    },
    watch: {
      $route(to, from) {
        let routePage = ['Home', 'Category', 'Cart', 'Me'];
        //如果 to 索引大于 from 索引,判断为前进状态,反之则为后退状态
        if (routePage.includes(to.name) && from.meta.index < 5) {
          this.transitionName = 'fade';
        } else {
          // 如果 to 索引大于 from 索引,判断为前进状态,反之则为后退状态
          this.transitionName = (to.meta.index > from.meta.index) ? 'slide-left' : 'slide-right';
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
  // 底部导航切换动画
  .fade-enter { opacity: 0; }
  .fade-leave { opacity: 1; }
  .fade-enter-active { transition: opacity .3s; }
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
