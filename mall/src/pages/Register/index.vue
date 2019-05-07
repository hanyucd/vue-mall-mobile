<template>
  <div>
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack" />
    <van-cell-group class="input-wrap">
      <van-field v-model.trim="userName" label="用户名" icon="clear" placeholder="请输入用户名..." required @click-icon="userName = ''" />
      <van-field v-model.trim="passWord" label="密码" placeholder="请输入密码..." required  type="password" />
      <van-field v-model.trim="passWordAgain" label="密码" placeholder="请在次输入密码..." required  type="password" />
    </van-cell-group>
    <section class="register-btn">
      <van-button type="primary" size="large" :loading="loading" @click="register">立即注册</van-button>
    </section>
  </div>
</template>

<script>
  import { registerUser } from '@/api';
  import { Url } from '@/api/url';
  
  export default {
    name: 'Register',
    data() {
      return {
        userName: '',
        passWord: '',
        passWordAgain: '',
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
        if (!this.userName || !this.passWord) {
          this.$toast.fail('用户名或密码不能为空');
          return false;
        } else if (this.userName.length < 5) {
          this.$toast.fail('用户名不能少于5位');
          return false;
        } else if (this.passWord.length < 6) {
          this.$toast.fail('密码不能少于6位');
          return false;
        } else if (this.passWord !== this.passWordAgain) {
          this.$toast.fail('两次密码输入不一致');
          return false;
        }
        return true;
      },
      /**
       * 用户注册
       */
      async register() {
        if (!this._checkForm()) return; 

        let method = 'post';
        let path = Url.registerApi;
        let params = {
          userName: this.userName,
          passWord: this.passWord
        };
        try {
          this.loading = true; // 开启按钮注册状态
          let resData = await registerUser(path, method, params);
          this.$toast.success(resData.message);
        } catch (error) {
          this.$toast.fail('注册失败');
        } finally {
          this.loading = false;
        }
      }
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