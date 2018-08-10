// pages/rebbag/rebbag.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
     notices:[]      //通知信息         
  },
  onLoad: function(){
    var that = this
    util.getWelfares().then(function(res){
      that.setData({
        notices: res.data.data
      })
    })
  }

  
})