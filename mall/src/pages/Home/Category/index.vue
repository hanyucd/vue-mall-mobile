<template>
 <!-- 分类列表 -->
  <div id="category">
    <ul v-show="category && category.length">
      <li v-for="item of category" :key="item.mallCategoryId">
        <img v-lazy="item.image"  alt=""/>
        <p>{{ item.mallCategoryName }}</p>
      </li>
    </ul>
    <section class="ad">
      <img v-lazy="advertesPicture" alt="" />
    </section>
  </div>
</template>

<script>
  export default {
    name: 'Category',
    props: {
      category: {
        type: Array,
        default: () => []
      },
      advertesPicture: { type: String, default: '' }
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>