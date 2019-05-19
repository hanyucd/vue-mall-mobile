<template>
  <div id="floor">
    <floor-title v-if="floorName" :num="num" :floorName="floorName"></floor-title>
    <!-- 楼层 -->
    <div class="floor-wrapper">
      <!-- 顶部 -->
      <section class="floor-top">
        <div class="floor-top-left">
          <img v-lazy="floor[0].image"/>
        </div>
        <div class="floor-top-right">
          <section class="border-btm"><img v-lazy="floor[1].image" /></section>
          <section><img v-lazy="floor[2].image" /></section>
        </div>
      </section>
      <!-- 底部 -->
      <section class="floor-bottom">
        <div v-for="item of floor.slice(3)" :key="item.goodsId">
          <img v-lazy="item.image" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import FloorTitle from './FloorTitle';

  export default {
    name: 'Floor',
    components: {
      FloorTitle
    },
    props: [ 'floorName', 'floor', 'num' ]
  }
</script>

<style lang="scss" scoped>
  #floor {
    .floor-wrapper {
      display: flex;
      flex-direction: column;
      .floor-top {
        display: flex;
        border-bottom: 1px solid #ddd;
        .floor-top-left, .floor-top-right { flex: 1; box-sizing: border-box; }
        .floor-top-left {
          border-right: 1px solid #ddd;
          img { width: 100%; }
        }
        .floor-top-right {
          .border-btm { border-bottom: 1px solid #ddd }
          img { width: 100%; }
        }
      }
      .floor-bottom {
        display: flex;
        :first-child { border-right: 1px solid #ddd; }
        div {
          box-sizing: border-box;
          flex: 1;
          border-bottom: 1px solid #ddd;
          img { width: 100%; }
        }
      }
    }
  }
</style>