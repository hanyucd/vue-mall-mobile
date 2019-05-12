<template>
  <div>
    {{ userName }}
  </div>
</template>

<script>
  export default {
    name: 'User',
    data() {
      return {
        userName: ''
      };
    },
    created() {
      let userName = localStorage['userName'];
      if (userName) {
        this.userName = userName;
      } else {
        console.log(userName)
        this.userName = '未登录'
      }
    }
  }
</script>

<style scoped>

</style>