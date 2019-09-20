<template>
  <div class="login">
    <article class="form-container">
      <h2 class="title">登录</h2>
      <!-- 用户名 -->
      <section class="input-wrapper">
        <input type="text" class="u-name" maxlength="10" placeholder="用户名" autocomplete="off" />
      </section>
      <!-- 密码 -->
      <section class="input-wrapper">
        <input type="password" class="u-password" maxlength="10" placeholder="密码" autocomplete="off" />
      </section>
      <!-- 登录按钮 -->
      <section class="login-btn">登录</section>
      <!-- 前往注册 -->
      <section class="register-entry">
        <span>注册账号</span>
      </section>
    </article>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>