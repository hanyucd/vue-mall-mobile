<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive v-if="$route.meta.keepAlive">
         <!-- 这里是会被缓存的视图组件 -->
        <router-view id="view" v-if="$route.meta.keepAlive" />
      </keep-alive>
      <!-- 这里是不被缓存的视图组件 -->
      <router-view v-if="!$route.meta.keepAlive" id="view" />
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return { transitionName: '' };
    },
    watch: {
      $route(to, from) {
        let routePage = ['Home', 'Category', 'Cart', 'Me'];
        if (routePage.includes(to.name) && from.meta.index < 5) {
          this.transitionName = 'fade';
        } else {
          // 如果 to 索引大于 from 索引,判断为前进状态,反之则为后退状态
          // this.transitionName = (to.meta.index > from.meta.index) ? 'slide-left' : 'slide-right';
          if (to.meta.index > from.meta.index) {
            this.transitionName = 'slide-left';
          } else {
            this.transitionName = 'slide-right';
          }
          console.log(to.meta.index)
          console.log(from.meta.index)
        }
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

  .slide-left-enter-acitve,
  .slide-left-leave-acitve,
  .slide-right-enter-acitve,
  .slide-right-leave-acitve {
    will-change: transform;
    position: absolute;
    transition: all 20s;
    background: red;
  }

  // 前进：右边页面进入的同时，同时左边页面在消失
  .slide-left-enter {
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-leave-acitve {
    transform: translate3d(-100%, 0, 0);
  }
  // 后退：左边页面进入的同时，同时右边页面在消失
  .slide-right-enter {
    transform: translate3d(-100%, 0, 0);
  }
  .slide-right-leave-acitve {
    transform: translate3d(100%, 0, 0);
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
