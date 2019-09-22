<template>
  <div class="login">
    <!-- 登录 -->
    <transition name="login-slide">
      <article class="form-container" v-if="switchFlag === 1">
        <h2 class="title">登录</h2>
        <!-- 用户名 -->
        <section class="input-wrapper" :class="[ focusIndex === 1 ? 'focus-a' : '' ]">
          <input type="text" class="u-name" @focus="handleFocus(1)" @blur="handleBlur" v-model="userName" maxlength="10" placeholder="用户名" autocomplete="off" />
        </section>
        <!-- 密码 -->
        <section class="input-wrapper" :class="[ focusIndex === 2 ? 'focus-a' : '' ]">
          <input type="password" class="u-password" @focus="handleFocus(2)" @blur="handleBlur" v-model="password" maxlength="10" placeholder="密码" autocomplete="off" />
        </section>
        <!-- 图形验证码 -->
        <section class="input-wrapper" :class="[ focusIndex === 3 ? 'focus-a' : '' ]">
          <input type="text" class="verify-code" @focus="handleFocus(3)" @blur="handleBlur" v-model="verifyCode" maxlength="4" placeholder="验证码" autocomplete="off" />
        </section>
        <!-- 登录按钮 -->
        <section class="login-btn" @click="login">登录</section>
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
          <input type="text" class="u-name" @focus="handleFocus(1)" @blur="handleBlur" v-model="userName" maxlength="10" placeholder="用户名" autocomplete="off" />
        </section>
        <!-- 密码 -->
        <section class="input-wrapper" :class="[ focusIndex === 2 ? 'focus-a' : '' ]">
          <input type="password" class="u-password" @focus="handleFocus(2)" @blur="handleBlur" v-model="password" maxlength="10" placeholder="密码" autocomplete="off" />
        </section>
        <!-- 手机号 -->
        <section class="input-wrapper" :class="[ focusIndex === 3 ? 'focus-a' : '' ]">
          <input type="text" class="mobile-phone" @focus="handleFocus(3)" @blur="handleBlur" v-model="mobilePhone" maxlength="11" placeholder="手机号" autocomplete="off" />
        </section>
        <!-- 短信验证码 -->
        <section class="input-wrapper" :class="[ focusIndex === 4 ? 'focus-a' : '' ]">
          <input type="text" class="sms" @focus="handleFocus(4)" @blur="handleBlur" v-model="smsCode" maxlength="6" placeholder="短信验证码" autocomplete="off" />
          <span class="send-sms" @click="sendSMSCode">发送验证码</span>
        </section>
        <!-- 注册按钮 -->
        <section class="login-btn" @click="register">注册</section>
        <!-- 前往登录 -->
        <section class="login-entry">
          <span @click="switchForm(1)">登录账号</span>
        </section>
      </article>
    </transition>

    <!-- 后退 -->
    <back @backEvt="back" />
  </div>
</template>

<script>
  import Back from '@/components/Back';
  import { GoodsMixin } from '@/mixins/goodsMixin';
  import ajax from '@/api';

  export default {
    name: "Login",
    mixins: [ GoodsMixin ],
    components: { Back },
    data() {
      return {
        switchFlag: 1, // 登录: 1, 注册: 2
        focusIndex: 0, // 输入框聚焦索引
        userName: '', // 用户名
        password: '', // 密码
        verifyCode: '', // 图形验证码
        mobilePhone: '', // 手机号
        smsCode: '', // 短信验证码
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
       * 切换表单 & 做一些重置操作
       * @param {Number} flag 表单标识 1：登录 2：注册
       */
      switchForm(flag) {
        this.switchFlag = flag;
        this.focusIndex = 0; // 重置表单索引
        this.userName = '';
        this.password = '';
        this.verifyCode = '';
        this.mobilePhone = '';
        this.smsCode = '';
      },
      /**
       * 表单验证
       * @param {Number} flag 表单标识 1：登录 2：注册
       * @return {Boolean} 验证失败或成功
       */
      _checkForm(flag) {
        let toast = (text) => {
          this.$toast(text);
          return false;
        };
        
        if (!this.userName) return toast('请输入用户名');
        if (!this.password) return toast('请输入密码');

        switch (flag) {
          case 1:
            if (!this.verifyCode) return toast('请输入验证码');
            break;
          case 2:
            if (this.mobilePhone.length != 11) return toast('请输入正确的手机号码');
            if (!this.smsCode) return toast('请输入短信验证码');
            break;
        }

        return true;
      },
      /**
       * 注册
       */
      async register() {
        if (!this._checkForm(2)) return;
 
        let userName = this.userName;
        let password = this.password;
        
        try {
          let res = await ajax.register(userName,  password);
          console.log(res)
        } catch (error) {
          console.log(error);
        }
      },
      /**
       * 登录
       */
      async login() {
        if (!this._checkForm(1)) return;
        
        let userName = this.userName;
        let password = this.password;

        try {
          let res = await ajax.login(userName,  password);
          console.log(res)
        } catch (error) {
          console.log(error);
        }
      },
      /**
       * 发送短信验证码
       */
      async sendSMSCode() {
        // 手机号码错误
        // if (this.mobilePhone.length != 11 || !/^[1][3,4,5,7,8][0-9]{9}$/.test(this.mobilePhone)) return this.$toast('请输入正确的手机号码');
        
        try {
          let res = await ajax.sendSMSCode(this.mobilePhone);
          console.log(res)
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>