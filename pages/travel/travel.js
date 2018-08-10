// pages/travel/travel.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    travel: {
      title: '',
      text: ''
    }
  },
  onLoad: function(){
    var that = this
    util.getTourism().then(function(res){
      console.log(res.data)
      that.setData({
        travel:{
          title: '旅游推荐',
          text: res.data.data.content
        }
      })
    })
  }
})