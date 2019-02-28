// pages/detail.js
var that = this;
const app = getApp()
const util = require("../../utils/util.js")
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  drawStart: function (e) {
    // console.log("drawStart");  
    var touch = e.touches[0]

    for (var index in that.data.data) {
      var item = this.data.data[index]
      item.right = 0
    }
    this.setData({
      data: this.data.data,
      startX: touch.clientX,
    })

  },
  drawMove: function (e) {
    var index = e.target.dataset.index
    var touch = e.touches[0]
    var item = this.data.data[index]
    var disX = this.data.startX - touch.clientX
    //设置背景图片的透明度
    //console.log(disX)
    if (disX >= 0) {
      item.opacity_value = 1 - disX / 375
      item.right = disX
      this.setData({
        data: this.data.data
      })
    } else {
      item.right = 0
      item.opacity_value = 1
      this.setData({
        isScroll: true,
        data: this.data.data
      })
    }
  },
  drawEnd: function (e) {
    var index = e.target.dataset.index
    var list = this.data.data
    var item = this.data.data[e.currentTarget.dataset.index]
    var id = this.data.data[index]._id
    //disX大于某个距离时弹出框
    if (item.right >= 200) {
      item.opacity_value = 0
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
            this.setData({
              data: list
            });
          }
          else if (res.cancel) {
            item.right = 0
            item.opacity_value = 1
            this.setData({
              isScroll: true,
              data: this.data.data,
            })
          }
        }
      })
      this.setData({
        isScroll: true,
        data: this.data.data,
      })
    } else {
      item.right = 0
      item.opacity_value = 1
      this.setData({
        isScroll: true,
        data: this.data.data,
      })
    }
  }  
})