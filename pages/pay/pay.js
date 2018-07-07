// pages/pay/pay.js
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],        //购物车商品信息
    total: 0,            //总价 
    openId: '',              //用户的openid
    hotel: null           //酒店信息
  },

  /**
   * 生命周期函数--监听页面加载
   * 先调用wx.login()登录获得code，再请求openid用于之后的支付
   */
  onLoad: function (options) {
    wx.login({
      success:  function(res){
        this.getOpenId(res.code);
      }
    })
    this.setData({
      total: app.globalData.total,
      goods: app.globalData.shopCar,
      hotel: app.globalData.hotel
    })

  },
  // 向后台获取openId,用于付款，此处this指向本页面
  // 参数:
  //  code:wx.login返回的标识
  // 返回值：无
  getOpenId: function(code){　　　　　　　
    wx.request({
      url: '',        //后台url
      method: 'GET',
      success: function(res){
        this.setData({
          openId: res.data.openId
        })
      }
    })
  },
  // 生成订单，请求服务器生成订单，此处this指向本页面 
  // 参数：无
  // 返回值：无
  generalOrder: function(){
    wx.request({
      url: '',      //后台url
      method: 'GET',
      data: {
        goods: this.data.goods,
        openId: this.data.openId
      },
      success: function(res){
        let pay = res.data;
        let timeStamp = pay[0].timeStamp;
        let packages = pay[0].package;
        let nonceStr = pay[0].nonceStr;
        let paySign = pay[0].paySign;
        let param = {
          "timeStamp": timeStamp,
          "package": packages,
          "nonceStr": nonceStr,
          "signType": 'MD5',
          "paySign": paySign
        };
        this.payMoney(param);
      }
    })
  },
  // 付款函数，通过调用wx.requestPayment实现付款功能
  // 参数：
  //  param：用于调用接口的参数：timeStamp:时间戳，nonceStr:随机字符串，
  //          package：统一下单接口返回的 prepay_id 参数值，signType:签名算法,payType:支付方式
  // 返回值：无
  payMoney: function(param){
    wx.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.package,
      signType: param.signType,
      paySign: param.paySign,
      success: function(res){
        wx.navigateTo({
          utl: '../index/index',
          success: function(res){
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  }


})