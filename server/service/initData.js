const path = require('path');
const fs = require('fs');
const GoodsModel = require('../models/goods');
const RecommendModel = require('../models/recommend');

class InitDataService {
  async index() {
    const goodsResult = await GoodsModel.find({}); // 查询 goods 集合所以文档
    const recommendResult = await RecommendModel.find({}); // 查询 recommend 集合所以文档

    if (!goodsResult.length && !recommendResult.length) {
      let goodsFlag; // 用于导入 goods 数据成功 或 失败标识
      let recommendFlag; // 用于导入 recommend 数据成功 或 失败标识
      let goodsCount = 0; // goods 数据计数
      let recommendCount = 0; // recommend 数据计数
      
      let tasks_1 = new Promise((resolve, reject) => {
        // 导入商品数据 到 数据库
        fs.readFile(path.resolve(__dirname, '../resource/goods2.json'), 'utf8', async (err, data) => {
          if (!err) {
            data = JSON.parse(data); // parse() 用于将一个字符串解析成一个 json 对象
            for (let item of data) {
              let goodsEntity = new GoodsModel(item);
              try {
                await goodsEntity.save();
                goodsCount++;
                goodsFlag = true;
                console.log(`Goods 数据成功导入第: ${ goodsCount } 条`);
              } catch (error) {
                goodsFlag = false;
                reject(error);
                console.log('Goods 数据导入失败...');
              }
            }
            resolve();
          } else {
            reject(err);
          }
        });
      });

      let tasks_2 = new Promise((resolve, reject) => {
        // 导入推荐数据 到 数据库
        fs.readFile(path.resolve(__dirname, '../resource/goods.json'), 'utf8', async (err, data) => {
          if (!err) {
            data = JSON.parse(data); // parse() 用于将一个字符串解析成一个 json 对象
            for (let item of data) {
              let RecommendEntity = new RecommendModel(item);
              try {
                await RecommendEntity.save();
                recommendCount++;
                recommendFlag = true;
                console.log(`Recommend 数据成功导入第: ${ recommendCount } 条`);
              } catch(error) {
                recommendFlag = false;
                reject(error);
                console.log('Recommend 数据导入失败...');
              }
            }
            resolve();
          } else {
            reject(err);
          }
        });
      });

      try {
        await Promise.all([tasks_1, tasks_2]);
        if (goodsFlag && recommendFlag) {
          return {
            GoodsMsg: `Goods 数据成功导入 ${ goodsCount } 条`,
            RecommendMsg: `Recommend 数据成功导入 ${ recommendCount } 条` 
          };
        }
      } catch (error) {
        console.log("错误:\n", error);
        if (!goodsFlag && !recommendFlag) {
          return { GoodsMsg: `Goods 数据导入失败...`, RecommendMsg: `Recommend 数据导入失败...` };
        } else {
          if (!goodsFlag) return { msg: 'Goods 数据导入失败...' };
          if (!recommendFlag) return { msg: 'recommend 数据导入失败...' };
        }
      }
    } else {
      return {
        GoodsMsg: `数据库中已存在 Goods 数据 ${ goodsResult.length } 条, 无需再次导入`, 
        RecommendMsg: `数据库中已存在 Recommend 数据 ${ recommendResult.length } 条, 无需再次导入`
      };
    }
  }
}

module.exports = new InitDataService();