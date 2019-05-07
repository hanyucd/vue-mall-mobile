<template>
  <div>
    <van-nav-bar title="用户登录" left-text="返回" left-arrow @click-left="goBack" />
    <van-cell-group class="input-wrap">
      <van-field v-model.trim="userName" label="用户名" icon="clear" placeholder="请输入用户名..." required @click-icon="userName = ''" />
      <van-field v-model.trim="passWord" label="密码" placeholder="请输入密码..." required type="password" />
    </van-cell-group>
    <section class="register-btn">
      <van-button type="primary" size="large" :loading="loading" @click="login">登录</van-button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      userName: '',
      passWord: '',
      loading: false
    };
  },
  methods: {
    goBack() {
        this.$router.go(-1);
    },
    login() {}
  }
}
</script>

<style scoped>
  .input-wrap {
    margin: 2rem 0;
  }
  .register-btn {
    width: 90%;
    margin: 0 auto;
  }
</style>

