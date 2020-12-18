// pages/login/login.js
/*
  登录流程
  1 . 收集表单项数据
  2 . 前端验证
    验证账号密码是否合法
    不通过界面提示 成功 返回数据到后端
 */
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: ''
  },
  handleInput(event) {
    // let type = event.currentTarget.id   // 通过id选择表单项 原生js的使用
    let type = event.currentTarget.dataset.type  // data-type = value
    this.setData({
      [type]: event.detail.value
    })
  },
  async login() {
    let { phone, password } = this.data  // 解构
    if (!phone) {
      wx.showToast({
        title: '手机号不能为空!',
        icon: 'none'
      })
      return;
    }
    // 正则判断
    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if (!phoneReg.test(phone)) {
      wx.showToast({
        title: '手机号不存在',
        icon: 'none'
      })
      return;
    }
    if (!password) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
      return;
    }
    // 后端验证
    let result = await request('/login/cellphone', {phone, password})
    console.log(result.data.code);
    if (result.data.code === 200) {
      wx.showToast({
        title: '登录成功',
      })
      // 成功后取个人中心
      wx.switchTab({
        url: '/pages/personal/personal',
      })
    } else if (result.data.code === 400) {
      wx.showToast({
        title: '手机号错误',
        icon: 'none'
      }) 
    } else if (result.data.code === 502) {
      wx.showToast({
        title: '密码错误',
        icon: 'none'
      }) 
    } else {
        wx.showToast({
          title: '登陆失败， 请重新登陆',
          icon: 'none'
        })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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