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

module.exports = {
  getSlider: getSlider
}