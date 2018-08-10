//index.js
//获取应用实例
const app = getApp()
//获得请求方法
var util = require('../../utils/util.js');
Page({
  data: {
    slider: [],                       //用于保存轮播图的数组
    hotel:null,                      //酒店信息
    isShowAd: false,                  //是否显示广告，false为显示
    serviceType: "0",                 //当前选择的服务项
    tabs: [],
    clean_select: -1,                                     //选择房间打扫的索引
    hot_sell: [],                                          //热销商品的数组
    notices: []                                         //通知的数组
  },
  // 生命周期函数，在加载组件的时候请求轮播图的数据，并且获得酒店信息，此处this指向本页面
  // 参数： 无
  // 返回值： 无
  onLoad:function(options){ 
    var that = this;
    let user = wx.getStorageSync('user')
    app.globalData.user = user
    // 建立socket连接
    if (!app.globalData.socket && app.globalData.user.token) {
      util.getSocket(app.globalData.user.token).then(function (data) {
        that.updateOrder(data, that)
      })
    }
    // 获得酒店信息
    util.getHotel(user.token).then(function(){
      that.setData({
        hotel: app.globalData.hotel
      })
    })
    that.getOrders(user.token)
    // 获取商品信息
    util.getRecomand(user.token).then(function (res) {
      that.setData({
        hot_sell: res.data.data
      })
    })
    util.getSlider(function(data){
      that.setData({
        slider: data.data.slider,
      })
    })
  },
  onShow: function () {
    if(app.globalData.user.token){
      this.getOrders(app.globalData.user.token)      
    }
  },
  onUnload: function () {
    
  },
  // 更新订单状态
  // 参数： 
  //  data, 最新的订单状态
  // 返回值： 无
  updateOrder: function (data, that) {
    let arr = that.data.notices, note = true
    console.log('notices', that.data.notices)
    console.log(data)
    if (data.service_info) {
      data.service_info = data.service_info.toString()
    }
    for(let i = 0;i < arr.length;i++){
      if(parseInt(data.id) === arr[i].id){
        console.log('更新订单', data.id)
        arr[i] = data
        note = false
      }
    }
    if(note) arr = [data, ...arr]
    that.setData({
      notices: arr
    })
  },
  // 关闭广告，点击之后通过设置data里面的isShowAd来关闭广告的显示，此处this指向本页面
  // 参数：无
  // 返回值： 无
  closeAd: function(){
    this.setData({
      isShowAd: true
    })
  },
  // 选择服务项，通过点击事件触发，把触发事件的组件中的dataset中的idx赋值给data中的serviceType来实现,此处this指向本页面
  // 参数： 
  //  e,点击事件，通过访问触发事件的currentTarget属性中的dataset赋值
  // 返回值： 无
  switchItem: function(e){
    var that = this
    var getFn = null
    switch(e.currentTarget.dataset.idx){
      case '1': getFn = util.getComplains;
        break;
      case '3': getFn = util.getRent;
        break;
      case '4': getFn = util.getClean;
        break;
      default:
        break;
    }
    if(getFn){
      getFn().then(function(res){
        that.setData({
          tabs: res.data.data,
          serviceType: e.currentTarget.dataset.idx
        })
      })
    }
    else{
      that.setData({
        serviceType: e.currentTarget.dataset.idx
      })
    }
  },
  // 选择投诉的标签，通过点击事件触发，把被选中的标签对应complain_tabs数组的selected属性取反，此处this指向本页面
  // 参数：
  //  e，点击事件，通过访问触发事件的currentTarget属性中的dataset的idx作为数组的索引
  // 返回值： 无
  selectComplain: function(e){
    var that = this;
    var tabs = that.data.tabs;
    tabs[e.currentTarget.dataset.idx].selected = !tabs[e.currentTarget.dataset.idx].selected;
    that.setData({
      tabs: tabs
    });
  },
  // 监听用户在投诉问题描述处的输入事件，把输入的文本保存在data的complain_text中
  // 参数：
  //  e,输入事件，用于访问e.detail
  // 返回值： 无
  inputText: function (e) {
    this.setData({
      complain_text: e.detail.value
    })
  },
  // 把投诉标签的文本内容整合到str数组里面并作为新的通知插入到主页下方的通知选项，并
  // 获取textarea里面用户输入的文本与标签一同传到服务器，此处this指向本页面
  // 参数： 无
  // 返回值： 无
  submitComplains: function(){
    let arr = [];
    let tabs = this.data.tabs;
    var that = this;
    for(let i = 0;i < this.data.tabs.length;i++){
      if(this.data.tabs[i].selected == true){
        arr.push(this.data.tabs[i].complaint_name)
        tabs[i].selected = false;
      }
    }
    if(arr.length === 0) return;
    util.createOrder(3, null, null, arr, this.data.complain_text).then(function(res){
      let new_notice = res.data.data
      console.log(new_notice)
      new_notice.service_info = new_notice.service_info.toString()
      let new_notices = [new_notice, ...that.data.notices];
      that.setData({
        notices: new_notices,
        tabs: tabs
      });
    });
  },
  // 选择物品的标签，通过点击事件触发，把被选中的标签对应rent_tabs数组的selected属性取反，此处this指向本页面
  // 参数：
  //  e，点击事件，通过访问触发事件的currentTarget属性中的dataset的idx作为数组的索引
  // 返回值： 无
  selectRent: function(e){
    var that = this;
    var tabs = that.data.tabs;
    tabs[e.currentTarget.dataset.idx].selected = !tabs[e.currentTarget.dataset.idx].selected;
    that.setData({
      tabs: tabs
    });
  },
  // 把物品标签的文本内容整合到str数组里面并作为新的通知插入到主页下方的通知选项，此处this指向本页面
  // 参数： 无
  // 返回值： 无
  submitRent: function(){
    let arr = [];
    var that = this
    let tabs = this.data.tabs;
    for (let i = 0; i < this.data.tabs.length; i++) {
      if (this.data.tabs[i].selected == true) {
        arr.push(this.data.tabs[i].sundrie_name)
        tabs[i].selected = false;
      }
    }
    if (arr.length === 0) return;
    
    util.createOrder(0, null, null, arr, null).then(function(res){
      let new_notice = res.data.data
      new_notice.service_info = new_notice.service_info.toString()
      let new_notices = [new_notice, ...that.data.notices];
      that.setData({
        notices: new_notices,
        tabs: tabs
      });
    });
  },
  // 选择清理时间，通过访问e.currentTarget.dataset.idx来给data的clean_selected赋值，此处this指向本页面
  // 参数：
  //  e,点击事件，用于访问e.currentTarget.data.idx
  // 返回值： 无
  selectClean: function(e){
    this.setData({
      clean_selected: e.currentTarget.dataset.idx
    })
  },
  // 把清理时间发送到服务器，并在通知出插入清理通知，此处this指向本页面
  // 参数： 无
  // 返回值： 无
  cleanRoom: function(){
    var that = this
    if (this.data.clean_selected === -1) return;    
    util.createOrder(0, null, null, that.data.tabs[this.data.clean_selected].clean_name, null).then(function(res){
      let new_notice = res.data.data;
      new_notice.service_info = new_notice.service_info.toString()
      let new_notices = [new_notice, ...that.data.notices];
      that.setData({
        clean_selected: -1,
        notices: new_notices
      });
    });
  },
  // 呼叫总台，通过调用wx.makePhoneCall来呼叫总台，此处this指向本页面
  // 参数： 无
  // 返回值： 无
  phoneCall: function(){
    wx.makePhoneCall({
      phoneNumber: this.data.hotel.phone,
    })
  },
  // 连接wifi，依次调用wx.startWifi()和wx.connectWifi()实现，此处this指向本页面
  // 参数： 无
  // 返回值： 无
  connectWifi: function(){
    let that = this;
    wx.getSystemInfo({})
    wx.startWifi();
    wx.connectWifi({
      SSID: that.data.hotel.wifi.ssid,
      password: that.data.hotel.wifi.password,
      success: function(res){
        wx.showToast({
          title: 'WiFi连接成功',
          icon: 'success'
        })
      },
      fail: function (res) {
        wx.showModal({
          title: '失败',
          content: '是否复制密码到剪贴板？',
          showCancel: true,
          success: function(res){
              if(res.confirm){
                wx.setClipboardData({
                  data: that.data.hotel.wifi.password,
                })
              }
          }
        })
      }
    })
  },
  // 跳转函数，点击热卖跳转到对应的商品页面
  // 参数： 
  //  e,点击事件，用于获得组件的dataset
  // 返回值： 无
  jumpTo: function (e) {
    wx.navigateTo({
      url: `../good/good?id=${e.currentTarget.dataset.id}`
    })
  },
  // 获得订单列表，轮询获得后台订单
  // 参数：
  //  token, 用户鉴权的token
  // 返回值： 无
  getOrders: function (token) {
    let that = this;
    let arr = [];
    for(let i = 0;i < 3;i++){
      util.getOrders(token, i + 1).then(function(res){
        for(let j = 0;j < res.data.data.length;j++){
          if(res.data.data[j].order_type !== 4){
            if (res.data.data[j].service_info) {
              res.data.data[j].service_info = res.data.data[j].service_info.toString()
            }
          }
        }
        if(res.data.data.length !== 0){
          arr = [...res.data.data, ...arr]        
        }
        that.setData({
          notices: arr
        })
      })
    }   
           
  },
  // 跳转到支付页面
  // 参数：
  //  e, 点击事件，根据事件获得dataset的id跳转到对应的订单页面
  // 返回值： 无
  toPay: function (e) {
    wx.navigateTo({
      url: `../pay/pay?id=${e.currentTarget.dataset.id}`
    })
  },
  // 跳转到发票详情页面
  // 参数：
  //  e, 点击事件，根据事件获得dataset的id跳转到对应发票页面
  // 返回值： 无
  toReceipt: function (e) {
    wx.navigateTo({
      url: `../receipt/receipt?id=${e.currentTarget.dataset.id}`
    })
  }
})
