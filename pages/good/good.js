// pages/good/good.js
let util = require('../../utils/util.js')

let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    good: {},                             //商品信息
    hot_sell: [],                     //推荐商品列表
    goods: [],                    //购物车商品信息
    note: 0,                      //当前购物车商品数量
    showCar: true,                    //显示购物车
    total: 0             //商品总价
  },
  // 生命周期函数,在加载组件的时候访问全局变量的goods和note,获得购物车的商品内容和购物车的商品数量
  // 参数： 无
  // 返回值： 无
  onLoad: function(options){
    let that = this;
    util.getGood(app.globalData.user.token, options.id).then(function(res){
      that.setData({
        good: res.data.data
      })
      util.getRecomand(app.globalData.user.token).then(function (res) {
        let temp = [];
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].id !== that.data.good.id) {
            temp.push(res.data.data[i])
          }
        }    
        that.setData({
          hot_sell: temp
        })
      })
    })
    
    this.setData({
      goods: app.globalData.shopCar,
      note: app.globalData.note,
      total: app.globalData.total
    })
  },
  // 添加商品到购物车，当购物车为空或者购物车没有同样的商品时，插入商品条目。
  // 当购物车已经含有该商品时，则购物车该商品的数量加一，并调用全局的sumMoney函数计算总价格，此处this指向本页面
  // 参数： 无
  // 返回值： 无
  addGood: function(){
    if (this.data.note == 0 && this.data.good.goods_number > 0){   //购物车为空
      let good = {
        goods_name: this.data.good.goods_name,
        goods_spec: this.data.good.goods_spec,
        goods_price: this.data.good.goods_price,
        id: this.data.good.id,
        goods_number: 1,
        kind: 1
      }
      app.globalData.shopCar.push(good);
      app.globalData.note++;
      app.sumMoney();
      this.setData({
        note: app.globalData.note,
        goods: app.globalData.shopCar,
        total: app.globalData.total
      })              
    }else if(this.data.note > 0 && this.data.good.goods_number>0){
      let key = false;             //设置标识，false则购物车没有该商品
      for(let i = 0;i < app.globalData.shopCar.length;i++){
        if(app.globalData.shopCar[i].id === this.data.good.id){
          app.globalData.shopCar[i].goods_number++;
          key = true;
          break;
        }
      }
      if(!key){                     //购物车不为空，但没有该商品时
        let good = {
          goods_name: this.data.good.goods_name,
          goods_spec: this.data.good.goods_spec,
          goods_price: this.data.good.goods_price,
          id: this.data.good.id,
          goods_number: 1,
          kind: 1
        }
        app.globalData.shopCar.push(good);
      }
      app.globalData.note++;
      app.sumMoney();
      this.setData({
        note: app.globalData.note,
        goods: app.globalData.shopCar,
        total: app.globalData.total
      })  
    }else{
      wx.showToast({
        title: '没有库存',
        icon: 'none'
      })
    }
  },
  // 增加购物车里面的商品数量，并计算总价格，此处this指向本页面
  // 参数：
  //  e，点击事件，用于访问触发事件的组件的dataset
  // 返回值： 无
  addNum: function(e){
    for(let i = 0;i < app.globalData.shopCar.length;i++){
      if (e.currentTarget.dataset.idx === app.globalData.shopCar[i].id){
        app.globalData.shopCar[i].goods_number++;
        app.globalData.note++;
        break;
      }
    }
    app.sumMoney();
    this.setData({
      note: app.globalData.note,
      goods: app.globalData.shopCar,
      total: app.globalData.total
    })
  },
  // 减少购物车里面的商品数量，如果对应商品数量为0，则把它移除出购物车数组，并计算总价格，此处this指向本页面
  // 参数：
  //  e，点击事件，用于访问触发事件的组件的dataset
  // 返回值： 无
  subNum: function(e){
    for (let i = 0; i < app.globalData.shopCar.length; i++) {
      if (e.currentTarget.dataset.idx === app.globalData.shopCar[i].id) {
        app.globalData.shopCar[i].goods_number--;
        app.globalData.note--;
        if (app.globalData.shopCar[i].goods_number === 0){
          app.globalData.shopCar.splice(i, 1);
          this.setData({
            showCar: true
          });
        }
        break;
      }
    }
    app.sumMoney();
    this.setData({
      note: app.globalData.note,
      goods: app.globalData.shopCar,
      total: app.globalData.total
    })
  },
  // 点击弹出购物车，如果购物车为空则不操作，此处this指向本页面
  // 参数： 无
  // 返回值： 无
  powerCar: function(){
    if (this.data.goods.length === 0) return;
    this.setData({
      showCar: !this.data.showCar
    })
  },
  // 点击关闭购物车，此处this指向本页面
  // 参数: 无
  // 返回值： 无
  closeCar: function(){
    this.setData({
      showCar: true
    })
  },
  // 点击支付按钮，跳转到支付页面，当购物车为空时不操作，此处this指向本页面
  // 参数: 无
  // 返回值: 无
  pay: function(){
    let key = false, temp;
    let goods_info = [];
    if (this.data.goods.length === 0) return;
    else {
      temp = app.globalData.shopCar[0].kind
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
        util.createOrder(temp, goods_info, this.data.total, null, null).then(function (res) {
          wx.navigateTo({
            url: `../pay/pay?id=${res.data.data.id}&&kind=${temp}`,
          })
        })
      }
    }
  }
})