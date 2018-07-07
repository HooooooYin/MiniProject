// pages/talkingroom/talkingroom.js
let app = getApp();
let socketOpen = false;
let socketTask;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotel: null,          //酒店信息
    inputValue: '',                //输入的文本内容
    status: true,              //选择是否显示发送图片
    scrollTop: 0,              //用于滑到底部
    contentList:[
      {
        text: 'Hello!My name is ZhangPeng.What\'s your name?',
        isMe: false
      },
      {
        text: 'My name is WuYifan.Nice to meet you',
        isMe: true
      },
      {
        img: '../../images/cola.png',
        isMe:false
      },
      {
        img: '../../images/rebbull.png',
        isMe: true
      },
      {
        text: 'Nice to meet you too',
        isMe: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.bottom();
    this.setData({
      hotel: app.globalData.hotel
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!socketOpen) {
      this.webSocket();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    socketTask.onOpen(res => {
      socketOpen = true;
      console.log('监听socket连接打开事件', res)
    });
    socketTask.onClose(onClose => {
      socketOpen = false;
      console.log('监听socket连接关闭事件', onClose);
      this.webSocket();
    });
    socketTask.onError(onError => {
      socketOpen = false;
      console.log('监听socket连接错误事件', onError);
    });
    socketTask.onMessage(onMessage => {
      //获取服务器信息，用于更新聊天数据
    })
  },
  // 用于监听文本输入，此处this指向本页面
  // 参数：
  //  e,文本输入的事件
  // 返回值：null
  keyInput: function(e){
    this.setData({
      inputValue: e.detail.value
    })
  },
  // 用于发送文本，把data中的inputValue通过socket发送到服务器，此处this指向本页面
  // 参数：无
  // 返回值: 无
  submitText: function(){
    let data = {
      isMe: true,
      text: this.data.inputValue
    }
    if(socketOpen){
      wx.sendSocketMessage({
        data: data,
      });
      this.data.contentList.push(data);
      this.setdata({
        contentList: this.data.contentList,
        inputValue: ''
      })
    }
  },
  // 用于切换状态，选择是否弹出发送图片的按钮，此处this指向本页面
  // 参数：无
  // 返回值：无
  changeStatus: function(){
    this.setData({
      status: !this.data.status
    })
  },
  uploadImg: function(){
    wx.chooseImage({
      count:1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: '',                  //服务器
          filePath: tempFilePaths,
          name: 'img',
          success:function(res){
            console.log(res);
            wx.showToast({
              title: '图片发送成功',
              icon: 'success'
            })
          }
        });
        let data = {
          img: tempFilePaths,
          isMe: true,
        }
        this.data.contentList.push(data);
        this.setData({
          contentList: this.data.contentList
        })
      },
    })
  },
  // 该函数用于把scroll-view自动滑动到最底部，从而显示最新消息，此处this指向本页面
  // 参数： 无
  // 返回值： 无
  bottom: function(){
    this.setData({
      scrollTop: 10000 * this.data.contentList.length
    })
  },
  // 该函数用于建立webscoket连接
  // 参数： 无
  // 返回值： 无
  webSocket: function(){
    socketTask = wx.connectSocket({
      url: '',            //服务器url
      method: 'POST',
      header: 'application/json',
      success: function(res){
        console.log('websocket连接创建', res)
      },
      fail: function(err){
        wx.showToast({
          title: '网络异常',
          icon: 'none'
        })
        console.log(err)
      }
    })
  }
})