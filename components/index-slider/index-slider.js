
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    slider:{
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    swiperCurrent: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    swiperChange: function (e) {
      this.setData({
        swiperCurrent: e.detail.current
      })
    },
    ChangeEvent: function (e) {
      this.setData({
        swiperCurrent: e.currentTarget.id
      })
    }
  }
})
