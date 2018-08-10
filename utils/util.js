const app = getApp()
// 请求获取酒店全部信息
// 参数：无
// 返回值：null
function getHotel(token){
  return new Promise(function(resolve, reject){
    wx.request({
      url: app.globalData.base + '/api/font/hotel-info/get-hotel-info',
      header: {
        token: token
      },
      success: function (res) {
        if (res.data.status.errCode === 0){
          app.globalData.hotel = {
            id: res.data.data.hotel_id,
            name: res.data.data.hotel_name,
            phone: res.data.data.hotel_phone,
            wifi: {
              ssid: res.data.data.hotel_wifi_account,
              password: res.data.data.hotel_wifi_password
            },
            room: {
              id: res.data.data.room.id,
              room_number: res.data.data.room.room_number
            },
            services: res.data.data.services
          }
          app.globalData.notices = res.data.data.services
          resolve();
        } else {
          wx.showToast({
            title: '请先登录',
            icon: 'none'
          })
          wx.navigateTo({
            url: '../../pages/scanning/scanning',
          })
        }
      }
    })
  })
}
// 请求获得轮播图的图片
// 参数：
//  callback：请求url成功获得图片后处理图片数据的回调函数
// 返回值: null
function getSlider(callback){
  wx.request({
    url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
    data:{
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      _: Date.now()
    },
    method: 'GET',
    header:{'content-type': 'application/json'},
    success: function(res){
      if(res.statusCode == 200){
        callback(res.data);
      }
    }
  })
}

// 获取便利店或者送餐服务栏目
// 参数:
//  type_id: 商店类型，用于区分便利店和送餐
// 返回值：无
function getType(type_id){
  return new Promise(function(resolve, reject){
    wx.request({
      url: app.globalData.base + '/api/font/store/get-stores',
      header: {
        token: app.globalData.user.token
      },
      method: 'GET',
      data: {
        type_id: type_id
      },
      success: function(res){
        resolve(res)
      }
    })
  })
}

// 获取当前栏目的商品
// 参数：
//  level_id: 商品栏目id
// 返回值： 无
function getGoods(level_id){
  return new Promise(function(resolve, reject){
    wx.request({
      url: app.globalData.base + '/api/font/store/get-goods',
      header: {
        token: app.globalData.user.token
      },
      method: 'GET',
      data: {
        level_id: level_id
      },
      success: function (res) {
        resolve(res)
      }
    })
  })
}

// 获得投诉标签
// 参数： 无
// 返回值： 无
function getComplains () {
  return new Promise(function(resolve, reject){
    wx.request({
      url: app.globalData.base + '/api/font/complaint/get-complaints',
      header: {
        token: app.globalData.user.token
      },
      method: 'Get',
      success: function (res) {
        resolve(res)
      }
    })
  })
}

// 获得租借物品标签
// 参数：无
// 返回值： 无
function getRent () {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: app.globalData.base + '/api/font/sundrie/get-sundries',
      header: {
        token: app.globalData.user.token
      },
      method: 'Get',
      success: function (res) {
        resolve(res)
      }
    })
  })
}

// 获得清洁时间标签
// 参数：无
// 返回值： 无
function getClean() {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: app.globalData.base + '/api/font/clean/get-cleans',
      header: {
        token: app.globalData.user.token
      },
      method: 'Get',
      success: function (res) {
        resolve(res)
      }
    })
  })
}

// 获得住房福利信息
// 参数：无
// 返回值：无
function getWelfares () {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: app.globalData.base + '/api/font/welfare/get-welfares',
      header: {
        token: app.globalData.user.token
      },
      method: 'Get',
      success: function (res) {
        resolve(res)
      }
    })
  })
}

// 获得旅游推荐信息
// 参数：无
// 返回值： 无
function getTourism () {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: app.globalData.base + '/api/font/tourism/get-tourism',
      header: {
        token: app.globalData.user.token
      },
      method: 'Get',
      success: function (res) {
        resolve(res)
      }
    })
  })
}

// 获得酒店指南
// 参数： 无
// 返回值： 无
function getGuide () {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: app.globalData.base + '/api/font/hotel-guide/get-hotel-guide',
      header: {
        token: app.globalData.user.token
      },
      method: 'Get',
      success: function (res) {
        resolve(res)
      }
    })
  })
}

// 生成订单信息
// 参数：
//  order_type: 订单类型，
//  goods_info：商品信息,
//  order_price：订单价格，
//  service_info：服务信息
//  order_mark：订单备注
// 返回值： 无
function createOrder (order_type, goods_info, order_price, service_info, order_remark) {
  return new Promise(function(resolve, reject){
    // 商品信息和服务信息都不存在，购买订单时没有订单价格，报错
    if ((!goods_info && !service_info) || ((order_type === 1 || order_type === 2) && !order_price)) {
      console.log('订单出错')
      return;
    }
    if (order_type === 0) {        //客房服务
      wx.request({
        url: app.globalData.base + '/api/font/order/create-order',
        header: {
          token: app.globalData.user.token
        },
        method: 'POST',
        data: {
          order_type: order_type,
          service_info: service_info
        },
        success: function(res){
          resolve(res)
        }
      })
    } else if (order_type === 3) {       //吐槽
      wx.request({
        url: app.globalData.base + '/api/font/order/create-order',
        header: {
          token: app.globalData.user.token
        },
        method: 'POST',
        data: {
          order_type: order_type,
          service_info: service_info,
          order_remark: order_remark
        },
        success: function (res) {
          resolve(res)
        }
      })
    } else if (order_type === 4) {       //开发票
      if(!order_remark || order_remark === ''){
        wx.request({
          url: app.globalData.base + '/api/font/order/create-order',
          header: {
            token: app.globalData.user.token
          },
          method: 'POST',
          data: {
            order_type: order_type,
            service_info: service_info
          },
          success: function (res) {
            resolve(res)
          }
        })          
      } else {
        wx.request({
          url: app.globalData.base + '/api/font/order/create-order',
          header: {
            token: app.globalData.user.token
          },
          method: 'POST',
          data: {
            order_type: order_type,
            service_info: service_info,
            order_remark: order_remark
          },
          success: function (res) {
            resolve(res)
          }
        })
      }  
    } else {                      //送餐或者便利店等购买服务
      wx.request({
        url: app.globalData.base + '/api/font/order/create-order',
        header: {
          token: app.globalData.user.token
        },
        method: 'POST',
        data: {
          order_type: order_type,
          goods_info: goods_info,
          order_price: order_price
        },
        success: function (res) {
          resolve(res)
        }
      })
    }
  })
}

// 获得热卖商品
// 参数：
//   token:用户授权的字段
// 返回值： 无
function getRecomand (token) {
  return new Promise(function(resolve, reject){
    wx.request({
      url: app.globalData.base + '/api/font/store/get-hot-goods',
      method: 'GET',
      header: {
        token: token
      },
      success: function(res){
        resolve(res)
      }
    })
  })
}

// 获得订单信息
// 参数：
//  token: 用户的鉴权token
//  order_status:分别对应待受理，处理中和已完成三个状态，这个变量用于查找对应状态下所有订单
// 返回值: 无
function getOrders(token, order_status){
  return new Promise(function(resolve, reject){
    wx.request({
      url: app.globalData.base + '/api/font/order/get-orders',
      method: 'GET',
      header: {
        token: token
      },
      success: function(res){
        resolve(res)
      },
      data: {
        order_status: order_status
      }
    })
  })
}
// 获得订单详情
// 参数:
//  id，订单的id
// 返回值: 无
function getOrder (token, id) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: app.globalData.base + '/api/font/order/get-order',
      method: 'GET',
      header: {
        token: token
      },
      success: function (res) {
        resolve(res)
      },
      data: {
        id: id
      }
    })
  })
}
// 提交发票信息
// 参数:
//  token: 用户鉴权token
//  receipt： 发票信息
// 返回值： 无
function createReceipt (token, receipt) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: app.globalData.base + '/api/font/receipt/create-receipt',
      method: 'POST',
      header: {
        token: token
      },
      data: {
        receipt_price: receipt.receipt_price,
        receipt_number: receipt.receipt_number,
        receipt_title: receipt.receipt_title,
        receipt_type: receipt.receipt_type,
        receipt_remark: receipt.receipt_remark
      },
      success: function (res) {
        resolve(res)
      }
    })
  })
}
// 获得支付参数，并且调用支付
// 参数：
//   remark: 订单备注
// 返回值： 无
function getPay (token, id, order_remark) {
  if(order_remark === ''){
    wx.request({
      url: app.globalData.base + '/api/font/order/pay-order',
      method: 'POST',
      header: {
        token: token
      },
      data: {
        id: id
      },
      success: function (res) {
        let date = new Date();
        let timeStamp = date.getTime() / 1000
        wx.requestPayment({
          timeStamp: timeStamp.toString(),
          nonceStr: res.data.data.nonce_str,
          package: 'prepay_id=' + res.data.data.prepay_id,
          signType: 'MD5',
          paySign: res.data.data.sign,
          success: function(res){
            console.log(res)
          },
          fail: function(err){
            console.log(err)
          }
        })
      }
    })
  } else {
    wx.request({
      url: app.globalData.base + '/api/font/order/pay-order',
      method: 'POST',
      header: {
        token: token
      },
      data: {
        id: id,
        order_remark: order_remark
      },
      success: function (res) {
        let date = new Date();
        let timeStamp = date.getTime() / 1000
        wx.requestPayment({
          timeStamp: timeStamp.toString(),
          nonceStr: res.data.data.nonce_str,
          package: 'prepay_id=' + res.data.data.prepay_id,
          signType: 'MD5',
          paySign: res.data.data.sign,
          success: function (res) {
            console.log(res)
          },
          fail: function (err) {
            console.log(err)
          }
        })
      }
    })
  }
}

// 建立socket并实时更新订单信息
// 参数：
//  openid, 用户的openid
//  callback, 获取到信息的callback
// 返回值： 无
function getSocket (token) {
  let data = {
    token: token
  }
  let interval, resData
  return new Promise(function(resolve, reject){
    // 建立socket连接
    wx.connectSocket({
      url: `wss://happystay.niowoo.cn/wss/websocket`,
      method: "GET",
      success: function (res) {
        console.log('socket连接成功')
      },
      fail: wx.onSocketError(function (err) {
        console.log(err)
      })
    })
    wx.onSocketOpen(function (res) {
      app.globalData.socket = true;
      wx.onSocketMessage(function (res) {
        if (isJSON(res.data)) {
          resData = JSON.parse(res.data)
          console.log(resData)
          // callback(resData, that)
          resolve(resData)
        }
      })
      wx.sendSocketMessage({
        data: JSON.stringify(data),
        success: function (res) {
        }
      })
      interval = setInterval(function () {
        wx.sendSocketMessage({
          data: ['bump'],
          success: function (res) {
            console.log('心跳')
          }
        })
      }, 20000);
    })
  
  })
  
  wx.onSocketClose(function(){
    clearInterval(interval)
    app.globalData.socket = false
  })
}

// 判断是否是JSON
// 参数：
//  str, 要判断的字符串
// 返回值: 
//  isJSON, 布尔值，是否正确
function isJSON (str) {
  try{
    JSON.parse(str)
    return true
  } catch(e) {
    return false
  }
}

// 关闭socket
// 参数:
//   token, 用户鉴权
// 返回值： 无
function offSocket (token) {
  wx.closeSocket({
    url: '',
    header: {
      token: token
    }
  })
}

// 获取商品详情
// 参数：
//  token, 用户鉴权
//  id, 商品id
// 返回值： 无
function getGood (token, id) {
  return new Promise(function(resolve, reject){
    wx.request({
      url: app.globalData.base + '/api/font/store/get-store-good',
      method: 'GET',
      header: {
        token: token
      },
      data: {
        id: id
      },
      success: function(res){
        resolve(res)
      }
    })
  })
}

// 获取发票详情
// 参数：
//  token, 用户鉴权
//  id, 发票订单id
// 返回值： 无
function getReceipt (token, id) {
  return new Promise(function(resolve, reject){
    wx.request({
      url: app.globalData.base + '/api/font/receipt/get-receipt',
      method: 'GET',
      header: {
        token: token
      },
      data: {
        id: id
      },
      success: function(res){
        resolve(res)
      }
    })
  })
}

module.exports = {
  getSlider: getSlider,
  getHotel: getHotel,
  getType: getType,
  getGoods: getGoods,
  getComplains: getComplains,
  getRent: getRent,
  getClean: getClean,
  getWelfares: getWelfares,
  getGuide: getGuide,
  getTourism: getTourism,
  createOrder: createOrder,
  getRecomand: getRecomand,
  getOrders: getOrders,
  getOrder: getOrder,
  createReceipt: createReceipt,
  getPay: getPay,
  getSocket: getSocket,
  offSocket: offSocket,
  getGood: getGood,
  getReceipt: getReceipt
}