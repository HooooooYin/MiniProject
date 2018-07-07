// pages/shop/shop.js
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop:[
      {
        type: '热销榜',
        goods:[
          {
            name: '矿泉水',
            size: '600ml/瓶',
            num: 999,
            pic: '../../images/water.png',
            price:2,
            good_id: 4,
            buy: 0
          },
          {
            name: '矿泉水',
            size: '600ml/瓶',
            num: 999,
            pic: '../../images/water.png',
            price: 2,
            good_id: 4,
            buy: 0
          },
          {
            name: '矿泉水',
            size: '600ml/瓶',
            num: 999,
            pic: '../../images/water.png',
            price: 2,
            good_id: 4,
            buy: 0
          },
          {
            name: '矿泉水',
            size: '600ml/瓶',
            num: 999,
            pic: '../../images/water.png',
            price: 2,
            good_id: 4,
            buy: 0
          },
          {
            name: '矿泉水',
            size: '600ml/瓶',
            num: 999,
            pic: '../../images/water.png',
            price: 2,
            good_id: 4,
            buy: 0
          }
        ]
      },
      {
        type: '小商品',
        goods: [
          {
            name: '可口可乐',
            size: '300ml/瓶',
            num: 999,
            pic: '../../images/cola.png',
            price: 3,
            good_id: 2,
            buy: 0
          },
          {
            name: '可口可乐',
            size: '300ml/瓶',
            num: 999,
            pic: '../../images/cola.png',
            price: 3,
            good_id: 2,
            buy: 0
          },
          {
            name: '可口可乐',
            size: '300ml/瓶',
            num: 999,
            pic: '../../images/cola.png',
            price: 3,
            good_id: 2,
            buy: 0
          },
          {
            name: '可口可乐',
            size: '300ml/瓶',
            num: 999,
            pic: '../../images/cola.png',
            price: 3,
            good_id: 2,
            buy: 0
          },
          {
            name: '可口可乐',
            size: '300ml/瓶',
            num: 999,
            pic: '../../images/cola.png',
            price: 3,
            good_id: 2,
            buy: 0
          }
        ]
      },
      {
        type: '景区门票',
        goods: [
          {
            name: '红牛',
            size: '400ml/瓶',
            num: 999,
            pic: '../../images/rebbull.png',
            price: 5,
            good_id: 3,
            buy: 0
          },
          {
            name: '红牛',
            size: '400ml/瓶',
            num: 999,
            pic: '../../images/rebbull.png',
            price: 5,
            good_id: 3,
            buy: 0
          },
          {
            name: '红牛',
            size: '400ml/瓶',
            num: 999,
            pic: '../../images/rebbull.png',
            price: 5,
            good_id: 3,
            buy: 0
          },
          {
            name: '红牛',
            size: '400ml/瓶',
            num: 999,
            pic: '../../images/rebbull.png',
            price: 5,
            good_id: 3,
            buy: 0
          },
          {
            name: '红牛',
            size: '400ml/瓶',
            num: 999,
            pic: '../../images/rebbull.png',
            price: 5,
            good_id: 3,
            buy: 0
          }
        ]
      }
    ],
    currentType: 0,   //当前选择的商品类
    goods: [],          //购物车的信息
    note: 0,                //购物车的商品数量
    showCar: true,          //选择是否显示购物车，false为显示
    total: 0             //商品总价
  },
  onLoad: function(){
    this.setData({
      goods: app.globalData.shopCar,
      note: app.globalData.note,
      total: app.globalData.total
    })
  },
  // 该函数用于选择显示的商品类型，通过修改currentType实现，此处this指向本页面
  // 参数：
  //  e,点击事件
  // 返回值： 无
  selectType: function(e){
    this.setData({
      currentType: e.currentTarget.dataset.idx
    })
  },
  // 该函数把商品添加到购物车，此处this指向本页面
  // 参数：
  //  e，点击事件
  // 返回值：无
  addGood: function (e) {   
    for (let i = 0; i < this.data.shop[this.data.currentType].goods.length; i++) {
      if (this.data.shop[this.data.currentType].goods[i].good_id === e.currentTarget.dataset.idx) {
        let shop = this.data.shop;
        shop[this.data.currentType].goods[i].buy++
        this.setData({
          shop: shop
        })
        break;
      }
    }
    for (let i = 0; i < app.globalData.shopCar.length;i++){  //查找购物车里面是否有对应的商品
      if (app.globalData.shopCar[i].good_id === e.currentTarget.dataset.idx){   //有就购物数量+1
        app.globalData.shopCar[i].num++;
        app.globalData.note++;
        app.sumMoney();
        this.setData({
          note: app.globalData.note,
          goods: app.globalData.shopCar,
          total: app.globalData.total
        });
        return;
      }
    }
    for (let i = 0; i < this.data.shop[this.data.currentType].goods.length; i++){  //没有则新建一个购物车条目
      if (this.data.shop[this.data.currentType].goods[i].good_id === e.currentTarget.dataset.idx){
        let good = {
          name: this.data.shop[this.data.currentType].goods[i].name,
          size: this.data.shop[this.data.currentType].goods[i].size,
          price: this.data.shop[this.data.currentType].goods[i].price,
          good_id: this.data.shop[this.data.currentType].goods[i].good_id,
          num: 1
        };
        app.globalData.shopCar.push(good);
        app.globalData.note++;
        app.sumMoney();
        this.setData({
          note: app.globalData.note,
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
    for (let i = 0; i < this.data.shop[this.data.currentType].goods.length; i++) {
      if (this.data.shop[this.data.currentType].goods[i].good_id === e.currentTarget.dataset.idx) {
        let shop = this.data.shop;
        shop[this.data.currentType].goods[i].buy--
        this.setData({
          shop: shop
        })
        break;
      }
    }
    for (let i = 0; i < app.globalData.shopCar.length; i++) {  //查找购物车里面是否有对应的商品
      if (app.globalData.shopCar[i].good_id === e.currentTarget.dataset.idx) {   //有就购物数量-1
        app.globalData.shopCar[i].num--;
        app.globalData.note--;
        if (app.globalData.shopCar[i].num === 0) {
          app.globalData.shopCar.splice(i, 1);
          this.setData({
            showCar: true
          });
        }
        app.sumMoney();
        this.setData({
          note: app.globalData.note,
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
  powerCar: function(){
    if(this.data.goods.length === 0) return;
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
  preView: function(e){
    wx.previewImage({
      urls: [e.currentTarget.dataset.src],
      current: e.currentTarget.dataset.src
    })
  },
  // 付款函数，跳转到付款页面，此处this指向本页面
  // 参数： 无
  // 返回值: 无
  pay: function(){
    if(this.data.goods.length === 0) wx.showToast({
      title: '请先选择商品',
      icon: 'none'
    })
    else{
      if(this.data.showCar === true){
        this.setData({
          showCar: false
        });
      }else{
        this.setData({
          showCar: true
        })
        wx.navigateTo({
          url: '../pay/pay',
        })
      }
    }
  }
})