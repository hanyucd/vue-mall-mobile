const GoodsModel = require('../models/goods');
const CollectionModel = require('../models/collection');
const ShopCartModel = require('../models/shopCart');
const AddressManageModel = require('../models/addressManage');

class uActionService {
  /**
   * 用户收藏、取消行为
   * @param {String} userId 用户 Id
   * @param {String} goodsId 商品 Id
   * @param {Number} collectionFlag 收藏行为标签 1：收藏, 2：取消
   */
  async collectionHandle(userId, goodsId, collectionFlag) {
    try {
      switch (collectionFlag) {
        // 收藏
        case 1:
          const goodsDoc = await GoodsModel.findOne({ id: goodsId });
          if (!goodsDoc) return { code: 404, msg: '收藏失败，无该商品信息' };
          // 向收藏集合中添加一条数据
          const collectionDoc = await CollectionModel.create({
            userId,
            goodsId,
            goods_name: goodsDoc.name,
            image_path: goodsDoc.image_path,
            present_price: goodsDoc.present_price,
            createAt: +new Date()
          });
          return { code: 200, goodsId: collectionDoc.goodsId, msg: '收藏成功' };
        // 取消
        case 0:
          const collection = await CollectionModel.findOne({ userId, goodsId });
          if (!collection) return { code: 404, msg: '取消失败，无该商品信息' };
          // 向收藏集合中删除一条文档
          await CollectionModel.deleteOne({ userId, goodsId });
          return { code: 200, msg: '取消成功' };
      }
    } catch(error) {
      console.log(error);
    }
  }
  
  /**
   * 添加到购物车
   * @param {String} userId 用户 Id
   * @param {String} goodsId 商品 Id
   */
  async addToShopCart(userId, goodsId) {
    try {
      const goodsDoc = await GoodsModel.findOne({ id: goodsId });
      if (!goodsDoc) return { code: 404, msg: '添加失败，无该商品信息' };

      const shopCartDoc = await ShopCartModel.findOne({ userId, goodsId });
      if (shopCartDoc) return { code: 1, msg: '该商品已存在购物车中' };

      // 向购物车集合中添加一条数据
      const cartDoc = await ShopCartModel.create({
        userId,
        goodsId,
        goods_name: goodsDoc.name,
        image_path: goodsDoc.image_path,
        present_price: goodsDoc.present_price,
        mall_price: goodsDoc.present_price,
        checked: false,
        buy_count: 1,
        createAt: +new Date()
      });
      return { code: 200, goodsId: cartDoc.goodsId, msg: '添加成功' };
    } catch(error) {
      console.log(error);
    }
  }

  /**
   * 编辑商品数量
   * @param {String} userId 用户 id
   * @param {String} goodsId 商品 Id
   * @param {Number} buyCount 购买数量
   * @param {Number} mallPrice 总价
   */
  async editGoodsCount(userId, goodsId, buyCount, mallPrice) {
    try {
      await ShopCartModel.findOneAndUpdate({ userId, goodsId }, { $set: { buy_count: buyCount, mall_price: mallPrice } });
      return { goodsId, code: 200, msg: '修改成功' };
    } catch(error) {
      console.log(error);
    }
  }

  /**
   * 删除购物车商品
   * @param {String} userId 用户 id
   * @param {Array} delGoodsIds 需删除商品 ids
   */
  async delCartGoods(userId, delGoodsIds) {
    try {
      await ShopCartModel.deleteMany({ userId, goodsId: delGoodsIds });
      return { code: 200, msg: '删除成功' };
    } catch(error) {
      console.log(error);
    }
  }

  /**
   * 编辑收货地址
   * @param {String} userId 用户 id
   * @param {Object} addressInfo 地址信息
   */
  async editAddress(userId, addressInfo) {
    try {
      if (addressInfo.is_default) {
        // 如果在修改默认地址，首先全改为 false
        await AddressManageModel.updateMany({ userId, is_default: true }, { $set: { is_default: false } });
      }

      if (addressInfo.id) {
        // 更新地址
        await AddressManageModel.updateOne({ userId, _id: addressInfo.id }, addressInfo);
        return { code: 200, msg: '更新地址成功' };
      } else {
        // 加入用户 id 和 创建时间
        const newAddress = Object.assign(addressInfo, {
          userId,
          createAt: +new Date()
        });
        // 新增地址
        const addressDoc = await AddressManageModel.create(newAddress);
        console.log(addressDoc)
        return { code: 200, msg: '添加地址成功', ...addressDoc };
      }
    } catch(error) {
      console.log(error);
    }
  }
}

module.exports = new uActionService();