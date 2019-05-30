<template>
 <!-- 分类列表 -->
  <div id="category">
    <ul v-show="category && category.length">
      <li v-for="(item, index) in category" :key="item.mallCategoryId">
        <img v-lazy="item.image" alt="" @click="clickCategory(item, index)" />
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
      category: { type: Array, default: () => [] },
      advertesPicture: { type: String, default: '' }
    },
    methods: {
      clickCategory(item, index) {
        // 默认取大分类的第一个子分类 id
        let categorySubId = item.bxMallSubDto[0].mallSubId;
        this.$router.push({
          name: 'Category',
          params: { categorySubId, index, item }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>