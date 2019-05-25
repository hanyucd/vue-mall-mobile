import { get, post } from '@/utils/http';
import { Url } from './url';

class Ajax {
  // 获取首页数据 | GET
  getHomeData() {
    return get(Url.homeDataApi);
  }

  // 获取商品详情 | GET
  getGoodsDetails(goodsId) {
    return get(Url.goodsDetailsApi, { goodsId });
  }
}

export default new Ajax();