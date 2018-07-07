// pages/bill/bill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:['增值税普通发票', '增值税专用发票'],         //发票种类数组
    isShowModal: true,                               //选择是否弹出模态框
    type: 0                                        //选择的发票种类
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
      type: e.detail.value
    })
  }
})