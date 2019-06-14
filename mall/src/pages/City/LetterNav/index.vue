<template>
  <ul class="letter-container">
    <li
      class="letter"
      v-for="item of letterList"
      :key="item"
    >
    {{ item }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'LetterNav',
  props: {
    letterList: { type: Array, default: () => [] }
  },
  data() {
    return {};
  }
}
</script>

<style lang="scss" scoped>
  .letter-container {
    position: fixed;
    top: 15vh;
    bottom: 0;
    right: 0;
    width: 6vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .letter {
      flex: 1;
      text-align: center;
      line-height: 1;
    }
  }
</style>

