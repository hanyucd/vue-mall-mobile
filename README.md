# vue-mall-mobile
> 一个基于 vue.js + koa.js + mongodb + vant 的移动端电商网站

注：**该项目后面会持续完善、优化**。

## 技术栈 

前端：脚手架工具 vue-cli@3.0

后端：脚手架工具 koa-generator **狼叔-桑世龙**写的；（狼叔说：少抱怨，多思考，未来更美好）

**vue + vue-router + axios + koa + mongodb + mongoose + vant**

### 移动端 Web 页面适配方案

主要使用 **flex + rem** 方案布局，rem 是相对于根元素，rem 定义是根元素的 font-size, 以 rem 为单位，  
其数值与 px 的关系，需相对于根元素 <html> 的 font-size 计算。比如，设置根元素 font-size = 16px, 则表示 1rem = 16px。
<br /><br />
根据这个特点，可以根据设备宽度 **动态设置** 根元素的 font-size，使得以 rem 为单位的元素在不同终端上以相对一致的视觉效果呈现。  
<br />
选取一个设备宽度作为基准，设置其根元素大小，其他设备根据此比例计算其根元素大小。比如使得 iPhone6 根元素 font-size = 16px。

```js
 (function (doc, win) {
  var docEl = win.document.documentElement;
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  /**
    * ================================================
    *  设置根元素 font-size
    * 当设备宽度为 375(iPhone6)时，根元素 font-size = 16px; 
    * ================================================
    */
  var refreshRem = function () {
    var clientWidth = win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;

    if (!clientWidth) return;
    var fontSize;
    var width = clientWidth;
    fontSize = 16 * width / 375;
    docEl.style.fontSize = fontSize + 'px';
    docEl.style.maxWidth = 768 + 'px';
    docEl.style.margin = '0 auto';
  };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, refreshRem, false);
  doc.addEventListener('DOMContentLoaded', refreshRem, false);
  refreshRem();

})(document, window);

```

### Axios 请求拦截器 和 响应拦截器
主要截取，请求 或 响应在被 then 或者 catch 处理之前，做些什么。我们可以把每一次请求想象成一条管道里的流过的水，  
当一个请求发出的时候，会先流过 interceptors 的 request 部分，  
接着 request 会发出，当接受到响应时，会先流过 interceptors 的 response 部分，最后 response。

> **interceptors.request -> request -> interceptors.response -> response**

```js
// 添加请求拦截器
axios.interceptors.request.use(function (config){
  //在发送请求之前做某事
  return config;
}，function(error) {
  //请求错误时做些事
  return Promise.reject(error);
});
 
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  //对响应数据做些事
  return response;
}，function (error) {
  //请求错误时做些事
  return Promise.reject（error）;
});
```
### Token and JWT
使用基于 Token 的身份验证方法，在服务端不需要存储用户的登录记录。大概的流程是这样的：

- 客户端使用用户名 跟 密码请求登录
- 服务端收到请求，去验证用户名和密码（后台根据请求去数据库查找是否有该用户）
- 验证成功后，服务端会签发一个token（该token值一般都会存入 Redis 数据库中，并设置过期时间），再把这个 token 发送给客户端
- 客户端收到 token 之后，一般存储在 localStorage 或 Cookie 中
- 客户端每次向服务端请求资源的时候需要带着服务端签发的 token （一般前台需要将该 token 设置在请求头上，以确保之后的每一次请求都是带着该 “令牌“ 的）
- 服务端收到请求，然后去验证客户端请求里面带着的 token（token是否为该用户的令牌以及token是否有效等），如果验证成功，就向客户端返回请求的数据

JSON Web Token（JWT）是一个非常轻巧的规范。这个规范允许我们使用JWT在用户和服务器之间传递安全可靠的信息。  
<br />
一个 JWT 实际上就是一个字符串，它由三部分组成，头部（Header）、Payload（载荷）与 signature（签名）。

### NodeJS JWT（json web token） 认证

node 生态圈封装了一个对 jwt 操作的库（jsonwebtoken）：

```js
1. 安装
$ npm install jsonwebtoken --save

2. 导入
const jwt = require('jsonwebtoken');
const secret = 'xxx'; //撒盐：加密的时候混淆

3.创建 Token
 const token = jwt.sign({ name: '123' }, secret, { expiresIn:  60 }); // 60 秒到期时间

4. 解密 token
jwt.verify(token, secret, function (err, decoded) {
  if (err){
    // To Do
  } else {
    // TO Do
  }
})
```

### 此项目用户认证流程

使用 JSON Web Token（JWT）规范做前后端 token 传递，使之用于用户认证；node 使用 jsonwebtoken 库创建 & 校验 token，
前端使用 localStorage 存储后端传递过来的 token 信息；当请求后端 API 时，使用 axios 请求拦截器将存储的 token 添加到 
HTTP 头信息 Authorization 字段里，若后端判断 token 失效 或 错误则返回 401 状态码，最后 axios 响应拦截器做响应处理并删除前端 localStorage 中 token。