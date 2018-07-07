// pages/good/good.js
let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    good:{                              //商品信息
      pic: '../../images/noodle.png',
      name: '方便面',
      num: 999,
      size: '106克/桶',
      price: 0.01,
      good_id: 1
    },
    recommand:[                     //推荐商品列表
      {
        pic: '../../images/cola.png',
        name: '可口可乐',
        price: '3.00',
        good_id: 2
      },
      {
        pic: '../../images/rebbull.png',
        name: '红牛',
        price: '6.00',
        good_id: 3
      },
      {
        pic: '../../images/water.png',
        name: '矿泉水',
        price: '2.00',
        good_id: 4
      }
    ],
    goods: [],                    //购物车商品信息
    note: 0,                      //当前购物车商品数量
    showCar: true                    //显示购物车
  },
  // 生命周期函数,在加载组件的时候访问全局变量的goods和note,获得购物车的商品内容和购物车的商品数量
  // 参数： 无
  // 返回值： 无
  onLoad: function(){
    this.setData({
      goods: app.globalData.shopCar,
      note: app.globalData.note
    })
  },
  // 添加商品到购物车，当购物车为空或者购物车没有同样的商品时，插入商品条目。
  // 当购物车已经含有该商品时，则购物车该商品的数量加一，并调用全局的sumMoney函数计算总价格，此处this指向本页面
  // 参数： 无
  // 返回值： 无
  addGood: function(){
    if (this.data.note == 0 && this.data.good.num > 0){   //购物车为空
      let good = {
        name: this.data.good.name,
        size: this.data.good.size,
        price: this.data.good.price,
        good_id: this.data.good.good_id,
        num: 1
      }
      app.globalData.shopCar.push(good);
      app.globalData.note++;
      app.sumMoney();
      this.setData({
        note: app.globalData.note,
        goods: app.globalData.shopCar
      })
    }else if(this.data.note > 0 && this.data.good.num>0){
      let key = false;             //设置标识，false则购物车没有该商品
      for(let i = 0;i < app.globalData.shopCar.length;i++){
        if(app.globalData.shopCar[i].good_id === this.data.good.good_id){
          app.globalData.shopCar[i].num++;
          key = true;
          break;
        }
      }
      if(!key){                     //购物车不为空，但没有该商品时
        let good = {
          name: this.data.good.name,
          size: this.data.good.size,
          price: this.data.good.price,
          good_id: this.data.good.good_id,
          num: 1
        }
        app.globalData.shopCar.push(good);
      }
      app.globalData.note++;
      app.sumMoney();
      this.setData({
        note: app.globalData.note,
        goods: app.globalData.shopCar
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
      if (e.currentTarget.dataset.idx === app.globalData.shopCar[i].good_id){
        app.globalData.shopCar[i].num++;
        app.globalData.note++;
        break;
      }
    }
    app.sumMoney();
    this.setData({
      note: app.globalData.note,
      goods: app.globalData.shopCar
    })
  },
  // 减少购物车里面的商品数量，如果对应商品数量为0，则把它移除出购物车数组，并计算总价格，此处this指向本页面
  // 参数：
  //  e，点击事件，用于访问触发事件的组件的dataset
  // 返回值： 无
  subNum: function(e){
    for (let i = 0; i < app.globalData.shopCar.length; i++) {
      if (e.currentTarget.dataset.idx === app.globalData.shopCar[i].good_id) {
        app.globalData.shopCar[i].num--;
        app.globalData.note;
        if (app.globalData.shopCar[i].num === 0){
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
      goods: app.globalData.shopCar
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
    if(this.data.goods.length === 0) return;
    wx.navigateTo({
      url: '../pay/pay',
    })
  }
})