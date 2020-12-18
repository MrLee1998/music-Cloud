
import request from '../../utils/request'

Page({
  data: {
    bannnersArr: [],
    recommendList: [],  // 推荐歌单
    topList: []
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  async getData() {
    let result = await request('/banner', {type: 2});
    this.setData({
      bannnersArr: result.data.banners
    })
    // console.log(this.data.bannnersArr);
  },
  async getRecommend() {
    let result = await request('/personalized', {limit: 12});
    this.setData({
      recommendList: result.data.result
    })
    // console.log(this.data.recommendList);
  },
  async getTopList() {
      // i++ ++i 区别 看到运算符先运算  看到值 就先赋值
    let result = await request('/toplist/detail');
    this.setData({
      topList: result.data.list
    })
    console.log(this.data.topList);
  },
  onLoad:  function (options) {
    this.getData()
    this.getRecommend()
    this.getTopList()
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
