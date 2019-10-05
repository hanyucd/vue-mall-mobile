<template>
  <div class="address-edit">
    <top-bar title="编辑地址" hasBack></top-bar>
  </div>
</template>

<script>
  import TopBar from '@/components/TopBar';
  import { GoodsMixin } from '@/mixins/goodsMixin';

  export default {
    name: 'AddressEdit',
    mixins: [ GoodsMixin ],
    components: { TopBar },
    data() {
      return {
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>