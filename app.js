//app.js
App({
  globalData: {
    shopCar: [],                  //购物车信息
    shop_car: [],
    dinner_car: [],
    total: 0,                     //总价
    note: 0,                    //购物车商品数量
    hotel: null,                      //酒店以及房间信息
    user: {
      token: null,
      openid: null
    },
    base: 'https://happystay.niowoo.cn',
    remark: '',
    socket: false
  },
  // 该函数用于计算购物车上的商品的总价
  // 把全局变量shopCar数组每一项的price * num，保存在全局变量total中
  // 参数： 无
  // 返回值： 无
  sumMoney: function () {
    let sum = 0;
    for (let i = 0; i < this.globalData.shopCar.length; i++) {
      sum = sum + this.globalData.shopCar[i].goods_price * this.globalData.shopCar[i].goods_number;
    }
    this.globalData.total = sum
  },
  userLogin: function (hotel_id, room_id) {
    var that = this;
    return new Promise(function(resolve, rejuct){
      // 登录
      wx.login({
        success: res => {
          console.log(res.code)
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            url: that.globalData.base + '/api/font/login',
            data: {
              room_id: room_id,
              code: res.code,
              hotel_id: hotel_id
            },
            method: 'post',
            success: function (res) {
              if (res.data.status && res.data.status.errCode === 0) {
                that.globalData.user = res.data.data
              }
              resolve(res);
            }
          })
        }
      })
    })
  }
})