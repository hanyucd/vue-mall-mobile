<template>
  <div class="floor">
    <!--标题-->
    <section class="floor-title">{{ floorTitle }}</section>
    <!-- 楼层 -->
    <section class="floor" v-if="floorData.length">
      <div class="floor-anomaly">
        <div class="floor-one"><img :src="floorData[0].image" width="100%" /></div>
        <div>
          <section class="floor-two"><img :src="floorData[1].image" width="100%" /></section>
          <section><img :src="floorData[2].image" width="100%" /></section>
        </div>
      </div>
      <div class="floor-rule">
        <section v-for="(item, index) in floorData.slice(3)" :key="index">
          <img :src="item.image" width="100%" height="100%" />
        </section>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Floor',
  props: {
    floorData: {
      type: Array,
      default: () => []
    },
    floorTitle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
  .floor-title {
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem;
  }
  .floor-anomaly {
    display: flex;
    background: #fff;
    border-bottom: 1px solid #ddd;
  }
  .floor-anomaly div {
    flex: 1;
    box-sizing: border-box;
  }
  .floor-one {
    border-right: 1px solid #ddd;
  }
  .floor-two {
    border-bottom: 1px solid #ddd;
  }
  .floor-rule {
    display: flex;
    flex-wrap: wrap;
  }
  .floor-rule section {
    box-sizing: border-box;
    flex: 1;
    border-bottom: 1px solid #ddd;
  }
  .floor-rule section:nth-child(odd) {
    border-right: 1px solid #ddd;
  }
</style>
