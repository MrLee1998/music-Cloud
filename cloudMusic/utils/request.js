// 发送ajax请求
import config from '../utils/config'
export default (url, data = {}, method = 'GET') => {
  return new Promise ((resolve, reject) => {
    // 初始化Promise实例状态
    wx.request({
      url: config.host + url,
      data,
      method,
      success: (res) => {
        // console.log(res);
        resolve(res) 
      },
      fail: (err) => {
        console.log(err);
        reject(err)
      }
    })
  })
}