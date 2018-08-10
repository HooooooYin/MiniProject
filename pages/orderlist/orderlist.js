// pages/orderlist/orderlist.js
var util = require('../../utils/util.js')

let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopCar: [],
    dinnerCar: [],
    shop_price: 0,
    dinner_price: 0,
    shop_num: 0,
    dinner_num: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let shopCar = [];
    let dinnerCar = [];
    let shop_price = 0, dinner_price = 0;
    let shop_num = 0, dinner_num = 0;
    for(let i = 0;i < app.globalData.shopCar.length;i++){
      if (app.globalData.shopCar[i].kind === 1){
        shop_price += (app.globalData.shopCar[i].goods_number * app.globalData.shopCar[i].goods_price)
        shop_num += app.globalData.shopCar[i].goods_number
        shopCar.push({
          goods_name: app.globalData.shopCar[i].goods_name,
          goods_spec: app.globalData.shopCar[i].goods_spec,
          goods_price: app.globalData.shopCar[i].goods_price,
          id: app.globalData.shopCar[i].id,
          goods_number: app.globalData.shopCar[i].goods_number
        })
      } else {
        dinner_price += (app.globalData.shopCar[i].goods_number * app.globalData.shopCar[i].goods_price)
        dinner_num += app.globalData.shopCar[i].goods_number
        dinnerCar.push({
          goods_name: app.globalData.shopCar[i].goods_name,
          goods_spec: app.globalData.shopCar[i].goods_spec,
          goods_price: app.globalData.shopCar[i].goods_price,
          id: app.globalData.shopCar[i].id,
          goods_number: app.globalData.shopCar[i].goods_number
        })
      }
    }
    this.setData({
      shopCar: shopCar,
      dinnerCar: dinnerCar,
      shop_price: shop_price,
      dinner_price: dinner_price,
      shop_num: shop_num,
      dinner_num: dinner_num
    })
    app.globalData.shop_car = this.data.shopCar;
    app.globalData.dinner_car = this.data.dinnerCar
  },
  pay: function (e) {
    if (e.currentTarget.dataset.idx === '1') {
      util.createOrder(1, this.data.shopCar, this.data.shop_price, null, null).then(function(res){
        wx.navigateTo({
          url: `../pay/pay?id=${res.data.data.id}&&kind=1`
        })
      })
    } else {
      util.createOrder(2, this.data.dinnerCar, this.data.dinner_price, null, null).then(function (res) {
        wx.navigateTo({
          url: `../pay/pay?id=${res.data.data.id}&&kind=2`
        })
      })
    }
  }
})