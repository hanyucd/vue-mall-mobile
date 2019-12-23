<template>
 <!-- 滚动组件 -->
  <div class="scroll-wrapper" ref="scrollRef">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  
  export default {
    name: 'Scroll',
    props: {
      probeType: { type: Number, default: 1 }, // 是否实时派发 scroll 事件 | 1：默认非实时派发
      click: { type: Boolean, default: true }, // 默认派发浏览器的原生 click 事件
      listenScroll: { type: Boolean, default: false }, // 是否监听滚动位置
      pullup: { type: Boolean, default: false },  // 是否开启上拉加载
      pullDownRefresh: { type: Boolean, default: false }, // 是否开启下拉刷新
      beforeScroll: { type: Boolean, default: false }, // 滚动前是否触发事件，如：滚动前让输入框失去焦点，避免滚动搜索结果时移动端键盘遮挡
      bounce: { type: Object, default: () => ({ top: true }) }, // 当滚动超过边缘的时候会有一小段回弹动画
      swipeTime: { type: Number, default: 1600 }, // 滚动动画时长 ms
      timer: { type: Number, default: 20 },
      data: { type: Array, default: null }
    },
    watch: {
      data() {
        setTimeout(() => {
          // 监听传入进来的 data 数据的变化，重新就算高度
          this.refresh();
        }, this.timer);
      }
    },
    mounted() {
      // 确保在 Dom 初始化后才执行滚动方法
      setTimeout(() => {
        this._initScroll();
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.scrollRef) return;

        // 实例化 better-scroll
        this.scroll = new BScroll(this.$refs.scrollRef, {
          probeType: this.probeType,
          click: this.click,
          pullDownRefresh: this.pullDownRefresh,
          bounce: this.bounce,
          swipeTime: this.swipeTime
        });

        // 实时监听滚动事件 | 监听 better-scroll 滚动事件
        if (this.listenScroll) {
          let _this = this;     // pos 滚动的实时坐标 {x, y}
          this.scroll.on('scroll', pos => {
            // 向父组件派发滚动事件
            _this.$emit('scroll', pos);
          });
        }

        // 上拉加载 | 监听 better-scroll 滚动到底部事件
        if (this.pullup) {
          let _this = this;
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= this.scroll.maxScrollY + 50) {
              // 向父组件派发滚动结束事件
              _this.$emit('scrollEnd');
            }
          });
        }

        // 下拉刷新 | 监听 better-scroll 滚动事件
        if (this.pullDownRefresh) {
          let _this = this;
          this.scroll.on('scroll', pos => {
            if (pos.y > 50) {
              _this.$emit('scrollChange');
            }
          });
          // 滑动结束松开事件
          this.scroll.on('pullingDown', () => {
            _this.$emit('onPullDown');
          });
        }

        // 监听 better-scroll 滚动开始之前
        if (this.beforeScroll) {
          let _this = this;
          this.scroll.on('beforeScrollStart', () => {
            _this.$emit('beforeScroll');
          });
        }
      },
      // 开启滚动
      enable() {
        this.scroll && this.scroll.enable();
      },
      // 关闭滚动
      disable() {
        this.scroll && this.scroll.disable();
      },
      // 当下拉刷新数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载
      finishPullDown() {
         this.scroll && this.scroll.finishPullDown();
      },
      // 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
      refresh() {
        this.scroll && this.scroll.refresh();
      },
      // 滚动到指定的位置
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
      },
      //  滚动到指定的目标元素
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
