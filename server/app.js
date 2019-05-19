const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('koa2-cors'); // 解决跨域的中间件 koa2-cors
// 导入数据库连接文件
const { connect } = require('./utils/connect'); 
// 导入业务逻辑文件
const initDataService = require('./service/initData');
// 导入路由文件
const goods = require('./routes/goods');
const user = require('./routes/user');

const app = new Koa();
const router = new Router();

// error handler
onerror(app);
app.use(cors());
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
// 主要执行初始化数据任务逻辑 | 访问 localhost:3000 执行数据导入任务
app.use(async (ctx, next) => {
  const url = ctx.request.url;
  if (url == '/') {
    let res = await initDataService.index();
    ctx.body = res;
  }
  await next();
});

// 装载所有子路由
router.use('/api/goods', goods.routes());
// router.use('/user', user.routes());
// 加载路由中间件
app.use(router.routes())
   .use(router.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

// 立即执行函数
(async () => {
  await connect(); // 执行连接数据库函数
})();

module.exports = app;
