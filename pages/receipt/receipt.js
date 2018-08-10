// pages/receipt/receipt.js
let util = require('../../utils/util.js')

let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    receipt: {},
    room: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    util.getReceipt(app.globalData.user.token, options.id).then(function(res){
      that.setData({
        receipt: res.data.data,
        room: app.globalData.hotel.room.room_number
      })
      console.log(that.data.receipt)
    })
  },
})