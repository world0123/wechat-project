// pages/detail.js
const db = wx.cloud.database()
const app = getApp()
var img ='https://raw.githubusercontent.com/world0123/hello-world/master/1.jpg'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[],
    Image:img,
    id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    var that = this
    console.log(params)
    that.setData({
      id:params.id,
    })
    db.collection('todos').doc(params.id).get({
      success(res) {
        //console.log(res.data)
        that.setData({
          data: res.data,
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

  share:function(){
    
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})