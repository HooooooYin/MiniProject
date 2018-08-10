// pages/bill/bill.js
let util = require('../../utils/util.js')

let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:['增值税普通发票', '增值税专用发票'],         //发票种类数组
    isShowModal: true,                               //选择是否弹出模态框
    receipt_type: 0,                                 //选择的发票种类
    receipt_price: '',                              //输入的发票金额
    receipt_number: '',                             //输入的税号
    receipt_remark: '',                             //输入的备注
    receipt_title: ''                              //输入的发票抬头
  },
  // 显示模态框，此处的this指向本页面
  // 参数： 无
  // 返回值： 无
  showModal: function(){
    this.setData({
      isShowModal: false
    })
  },
  // 点击取消关闭模态框，此处this指向本页面
  // 参数：无
  // 返回值：无
  closeModal:function(){
    this.setData({
      type:0,
      isShowModal: true
    })
  },
  // 点击提交选择的发票内容，此处的this指向本页面
  // 参数： 无
  // 返回值： 无
  submitType:function(){
    this.setData({
      isShowModal:true
    })
  },
  // 改变发票类型,把picker-view选择的内容保存到type中
  // 参数:
  //  e,数据更新事件
  // 返回值： 无
  changeType:function(e){
    this.setData({
      type: e.detail.value[0]
    })
  },
  // 检测并输入发票金额
  // 参数：
  //  e, 输入事件，利用detail属性获得value
  // 返回值：无
  inputReceiptPrice: function (e) {
    const numStr = /^[1-9](\d*(.\d*)?)?$/;
    if (!numStr.test(e.detail.value)) {
      this.setData({
        receipt_price: ''
      })
    } else {
      this.setData({
        receipt_price: e.detail.value
      })
    }
  },
  // 输入发票抬头
  // 参数：
  //  e, 输入事件，利用detail属性获得value
  // 返回值：无
  inputReceiptTitle: function (e) {
    this.setData({
      receipt_title: e.detail.value
    })
  },
  // 检测并输入税号
  // 参数：
  //  e, 输入事件，利用detail属性获得value
  // 返回值：无
  inputReceiptNumber: function (e) {
    const numStr = /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/;
    if (numStr.test(e.detail.value)) {
      this.setData({
        receipt_number: e.detail.value
      })
    } else {
      wx.showToast({
        title: '输入税号有误',
        icon: 'none'
      })
    }
  },
  // 输入备注
  // 参数：
  //  e, 输入事件，利用detail属性获得value
  // 返回值：无
  inputReceiptRemark: function (e) {
    this.setData({
      receipt_remark: e.detail.value
    })
  },
  // 提交发票
  // 参数： 无
  // 返回值： 无
  submitBill: function () {
    let that = this
    let receipt = {
      receipt_price: that.data.receipt_price,
      receipt_title: that.data.receipt_title,
      receipt_number: that.data.receipt_number,
      receipt_type: that.data.receipt_type
    }
    util.createOrder(4, null, null, receipt, that.data.receipt_remark).then(function(res){
      wx.showToast({
        title: '开票成功',
        icon: 'success',
      })
      wx.navigateTo({
        url: '../index/index',
      })
    })
  }
})