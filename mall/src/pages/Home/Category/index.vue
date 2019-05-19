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
  #category {
    background: #EEEEEE;
    padding: 15px 0;
    ul {
      display: flex;
      flex-wrap: wrap;
      width: 95%;
      margin: 0 auto;
      padding: 15px 0px 7px 0px;
      box-sizing: border-box;
      background: #fff;
      border-radius: 10px;
      box-shadow: 3px 4px 20px rgba(45, 45, 45, .15);
      li {
        width: calc((1 / 5) * 100%);
        text-align: center;
        img {
          width: 70%;
          margin-bottom: 10px;
        }
        p {
          font-size: 14px;
        }
      }
    }
    .ad {
      width: 100%;
      margin-top: 10px;
      img {
        width: 100%;
      }
    }
  }
</style>