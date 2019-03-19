// pages/detail.js
const db = wx.cloud.database()
const app = getApp()
var img = '../../image/img'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[],
    visible: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    var that=this
    db.collection('todos').doc(params.id).get({
      success(res) {
        console.log(res.data)//下次删除
        console.log(res.data)
        that.setData({
          data: res.data
        })
      }
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

  GoHome:function(){
    wx.navigateTo({
      url: '../world0123/me',
    })
  },

  Write:function(){
    console.log('这里加一个修改的函数')
  },

  Delete:function(){
   
  },

  // 展示/隐藏分享页面
  share: function () {
    console.log('click share')
    this.setData({
      visible: true
    })
  },
  close: function () {
    this.setData({ 
      visible: false 
    })
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})