//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo


              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,            //用户信息
    shopCar: [],                  //购物车信息
    total: 0,                     //总价
    note: 0,                    //购物车商品数量
    hotel: {                      //酒店以及房间信息
      name: "测试酒店",
      room: "123"
    }
  },
  // 该函数用于计算购物车上的商品的总价
  // 把全局变量shopCar数组每一项的price * num，保存在全局变量total中
  // 参数： 无
  // 返回值： 无
  sumMoney: function () {
    let sum = 0;
    for (let i = 0; i < this.globalData.shopCar.length; i++) {
      sum = sum + this.globalData.shopCar[i].price * this.globalData.shopCar[i].num;
    }
    this.globalData.total = sum
  }
})