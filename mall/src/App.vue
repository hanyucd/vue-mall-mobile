<template>
  <div id="app">
    <transition :name="animateName">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view id="view"></router-view>
      </keep-alive>
      <router-view v-else id="view"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return { animateName: '' };
    },
    watch: {
      $route(to, from) {
        let animateFlag = this.$router.animateFlag;
        let routePage = ['Home', 'Category', 'Cart', 'Me'];
        if (routePage.includes(to.name) && animateFlag != 2) {
          this.animateName = 'fade';
        } else {
          this.animateName = 'slide-right';
        }

        if (animateFlag == 1) this.animateName = 'slide-left';
        this.$router.animateFlag = 0;
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
  // 右边进入的同时，左边在消失
  .slide-right-enter, .slide-left-leave-active { 
    opacity: 0;
    transform: translate(100%, 0);
  }
  // 左边进入的同时，右边在消失
  .slide-right-leave-active, .slide-left-enter {
    opacity: 0;
    transform: translate(-100%, 0);
  }

  // .slide-left-enter,
  // .slide-right-leave-active {
  //   opacity: 0;
  //   transform: translate(100%, 0);
  // }
  // .slide-left-leave-active,
  // .slide-right-enter {
  //   opacity: 0;
  //   transform: translate(-100%, 0);
  // }

  #app {
    width: 100%;
    height: 100%;
    #view {
      width: 100%;
      height: 100%;
      transition: all .5s cubic-bezier(0.55, 0, 0.1, 1);
    }
  }
</style>
