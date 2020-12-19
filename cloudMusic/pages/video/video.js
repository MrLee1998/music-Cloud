// pages/video/video.js
import requset from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList: [],
    navId: '',
    videoList: []
  },
  async getVideoGroupList(){
    let res = await requset('/video/group/list')
    console.log(res.data);
    let videoData = res.data.data.splice(0,14);
    this.setData({
      videoGroupList: videoData,
      navId: videoData[0].id
    })
    this.getVideoList(this.data.navId)
  },
  async getVideoList(navId) {
    if(navId) {
      let video = await requset('/video/group', {id: navId})
      console.log(video);
      console.log(video);
      this.setData({
        videoList: video
      })
    } else {
      return;
    }
    
  },
  changeNav(event) {
    let res = event.currentTarget.id
    console.log(event.currentTarget);
    this.setData({
      navId: res>>>0,
      videoList: []
    })
    this.getVideoList(this.data.navId)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideoGroupList()
  
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