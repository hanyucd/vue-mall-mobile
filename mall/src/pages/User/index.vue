<template>
  <div>
    <van-nav-bar title="会员中心" :left-arrow="false"/>
    <header class="avator">
      <img src="http://img4.imgtn.bdimg.com/it/u=198369807,133263955&fm=27&gp=0.jpg" />
      <p class="status-text" v-if="!userName">{{ '未登录' }}</p>
      <p class="status-text" v-else>{{ '已登录' }}</p>

      <div class="btn" v-if="!userName">
        <p @click="goLogin">登录</p>
        <p @click="goRegister">注册</p>
      </div>
      <div class="userName" v-else>{{ userName }}</div>
    </header>
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
      }
    },
    methods: {
      goLogin() {
        this.$router.push({ name: 'Login' })
      },
      goRegister() {
        this.$router.push({ name: 'Register' });
      },
    }
  }
</script>

<style scoped>
  .avator {
    width: 100%;
    background: #ce7fee;
    padding: 10% 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
  }
  .avator img{
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  .status-text {
    font-size: 1.2rem;
  }
  .btn {
    width: 80%;
    display: flex;
    justify-content: space-around;
  }
  .btn p {
    color: #fff;
    font-size: 1.2rem;
  }
  .userName {
    color: #fff;
    font-size: 1.2rem;
  }
</style>