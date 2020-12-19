// 发送ajax请求
import config from '../utils/config'
export default (url, data = {}, method = 'GET') => {
  return new Promise ((resolve, reject) => {
    // 初始化Promise实例状态
    wx.request({
      url: config.host + url,
      data,
      method,
      header: {
        cookie: wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U') !== -1):''
      },
      success: (res) => {
        // console.log(res);
        if(data.isLogin){// 登录请求
          // 将用户的cookie存入至本地
          wx.setStorage({
            key: 'cookies',
            data: res.cookies
          })
        }
        resolve(res) 
      },
      fail: (err) => {
        console.log(err);
        reject(err)
      }
    })
  })
}