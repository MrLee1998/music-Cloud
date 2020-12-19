// pages/personal/personal.js
import request from "../../utils/request";
let startY = 0;
let moveY = 0;
let moveDistance = 0;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    coverTransform: 'translateY(0)',
    coveTransition: '',
    userInfo: {},
    userInfoRecentPlayList: []
  },
  handleTouchStart(event) {
    this.setData({
      coveTransition: ''
    })
    startY = event.changedTouches[0].clientY
  },
  handleTouchMove(event) {
    moveY = event.changedTouches[0].clientY
    moveDistance = moveY - startY;
    if(moveDistance <= 0){
      return;
    }
    if(moveDistance >= 80){
      moveDistance = 80;
    }
    // 动态更新coverTransform的状态值
    this.setData({
      coverTransform: `translateY(${moveDistance}rpx)`
    })
  },
  handleTouchEnd() {
    this.setData({
      coverTransform: `translateY(0rpx)`,
      coveTransition: 'transform 1s linear'
    })
  },
  toLogin() {
    // 跳转到登录界面
    if(!this.data.userInfo) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
  },
  async getUserInfoRecentPlayList(userId) {
    let userInfoRecentPlayList = await request('/user/record', {uid:userId, type: 0})
    console.log(userInfoRecentPlayList.data);
    let index = 0;
    let recentPlayList = Array.from(userInfoRecentPlayList.data.allData).map(item => {
      item.id = index++;
      return item;
    })
    this.setData({
      userInfoRecentPlayList: recentPlayList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userinfo')
    if(userInfo) {
      this.setData({
        userInfo: JSON.parse(userInfo)
      })
    }
    this.getUserInfoRecentPlayList(this.data.userInfo.userId)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})