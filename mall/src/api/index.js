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

  // 获取分类商品数据 | GET
  getGoodsList(categorySubId) {
    return get(Url.goodsListApi, { categorySubId });
  }

  // 搜索 | POST
  search(keyword, page = 1) {
    return post(Url.searchApi, { keyword, page });
  }

  // 注册 | POST
  register(userName = '', password = '') {
    return post(Url.registerApi, { userName, password });
  }
}

export default new Ajax();