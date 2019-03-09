// pages/detail.js
const db = wx.cloud.database()
const app = getApp()
var img = '../../image/img'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:{},
    Image:'',
    index:null,
    id:null,
    list:[],
    visible: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    var that = this
    console.log(params)
    that.setData({
      id:params.id,
      index:params.index
    })
    db.collection('todos').doc(params.id).get({
      success(res) {
        that.setData({
          data: res.data,
          Image:img+res.data.bgindex+'jpg'
        })
      }
    })
    db.collection('todos').get({
      success(res) {
        that.setData({
          list: res.data,
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

  ImageChange(){
    var i = this.data.data.bgindex
    console.log(i)
    img = '../../image/img'+i+'.jpg'
    this.setData({
      Image:img
    })
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
    var that=this
    var list = app.data
    var index = that.index
    var id = that.id
    this.data.opacity_value = 0
    wx.showModal({
      title: '提示',
      content: '确定删除此卡片',
      success: function (res) {
        if (res.confirm) {
          list.splice(index, 1)
          //删除云端数据
          db.collection('todos').doc(id).remove({
            success(res) {
              console.log("删除成功")
            }
          })
          //更新本地列表
          that.setData({
            data: list
          });
          app.data=list
          console.log(app.data)
         
        }
      }
    })
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