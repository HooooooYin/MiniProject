// pages/pay/pay.js
let util = require('../../utils/util.js')

let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],        //购物车商品信息
    total: 0,            //总价 
    openId: '',              //用户的openid
    hotel: null,           //酒店信息
    mode: 1,                //1为便利店，2为送餐
    person_num: ['请选择', 1, 2, 3, 4, 5, 6],   //用餐人数选项
    num: 0,               //选择的用餐人数
    isShowModal: true,        //选择是否弹出模态框
    remark: '',
    id: null
  },

  /**
   * 生命周期函数--监听页面加载
   * 先调用wx.login()登录获得code，再请求openid用于之后的支付
   */
  onLoad: function (options) {
    var that = this;
    util.getOrder(app.globalData.user.token, options.id).then(function(res){
      that.setData({
        goods: res.data.data.goods_info,
        id: options.id,
        total: res.data.data.order_price
      })
    })
    that.setData({
      hotel: app.globalData.hotel,
      mode: parseInt(options.kind)
    })
  },
  onShow: function () {
    this.setData({
      remark: app.globalData.remark
    })
  },
  // 显示模态框，此处的this指向本页面
  // 参数： 无
  // 返回值： 无
  showModal: function () {
    this.setData({
      isShowModal: false
    })
  },
  // 点击取消关闭模态框，此处this指向本页面
  // 参数：无
  // 返回值：无
  closeModal: function () {
    this.setData({
      type: 0,
      isShowModal: true
    })
  },
  // 点击提交选择的用餐人数，此处的this指向本页面
  // 参数： 无
  // 返回值： 无
  submitType: function () {
    this.setData({
      isShowModal: true
    })
  },
  // 把picker-view选择的内容保存到num中
  // 参数:
  //  e,数据更新事件
  // 返回值： 无
  changeType: function (e) {
    this.setData({
      num: e.detail.value[0]
    })
  },
  // 跳转备注页面
  // 参数：无
  // 返回值： 无
  remark: function(){
    var that = this
    wx.navigateTo({
      url: `../remark/remark?kind=${that.data.mode}`,
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
  payMoney: function(){
    util.getPay(app.globalData.user.token, this.data.id, this.data.remark);
  }
})