<template>
  <div id="login">
    <van-nav-bar title="用户登录" left-text="返回" left-arrow @click-left="goBack" />
    <van-cell-group class="input-wrap">
      <van-field v-model.trim="userName" label="用户名" icon="clear" placeholder="请输入用户名..." :error-message="userNameErrorMsg" @click-icon="userName = ''" required />
      <van-field v-model.trim="passWord" label="密码" placeholder="请输入密码..."  :error-message="passWordErrorMsg" type="password" required />
    </van-cell-group>
    <section class="register-btn">
      <van-button type="primary" size="large" :loading="loading" @click="login">登录</van-button>
    </section>
  </div>
</template>

<script>
  import { loginUser } from '@/api';
  import { Url } from '@/api/url';
  export default {
    name: 'Login',
    data() {
      return {
        userName: '',
        passWord: '',
        userNameErrorMsg: '',
        passWordErrorMsg: '',
        loading: false
      };
    },
    methods: {
      goBack() {
          this.$router.go(-1);
      },
      /**
       * 表单验证
       */
      _checkForm() {
        // 用户名验证
        if (!this.userName) {
          this.userNameErrorMsg = '用户名不能为空';
        } else {
          this.userNameErrorMsg = ''
        }
        // 密码验证
        if (!this.passWord) {
          this.passWordErrorMsg = '密码不能为空';
        } else {
          this.passWordErrorMsg = ''
        }
        return (!this.userNameErrorMsg && !this.passWordErrorMsg);
      },
      /**
       * 用户登录
       */
      async login() {
        if (!this._checkForm()) return; 

        let method = 'post';
        let path = Url.loginApi;
        let params = {
          userName: this.userName,
          passWord: this.passWord
        };

        try {
          this.loading = true; // 开启按钮登录状态
          let res = await loginUser(path, method, params);
          window.localStorage.setItem('userName', res.userName);
          this.$toast.success(res.message);
        } catch (error) {
          if (error.code === 202) {
            console.log(error);
            this.$toast.fail(error.message);
          } else {
            console.log('错误：', error)
          }
        } finally {
          this.loading = false;
        }
      }
    }
  }
</script>

<style scoped>
  #login {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #f0f0f0;
    z-index: 200;
  }
  .input-wrap {
    margin: 2rem 0;
  }
  .register-btn {
    width: 90%;
    margin: 0 auto;
  }
</style>

