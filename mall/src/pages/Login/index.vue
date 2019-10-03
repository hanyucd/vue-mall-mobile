<template>
  <div class="login">
    <!-- 登录 -->
    <transition name="login-slide">
      <article class="form-container" v-if="switchFlag === 1">
        <h2 class="title">登录</h2>
        <!-- 手机号码 -->
        <section class="input-wrapper" :class="[ focusIndex === 1 ? 'focus-a' : '' ]">
          <input type="text" class="mobile-phone" @focus="handleFocus(1)" @blur="handleBlur" v-model="mobilePhone" maxlength="11" placeholder="手机号码" autocomplete="off" />
        </section>
        <!-- 密码 -->
        <section class="input-wrapper" :class="[ focusIndex === 2 ? 'focus-a' : '' ]">
          <input type="password" class="u-password" @focus="handleFocus(2)" @blur="handleBlur" v-model="password" maxlength="10" placeholder="密码" autocomplete="off" />
        </section>
        <!-- 图形验证码 -->
        <section class="input-wrapper" :class="[ focusIndex === 3 ? 'focus-a' : '' ]">
          <input type="text" class="verify-code" @focus="handleFocus(3)" @blur="handleBlur" v-model="verifyCode" maxlength="4" placeholder="验证码" autocomplete="off" />
          <div @click="_updatePicCode">
            <img ref="picCode" class="pic-code" src="" title="看不清？点击刷新" />
          </div>
        </section>
        <!-- 登录按钮 -->
        <van-button v-if="!isLoading" size="large" color="#b532e9" @click="login" text="登录" />
        <van-button v-else size="large" loading loading-type="spinner" loading-text="正在登录 ..." color="#b532e9" />
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
          <input type="text" class="mobile-phone" @focus="handleFocus(3)" @blur="handleBlur" v-model="mobilePhone" maxlength="11" placeholder="手机号码" autocomplete="off" />
        </section>
        <!-- 短信验证码 -->
        <section class="input-wrapper" :class="[ focusIndex === 4 ? 'focus-a' : '' ]">
          <input type="text" class="sms" @focus="handleFocus(4)" @blur="handleBlur" v-model="smsCode" maxlength="6" placeholder="短信验证码" autocomplete="off" />
          <span class="send-sms" v-if="!countdownText" @click="sendSMSCode">发送验证码</span>
          <span class="send-sms" v-else>{{ countdownText }}s后再试</span>
        </section>
        <!-- 注册按钮 -->
        <van-button v-if="!isLoading" size="large" color="#b532e9" @click="register" text="注册" />
        <van-button v-else size="large" loading loading-type="spinner" loading-text="正在注册 ..." color="#b532e9" />
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
        mobilePhone: '', // 手机号
        verifyCode: '', // 图形验证码
        smsCode: '', // 短信验证码
        isLoading: false, // 登录 或 注册按钮状态
        countdownText: '', // 倒计时文本
        cDTime: 60 // 60 秒倒计时
      }
    },
    created() {
      this.$nextTick(() => this._updatePicCode());
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
        (this.switchFlag === 1) && this.$nextTick(() => this._updatePicCode());
        this.focusIndex = 0; // 重置表单索引
        this.isLoading = false; // 重置登录 或 注册按钮状态
        let resetData = [ 'userName', 'password', 'verifyCode', 'mobilePhone', 'smsCode' ];
        for (let item of resetData) {
          this[item] = ''
        }
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

        switch (flag) {
          case 1:
            if (this.mobilePhone.length != 11 || !/^[1][3,4,5,7,8][0-9]{9}$/.test(this.mobilePhone)) return toast('请输入正确的手机号码');
            if (!this.password) return toast('请输入密码');
            if (!this.verifyCode) return toast('请输入验证码');
            break;
          case 2:
            if (!this.userName) return toast('请输入用户名');
            if (!this.password) return toast('请输入密码');
            if (this.mobilePhone.length != 11 || !/^[1][3,4,5,7,8][0-9]{9}$/.test(this.mobilePhone)) return toast('请输入正确的手机号码');
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

        this.isLoading = true; // 按钮加载状态
        let { userName, password, mobilePhone, smsCode } = this.$data;
        try {
          let res = await ajax.register(userName,  password, mobilePhone, smsCode);
          console.log(res)
          // 反馈消息
         if (res.code !== 200) {
            this.$toast(res.msg);
            this.isLoading = false; // 重置按钮状态
          }
          // 设置 token | 方法在 GoodsMixin
          (res.token) && this.setUserToken(res.token) && setTimeout(() => this.$router.back(), 1000);
        } catch (error) {
          this.isLoading = false;
          console.log(error);
        }
      },
      /**
       * 登录
       */
      async login() {
        if (!this._checkForm(1)) return;
        
        this.isLoading = true; // 按钮加载状态
        let { mobilePhone, password, verifyCode } = this.$data;
        try {
          let res = await ajax.login(mobilePhone,  password, verifyCode);
          console.log(res)
          // 反馈消息
          if (res.code !== 200) {
            this.$toast(res.msg);
            this.isLoading = false; // 重置按钮状态
          }

          // 设置 token | 方法在 GoodsMixin
          (res.token) && this.setUserToken(res.token) && setTimeout(() => this.$router.back(), 1000);
        } catch (error) {
          this.isLoading = false;
          console.log(error);
        }
      },
      /**
       * 发送短信验证码
       */
      async sendSMSCode() {
        // 手机号码错误
        if (this.mobilePhone.length != 11 || !/^[1][3,4,5,7,8][0-9]{9}$/.test(this.mobilePhone)) return this.$toast('请输入正确的手机号码');
        
        try {
          let res = await ajax.sendSMSCode(this.mobilePhone);
          console.log(res)

          if (res.code === 200) {
            // 免费短信服务次数用完，就以弹框方式发送
            window.alert(`短信验证码: ${ res.smsCode }`);
            
            this.cDTime = 60; // 首先恢复为 60 s
            let timer = setInterval(() => {
              if (this.cDTime <= 0) {
                this.countdownText = '';
                clearInterval(timer); // 清除定时器
                return;
              }
              this.countdownText = this.cDTime--;
            }, 1000);
          } else if (res.code === 4010) {
            let timer = setInterval(() => {
              if (res.time <= 0) {
                this.countdownText = '';
                clearInterval(timer); // 清除定时器
                this.cDTime = 60;
                return;
              }
              this.countdownText = res.time--;
            }, 1000);
          }
          // 反馈消息
          this.$toast(res.msg);
        } catch (error) {
          console.log(error);
        }
      },
      /**
       * 更新图形验证码
       */
      _updatePicCode() { this.$refs.picCode['src'] = ajax.sendPicCode(); }
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>