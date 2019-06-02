
export const loadMixin = {
  data() {
    return {
      dataList: [], // 数据列表
      dataTotal: 0, // 数据总数
      isLoading: false, // 定义是否加载（锁）
    };
  },
  methods: {
    /**
     * 添加更多数据
     * @param {Array} newDataList 新数据列表
     */
    addMoreData(newDataList) {
      this.dataList = [...this.dataList, ...newDataList];
    },
    /**
     * 判断是否还有更多数据
     */
    hasMoreData() {
      if (this.dataList.length !== this.dataTotal) return true;

      return false;
    },
    /**
     * 设置数据总数
     */
    setDataTotal(dataTotal) { this.dataTotal = dataTotal },
    /**
     * 判断是否正在加载（是否上锁）
     */
    isLocked() { return this.isLoading ? true : false; },
    /**
     * 上锁
     */
    locked() { this.isLoading = true; },
    /**
     * 解锁
     */
    unLocked() { this.isLoading = false; }
  }
};