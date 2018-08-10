// pages/hotel-note/hotel.js
var util = require('../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    note:{           //酒店指南详细内容
      title:'',
      text: ''
    }
  },
  onLoad: function(){
    var that = this
    util.getGuide().then(function(res){
      that.setData({
        note: {
          title: app.globalData.hotel.name + '酒店指南',
          text: res.data.data.content
        }
      })
    })
  }
})