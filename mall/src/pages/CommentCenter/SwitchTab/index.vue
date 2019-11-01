<template>
  <div class="switch-tab">
    <ul class="tab-wrap">
      <li class="item" v-for="item of tabs" :key="item.index" @click="switchTab(item.index)">
        {{ item.name }}
      </li>
      <article class="bottom-bar-wrap" ref="bottomBar">
        <div class="bottom-bar"></div>
      </article>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SwitchTab',
  data() {
    return {
      tabs: [
        { index: 0, name: '待评价' },
        { index: 1, name: '已评价' }
      ],
      curTabIndex: 0 // 当前激活标签下标
    }
  },
  methods: {
    /**
     * 底部条跟随标签切换
     */
    switchTab(index) {
      if (this.curTabIndex === index) return;

      this.curTabIndex = index;
      this.$emit('switch-evt', this.curTabIndex);
      const left = 100 / this.tabs.length * this.curTabIndex;
      this.$refs.bottomBar.style.left = `${ left }%`;
    }
  }
};
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>