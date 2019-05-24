<template>
  <div id="app">
    <transition :name="animateName">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view id="view" />
      </keep-alive>
      <router-view v-else id="view" />
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
        let animate = this.$router.animate;
        let routePage = [ 'Home', 'Category', 'Cart', 'Me' ];
        // console.log(to.name, animate)
        if (routePage.includes(to.name) && animate != 2) {
          this.animateName = 'fade';
        } else {
          this.animateName = 'slide-left';
        }

        if (animate == 1) this.animateName = 'slide-right';
      }
    }
  }
</script>

<style lang="scss">
  .fade-enter { opacity: 0; }
  .fade-leave { opacity: 1; }
  .fade-enter-active { transition: opacity .3s; }
  .fade-leave-active { opacity: 0; transition: opacity 0s; }

  #app {
    width: 100%;
    height: 100%;
    #view {
      width: 100%;
      height: 100%;
      // transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    }
  }
</style>
