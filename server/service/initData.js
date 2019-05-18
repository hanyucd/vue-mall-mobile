const path = require('path');
const fs = require('fs');
const GoodsModel = require('../models/goods');

class InitData {
  async index() {
    const result = await GoodsModel.find({}); // 查询所有集合文档

    if (!result.length) {
      fs.readFile(path.resolve(__dirname, '../resource/goods2.json'), 'utf8', async (err, data) => {
        data = JSON.parse(data); // parse() 用于将一个字符串解析成一个 json 对象
        let saveCount = 0; // 数据计数
        let flag; // 定义导入数据成功 或 失败 标识
        for (let item of data) {
          let goodsEntity = new GoodsModel(item);
          try {
            await goodsEntity.save();
            saveCount++;
            flag = true;
            console.log(`Goods 数据成功导入第: ${ saveCount } 条`);
          } catch (error) {
            flag = false;
            console.log('Goods 数据导入失败...');
          }
        }
        if (flag) {
          return { msg: `Goods 数据成功导入 ${ saveCount } 条` };
        } else {
          return { msg: 'Goods 数据导入失败...' };
        }
      });
    } else {
      return { msg: `数据库中已存在 Goods 数据 ${ result.length } 条` };
    }
  }
}

module.exports = new InitData();