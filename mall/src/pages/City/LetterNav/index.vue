<template>
  <ul class="letter-container">
    <li
      class="letter"
      v-for="(item, index) in letterList"
      :key="item"
      :class="{ 'active-letter': activeIndex === index}"
      @click="handleLetterNav(index)"
    >
    {{ item }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'LetterNav',
  props: {
    letterList: { type: Array, default: () => [] },
    activeIndex: { type: Number, default: -1 }
  },
  data() {
    return {
    };
  },
  methods: {
    /**
     * 处理点击字母事件，向父组件传值
     */
    handleLetterNav(index) {
      if (this.activeIndex === index) return;

      this.$emit('letter-evt', index);
    }
  }
}
</script>

<style lang="scss" scoped>
  $color:#b532e9;

  .letter-container {
    position: fixed;
    top: 20vh;
    bottom: 2vh;
    right: 1vw;
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    border-radius: 20px;
    background: rgba(0, 0, 0, 0.1);
    .letter {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 6vw;
      border-radius: 50%;
      font-size: 14px;
      text-align: center;
    }
    .active-letter { 
      background: $color;
      color: #fff; 
    }
  }
</style>

