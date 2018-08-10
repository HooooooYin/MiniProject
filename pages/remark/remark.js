// pages/remark/remark.js
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    kind: '1',
    remark_text:'',
    tabs: [
      {
        text: '少点辣',
        selected: false
      }, 
      {
        text: '不要辣',
        selected: false
      },
      {
        text: '多点辣',
        selected: false
      },
      {
        text: '不要洋葱',
        selected: false
      },
      {
        text: '不要香菜',
        selected: false
      },
      {
        text: '多点葱',
        selected: false
      },
      {
        text: '多点醋',
        selected: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.kind)
    this.setData({
      kind: options.kind
    })
  },
  // 取消备注
  // 参数：无
  // 返回值：无
  back: function () {
    wx.navigateBack()
  },
  // 选择标签
  // 参数： 无
  // 返回值： 无
  selectTab: function (e) {
    let tabs = this.data.tabs;
    tabs[e.currentTarget.dataset.idx].selected = !tabs[e.currentTarget.dataset.idx].selected;
    this.setData({
      tabs: tabs
    })
  },
  // 在textarea输入文本
  // 参数： 
  //  e: 输入的事件
  // 返回值： 无
  inputText: function (e) {
    this.setData({
      remark_text: e.detail.value
    })
  },
  // 提交备注
  // 参数: 无
  // 返回值: 无
  submit: function () {
    let str = '';
    for(let i = 0;i < this.data.tabs.length;i++){
      if(this.data.tabs[i].selected){
        str += (this.data.tabs[i].text + ', ')
      }
    }
    str += this.data.remark_text
    app.globalData.remark = str;
    wx.navigateBack()
  }
})