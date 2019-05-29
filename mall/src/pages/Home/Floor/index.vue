<template>
  <div id="floor">
    <floor-title v-if="floorName" :num="num" :floorName="floorName"></floor-title>
    <!-- 楼层 -->
    <div class="floor-wrapper">
      <!-- 顶部 -->
      <section class="floor-top">
        <div class="floor-top-left" @click="goGoodsDetails(floor[0])">
          <img v-lazy="floor[0].image"/>
        </div>
        <div class="floor-top-right">
          <section class="border-btm" @click="goGoodsDetails(floor[1])"><img v-lazy="floor[1].image" /></section>
          <section @click="goGoodsDetails(floor[2])"><img v-lazy="floor[2].image" /></section>
        </div>
      </section>
      <!-- 底部 -->
      <section class="floor-bottom">
        <div v-for="item of floor.slice(3)" :key="item.goodsId" @click="goGoodsDetails(item)">
          <img v-lazy="item.image" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import FloorTitle from './FloorTitle';
  import { GoodsMixin } from '@/mixins/goodsMixin';

  export default {
    name: 'Floor',
    mixins: [ GoodsMixin ],
    components: { FloorTitle },
    props: [ 'floorName', 'floor', 'num' ]
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>