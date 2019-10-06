<template>
  <transition name="bounce">
    <div class="setting-info" v-show="isShowSetting">
      <top-bar title="个人资料" hasClose @close="$emit('closeSetting', $event)"></top-bar>

      <section class="options">
        <p class="title">GitHub</p>
        <a class="github" :href="gitHub">
          https://github.com/hanyucd/vue-mall-mobile
        </a>
      </section>
      <!-- 用户名 -->
      <section class="options">
        <p class="title">用户名</p>
        <input type="text" class="u-name" v-model="userName" maxlength="10" placeholder="用户名" autocomplete="off" />
      </section>
      <!-- 邮箱 -->
      <section class="options">
        <p class="title">邮箱</p>
        <input type="text" class="u-email" v-model="email" maxlength="40" placeholder="邮箱" autocomplete="off" />
      </section>
      <!-- 性别 -->
      <section class="options">
        <p class="title">性别</p>
        <p class="u-gender" @click="isShowGender = true">{{ gender }}</p>
      </section>
      <!-- 日期 -->
      <section class="options">
        <p class="title">生日</p>
        <p class="u-birth" @click="isShowBirth = true">{{ birth }}</p>
      </section>

      <section class="btn-container">
        <div class="common save-btn" @click="saveNewUserInfo">保存</div>
        <div class="common close-btn" @click="$emit('closeSetting', false)">取消</div>
      </section>

      <!-- 性别选择器 -->
      <van-popup v-model="isShowGender" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="isShowGender = false"
          @confirm="isShowGender = false"
          @change="onGenderChange"
        />
      </van-popup>
      <!-- 日期选择器 -->
      <van-popup v-model="isShowBirth" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="confirmBirth"
          @cancel="isShowBirth = false"
        />
      </van-popup>
    </div>
  </transition>
</template>

<script>
  import TopBar from '@/components/TopBar';
  import { GoodsMixin } from '@/mixins/goodsMixin';
  import ajax from '@/api';

  export default {
    name: "UserInfo",
    mixins: [ GoodsMixin ],
    components: { TopBar },
    props: {
      isShowSetting: { type: Boolean, default: false } // 是否显示设置界面
    },
    data() {
      return {
        userName: '', // 用户名
        gitHub: 'https://github.com/hanyucd/vue-mall-mobile', // github
        gender: 'X', // 性别
        email: '', // 邮箱
        year: '', // 年
        month: '', // 月
        day: '', // 日
        isShowGender: false, // 是否显示性别选择器
        columns: [ "男", "女", "保密" ],
        isShowBirth: false, // 是否显示日期选择器
        minDate: new Date(1937, 12, 31),
        maxDate: new Date(),
        birth: 'X 年 X 月 X 日', // 生日
        currentDate: new Date(),
      };
    },
    watch: {
      isShowSetting(newValue) {
        newValue && this._getUserInfo();
      },
    },
    methods: {
      /**
       * 重置用户信息
       */
      _resetUserInfo() {
        this.userName = '';
        this.email = '';
        this.year = '';
        this.month = '';
        this.day = '';
        this.gender = 'X';
        this.birth = 'X 年 X 月 X 日';
      },
      /**
       * 获取用户信息
       */
      async _getUserInfo() {
        try {
          let res = await ajax.getUserInfo();
          if (res.code === 200) {
            this.userName = res.userInfo.userName;
            this.gender = res.userInfo.gender;
            this.email = res.userInfo.email;
            this.year = res.userInfo.year;
            this.month = res.userInfo.month;
            this.day = res.userInfo.day;
            this.birth = `${ this.year } 年 ${ this.month } 月 ${ this.day } 日` 
          }
        } catch(error) {
          if (error.response && error.response.status === 401 || 400 || 403) {
            this._resetUserInfo();
            this.$toast(error.response.data.msg); // 反馈信息
          } else {
            console.log(error);
          }
        }
      },
      /**
       * 修改性别
       */
      onGenderChange(picker, value) { this.gender = value },
      /**
       * 修改生日
       */
      confirmBirth(value) {
        const birth = new Date(value);
        this.year = birth.getFullYear();
        this.month = birth.getMonth() + 1;
        this.day = birth.getDate();
        this.birth = `${ this.year } 年 ${ this.month } 月 ${ this.day } 日` 
        this.isShowBirth = false;
      },
      /**
       * 更新个人信息
       */
      async saveNewUserInfo() {
        if (!this.userName) return this.$toast('用户名不能为空');

        try {
          let newUserInfo = {
            userName: this.userName,
            email: this.email,
            gender: this.gender,
            year: this.year,
            month: this.month,
            day: this.day,
          };
          const res = await ajax.updateUserInfo(newUserInfo);
          if (res.code === 200) {
            // 设置 token | 方法在 GoodsMixin
            (res.token) && this.setUserToken(res.token) && setTimeout(() => this.$emit('closeSetting', false), 1000);
          }
          this.$toast(res.msg);
        } catch(error) {
          if (error.response && error.response.status === 401 || 400 || 403) {
            this._resetUserInfo();
            this.$toast(error.response.data.msg); // 反馈信息
          } else {
            console.log(error);
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>

<style lang="scss">
  $color: #b532e9;

  // 强行改变 vant 中默认样式
  .setting-info {
    .van-picker__cancel, .van-picker__confirm {
      color: $color;
    }
  }
</style>