import { get, post } from '@/utils/http';
import { Url } from './url';

class Ajax {
  // 获取首页数据 | GET
  fetchHomeData() {
    return get(Url.homeDataApi);
  }
}

export default new Ajax();