// pages/scanning/scanning.js
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  // 点击扫码获得二维码参数，并跳转
  // 参数： 无
  // 返回值： 无
  scanning: function () {
    let params, that = this
    wx.scanCode({
      success: function (res) {
        params = that.getParams(res.result)
        wx.showLoading({
          title: '登录中',
        })
        app.userLogin(params.hotel_id, params.room_id).then(function(res){
          wx.setStorageSync('user', res.data.data)
          wx.redirectTo({
            url: `../index/index?hotel_id=${params.hotel_id}&room_id=${params.room_id}`
          })
        })
      }
    })
  },
  // 把扫码得出而字符串分割并转化为参数
  // 参数：
  //  str, 要分割的字符串
  // 返回值:
  //  params, 分割后合成的参数对象
  getParams: function (str) {
    let strs, params = {}
    strs = str.split('&')
    for(let i = 0;i < strs.length;i++){
      let temp = strs[i].split('=')
      let key = temp[0]
      let value = temp[1]
      params[key] = value
    }
    return params
  }
})