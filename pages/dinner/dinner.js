// pages/dinner/dinner.js
var util = require('../../utils/util.js')

let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopType: [],          //栏目数组
    currentShop: null,          //当前栏目的商品
    currentType: 0,            //当前选择的商品
    goods: [],                 //购物车的商品内容
    note: 0,                    //购物车选择的商品数量
    showCar: true,                //是否选择显示购物车,false为显示
    total: 0                   //商品总价
  },
  // 生命周期函数,在加载时获取全局的购物车信息，此处this指向本页面
  // 参数： 无
  // 返回值： 无
  onLoad: function () {
    let that = this
    var tmp
    var temp = []
    that.setData({
      goods: app.globalData.shopCar,
      note: app.globalData.note,
      total: app.globalData.total
    })
    util.getType(1).then(function (res) {
      if (res.data.status.errCode === 0) {
        that.setData({
          shopType: res.data.data
        })
        util.getGoods(that.data.shopType[that.data.currentType].id).then(function (res) {
          for (let i = 0;i < res.data.data.length;i++) {
            tmp = Object.assign({}, res.data.data[i], { buy: 0 })
            for(let j = 0;j < that.data.goods.length;j++){
              if(that.data.goods[j].id === tmp.id){
                tmp.buy = that.data.goods[j].goods_number
              }
            }
            temp.push(tmp)
          }
          that.setData({
            currentShop: temp
          })         
        })
      }
    })

  },
  // 选择分类，在页面左侧栏选择要显示的分类，通过触发事件的dataset的idx来对currentType赋值，此处this指向本页面
  // 参数：
  //  e,点击事件，用于访问e.currentTarget.dataset
  // 返回值： 无
  selectType: function (e) {
    var that = this
    var tmp
    var temp = []
    that.setData({
      currentType: e.currentTarget.dataset.idx
    })
    util.getGoods(that.data.shopType[that.data.currentType].id).then(function (res) {
      for (let i = 0; i < res.data.data.length; i++) {
        tmp = Object.assign({}, res.data.data[i], { buy: 0 })
        for (let j = 0; j < that.data.goods.length; j++) {
          if (that.data.goods[j].id === tmp.id) {
            tmp.buy = that.data.goods[j].goods_number
          }
        }
        temp.push(tmp)
      }
      that.setData({
        currentShop: temp
      })
    })
  },
  // 该函数把商品添加到购物车，此处this指向本页面
  // 参数：
  //  e，点击事件
  // 返回值：无
  addGood: function (e) {
    for (let i = 0; i < this.data.currentShop.length; i++) {
      if (this.data.currentShop[i].id === e.currentTarget.dataset.idx) {
        let goods = this.data.currentShop;
        goods[i].buy++
        this.setData({
          currentShop: goods
        })
        break;
      }
    }
    for (let i = 0; i < app.globalData.shopCar.length; i++) {  //查找购物车里面是否有对应的商品
      if (app.globalData.shopCar[i].id === e.currentTarget.dataset.idx) {   //有就购物数量+1
        app.globalData.shopCar[i].goods_number++;
        app.globalData.note++;
        app.sumMoney();
        this.setData({
          note: this.data.note + 1,
          goods: app.globalData.shopCar,
          total: app.globalData.total
        });
        return;
      }
    }
    for (let i = 0; i < this.data.currentShop.length; i++) {  //没有则新建一个购物车条目
      if (this.data.currentShop[i].id === e.currentTarget.dataset.idx) {        
        let good = {
          goods_name: this.data.currentShop[i].goods_name,
          goods_spec: this.data.currentShop[i].goods_spec,
          goods_price: this.data.currentShop[i].goods_price,
          id: this.data.currentShop[i].id,
          goods_number: 1,
          kind: 2
        };
        app.globalData.shopCar.push(good);
        app.globalData.note++;
        app.sumMoney();
        this.setData({
          note: this.data.note + 1,
          goods: app.globalData.shopCar,
          total: app.globalData.total
        })
        return;
      }
    }
  },
  // 本函数用于从购物车中减少一件商品，如果该商品数量为0，则从购物车中删除，此处this指向本页面
  // 参数：
  //  e,点击事件
  // 返回值： 无
  subGood: function (e) {
    for (let i = 0; i < this.data.currentShop.length; i++) {
      if (this.data.currentShop[i].id === e.currentTarget.dataset.idx) {
        let goods = this.data.currentShop;
        goods[i].buy--
        this.setData({
          currentShop: goods
        })
        break;
      }
    }
    for (let i = 0; i < app.globalData.shopCar.length; i++) {  //查找购物车里面是否有对应的商品
      if (app.globalData.shopCar[i].id === e.currentTarget.dataset.idx) {   //有就购物数量-1
        app.globalData.shopCar[i].goods_number--;
        app.globalData.note--;
        if (app.globalData.shopCar[i].goods_number === 0) {
          app.globalData.shopCar.splice(i, 1);
        }
        if(this.data.note === 0){
          this.setData({
            showCar: true
          });
        }
        app.sumMoney();
        this.setData({
          note: this.data.note - 1,
          goods: app.globalData.shopCar,
          total: app.globalData.total
        });
        return;
      }
    }
  },
  // 点击弹出购物车，主要通过修改showCar实现，当购物车为空时，不会修改showcar，此处this指向本页面
  // 参数：无
  // 返回值： 无
  powerCar: function () {
    if (this.data.goods.length === 0) return;
    this.setData({
      showCar: !this.data.showCar
    })
    console.log(this.data.goods)
  },
  // 点击遮罩层关闭购物车，此处this指向本页面
  // 参数：无
  // 返回值：无
  closeCar: function () {
    this.setData({
      showCar: true
    })
  },
  // 预览图片，此处this指向本页面
  // 参数：
  //  e,点击事件
  // 返回值：无
  preView: function (e) {
    wx.previewImage({
      urls: [e.currentTarget.dataset.src],
      current: e.currentTarget.dataset.src
    })
  },
  // 付款函数，跳转到付款页面，此处this指向本页面
  // 参数： 无
  // 返回值: 无
  pay: function(){
    let key = false, temp = app.globalData.shopCar[0].kind;
    let goods_info = [];
    if (this.data.goods.length === 0) wx.showToast({
      title: '请先选择商品',
      icon: 'none'
    })
    else {
      app.globalData.remark = '';
      for (let i = 1; i < app.globalData.shopCar.length; i++) {
        if (app.globalData.shopCar[i].kind !== temp) {
          key = true;
        }
      }
      if (this.data.showCar === true) {
        this.setData({
          showCar: false
        });
      } else if (key) {
        this.setData({
          showCar: true
        })
        wx.navigateTo({
          url: '../orderlist/orderlist',
        })
      } else {
        this.setData({
          showCar: true
        })
        for (let i = 0; i < this.data.goods.length; i++) {
          goods_info.push({
            // goods_name: this.data.goods[i].goods_name,
            // goods_price: this.data.goods[i].goods_price,
            id: this.data.goods[i].id,
            // goods_spec: this.data.goods[i].goods_spec,
            goods_number: this.data.goods[i].goods_number
          })
        }
        if (temp === 1) {
          app.globalData.shop_car = app.globalData.shopCar
        } else {
          app.globalData.dinner_car = app.globalData.shopCar
        }
        util.createOrder(2, goods_info, this.data.total, null, null).then(function (res) {
          wx.navigateTo({
            url: `../pay/pay?id=${res.data.data.id}&&kind=${temp}`,
          })
        }) 
      }
    }
  }
})