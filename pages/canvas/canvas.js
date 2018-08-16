// pages/canvas/canvas.js
var network = require("../../libs/promise.util.js")
var qcode=require("../../libs/qcode.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
   money:120
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const wxGetImageInfo = network.promisify(wx.getImageInfo)

    Promise.all([
      wxGetImageInfo({
        src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3019158746,2084111882&fm=27&gp=0.jpg'
      }),
      wxGetImageInfo({
        src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=320281038,3892363613&fm=27&gp=0.jpg'
      })
    ]).then(res => {
      const ctx = wx.createCanvasContext('shareCanvas')

      ctx.drawImage(res[0].path, 0, 0, 250, 400)
      ctx.setTextAlign('center')    // 文字居中
      ctx.setFillStyle('#000000')  // 文字颜色：黑色
      ctx.setFontSize(22)         // 文字字号：22px
      ctx.fillText("请支付"+this.data.money+"钱", 250 / 2, 50)
     
      // 小程序码
      const qrImgSize = 180
      ctx.drawImage(res[1].path, (250 - qrImgSize) / 2, 200, qrImgSize, qrImgSize)

      ctx.stroke()
      ctx.draw()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  save:function(){
    const wxCanvasToTempFilePath =network.promisify(wx.canvasToTempFilePath)
    const wxSaveImageToPhotosAlbum = network.promisify(wx.saveImageToPhotosAlbum)

    wxCanvasToTempFilePath({
      canvasId: 'shareCanvas'
    }, this).then(res => {
      return wxSaveImageToPhotosAlbum({
        filePath: res.tempFilePath
      })
    }).then(res => {
      wx.showToast({
        title: '已保存到相册'
      })
    })

  }
})