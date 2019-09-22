let sd = require('silly-datetime');

/**
 * 工具封装
 */
class Tools {
  // 格式化当前日期
  getCurDate() {
    // 返回格式：20190925
    return sd.format(new Date(), 'YYYMMDD');
  }
}

module.exports = new Tools();