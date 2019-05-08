const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const GoodsModel = require('../models/goods');
const CategoryModel = require('../models/category');
const CategorySubModel = require('../models/categorySub');

const router = new Router();

/**
 * 批量插入所有的商品数据到数据库
 * http://localhost:3000/goods/insertAllGoodsInfo
 */
router.get('/insertAllGoodsInfo', async (ctx) => {
  fs.readFile(path.resolve(__dirname, '../resource/goods.json'), 'utf8', (error, data) => {
    if (error) return;

    // parse() 用于将一个字符串解析成一个 json 对象
    data = JSON.parse(data);
    let saveCount = 0; // 记录插入数据库条数
    data.map(async (item) => {
      let goods = new GoodsModel(item); // 创建 Entity
      try {
        let value = await goods.save();
        saveCount++;
        console.log(`成功插入：${ value.NAME }, 已插入${ saveCount }条.`);
      } catch (error) {
        console.log('插入失败...');
      }
    });
  });
  ctx.body = '插入数据接口...';
});

/**
 * 插入所有的分类数据
 * http://localhost:3000/goods/insertAllCategory
 */
router.get('/insertAllCategory', async (ctx) => {
  fs.readFile(path.resolve(__dirname, '../resource/category.json'), 'utf8', (error, data) => {
    if (error) return;

    data = JSON.parse(data);
    let saveCount = 0; // 记录插入数据库条数
    data.RECORDS.map(async (item) => {
      let category = new CategoryModel(item); // 创建 Entity
      try {
        let value = await category.save();
        saveCount++;
        console.log(`成功插入：${ value.MALL_CATEGORY_NAME }, 已插入${ saveCount }条.`);
      } catch (error) {
        console.log('插入失败...');
      }
    });
  })
  ctx.body = '插入数据接口...';
});

/**
 * 插入所有的分类的子类的数据
 * http://localhost:3000/goods/insertAllCategorySub
 */
router.get('/insertAllCategorySub', async (ctx) => {
  fs.readFile(path.resolve(__dirname, '../resource/category_sub.json'), 'utf8', (error, data) => {
    if (error) return;

    data = JSON.parse(data);
    let saveCount = 0; // 记录插入数据库条数
    data.RECORDS.map(async (item) => {
      let categorySub = new CategorySubModel(item); // 创建 Entity
      try {
        let value = await categorySub.save();
        saveCount++;
        console.log(`成功插入：${ value.MALL_SUB_NAME }, 已插入${ saveCount }条.`);
      } catch (error) {
        console.log('插入失败...');
      }
    });
  })
  ctx.body = '插入数据接口...';
});

/**
 * 获取商品详细信息的接口
 */
router.post('/goodsDetailInfo', async (ctx) => {
  const goodsId = ctx.request.body.goodsId;

  try {
    let goods = await GoodsModel.findOne({ ID: goodsId });
    (goods)
      ? ctx.body = { code: 200, message: 'success', result: goods }
      : ctx.body = { code: 404, message: '未找到商品信息' };
  } catch(error) {
    ctx.body = { code: 500, message: error }
  }
});

module.exports = router;