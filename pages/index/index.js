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
    complain_tabs:[                   //投诉标签
      {
        text: '洗漱用品档次低',
        selected: false
      },
      {
        text: '服务态度差',
        selected: false
      },
      {
        text: '隔音不好',
        selected: false
      },
      {
        text: '早餐难吃',
        selected: false
      },
      {
        text: '房间异味',
        selected: false
      },
      {
        text: '酒店偏僻',
        selected: false
      },
      {
        text: '客房脏乱',
        selected: false
      },
      {
        text: '其它问题',
        selected: false
      },
      {
        text: '入住太慢',
        selected: false
      },
      {
        text: '性价比不高',
        selected: false
      },
      {
        text: '评分',
        selected: false
      },
    ],
    complain_text: '',
    rent_tabs: [                //物品租借的标签
      {
        text: '借吹风机',
        selected: false
      },
      {
        text: '借苹果充电器',
        selected: false
      },
      {
        text: '借安卓充电器',
        selected: false
      },
      {
        text: '借指甲钳',
        selected: false
      },
      {
        text: '加枕头',
        selected: false
      },
      {
        text: '加被子',
        selected: false
      },
      {
        text: '加毛毯',
        selected: false
      },
      {
        text: '借水果刀',
        selected: false
      },
      {
        text: '借充电宝',
        selected: false
      },
      {
        text: '借雨伞',
        selected: false
      },
    ],
    clean_tabs: ['9:00', '12:00', '14:00', '立即打扫'],       //房间打扫标签
    clean_select: -1,                                     //选择房间打扫的索引
    hot_sell: [                                          //热销商品的数组
      {
        pic: '../../images/noodle.png',
        name: '方便面',
        price: '0.01'
      },
      {
        pic: '../../images/cola.png',
        name: '可口可乐',
        price: '5.00'
      },
      {
        pic: '../../images/rebbull.png',
        name: '红牛',
        price: '8.00'
      },
      {
        pic: '../../images/water.png',
        name: '矿泉水',
        price: '2.00'
      }
    ],
    notices: [                                         //通知的数组
      {
        title: '早餐',
        text: '酒店早餐在三楼，供应时间为早7:00至9:30',
        status: 0
      },
      {
        title: '康乐服务',
        text: '沐足收费1、70分钟-78元 2、60分钟-68元',
        status: 0
      },
      {
        title: '酒店KTV欢迎光临',
        text: '酒店8楼有KTV，小包168、中包268、豪包368、住店客人享折扣',
        status: 0
      },
      {
        title: '健身房',
        text: '酒店三楼有健身房，设置设备齐全',
        status: 0
      }
    ],
    phone: '15521279811',                                 //总台电话
    wifi:{                                                 //wifi信息
      ssid: '鸟窝信息5.8G',
      password: 'zhihuiniaowo'
    }
  },
  // 生命周期函数，在加载组件的时候请求轮播图的数据，并且获得酒店信息，此处this指向本页面
  // 参数： 无
  // 返回值： 无
  onLoad:function(){ 
    var that = this;
    util.getSlider(function(data){
      that.setData({
        slider: data.data.slider,
        hotel: app.globalData.hotel
      })
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
    this.setData({
      serviceType: e.currentTarget.dataset.idx
    })
  },
  // 选择投诉的标签，通过点击事件触发，把被选中的标签对应complain_tabs数组的selected属性取反，此处this指向本页面
  // 参数：
  //  e，点击事件，通过访问触发事件的currentTarget属性中的dataset的idx作为数组的索引
  // 返回值： 无
  selectComplain: function(e){
    var that = this;
    var complain_tabs = that.data.complain_tabs;
    complain_tabs[e.currentTarget.dataset.idx].selected = !complain_tabs[e.currentTarget.dataset.idx].selected;
    that.setData({
      complain_tabs: complain_tabs
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
    let str = '';
    let complain_tabs = this.data.complain_tabs;
    for(let i = 0;i < this.data.complain_tabs.length;i++){
      if(this.data.complain_tabs[i].selected == true){
        str = str + this.data.complain_tabs[i].text + ' ';
        complain_tabs[i].selected = false;
      }
    }
    if(str == '') return;
    let new_notice = {
      title: '吐槽',
      text: str,
      status: 1
    }
    let new_notices = [new_notice, ...this.data.notices];
    this.setData({
      notices: new_notices,
      complain_tabs: complain_tabs
    })
  },
  // 选择物品的标签，通过点击事件触发，把被选中的标签对应rent_tabs数组的selected属性取反，此处this指向本页面
  // 参数：
  //  e，点击事件，通过访问触发事件的currentTarget属性中的dataset的idx作为数组的索引
  // 返回值： 无
  selectRent: function(e){
    var that = this;
    var rent_tabs = that.data.rent_tabs;
    rent_tabs[e.currentTarget.dataset.idx].selected = !rent_tabs[e.currentTarget.dataset.idx].selected;
    that.setData({
      rent_tabs: rent_tabs
    });
  },
  // 把物品标签的文本内容整合到str数组里面并作为新的通知插入到主页下方的通知选项，此处this指向本页面
  // 参数： 无
  // 返回值： 无
  submitRent: function(){
    let str = '';
    let rent_tabs = this.data.rent_tabs;
    for (let i = 0; i < this.data.rent_tabs.length; i++) {
      if (this.data.rent_tabs[i].selected == true) {
        str = str + this.data.rent_tabs[i].text + ' ';
        rent_tabs[i].selected = false;
      }
    }
    if (str == '') return;
    let new_notice = {
      title: '客房服务',
      text: str,
      status: 1
    }
    let new_notices = [new_notice, ...this.data.notices];
    this.setData({
      notices: new_notices,
      rent_tabs: rent_tabs
    })
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
    let new_notice = {
      title: '客房服务',
      text: this.data.clean_tabs[this.data.clean_selected],
      status: 1
    }
    if (this.data.clean_selected == -1) return;
    let new_notices = [new_notice, ...this.data.notices];
    this.setData({
      clean_selected: -1,
      notices: new_notices
    })
  },
  // 呼叫总台，通过调用wx.makePhoneCall来呼叫总台，此处this指向本页面
  // 参数： 无
  // 返回值： 无
  phoneCall: function(){
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
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
      SSID: that.data.wifi.ssid,
      password: that.data.wifi.password,
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
                  data: that.data.wifi.password,
                })
              }
          }
        })
      }
    })
  }
})
