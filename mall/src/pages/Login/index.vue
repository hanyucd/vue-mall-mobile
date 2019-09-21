<template>
  <div class="login">
    <!-- 登录 -->
    <transition name="login-slide">
      <article class="form-container" v-if="switchFlag === 1">
        <h2 class="title">登录</h2>
        <!-- 用户名 -->
        <section class="input-wrapper" :class="[ focusIndex === 1 ? 'focus-a' : '' ]">
          <input type="text" class="u-name" @focus="handleFocus(1)" @blur="handleBlur" maxlength="10" placeholder="用户名" autocomplete="off" />
        </section>
        <!-- 密码 -->
        <section class="input-wrapper" :class="[ focusIndex === 2 ? 'focus-a' : '' ]">
          <input type="password" class="u-password" @focus="handleFocus(2)" @blur="handleBlur" maxlength="10" placeholder="密码" autocomplete="off" />
        </section>
        <!-- 登录按钮 -->
        <section class="login-btn">登录</section>
        <!-- 前往注册 -->
        <section class="register-entry">
          <span @click="switchForm(2)">注册账号</span>
        </section>
      </article>
    </transition>

    <!-- 注册 -->
    <transition name="reg-slide">
      <article class="form-container" v-if="switchFlag === 2">
        <h2 class="title">注册</h2>
        <!-- 用户名 -->
        <section class="input-wrapper" :class="[ focusIndex === 1 ? 'focus-a' : '' ]">
          <input type="text" class="u-name" @focus="handleFocus(1)" @blur="handleBlur" maxlength="10" placeholder="用户名" autocomplete="off" />
        </section>
        <!-- 密码 -->
        <section class="input-wrapper" :class="[ focusIndex === 2 ? 'focus-a' : '' ]">
          <input type="password" class="u-password" @focus="handleFocus(2)" @blur="handleBlur" maxlength="10" placeholder="密码" autocomplete="off" />
        </section>
        <!-- 注册按钮 -->
        <section class="login-btn">注册</section>
        <!-- 前往登录 -->
        <section class="login-entry">
          <span @click="switchForm(1)">登录账号</span>
        </section>
      </article>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        switchFlag: 1, // 登录: 1, 注册: 2
        focusIndex: 0, // 输入框聚焦索引
      }
    },
    methods: {
      /**
       * 处理输入框聚焦
       */
      handleFocus(index) { this.focusIndex = index; },
      /**
       * 处理输入框失焦
       */
      handleBlur() { this.focusIndex = 0; },
      /**
       * 切换表单
       */
      switchForm(flag) {
        this.switchFlag = flag;
        this.focusIndex = 0; // 重置表单索引
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>