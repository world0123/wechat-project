// pages/picture/picture.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    data:['1','2','3','4','5','6']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  chosepicture:function(e){
    var index = e.target.dataset.index
    wx.setStorageSync("cargo", index+1)
    wx.showToast({
          title: '成功',
          icon:'success',
          duration: 1000,
        })
    setTimeout(
      function(){
        wx.navigateBack({
          detail:1
        })
      },1000)
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

  }
})